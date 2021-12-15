import './accountInfo.css';
import React from 'react';

export class ProfileImage extends React.Component {
    render() {
        return (
            <div id="profile-image-container" onClick={this.props.addProfile}>
                <img id="profile-image" src={this.props.src ? this.props.src : "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"} alt={this.props.fullName}/>
            </div>
        );
    }
} // "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640" image taken from Word Press

export class ProfileDropdown extends React.Component {
    render() {
        return (
            <div id="profile-dropdown-container">
                <div id="profile-dropdown-info-container">
                    <img src={this.props.src ? this.props.src : "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"} alt="Profile Icon" id="profile-dropdown-icon"/>
                    <h4 id="profile-name">Tanner Kopel</h4>
                    <p id="profile-email">tanner@kopelfamily.com</p>
                </div>
                <hr className="profile-divider"/>
                    <div id="profile-dropdown-item-container">
                    <div className="profile-dropdown-item"><i className="far fa-user profile-dropdown-item-icon"></i>Profile</div>
                    <div className="profile-dropdown-item"><i className="fas fa-cog profile-dropdown-item-icon"></i>Settings</div>
                    <div className="profile-dropdown-item"><i className="far fa-question-circle profile-dropdown-item-icon"></i>Help Center</div>
                    <div className="profile-dropdown-item" onClick={this.props.onClick}><i className="fas fa-sign-out-alt profile-dropdown-item-icon"></i>Logout</div>
                </div>
                <hr className="profile-divider"/>
                <div id="terms-container">
                    <div className="term-item">Terms and Conditions</div>
                    <div className="term-item">Privacy Policy</div>
                </div>
            </div>
        );
    }
}

export class NotificationsButton extends React.Component {
    render() {
        return (
            <div id="notifications-button-container" onClick={this.props.addNotifications}>
                <i className="far fa-bell" id="notifications-icon"></i>
            </div>
        );
    }
}

export class NotificationsDropdown extends React.Component {
    render() {
        return (
            <div id="notifications-dropdown-container">
                {!this.props.notifications && <div id="no-notifications-container"><i className="far fa-bell-slash" id="no-notification-icon"></i><p id="no-notification">You have no new notifications</p></div>}
            </div>
        );
    }
}