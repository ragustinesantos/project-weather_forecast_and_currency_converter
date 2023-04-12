import React from "react";
import Today from '../components/day';
import Forecast from "../components/temperature";
import Weather from "../components/weather";
import Time from "../components/time";

export default function Current(props) {

    const weatherDetails = props.weatherDetails
  
    return (
      <div className="current--container">
        <div className="current--top">
            <div className="current--quadOne quad">
                <Today 
                country={weatherDetails.country}
                city={weatherDetails.city}
                date={weatherDetails.date}
                />
            </div>
            <div className="current--quadTwo quad">
                <Weather 
                condition={weatherDetails.condition}
                />
            </div>
            </div>
            <div className="current--bottom">
            <div className="current--quadThree quad">
                <Time 
                sunrise={weatherDetails.sunrise}
                sunset={weatherDetails.sunset}
                timezone={weatherDetails.timezone}
                country={weatherDetails.country}
                />
            </div>
            <div className="current--quadFour quad">
                <Forecast 
                celsius={weatherDetails.celsius}
                farenheit={weatherDetails.farenheit}
                condition={weatherDetails.condition}
                />
            </div>
        </div>
      </div>
    )
  }