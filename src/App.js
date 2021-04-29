import './App.css';
import React from 'react';
import { Header, Main } from './mainComponents';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'United States'
    }
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(newLocation) {
    this.setState({
      location: newLocation
    });
  }

  render() {
    return (
      <div id="react-app-container" className="background1">
        <Header onChange={this.updateInput} loggedIn={true}/>
        <Main location={this.state.location}/>
      </div>
    );
  }
}

export default App;
