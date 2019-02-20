import React, { Component } from 'react';
import './datacontainer.css';
import { TweenMax, TimelineMax, ExpoScaleEase } from 'gsap/all';

class DataContainer extends Component{

    constructor(props){
        super(props);
        this.runAnimations = this.runAnimations.bind(this);	
		this.resetAnimations = this.resetAnimations.bind(this);
		this.saveCurrentCity = this.saveCurrentCity.bind(this);
        this.testEffect = null;		
    }
	
    runAnimations(){
	var degrees = Math.round(this.props.wind.deg);
	if(degrees>0 && degrees <360)
	{
	this.testEffect = new TimelineMax({paused:true}).add([	
	TweenMax.fromTo("#current-data",2,{opacity:0, display:'none'},{opacity:1, display:'block', delay:5, ease:ExpoScaleEase.config(1, 1.5)}),
	TweenMax.fromTo("#arrow",3,{rotation:0},{rotation:degrees, delay:6.5, ease:ExpoScaleEase.config(1, 1.5)})
	]);
	this.testEffect.play();
	}
    }
	
	resetAnimations(){
		this.testEffect.reverse();
		this.props.sendOrderToParent();
	}
	
	saveCurrentCity(){
		this.props.saveAsDefault();
	}
	
    render(){
        return(
		<div className="current-d" id="current-data">
		<h3 style={{fontSize:'25px'}}>{Math.round((this.props.main.temp) - 273.15)}<span>&#8451;</span></h3>
		<p>Wind: {this.props.wind.speed} m/s <i className="fa fa-arrow-circle-up" id="arrow"></i></p>
		<p> {this.props.dt_txt} </p>
		<br />
		<button className="save-button" onClick={this.resetAnimations}>Reset</button>
		<button className="save-button" onClick={this.saveCurrentCity}>Save</button>
		</div>
        )
    }
}

export default DataContainer;