import React from "react";
import PresetCurrency from "./preset";
import trading from "../static files/trading.png"

export default function Currency() {

    // States
    const [base, setBase] = React.useState("USD")
    const [target, setTarget] = React.useState ("EUR")
    const [baseAmount, setBaseAmount] = React.useState(1)
    const [targetAmount, setTargetAmount] = React.useState(0)
    const [baseRates, setBaseRates] = React.useState({})
    const [calcRates, setCalcRates] =  React.useState({})
    const [currencies, setCurrencies] = React.useState([])

    // Currencies chosen for preset cards
    const currencyPreset = [
        {
            currency: 'JPY',
            symbol: '¥'
        },
        {
            currency: 'GBP',
            symbol: '£'
        },
        {
            currency: 'EUR',
            symbol: '€'
        },
        {
            currency: 'USD',
            symbol: '$'
        },
        {
            currency: 'CAD',
            symbol: 'C$'
        },
        {
            currency: 'AUD',
            symbol: 'A$'
        },
        {
            currency: 'CNY',
            symbol: 'CN¥'
        },
        {
            currency: 'HKD',
            symbol: 'HK$'
        }
    ]

    // Retrieve default foreign exchange rates for setting base amount for cards and set as baseRates
    // Also use as basis for retrieving and creatign an array of currency keys from api result 'dot' rates
    // Takes effect everytime a new base currency is selected
    React.useEffect(() => {

        fetch(`https://api.exchangerate.host/latest?base=${base}&places=2`)
        .then(res => res.json())
        .then(data => setBaseRates(data.rates))

        fetch(`https://api.exchangerate.host/latest?base=${base}&places=2`)
        .then(res => res.json())
        .then(data => setCurrencies(Object.keys(data.rates)))
    
    },[base]);

    // Retrieve calculated rates based on baseAmount input and set as calcRates
    // Takes effect everytime a new baseAmount is placed
    React.useEffect(() => {

        fetch(`https://api.exchangerate.host/latest?base=${base}&amount=${baseAmount}&places=2`)
        .then(res => res.json())
        .then(data => setCalcRates(data.rates))
    
    },[baseAmount, targetAmount, target, base]);


    // setTargetAmount as the calculated rate of target currency
    // Takes effect everytime the calculated rate changes
    React.useEffect(() => {

        setTargetAmount(calcRates[`${target}`])

    }, [calcRates])
    
    // Create options of currencies based on the currencies array created from the api request
    function currencySelector() {
        for (let i = 0; i < currencies.length; i++) {
            return <option value={currencies[i]}>currencies[i]</option>
        }
    }

    const selector = currencies.map(currency => {
        return <option value={currency}>{currency}</option>
    })

    // Everytime a new base is selected, setBase value as such
    function handleBase(event) {
        const {value} = event.target
        setBase(value)
    }

    // Everytime a new base is selected, setTarget value as such
    function handleTarget(event) {
        const {value} = event.target
        setTarget(value)
    }

    // Everytime a new base amount is inputted, setBaseAmount as such
    function handleBaseAmount(event) {
        const {value} = event.target
        setBaseAmount(value)
    }

    // Map out and render preset currency cards based on the number of chosen currencies in currencyPreset
    const presetCards = currencyPreset.map(currency => {
        return (
            <PresetCurrency 
            currency={currency.currency}
            symbol={currency.symbol}
            baseRates={baseRates}
            base={base}
        />)
    })

    return (
        <div>
            <div className="currency--container">
                <div className="currency--title">
                    <span>Exchange Rates</span>
                </div>
                <div className="currency--converter">
                    <div className="currency--base">
                        <div>
                            <select 
                            id="base"
                            name="base"
                            className="currency--baseSelect"
                            value={base}
                            onChange={handleBase}>

                                {selector}

                            </select>
                        </div>
                        <div className="currency--baseAmount">
                            <input 
                            type="text"
                            className="currency--baseInput"
                            name="baseAmount"
                            value={baseAmount}
                            onChange={handleBaseAmount} />
                        </div>
                    </div>
                    <div className="currency--image">
                        <img className="currency--tradingImg" src={trading} alt="trading icon"></img>
                    </div>
                    <div className="currency--target">
                        <div>
                            <select 
                            id="target"
                            name="target"
                            className="currency--targetSelect"
                            value={target}
                            onChange={handleTarget}>

                                {selector}

                            </select>
                        </div>
                        <div className="currency--targetAmount">
                            {targetAmount}
                        </div>
                    </div>
                </div>
                <div className="currency--preset">
                    <div className="currency--presetCards">{presetCards}</div>
                </div>
            </div>
        </div>
        
    )
}