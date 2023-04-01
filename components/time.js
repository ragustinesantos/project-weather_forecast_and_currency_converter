import React from "react";
import sunrise from "../static files/sunrise (1).png"
import sunset from "../static files/sunset (1).png"
import moment from "moment-timezone";

export default function Time(props) {

    const [currentTime, setCurrentTime] = React.useState("")

    React.useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime((new Date()).toLocaleTimeString("en-US", {
                timeZone: props.timezone
            }))
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    },[props.timezone]);

    return (
        <div className="quadThree--container">
            <div className="quadThree--time">
                {currentTime}
            </div>
            <div className="quadThree--sun">
                <div className="quadThree--sunRise">
                    <img className="sunriseImg sunImg" src={sunrise} alt="sunrise" />
                    <span>{props.sunrise}</span>
                </div>
                <div className="quadThree--sunSet">
                    <img className="sunsetImg sunImg" src={sunset} alt="sunset" />
                    <span>{props.sunset}</span>
                </div>
            </div>
        </div>
    )
}