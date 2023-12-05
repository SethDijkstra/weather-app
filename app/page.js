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
    Clear: 'https://images.unsplash.com/photo-1555344158-7d1d971af150?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Clouds: 'https://images.unsplash.com/photo-1530625243345-797b4c1836ee?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Rain: 'https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Snow: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d4d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Thunderstorm: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d4d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      <Image 
        src='https://images.unsplash.com/photo-1530625243345-797b4c1836ee?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
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