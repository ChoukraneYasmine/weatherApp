import React from 'react';
import "./WeatherApp.css"
import { useState } from 'react';
import searchIcon from '../assets/search.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'
import clearIcon from "../assets/clear.png"
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'


function WeatherApp() {
   
  let [image,setImage]=useState(clearIcon)
  let [temp,setTemp]=useState("23 °C")
  let [location,setLocation]=useState("London")
  let [humidity,setHumidity]=useState("")
  let [wind,setWind]=useState("")
  console.log({image})
  let apiKey="5fa88b426923c693dd4e391da34e9567"
  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];
    const cityName = element.value.trim();
  
    if (!cityName) {
      return 0; 
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        setHumidity(data.main.humidity+" %");
        setWind(data.wind.speed+" km/h");
        setTemp(data.main.temp +" °C");
        setLocation(data.name);
        if (data.weather[0].icon==="01d"|| data.weather[0].icon==="01n"){
            setImage(clearIcon)
        }else if (data.weather[0].icon==="02d"|| data.weather[0].icon==="02n"){
            setImage(cloudIcon)
        }else if (data.weather[0].icon==="03d"|| data.weather[0].icon==="03n"){
            setImage(drizzleIcon)
        }else if (data.weather[0].icon==="09d"|| data.weather[0].icon==="09n"){
            setImage(rainIcon)
        }else if (data.weather[0].icon==="10d"|| data.weather[0].icon==="10n"){
            setImage(rainIcon)
        }else if (data.weather[0].icon==="13d"|| data.weather[0].icon==="13n"){
            setImage(snowIcon)
        }else {setImage(clearIcon)}

      } else {
        console.error('API request failed:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
    return (
        <><div className="container">
            <div className="topBar">
                <input className="cityInput" placeholder="Search"></input> 
                <div className="searchIcon" onClick={()=>{search()}}>
                <img src={searchIcon} alt=""/>  
                </div>
                </div>
                <div className="weatherImage">
                    <img src={image} alt="" />
                </div>
                <div className="temp">{temp}</div>
                <div className="location">{location}</div>
                <div className="dataContainer">
                    <div className="element">
                        <img src={humidityIcon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity">{humidity}</div>
                            <div className="text">Humidity</div>
                        </div>
                    
                       
                    </div>
                    <div className="element">
                        <img src={windIcon} alt="" className="icon"/>
                        <div className="data">
                            <div className="wind">{wind}</div>
                            <div className="text">wind Speed</div>
                        </div>
                    
                       
                    </div>
                </div>
            

        </div></>
    )
}

export default WeatherApp;