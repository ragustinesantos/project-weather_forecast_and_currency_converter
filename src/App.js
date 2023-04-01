import React from "react";
import './index.css';
import Navbar from "../components/navbar";
import Current from "../components/current_forecast";
import Future from "../components/forecast_card";
import cloudy from "../static files/sunny_bg.png";
import overcast from "../static files/overcast_bg_2.jpg";
import sunny from "../static files/sunny_bg_2.jpg";
import rainy from "../static files/rain_bg.jpg";
import snow from "../static files/snow_bg.jpg";
import freeze from "../static files/freeze_bg.jpg";
import drizzle from "../static files/drizzle_bg.jpg";
import storm from "../static files/storm_bg.jpg";



function App() {

  const [location, setLocation] = React.useState("");
  const [search, setSearch] = React.useState({location: ""});
  const [weatherDetails, setWeatherDetails] = React.useState({});
  const [forecast, setForecast] = React.useState([]);
  const cloudCondition = ["Cloudy", "Partly cloudy"]
  const sunCondition = ["Sunny", "Clear"]
  const rainCondition = ["Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Moderate or heavy freezing rain", "Moderate or heavy rain shower", "Torrential rain shower", "Heavy freezing drizzle"]
  const drizzleCondition = ["Patchy rain possible", "Patchy freezing drizzle possible", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Patchy light rain", "Light rain", "Light freezing rain", "Light rain shower"]
  const overcastCondition = ["Overcast", "Fog", "Mist"]
  const snowCondition = ["Patchy snow possible", "Patchy sleet possible", "Blowing snow", "Light sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Light snow showers", "Light sleet showers", "Light showers of ice pellets"]
  const freezeCondition = ["Blizzard", "Freezing fog", "Moderate or heavy sleet", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets"]
  const stormCondition = ["Thundery outbreaks possible", "Patchy light rain with thunder", "Moderate or heavy rain with thunder", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"]
  

  React.useEffect(() => {

    fetch('https://api.ipregistry.co/?key=8cc86xe2qhpclo6g&pretty=true')
    .then(res => res.json())
    .then(data => setLocation(data.location.country.name));

  },[]);

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



  function styleBackground() {
    if (cloudCondition.includes(weatherDetails.condition))  {
      return {backgroundImage: `url(${cloudy})`}
    } else if (sunCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${sunny})`}
    } else if (rainCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${rainy})`}
    } else if (overcastCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${overcast})`}
    } else if (drizzleCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${drizzle})`}
    } else if (snowCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${snow})`}
    } else if (freezeCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${freeze})`}
    } else if (stormCondition.includes(weatherDetails.condition)) {
        return {backgroundImage: `url(${storm})`}
    } else {
      return {backgroundImage: 'none'}
    }
  }

  function handleLocation(event) {
    const {name, value} = event.target
    setSearch({
      [name]: value
    })
  }

  function searchLocation() {
    setLocation(search.location)
  }

  const renderFuture = forecast.map(data => 
    <Future
      date={data.date}
      celsius={data.celsius}
      farenheit={data.farenheit}
      condition={data.condition}
  />)


  return (
    <body style={styleBackground()}>
    <div className="app--container" >
      <Navbar />
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
      <Current 
        weatherDetails={weatherDetails}
      />
      <div className="app--forecast">
        {renderFuture}
      </div>
      <footer>
        <div>Developed by Raymond Santos</div>
        <div>©2023</div>
      </footer>
    </div>
    </body>
  )
}

export default App;