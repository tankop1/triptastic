import React from "react";
import './hotelDashboardComponents.css'

export class HotelDashboard extends React.Component {
    render() {
        return (
            <div id="hotel-dashboard-container">
                <div id="hotel-coming-soon">
                    <h3 id="hotel-coming-soon-title">Quickly and easily book a hotel at your destination<br/>(Coming soon)</h3>
                    <a href="#" id="hotel-coming-soon-button">Sign up for free to be notified of new features</a>
                </div>
            </div>
        );
    }
}