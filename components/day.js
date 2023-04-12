import React from "react";
import moment from "moment-timezone";

export default function Today(props) {

    const today = moment(props.date).format('dddd');
    const date = moment(props.date).format('ll')
    
    return (
        <div className="quadOne--container">
            <div className="today--day">{today}</div>
            <div className="today--date">{date}</div>
            <div className="today--location">{props.city}, {props.country}</div>
        </div>
    )
}