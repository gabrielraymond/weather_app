import axios from 'axios';
import React, { useState , useEffect} from 'react'

function Weather() {

    const [weather, setWeather] = useState([])
    const [temp, setTemp] = useState("")
    const [city, setCity] = useState("London");
    const [inputCity, setInputCity] = useState("");
    const [img, setimg] = useState("");

    const API_key = 'f061aab66815a4503a9fdca97508462a';

    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
            .then(res => {
                console.log(res);
                setWeather(res.data);
                setTemp(res.data.main);
                setimg(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`);
            })
            .catch(err => {
                console.log(err)
            })
    }, [city])

    console.log(weather)

    function handleClick(event){
        event.preventDefault()
        setCity(inputCity)
    }

    return (
        <div >
            <h1>Weather App</h1>
            
            <form onSubmit={handleClick}>
                <input type="text" value={inputCity} placeholder="City" onChange={event => setInputCity(event.target.value)} />
                <button>
                    go
                </button>
            </form>
            
            <div className="weather-card">
                <h1>{weather.name}</h1>
                <img src={img} alt="weather icon" className="imgcss" />
                <h2>Temperature {`${Math.floor(temp.temp - 273.15)}° C`}</h2>
                <h2>Max {`${Math.floor(temp.temp_max - 273.15)}° C`}</h2>
                <h2>Min {`${Math.floor(temp.temp_min - 273.15)}° C`}</h2>
                <h2>Humidity {temp.humidity} %</h2>            
            </div>
            
        </div>
    )
}

export default Weather
