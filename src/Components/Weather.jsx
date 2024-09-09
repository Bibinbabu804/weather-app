import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import search_icon from "../assets/search.png"

import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import cloud_icon from "../assets/cloud.png"
import clear_icon from "../assets/clear.png"
import snow_icon from "../assets/snow.png"
import dizzle_icon from "../assets/dizzle.png"
import rain_icon from "../assets/rain.png"



function Weather() {


const inputRef=useRef()
   const [weatherdata,setWeatherdata]=useState(false)

   
       const alllicons={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
      
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": dizzle_icon,
        "04n": dizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
       
       }
   

const search = async (city)=>{
  if(city===""){
    alert('Enter a city name')
  }

try {
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

   const responce=await fetch(url);
   const data= await responce.json()
   console.log(data);

   const icon = alllicons[data.weather[0].icon] || clear_icon;
   setWeatherdata({
    humidity: data.main.humidity,
    windspeed: data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name,
    icon: icon
})



  
} catch (error) {
  setWeatherdata(false)
  console.error('error');
  alert('No city found')
  
  
  
}

}





      useEffect(()=>{


search('kochi')





      },[])





  return (
 
    <div className="weather">
      <h1 id='head'>Weather-App</h1>
      
        <div className="search-bar">
            <input ref={inputRef} type="text"  placeholder='search'  />
        
         
             
            
            <img onClick={()=>search(inputRef.current.value)}  style={{width:"50px"}} src={search_icon} alt="" />
        </div>


 <img src={weatherdata.icon} alt="" className='weather-icon' />
 <p className='temprature'>{weatherdata.temperature}°c</p>
 <p className='location'>{weatherdata.location}</p>
 
 <div className="weather-data">
<div className="col">

<img width={'50px'} src={humidity_icon} alt="" />
<div>
<p>{weatherdata.humidity}%</p>
<span>Humidity</span>
</div>

</div>



<div className="col">

<img width={'50px'} src={wind_icon} alt="" />
<div>
<p>{weatherdata.windspeed}km/h</p>
<span>Wind Speed</span>
</div>

</div>








 </div>

    </div>
  
  )
}

export default Weather