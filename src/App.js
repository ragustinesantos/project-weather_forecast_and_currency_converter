import React from "react";
import "./App.css";
import Navbar from "../components/navbar";
import Current from "../components/current_forecast";
import Future from "../components/forecast_card";
import Currency from "../components/currency";
import cloudy from "../static files/sunny_bg.png";
import overcast from "../static files/overcast_bg_2.jpg";
import sunny from "../static files/sunny_bg_2.jpg";
import rainy from "../static files/rain_bg.jpg";
import snow from "../static files/snow_bg.jpg";
import freeze from "../static files/freeze_bg.jpg";
import drizzle from "../static files/drizzle_bg.jpg";
import storm from "../static files/storm_bg.jpg";



function App() {

  // State
  const [location, setLocation] = React.useState("");
  const [weatherDetails, setWeatherDetails] = React.useState({});
  const [feature, setFeature] = React.useState("weather");
  const [home, setHome] = React.useState(true)
  const [weather, setWeather] = React.useState(true)
  const [currency, setCurrency] = React.useState(false)
  console.log(weather)

  // Weather Conditions
  const cloudCondition = ["Cloudy", "Partly cloudy"]
  const sunCondition = ["Sunny", "Clear"]
  const rainCondition = ["Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Moderate or heavy freezing rain", "Moderate or heavy rain shower", "Torrential rain shower", "Heavy freezing drizzle"]
  const drizzleCondition = ["Patchy rain possible", "Patchy freezing drizzle possible", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Patchy light rain", "Light rain", "Light freezing rain", "Light rain shower"]
  const overcastCondition = ["Overcast", "Fog", "Mist"]
  const snowCondition = ["Patchy snow possible", "Patchy sleet possible", "Blowing snow", "Light sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Light snow showers", "Light sleet showers", "Light showers of ice pellets"]
  const freezeCondition = ["Blizzard", "Freezing fog", "Moderate or heavy sleet", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets"]
  const stormCondition = ["Thundery outbreaks possible", "Patchy light rain with thunder", "Moderate or heavy rain with thunder", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"]

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

  // Set which feature is enabled
  React.useEffect(() => {

    if (feature == "weather") {
      setWeather(true)
      setCurrency(false)
      setHome(false)
    } else if (feature == "currency") {
      setCurrency(true)
      setWeather(false)
      setHome(false)
    } else {
      setHome(true)
      setWeather(false)
      setCurrency(false)
    }

  }, [feature])

  // Conditional rendering of background image based on weather condition
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

  function handleWeather() {
    setFeature("weather")
    console.log(feature)
  }

  function handleCurrency() {
    setFeature("currency")
    console.log(feature)
  }

  // App display
  return (

    <body style={styleBackground()}>

      {/* Navbar */}
      <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
              <a class="navbar-brand" href="#">Trippet</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                      <a class="nav-link" aria-current="page" href="#">Home</a>
                      <a class="nav-link" onClick={handleWeather} href="#">Weather</a>
                      <a class="nav-link" onClick={handleCurrency} href='#'>Currency</a>
                  </div>
              </div>
          </div>
      </nav>

      <div className="app--container" >
        <div>
          {weather ? <Current /> : <Currency />}
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