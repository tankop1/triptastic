import './App.css';
import React from 'react';
import { Header, Main } from './mainComponents';
import { SignIn } from './signInComponents.js';
import { ProfileDropdown, NotificationsDropdown } from './accountInfo';
import { FirebaseAuthProvider } from "@react-firebase/auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      page: 1,
      button: 'none',
      profile: false,
      notifications: false,
      loggedIn: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.tabClicked = this.tabClicked.bind(this);
    this.logout = this.logout.bind(this);
  }

  updateInput(newLocation) {
    this.setState({
      location: newLocation
    });
  }

  handleClick(e) {
    if (e.target.id === 'sign-up-button' || e.target.id === 'link-to-sign-up') {
      this.setState({
        button: 'sign-up'
      });
    }

    else if (e.target.id === 'login-button' || e.target.id === 'link-to-log-in') {
      this.setState({
        button: 'log-in'
      });
    }

    else if (e.target.id === 'exit-sign-in') {
      this.setState({
        button: 'none'
      });
    }

    else {
      console.log('ERROR: handleClick error in mainComponents.js');
    }
  }

  handleSubmit() {
    this.setState({
      button: 'none',
      loggedIn: true
    });
  }

  logout() {
    this.setState({
      loggedIn: false,
      profile: false
    });
  }

  tabClicked(e) {
    let tabItems = [document.getElementById('tab1'), document.getElementById('tab2'), document.getElementById('tab3'), document.getElementById('tab4')];
    let tabItem = e.target;
    const mainApp = document.getElementById('react-app-container');
    const lastChar = e.target.id[e.target.id.length - 1];

    if (e.target.className === 'tab-title') {
        tabItem = e.target.parentElement;
    }

    for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].classList.remove('selected-tab');
    }

    tabItem.classList.add('selected-tab');

    mainApp.classList.remove('background1');
    mainApp.classList.remove('background2');
    mainApp.classList.remove('background3');
    mainApp.classList.remove('background4');

    mainApp.classList.add('background' + lastChar);
    this.setState({
      page: parseInt(lastChar)
    });
  }

  changeProfile(newS) {
    this.setState({
      profile: newS
    });
  }

  changeNotifications(newS) {
    this.setState({
      notifications: newS
    });
  }

  render() {
    return (
      <div id="react-app-container" className="background1" onClick={(e) => {
        if (document.getElementById('profile-dropdown-container')) {
          if (!document.getElementById('profile-dropdown-container').contains(e.target)) {
            this.changeProfile(false);
          }
        }

        if (document.getElementById('notifications-dropdown-container')) {
          if (!document.getElementById('notifications-dropdown-container').contains(e.target)) {
            this.changeNotifications(false);
          }
        }
      }}>
        <Header onChange={this.updateInput} onClick={this.handleClick} loggedIn={this.state.loggedIn} addProfile={() => {this.changeProfile(true)}} addNotifications={() => {this.changeNotifications(true)}}/>
        <Main location={this.state.location} onSelect={this.tabClicked} page={this.state.page}/>
        {this.state.button !== 'none' && <SignIn button={this.state.button} onClick={this.handleClick} onSubmit={this.handleSubmit}/>}
        {this.state.profile && <ProfileDropdown onClick={this.logout}/>}
        {this.state.notifications && <NotificationsDropdown/>}
      </div>
    );
  }
}

export default App;