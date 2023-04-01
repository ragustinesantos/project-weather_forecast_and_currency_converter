import React from "react";

export default function Forecast(props) {
    return (
        <div className="quadFour">
            <div className="quadFour--temperature">
                <div className="quadFour--celcius tempCat">
                    <div className="tempValue">{props.celsius}</div>
                    <div className="tempLabel">°C</div>
                </div>
                <div className="quadFour--farenheit tempCat">
                    <div className="tempValue">{props.farenheit}</div>
                    <div className="tempLabel">°F</div>
                </div>
                <div className="quadFour--weather tempCat">
                    <div className="tempValue">{props.condition}</div>
                </div>
            </div>
            <div className="quadFour--sun">
                <div className="sunRise"></div>
                <div className="sunSet"></div>
            </div>
        </div>
    )
}