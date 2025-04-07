import { useState, useEffect } from 'react'
import './App.css'
import SFBackground from './assets/SF_Background.JPG'
import TitleText from './assets/title_text.png'
import ScrollToEnter from './assets/scroll-to-enter.png'
import CloudIcon from './assets/cloud.png'
import PartlyCloudyIcon from './assets/partlycloudy.png'
import WindIcon from './assets/wind.png'
import SnowIcon from './assets/snow.png'
import RainIcon from './assets/rain.png'
import SunIcon from './assets/sun.png'
import NightIcon from './assets/night.png'
import Barcode from './assets/barcode.png'
import LogoRepeated from './assets/logo-repeated.png'
import Logo from './assets/logo.png'
import HereYouWillFind from './assets/hereyouwillfind.png'
import FeaturedProjects from './assets/featured-projects.png'
import ContentSection from './components/ContentSection'
import OtherWork from './assets/other-work.png'

interface WeatherData {
  weather: { main: string }[];
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
}

function App() {
  const [time, setTime] = useState<{ hours: string; minutes: string; ampm: string }>({ hours: '', minutes: '', ampm: '' })
  const [location, setLocation] = useState<string>('')
  const [weatherIcon, setWeatherIcon] = useState<string>(SunIcon)
  const [tooltipStyle, setTooltipStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleLogoMouseMove = (e: React.MouseEvent) => {
    // Add offset to position tooltip slightly below and to the right of cursor
    setTooltipStyle({
      top: e.clientY + 10,
      left: e.clientX + 10
    });
  };

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        // First get location from IP
        const locationResponse = await fetch('https://ipapi.co/json/')
        const locationData = await locationResponse.json()
        setLocation(locationData.city.toLowerCase())

        // Then get weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        const weatherData: WeatherData = await weatherResponse.json()

        console.log('Weather Data:', weatherData)

        // Log sunrise and sunset times in human-readable format
        const sunriseDate = new Date(weatherData.sys.sunrise * 1000)
        const sunsetDate = new Date(weatherData.sys.sunset * 1000)
        console.log('Weather System Data:', {
          sunrise: {
            timestamp: weatherData.sys.sunrise,
            time: sunriseDate.toLocaleTimeString(),
            date: sunriseDate.toLocaleDateString()
          },
          sunset: {
            timestamp: weatherData.sys.sunset,
            time: sunsetDate.toLocaleTimeString(),
            date: sunsetDate.toLocaleDateString()
          },
          currentTime: {
            timestamp: Date.now() / 1000,
            time: new Date().toLocaleTimeString()
          }
        })

        // Determine which icon to show based on conditions
        const currentTime = Date.now() / 1000 // Convert to seconds
        const isNight = currentTime < weatherData.sys.sunrise || currentTime > weatherData.sys.sunset

        if (isNight) {
          setWeatherIcon(NightIcon)
          return
        }

        const weatherMain = weatherData.weather[0].main.toLowerCase()
        const windSpeed = weatherData.wind.speed

        if (weatherMain.includes('rain')) {
          setWeatherIcon(RainIcon)
        } else if (weatherMain.includes('snow')) {
          setWeatherIcon(SnowIcon)
        } else if (windSpeed > 5.5) { // About 12mph
          setWeatherIcon(WindIcon)
        } else if (weatherMain.includes('cloud')) {
          if (weatherMain === 'few clouds' || weatherMain === 'scattered clouds') {
            setWeatherIcon(PartlyCloudyIcon)
          } else {
            setWeatherIcon(CloudIcon)
          }
        } else {
          setWeatherIcon(SunIcon)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setWeatherIcon(SunIcon) // Default to sun if there's an error
      }
    }

    fetchLocationAndWeather()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      setTime({
        hours: hours.toString(),
        minutes,
        ampm
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="homepage-container">
      <div className="left-section">
        <img src={LogoRepeated} alt="Repeated Logo" className="logo-repeated" />
        <img src={HereYouWillFind} alt="Here You Will Find" className="here-you-will-find" />
        <img src={FeaturedProjects} alt="Featured Projects" className="featured-projects" />
        <ContentSection 
          startIndex={1}
          titles={["MyBMW App", "DASH: Mind Maps Reimagined", "DriveAlive: Drowsy Driving Detection", "GoFigure: Learn Figure Skating"]}
          descriptions={[
            "Reimagining how users interact with their vehicle's features.",
            "Redesiging the intuition of note taking and file storage on an interactive 2D canvas.",
            "Detective and mitigating drowsy driving incidents using Convolutional Neural Networks.",
            "Democratizing access to an elite sport through an intuitive coaching app."
          ]}
          topPosition="15rem"
        />
        <img src={OtherWork} alt="Other Work" className="other-work" />
        <ContentSection 
          startIndex={5}
          titles={["Pet Garden: Productivity in a Pet-Friendly Office", "Cat Finder: Beating Stress and Anxiety", "Soma: Tracking Chronic Pain", "Ray Tracer: Building 3D Scenes"]}
          descriptions={[
            "A desktop game to boost your productivity by collecting pets.",
            "Find your missing cat in VR while engaging with a soothing neighborhood.",
            "An intuitive logging and tracking system for those with chronic pain.",
            "Simulating light, shadow, reflection, and texture to create realistic scenes by parsing XML files."
          ]}
          topPosition="28rem"
        />
        <div className="inner-box">
          <div 
            className="logo-wrapper" 
            data-tooltip="This logo is my initials mirrored but it also looks like a fly. 🪰 Flies in literature and mythology have symbolized persistence, survival, resilience, and inevitable decay. In design, they are a source of inspiration, a reminder that the creative process is always cyclical."
            onMouseMove={handleLogoMouseMove}
            style={{'--tooltip-top': `${tooltipStyle.top}px`, '--tooltip-left': `${tooltipStyle.left}px`} as React.CSSProperties}
          >
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <img src={Barcode} alt="Barcode" className="barcode" />
        </div>
      </div>
      <div className="right-section">
        <img src={SFBackground} alt="San Francisco Background" className="background-image" />
        <div className="volume-text">volume vi</div>
        <div className="issue-text">issue ii</div>
        <div className="time-container">
          <img src={weatherIcon} alt="Weather" className="weather-icon" />
          <div className="time-location-group">
            <div className="time-text">
              {time.hours}:{time.minutes}<span className="ampm">{time.ampm}</span>
            </div>
            <div className="location-text">{location}</div>
          </div>
        </div>
        <img src={TitleText} alt="Title Text" className="title-overlay" />
        <img src={ScrollToEnter} alt="Scroll to Enter" className="scroll-to-enter" />
        <div className="bio-text">
          ...is a UX designer with a foundation in software engineering, driven by a passion for exploring human-computer interaction in the realms of health, creativity, and self-expression. In her spare time, she can often be found gathering research for her meticulously tiered ranking of Bay Area coffee shops.
        </div>
      </div>
    </div>
  )
}

export default App
