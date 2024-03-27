"use client"
import useToggle from '@/hooks/stores';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type WeatherData = {
    main:{
        temp:string;
    },
    weather:{
        main:string;
        description:string;
        icon: string;
    }[];
}

const Weather = () => {
    const {isHover , isOpen} = useToggle()
    const [weatherData  , setWeatherData] = useState<WeatherData | null>(null)
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState<string | null>(null);

    useEffect(()=>{
      const API_KEY = "d2f6f6f50c4c644c5700d6a48831c91d";
      const city = "Phnom Penh";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      axios
        .get(apiUrl)
        .then((res)=>{
          setWeatherData(res.data);
          setLoading(false)
        })
        .catch((err)=>{
          setError(err.message)
          setLoading(false)
        })
    },[])
    
    if(loading){
      return <div>Loading...</div>
    }

    if(error){
      return <div>Error: {error}</div>;
    }

    if(!weatherData){
      return null
    }

    const temperature = weatherData.main.temp;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div className='flex justify-center items-center'>
    <Image src={iconUrl} alt="#" width={50} height={50}/>
    <p className={isOpen || isHover ? "text-[18px]" : "text-[20px]"}>{parseInt(temperature)}°C</p>
  </div>
  )
}

export default Weather