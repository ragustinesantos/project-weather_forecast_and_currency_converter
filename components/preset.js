import React from "react";

export default function PresetCurrency(props) {

    return (

    <div className="preset--container">

        <div className="preset--top">
            <div className="preset--currency">{props.base} : {props.currency}</div>
            <div classname="preset--symbol">{props.symbol}</div>
        </div>

        <div className="preset--bottom">
            <div className="preset--rate">
                {props.baseRates[`${props.currency}`]}
            </div>
        </div>

    </div>
    
    )
}