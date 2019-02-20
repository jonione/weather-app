import React, { Component } from 'react';
import './App.css';
import DataRequest from './components/datarequest';
import DisplayContainer from './components/displaycontainer';

class App extends Component {
  render() {
    return (
      <div>
        <h3 className="custom-header">CURRENT WEATHER APP</h3>
		<DataRequest />
		<DisplayContainer />
      </div>
    );
  }
}

export default App;
