"use client";

import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import Weather from './components/Weather';
import Spinner from './components/Spinner';

//Main home component
export default function Home() {
  //State for managing city input, weather data, and loading status
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  //URL for fetching weather data. Uses environment variable for API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  //Function to fetch weather data with API call
  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.get(url).then((res) => {
      setWeather(res.data)
      // console.log(res.data)
    })
    setCity('')
    setLoading(false)
  }

  //Map weather conditions to background images
  //Update with proper links to photos
  const weatherBackgrounds = {
    Clear: '/images/clearSkies.png',
    Clouds: '/images/cloudy.png',
    Rain: '/images/raining.png',
    Snow: '/images/snowing.png',
    Thunderstorm: '/images/thunderstorm.png',
  }
  
  //What to render based on loading status
  if (loading) {
    return <Spinner /> //Loading spinner
  } else {
    return (
      <div>
        <head>
          <title>Real Weather</title>
          <meta name="description" content="Weather App" />
          <link rel="icon" href="/favicon.ico" />
        </head>
      {/* Background image container */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[-1]'/>
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[-1]' />
      <Image 
        src={weather?.weather?.[0]?.main ? weatherBackgrounds[weather.weather[0].main] : '/images/clearSkies.png'} 
        layout='fill'
        className='object-cover'
        alt='Weather App'
      />

      {/* Search Bar */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
            <form
              onSubmit={fetchWeather}
              className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-900 text-black rounded-2xl'
            >
              <div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className='bg-transparent border-none text-black focus:outline-none text-2xl'
                  type='text'
                  placeholder='Search city'
                />
              </div>
              <button onClick={fetchWeather}>
                <BsSearch size={20} />
              </button>
            </form>
          </div>

      {/* Weather Info Display */}
      {weather.main && <Weather data={weather} />}
      </div>
    )
  }
}