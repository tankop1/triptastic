import './headerComponents.css';
import React from 'react';
import { ProfileImage, NotificationsButton } from './accountInfo';
import logo from './triptastic-logo-pink-removebg-preview.png'; // Logo and favicon was made by myself using the Canva Logo Maker

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.removeSearchInput = this.removeSearchInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    removeSearchInput() {
        let searchInput = document.getElementById('search');
        searchInput.value = '';
        this.handleChange({target: {value: ''}});
        
    }

    handleChange(e) {
        let input = e.target.value;
        this.props.onChange(input);
    }

    render() {       
        return (
            <div id="search-container">
                <input autoComplete="off" spellCheck="true" id="search" type="text" placeholder="Search for your destination" name="search" onChange={this.handleChange}/>
                <div id="search-exit-container">
                    <p id="search-exit" onClick={this.removeSearchInput}>&times;</p>
                </div>
            </div>
        );
    }
}

export class Logo extends React.Component {
    render() {
        return (
            <div id="logo-container">
                <img src={logo} alt="logo" id="logo"/>
            </div>
        );
    }
}

export class AccountInfo extends React.Component {
    render() {
        return (
            <div id="account-info-container">
                <NotificationsButton addNotifications={this.props.addNotifications}/>
                <ProfileImage addProfile={this.props.addProfile} fullName="Tanner Kopel" src=""/>
            </div>
        );
    }
}


class LoginButton extends React.Component {
    render() {
        return <button id="login-button" onClick={this.props.onClick}>Log In</button>;
    }
}

class SignUpButton extends React.Component {
    render() {
        return <button id="sign-up-button" onClick={this.props.onClick}>Sign Up</button>;
    }
}

export class NotLoggedIn extends React.Component {
    render() {
        return (
            <div id="not-logged-in-container">
                <LoginButton onClick={this.props.onClick}/>
                <SignUpButton onClick={this.props.onClick}/>
            </div>
        )
    }
}