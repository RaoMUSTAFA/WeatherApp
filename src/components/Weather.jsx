import React, { useEffect, useRef, useState } from 'react'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import find from '../assets/find.png'
import humid from '../assets/humid.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import './Weather.css'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '03n': cloud,
    '04d': rain,
    '04n': rain,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '13d': snow,
    '13n': snow,
  }
  const search = async (city)=>{
    if(city == ""){
      alert("Enter City Name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon= allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        wwindSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
      
    }
  }

  useEffect(() =>{
    search('Lahore')
  },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={find} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
    
    <img src={weatherData.icon} alt="" className='weather-icon'/>
    <p className='temperature'>{weatherData.temperature}°c</p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
      <div className="col">
        <img src={humid} alt="" />
        <div>
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className="col">
        <img src={wind} alt="" />
        <div>
          <p>{weatherData.wwindSpeed}km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Weather
