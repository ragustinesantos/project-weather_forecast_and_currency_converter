import React from "react";
import moment from "moment-timezone";
import cloudy from "../static files/cloudy_no_bg.gif"
import overcast from "../static files/overcast_no_bg.gif"
import sunny from "../static files/sunny_no_bg.gif"
import rainy from "../static files/rain_no_bg.gif"
import snow from "../static files/snow_no_bg.gif"
import freeze from "../static files/freeze_no_bg.gif"
import drizzle from "../static files/drizzle_no_bg.gif"
import storm from "../static files/storm_no_bg.gif"

export default function Future(props) {

    const day = moment(props.date).format('dddd')
    const date = moment(props.date).format('ll')

    const cloudCondition = ["Cloudy", "Partly cloudy"]
    const sunCondition = ["Sunny", "Clear"]
    const rainCondition = ["Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Moderate or heavy freezing rain", "Moderate or heavy rain shower", "Torrential rain shower", "Heavy freezing drizzle"]
    const drizzleCondition = ["Patchy rain possible", "Patchy freezing drizzle possible", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Patchy light rain", "Light rain", "Light freezing rain", "Light rain shower"]
    const overcastCondition = ["Overcast", "Fog", "Mist"]
    const snowCondition = ["Patchy snow possible", "Patchy sleet possible", "Blowing snow", "Light sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Light snow showers", "Light sleet showers", "Light showers of ice pellets"]
    const freezeCondition = ["Blizzard", "Freezing fog", "Moderate or heavy sleet", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets"]
    const stormCondition = ["Thundery outbreaks possible", "Patchy light rain with thunder", "Moderate or heavy rain with thunder", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"]

    function weatherCondition() {
        if (cloudCondition.includes(props.condition))  {
            return cloudy
        } else if (sunCondition.includes(props.condition)) {
            return sunny
        } else if (rainCondition.includes(props.condition)) {
            return rainy
        } else if (overcastCondition.includes(props.condition)) {
            return overcast
        } else if (drizzleCondition.includes(props.condition)) {
            return drizzle
        } else if (snowCondition.includes(props.condition)) {
            return snow
        } else if (freezeCondition.includes(props.condition)) {
            return freeze
        } else if (stormCondition.includes(props.condition)) {
            return storm
        }
    }

    return (
        <div className="future--container">
            <div className="future--left">
                <div className="future--top--left futureLeft">
                    <div className="future--day">{day}</div>
                    <div className="future--date">{date}</div>
                </div>
                <div className="future--bottom--left futureLeft">
                    <img src={weatherCondition()} alt="Weather Condition" width="50px" />
                </div>
            </div>
            <div className="future--right">
                <div className="future--celsius">{props.celsius}°C</div>
                <div className="future--farenheit">{props.farenheit}°F</div>
                <div className="future--condition">{props.condition}</div>
            </div>
        </div>

    )
}