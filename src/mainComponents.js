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
                {this.props.loggedIn && <AccountInfo/>}
                {!this.props.loggedIn && <NotLoggedIn/>}
            </header>
        );
    }
}

export class Main extends React.Component {
    render() {
        return (
            <main>
                <div id="tabs">
                    <Tab id="1" selected={true} title="Triptastic Search"/>
                    <Tab id="2" title="Flight Booker"/>
                    <Tab id="3" title="Hotel Booker"/>
                    <Tab id="4" title="Travel Bucket List"/>
                </div>
                <Dashboard location={this.props.location}/>
            </main>
        );
    }
}

class Tab extends React.Component {   
    tabClicked(e) {
        let tabItems = [document.getElementById('tab1'), document.getElementById('tab2'), document.getElementById('tab3'), document.getElementById('tab4')];
        let tabItem = e.target;
        //const mainApp = document.getElementById('react-app-container');
        //const lastChar = e.target.id[e.target.id.length - 1];

        if (e.target.className === 'tab-title') {
            tabItem = e.target.parentElement;
        }

        for (let i = 0; i < tabItems.length; i++) {
            tabItems[i].classList.remove('selected-tab');
        }

        tabItem.classList.add('selected-tab');

        /*mainApp.classList.remove('background1');
        mainApp.classList.remove('background2');
        mainApp.classList.remove('background3');
        mainApp.classList.remove('background4');

        mainApp.classList.add('background' + lastChar);
        console.log(mainApp.classList);*/
    }

    render() {
        return (
            <div id={'tab' + this.props.id} className={this.props.selected ? 'selected-tab tab-container' : 'tab-container'} onClick={this.tabClicked}>
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