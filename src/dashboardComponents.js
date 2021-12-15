import React from 'react';
import './dashboardComponents.css';
import foursquareLogo from './powered-by-foursquare-removebg-preview.png'; // This image was taken from Foursquare, and the background was removed using remove.bg

// I have removed the api keys from the endpoints below. To get your own credentials, go to the website commented to the right of the desired endpoint.

const mapEndpoint = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD9Jj7nefkF_Py11IlyQFQ3EfE9bNTK4wc&q='; // https://developers.google.com/maps/documentation/embed/get-started
const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?appid=d1abe5f16eb3b088a68ad6db06805101&q='; // https://openweathermap.org/api
const timeEndpoint = 'https://api.ipgeolocation.io/timezone?apiKey=61a1e64675f24901966598ed0b785ccc&location='; // https://ipgeolocation.io/timezone-api.html
const yelpEndpoint = 'https://api.foursquare.com/v2/venues/explore?client_id=IYH3OLP3TP0KINTE1WALOACGWEBTRX2IXANEHKUM5AU3SKSJ&client_secret=PX4VE1B4VFFEECGDDC25150M5O12H01NJJE3USLYEPLELU53&v=20180323&near='; // THIS IS NOT ACTUALLY THE YELP API, IT IS THE FOURSQUARE API: https://developer.foursquare.com/

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let temperature;
let conditions;
let weatherIcon;

let currentTime;
let timeZone;
let isDST;
let intervalID;

let venues;

async function getForecast(param) {
    try {
        const response = await fetch(weatherEndpoint + param);
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
            currentTime = jsonResponse.date_time.slice(11);
            timeZone = jsonResponse.timezone;
            isDST = jsonResponse.is_dst;
        }
    } catch (error) {
        //console.log(error);
    }
}

async function getAttractions(param, extraParam) {
    try {
        const response = await fetch(yelpEndpoint + param + extraParam);
        if (response.ok) {
          const jsonResponse = await response.json();
          venues = jsonResponse.response.groups[0].items.map(item => item.venue);

        }
        //throw new Error('Request failure!');
    } catch (error) {
        //console.log(error);
    }
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0); // Function taken from www.stackoverflow.com

export class MapNode extends React.Component {
    render() {
        return (
            <div id="map-container">
                {this.props.param && <iframe id="map"
                    loading="lazy"
                    allowFullScreen
                    src={mapEndpoint + this.props.param}>
                    </iframe>}
                {!this.props.param && <div id="map-loading">
                    <i className="fas fa-map-marked-alt" id="map-loading-icon"></i>
                </div>}
            </div>
        );
    }
}

export class WeatherNode extends React.Component {

    componentDidUpdate() {
        getForecast(this.props.param);
    }

    render() {
        if (temperature && this.props.param) {
            return (
                <div id="weather-container">
                    <h4 id="date">{weekDays[(new Date()).getDay()]},&nbsp;{`${Date()}`.slice(4,15)}</h4>
                    <h3 id="location">Weather for {this.props.param}</h3>
                    <img id="weather-img" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon"/>
                    <h1 id="temperature">{temperature}&deg;F</h1>
                    <h4 id="conditions">The current weather includes {conditions}</h4>
                </div>
            );
        } // image was taken from openweathermap.org as part of the Open Weather API
        else {
            return (
                <div id="weather-container">
                    <div id="weather-loading-container">
                        <div id="weather-loading-title"></div>
                        <div className="weather-loading-text"></div>
                        <div id="weather-loading-temp"></div>
                        <div className="weather-loading-text"></div>
                        <div className="weather-loading-text"></div>
                    </div>
                </div>
            );
        }
    }
}

