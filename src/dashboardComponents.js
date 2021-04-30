import React from 'react';
import './dashboardComponents.css';

const mapEndpoint = 'https://www.google.com/maps/embed/v1/place?key=GET_YOUR_OWN_API_KEY&q=';
const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?appid=GET_YOUR_OWN_API_KEY&q=';
const timeEndpoint = 'https://timezone.abstractapi.com/v1/current_time/?api_key=GET_YOUR_OWN_API_KEY&location=';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let temperature;
let conditions;
let weatherIcon;

let currentTime;
let timeZone;
let isDST;
let intervalID;

async function getForecast(param) {
    try {
        const response = await fetch(weatherEndpoint + param);
        console.log('RESPONSE: ' + response);
        if (response.ok) {
            const jsonResponse = await response.json();
            temperature = kelvinToFahrenheit(jsonResponse.main.temp);
            conditions = jsonResponse.weather[0].description;
            weatherIcon = jsonResponse.weather[0].icon;
        }
        //throw new Error('Request failure!');
    } catch (error) {
        //console.log(error);
    }
}

async function getTimeZone(param) {
    try {
        const response = await fetch(timeEndpoint + param);
        if (response.ok) {
            const jsonResponse = await response.json();     
            currentTime = jsonResponse.datetime.slice(11);
            timeZone = jsonResponse.timezone_location + ' (' + jsonResponse.timezone_abbreviation + ')';
            isDST = jsonResponse.is_dst;
        }
    } catch (error) {
        //console.log(error);
    }
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

export class MapNode extends React.Component {
    render() {
        return (
            <div id="map-container">
                <iframe id="map"
                    loading="lazy"
                    allowFullScreen
                    src={mapEndpoint + this.props.param}>
                </iframe>
            </div>
        );
    }
}

export class WeatherNode extends React.Component {

    componentDidUpdate() {
        getForecast(this.props.param);
    }

    render() {
        if (temperature) {
            return (
                <div id="weather-container">
                    <h4 id="date">{weekDays[(new Date()).getDay()]},&nbsp;{`${Date()}`.slice(4,15)}</h4>
                    <h3 id="location">Weather for {this.props.param}</h3>
                    <img id="weather-img" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon"/>
                    <h1 id="temperature">{temperature}&deg;F</h1>
                    <h4 id="conditions">The current weather includes {conditions}</h4>
                </div>
            );
        }
        else {
            return (
                <div id="weather-container">
                    <div id="weather-loading-container">
                        <h2 id="weather-loading-title">Waiting...</h2>
                        <i id="spinner" className="fas fa-spinner"></i>
                    </div>
                </div>
            );
        }
    }
}

export class AttractionsNode extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

export class TranslaterNode extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

export class TimeNode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: getTimeZone(this.props.param)
        };
        this.incrementTime = this.incrementTime.bind(this);
    }

    incrementTime() {
        let hours = parseInt(currentTime.slice(0, 2));
        let minutes = parseInt(currentTime.slice(3, 5));
        let seconds = parseInt(currentTime.slice(6, 8));

        /*if (hours > 12) {
            hours -= 12;
        } CHANGES MILITARY TIME TO NORMAL TIME*/
    
        if (seconds++ > 59) {
            seconds = 0;
            minutes++;
    
            if (minutes > 59) {
                minutes = 0;
                hours++;
    
                if (hours > 12) {
                    hours = 1;
                }
            }
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        let newTime = hours + ':' + minutes + ':' + seconds;
        currentTime = newTime;

        this.setState({
            time: newTime
        });
    }

    componentDidUpdate() {
        getTimeZone(this.props.param);

        if (currentTime) {
            if (intervalID) {
                clearInterval(intervalID);
            }

            intervalID = setInterval(this.incrementTime, 1000);
        }
    }

    render() {
        if (timeZone) {
            return (
                <div id="time-container">
                    <div class="clock">
                        <div class="dot"></div>
                        <div>
                            <div class="hour-hand"></div>
                            <div class="minute-hand"></div>
                            <div class="second-hand"></div>
                        </div>
                        <div>
                            <span class="h3">3</span>
                            <span class="h6">6</span>
                            <span class="h9">9</span>
                            <span class="h12">12</span>
                        </div>
                        <div class="diallines"></div>
                    </div>
                    <div id="clock-space" height="250px"></div>
                    <div id="time-info">
                        <h2>{currentTime}</h2>
                        <h6 id="timezone">{timeZone}</h6>
                        {isDST && <h6 className="dst">Currently experiencing Daylight Savings Time</h6>}
                        {!isDST && <h6 className="dst">Currently not experiencing Daylight Savings Time</h6>}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id="time-container">
                    <div id="weather-loading-container">
                        <h3 id="weather-loading-title">Waiting...</h3>
                        <i id="spinner" className="fas fa-spinner"></i>
                    </div>
                </div>
            );
        }
    }
}

// CLOCK DRAWING AND SETTING
