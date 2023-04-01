import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div>MyTravelPartner</div>
            <div className="navlink">
                <div className="navWeather">Weather</div>
                <div className="navCurrency">Currency</div>
            </div>
        </nav>
    )
}