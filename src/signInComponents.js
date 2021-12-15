import React from 'react';
import './signInComponents.css';
import logo from './triptastic-logo-pink-removebg-preview.png'; // Logo and favicon were made by myself with the Canva Logo Maker
import googleLogo from './google-index-removebg-preview.png'; // This image was taken from the Google website

export class SignIn extends React.Component {
    render() {
        return (
            <div className="shader">
                <div className="sign-in-container">
                    <div id="sign-in-top">
                        <img src={logo} alt="Form Logo" id="form-logo"/>
                        <div id="exit-sign-in" onClick={this.props.onClick}>&times;</div>
                    </div>
                    <div id="form">
                        {this.props.button === 'sign-up' && <SignUpForm onClick={this.props.onClick} onSubmit={this.props.onSubmit}/>}
                        {this.props.button === 'log-in' && <LogInForm onClick={this.props.onClick} onSubmit={this.props.onSubmit}/>}
                    </div>
                </div>
            </div>
        );
    }
}

class SignUpForm extends React.Component {
    showPassword(e) {
        e.target.classList.toggle('fa-eye-slash');
        
        let passwordInput = document.getElementById('password-log-in');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        }
        else {
            passwordInput.type = 'password';
        }
    }

    render() {
        return (
            <form id="sign-up-form">
                <input type="text" className="input-field" id="first-name" placeholder="First Name"/>
                <input type="text" className="input-field" id="last-name" placeholder="Last Name"/>
                <input type="email" className="input-field" id="email-sign-up" placeholder="Email"/>
                <div className="password-container input-field">
                    <input id="password-log-in" type="password" placeholder="Password" className="password"/>
                    <i className="far fa-eye show-password" onClick={this.showPassword}></i>
                </div>
                <div id="submit-container">
                    <button type="submit" className="sign-in-button" onClick={this.props.onSubmit}>Sign Up</button>
                    <button type="submit" className="google-button" id="sign-up-google"><img src={googleLogo} alt="Google Logo" className="google-logo"/>Sign Up With Google</button>
                </div>
                <a href="#" className="sign-in-link" id="link-to-log-in" onClick={this.props.onClick}>Already have an account? Log in here</a>
            </form>
        );
    }
}

class LogInForm extends React.Component {
    showPassword(e) {
        e.target.classList.toggle('fa-eye-slash');
        
        let passwordInput = document.getElementById('password-log-in');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        }
        else {
            passwordInput.type = 'password';
        }
    }

    render() {
        return (
            <form id="log-in-form">
                <input id="email-log-in" className="input-field" type="email" placeholder="Email"/>
                <div className="password-container input-field">
                    <input id="password-log-in" type="password" placeholder="Password" className="password"/>
                    <i className="far fa-eye show-password" onClick={this.showPassword}></i>
                </div>
                <button type="submit" className="sign-in-button" onClick={this.props.onSubmit}>Log In</button>
                <button type="submit" className="google-button" id="log-in-google"><img src={googleLogo} alt="Google Logo" className="google-logo"/>Log In With Google</button>
                <a href="#" className="sign-in-link" id="link-to-sign-up" onClick={this.props.onClick}>Don't have an account? Sign up here</a>
            </form>
        );
    }
}