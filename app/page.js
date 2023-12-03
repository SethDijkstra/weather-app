"use client";

import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import Weather from './components/Weather';
import Spinner from './components/Spinner';

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

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
  
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div>
        <head>
          <title>Real Weather</title>
          <meta name="description" content="Weather App" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[-1]'/>
      <Image 
        src='https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
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

      {/* Weather Info */}
      {weather.main && <Weather data={weather} />}
      </div>
    )
  }
}