import React from 'react';
import { TweenMax, TimelineMax, ExpoScaleEase } from 'gsap/all';
import { fire } from './config/config';
import DataContainer from './datacontainer';
import './datarequest.css';

class DataRequest extends React.Component {
constructor(props) {
    super(props);
    this.state = { weatherData : null, searchedCity : null };
	this.child = React.createRef();
	this.getWeather = this.getWeather.bind(this);
	this.handleKeyUp = this.handleKeyUp.bind(this);
	this.updateBackground = this.updateBackground.bind(this);
	this.loadAnimation = this.loadAnimation.bind(this);
	this.stopLoadAnimation = this.stopLoadAnimation.bind(this);
	this.saveCurrentCity = this.saveCurrentCity.bind(this);
	this.setDefaultCity = this.setDefaultCity.bind(this);
	this.loaderEffect = null;
}	
	
componentDidMount(){
   this.loaderEffect = new TimelineMax({paused:true}).add([	
      TweenMax.fromTo("#loader-text",2,{opacity:0},{opacity:1, onComplete:this.stopLoadAnimation, ease:ExpoScaleEase.config(1, 1.5)})
   ]);
   this.setDefaultCity();
}	

getWeather = async () => {
  var userId = 'd54a93e8b3442f2fa76cb872ad7e6606';
  if(this.state.searchedCity)
  {
  var city = this.state.searchedCity;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${userId}`);
  const response = await api_call.json();
  
  this.setState({weatherData: response.list[0]});
  this.loadAnimation();
  this.updateBackground();  
  this.child.current.runAnimations();  
  }
  else {alert("Please type searched city");}  
}

handleKeyUp = (event) => {	
	this.setState({searchedCity : this.userInputValue.value},()=> { 
    console.log(this.state.searchedCity)});
}

updateBackground(){
	var currentTemp = Math.round((this.state.weatherData.main.temp) - 273.15);

	if(currentTemp <= -15) {TweenMax.to("#data-b",10,{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,255,0.75) 60%)', delay:2, ease:ExpoScaleEase.config(1, 1.5)}); }
	else if(currentTemp < 0) {TweenMax.to("#data-b",10,{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,125,0.75) 60%)', delay:2, ease:ExpoScaleEase.config(1, 1.5)}); }
	else if(currentTemp < 15) {TweenMax.to("#data-b",10,{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(125,0,0,0.75) 60%)', delay:2, ease:ExpoScaleEase.config(1, 1.5)}); }
	else if(currentTemp >= 15) {TweenMax.to("#data-b",10,{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,0,0,0.75) 60%)', delay:2, ease:ExpoScaleEase.config(1, 1.5)}); }
}

loadAnimation(){
	this.loaderEffect.play();
}

stopLoadAnimation(){
	this.loaderEffect.reverse();
	this.userInputValue.value = null;
}

saveCurrentCity(){
	    if(this.state.searchedCity)
		{
	    const database = fire.database().ref().child('savedcities');
		database.remove();
		var cityName = this.state.searchedCity;
		database.push().set({ cityName });
		}
}

setDefaultCity(){
	const db = fire.database().ref().child('savedcities');
	db.on('child_added', snap => {
		    console.log(snap.val().cityName);
			this.setState({searchedCity: snap.val().cityName});
      })
	setTimeout(this.getWeather,3000);
}
	
render(){
	var data = this.state.weatherData;
	return(
	 <div className="data-block" id="data-b">
        Your latest city: {this.state.searchedCity}		
		<br /><br />
		<p>Search for city: </p>
		<input className="custom-input" type="text" name="search" placeholder="Search..." onKeyUp={this.handleKeyUp} ref={el => this.userInputValue=el} />
		<button className="custom-button" onClick={this.getWeather}><i className="fa fa-search"></i> SEARCH</button>		
		{this.state.weatherData &&
		<DataContainer ref={this.child} sendOrderToParent={this.stopLoadAnimation} saveAsDefault={this.saveCurrentCity} {...data}/>
		}
		<div className="loader-block" id="loader-text">
		<div className="lds-ripple" id="loader"><div></div><div></div></div>
	    </div>
     </div>
		)
	}
}

export default DataRequest;