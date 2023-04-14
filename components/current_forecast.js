import React from "react";
import Today from '../components/day';
import Forecast from "../components/temperature";
import Weather from "../components/weather";
import Time from "../components/time";
import Future from "./forecast_card";

export default function Current() {

    const [location, setLocation] = React.useState("");
    const [search, setSearch] = React.useState({location: ""});
    const [weatherDetails, setWeatherDetails] = React.useState({});
    const [forecast, setForecast] = React.useState([]);
  
    // Default location for weather forecast = based on user IP
    React.useEffect(() => {

        fetch('https://api.ipregistry.co/?key=8cc86xe2qhpclo6g&pretty=true')
        .then(res => res.json())
        .then(data => setLocation(data.location.country.name));

    },[]);

    // Retrieve current weather data for location set in state
    React.useEffect(() => {

        fetch(`http://api.weatherapi.com/v1/forecast.json?key=594f3355ab1249b495714846232703&q=${location}&days=1&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => setWeatherDetails({
            country: data.location.country,
            city: data.location.name,
            celsius: data.current.temp_c,
            farenheit: data.current.temp_f,
            condition: data.current.condition.text,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            sunset: data.forecast.forecastday[0].astro.sunset,
            date: data.forecast.forecastday[0].date,
            timezone: data.location.tz_id
        }))

    }, [location])

    // Retrieve weather forecast for the next 6 days
    React.useEffect(() => {

        fetch(`http://api.weatherapi.com/v1/forecast.json?key=594f3355ab1249b495714846232703&q=${location}&days=7&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => data.forecast.forecastday)
        .then(forecastday => setForecast(forecastday.slice(1).map(day => {
            return {
                date: day.date,
                celsius: day.day.avgtemp_c,
                farenheit: day.day.avgtemp_f,
                condition: day.day.condition.text,
            }
        })))

    }, [location])

    // Function that stores text typed in input box in search state
    function handleLocation(event) {
        const {name, value} = event.target
        setSearch({
            [name]: value
        })
    }

    // Function that sets what's written in the input box as the location
    function searchLocation() {
        setLocation(search.location)
    }

    // Render Future component based on the available date in forecast state
    const renderFuture = forecast.map(data => 
        <Future
            date={data.date}
            celsius={data.celsius}
            farenheit={data.farenheit}
            condition={data.condition}
        />)

    return (
    
        <div className="current--body">
            <div className="currency--title">
                <span>Weather Forecast</span>
            </div>
            <div className="app--search">
                <input 
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={search.location}
                    onChange={handleLocation}
                />
                <button 
                    onClick={searchLocation}
                    className="current--searchButton"
                > Search 
                </button>
            </div>
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
            <div className="app--forecast">
                {renderFuture}
            </div>
        </div>

    )
  }