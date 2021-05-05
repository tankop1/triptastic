import './mainComponents.css';
import React from 'react';
import { NotLoggedIn, SearchBar, Logo, AccountInfo } from './headerComponents';
import { MapNode, WeatherNode, AttractionsNode, TranslaterNode, TimeNode } from './dashboardComponents';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <Logo/>
                <SearchBar onChange={this.props.onChange} location={this.props.location}/>
                {this.props.loggedIn && <AccountInfo addProfile={this.props.addProfile} addNotifications={this.props.addNotifications}/>}
                {!this.props.loggedIn && <NotLoggedIn onClick={this.props.onClick}/>}
            </header>
        );
    }
}

export class Main extends React.Component {
    render() {
        return (
            <main>
                <div id="tabs">
                    <Tab id="1" selected={true} title="Triptastic Search" onSelect={this.props.onSelect}/>
                    <Tab id="2" title="Flight Booker" onSelect={this.props.onSelect}/>
                    <Tab id="3" title="Hotel Booker" onSelect={this.props.onSelect}/>
                    <Tab id="4" title="Travel Bucket List" onSelect={this.props.onSelect}/>
                </div>
                {this.props.page === 1 && <Dashboard location={this.props.location}/>}
            </main>
        );
    }
}

class Tab extends React.Component {
    render() {
        return (
            <div id={'tab' + this.props.id} className={this.props.selected ? 'selected-tab tab-container' : 'tab-container'} onClick={this.props.onSelect}>
                <p id={'tab-title' + this.props.id} className="tab-title">{this.props.title}</p>
            </div>
        );
    }
}

class Dashboard extends React.Component {
    render() {
        //GRID LAYOUT HERE
        return (
            <div id="dashboard-container">
                <div id="left-side">
                    <MapNode param={this.props.location}/>
                    <div id="weather-time">
                        <WeatherNode param={this.props.location}/>
                        <TimeNode param={this.props.location}/>
                    </div>
                </div>
                <AttractionsNode param={this.props.location}/>
            </div>
        );
    }
}