export class AttractionsNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'family',
            page: 1
        }
        this.changeCategory = this.changeCategory.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    changeCategory(e) {
        let controlItems = document.querySelectorAll('.control');
        let controlItem = e.target;

        for (let i = 0; i < controlItems.length; i++) {
            controlItems[i].classList.remove('selected-category');
        }

        controlItem.classList.add('selected-category');

        this.setState({
            category: controlItem.id
        });

        this.setState({
            page: 1
        });
    }

    handleBack() {
        if (this.state.page !== 1) {
            this.setState({
                page: (this.state.page - 4)
            });
        }
    }

    handleNext() {
        if (this.state.page < 45) {
            this.setState({
                page: (this.state.page + 4)
            });
        }
    }

    handlePage(pageNum) {
        this.setState({
            page: (((pageNum - 1) * 4) + 1)
        });
    }

    componentDidUpdate() {
        if (this.state.category === 'family') {
            getAttractions(this.props.param, '&categoryId=4d4b7104d754a06370d81259');
        }

        else if (this.state.category === 'outdoors') {
            getAttractions(this.props.param, '&categoryId=4d4b7105d754a06377d81259');
        }

        else if (this.state.category === 'restaurants') {
            getAttractions(this.props.param, '&categoryId=4d4b7105d754a06374d81259');
        }

        //else if (this.state.category === 'other') {
        //    getAttractions(this.props.param, '&query' + document.getElementById('query').value);
        //} STILL WORKING ON "OTHER" CATEGORY
    }

    render() {
        if (venues && this.props.param) {
            if (venues[0]) {
                return (
                    <div id="attractions-container">
                        <ControlBar other={this.state.category === 'other' ? true : false} onClick={this.changeCategory}/>
                        <div id="results-container">
                            <Attraction name={venues[this.state.page - 1].name} address={venues[this.state.page - 1].location.address} category={venues[this.state.page - 1].categories[0].name} icon={venues[this.state.page - 1].categories[0].icon.prefix + 'bg_64' + venues[this.state.page - 1].categories[0].icon.suffix}/>
                            <Attraction name={venues[this.state.page].name} address={venues[this.state.page].location.address} category={venues[this.state.page].categories[0].name} icon={venues[this.state.page].categories[0].icon.prefix + 'bg_64' + venues[this.state.page].categories[0].icon.suffix}/>
                            <Attraction name={venues[this.state.page + 1].name} address={venues[this.state.page + 1].location.address} category={venues[this.state.page + 1].categories[0].name} icon={venues[this.state.page + 1].categories[0].icon.prefix + 'bg_64' + venues[this.state.page + 1].categories[0].icon.suffix}/>
                            <Attraction name={venues[this.state.page + 2].name} address={venues[this.state.page + 2].location.address} category={venues[this.state.page + 2].categories[0].name} icon={venues[this.state.page + 2].categories[0].icon.prefix + 'bg_64' + venues[this.state.page + 2].categories[0].icon.suffix}/>
                            <BottomControl onBack={this.handleBack} onNext={this.handleNext} onOne={() => this.handlePage(1)} onTwo={() => this.handlePage(2)} onThree={() => this.handlePage(3)} onFour={() => this.handlePage(4)} onFive={() => this.handlePage(5)} onSix={() => this.handlePage(6)}/>
                        </div>
                    </div>
                );
            }

            else {
                return (
                    <div id="attractions-container">
                        <ControlBar other={false} onClick={this.changeCategory}/>
                        <div id="results-container">
                            <LoadingAttraction/>
                            <LoadingAttraction/>
                            <LoadingAttraction/>
                            <LoadingAttraction/>
                        </div>
                    </div>
                );
            }
        }

        else {
            return (
                <div id="attractions-container">
                    <ControlBar other={false} onClick={this.changeCategory}/>
                    <div id="results-container">
                        <LoadingAttraction/>
                        <LoadingAttraction/>
                        <LoadingAttraction/>
                        <LoadingAttraction/>
                    </div>
                </div>
            );
        }
    }
}

class ControlBar extends React.Component {
    render() {
        return (
            <div id="control-bar">
                <div id="control-container">
                    <div id="family" className="control selected-category" onClick={this.props.onClick}>Family</div>
                    <div className="divider"></div>
                    <div id="outdoors" className="control" onClick={this.props.onClick}>Outdoors</div>
                    <div className="divider"></div>
                    <div id="restaurants" className="control" onClick={this.props.onClick}>Restaurants</div>
                    <div className="divider"></div>
                    <div id="other" className="control" onClick={this.props.onClick}>Other</div>
                </div>
                {this.props.other && <div id="other-query">
                    <input type="text" placeholder="Search categories" id="query" autoComplete="off"/>
                </div>}
            </div>
        );
    }
}

class Attraction extends React.Component {
    render() {
        return (
            <div id="attraction-container">
                <img alt="Venue Icon" src={this.props.icon} className="icon-img"/>
                <div id="info">
                    <h2 id="attraction-title">{this.props.name}</h2>
                    <h5>{this.props.category}</h5>
                    <div id="more-info">
                        <p id="address">{this.props.address}</p>
                        <p id="number">{this.props.number}</p>
                        <p id="website">{this.props.website}</p>
                    </div>
                </div>
            </div>
        );
    }
}

class LoadingAttraction extends React.Component {
    render() {
        return (
            <div id="loading-attraction">
                <div id="loading-img"></div>
                <div id="loading-info">
                    <div id="loading-title"></div>
                    <div className="loading-text"></div>
                    <div className="loading-text"></div>
                </div>
            </div>
        );
    }
}

class BottomControl extends React.Component {
    render() {
        return (
            <div id="bottom-container">
                <div id="page-control">
                    <div id="back" onClick={this.props.onBack}>&lt;</div>
                    <div id="next" onClick={this.props.onNext}>&gt;</div>
                </div>
                <div id="pages">
                    <div className="page-button" onClick={this.props.onOne}>1</div>
                    <div className="page-button" onClick={this.props.onTwo}>2</div>
                    <div className="page-button" onClick={this.props.onThree}>3</div>
                    <div className="page-button" onClick={this.props.onFour}>4</div>
                    <div className="page-button" onClick={this.props.onFive}>5</div>
                    <div className="page-button" onClick={this.props.onSix}>6</div>
                    <div className="page-button" id="see-all">See All</div>
                </div>
                <a href="https://foursquare.com/" target="_blank" id="foursquare-link"><div id="foursquare-container">
                    <div id="foursquare-text-container">
                        <p className="foursquare-text">Powered By</p>
                        <p className="foursquare-text">Foursquare</p>
                    </div>
                    <img src={foursquareLogo} alt="Powered By Foursquare" id="foursquare-logo"/>
                </div></a>
            </div>
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
        if (timeZone && this.props.param) {
            return (
                <div id="time-container">
                    <div className="clock">
                        <div className="dot"></div>
                        <div>
                            <div className="hour-hand"></div>
                            <div className="minute-hand"></div>
                            <div className="second-hand"></div>
                        </div>
                        <div>
                            <span className="h3">3</span>
                            <span className="h6">6</span>
                            <span className="h9">9</span>
                            <span className="h12">12</span>
                        </div>
                        <div className="diallines"></div>
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
                    <div id="time-loading-container">
                        <div id="time-loading-clock"></div>
                        <div id="time-loading-time"></div>
                        <div className="time-loading-text"></div>
                        <div className="time-loading-text"></div>
                    </div>
                </div>
            );
        }
    }
}
