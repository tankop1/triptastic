import React from "react";
import './flightDashboardComponents.css'

export class FlightDashboard extends React.Component {
    render() {
        return (
            <div id="flight-dashboard-container">
                <div id="flight-coming-soon">
                    <h3 id="flight-coming-soon-title">Quickly and easily book a flight to your destination<br/>(Coming soon)</h3>
                    <a href="#" id="flight-coming-soon-button">Sign up for free to be notified of new features</a>
                </div>
            </div>
        );
    }
}