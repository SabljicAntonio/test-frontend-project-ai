import { useState, useEffect } from 'react'
import './App.css'

function getWeatherEmoji(icon) {
  const map = {
    'sunny':         '☀️',
    'partly-cloudy': '⛅',
    'cloudy':        '☁️',
    'rainy':         '🌧️',
    'stormy':        '⛈️',
    'snowy':         '❄️',
    'foggy':         '🌫️',
    'windy':         '💨',
  }
  return map[icon] ?? '🌡️'
}

function conditionToIcon(condition) {
  const c = condition.toLowerCase()
  if (c.includes('sunny') || c.includes('clear')) return 'sunny'
  if (c.includes('partly')) return 'partly-cloudy'
  if (c.includes('rain') || c.includes('shower')) return 'rainy'
  if (c.includes('storm') || c.includes('thunder')) return 'stormy'
  if (c.includes('snow')) return 'snowy'
  if (c.includes('fog') || c.includes('mist')) return 'foggy'
  if (c.includes('cloud') || c.includes('overcast')) return 'cloudy'
  return 'sunny'
}

function StatCard({ icon, label, value, unit }) {
  return (
    <div className="glass stat-card">
      <span className="stat-card__icon">{icon}</span>
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">
        {value}
        {unit && <span className="stat-card__unit">{unit}</span>}
      </span>
    </div>
  )
}

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/weather')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setWeather(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="weather-app">
        <p className="state-message">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-app">
        <p className="state-message state-message--error">
          Failed to load weather: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="weather-app">
      <div className="glass main-card">
        <div className="main-card__left">
          <span className="main-card__location">
            {weather.city}, {weather.country}
          </span>
          <div className="main-card__temp">
            {weather.temperature}<sup>°C</sup>
          </div>
          <div className="main-card__condition">{weather.condition}</div>
          <div className="main-card__feels">Feels like {weather.feelsLike}°C</div>
        </div>
        <div className="main-card__right">
          <span className="weather-icon">
            {getWeatherEmoji(conditionToIcon(weather.condition))}
          </span>
        </div>
      </div>

      <div className="stats-row">
        <StatCard icon="💧" label="Humidity"   value={weather.humidity}   unit="%" />
        <StatCard icon="💨" label="Wind"        value={weather.windSpeed}  unit=" km/h" />
        <StatCard icon="🔆" label="UV Index"    value={weather.uvIndex}    unit="" />
        <StatCard icon="👁" label="Visibility"  value={weather.visibility} unit=" km" />
      </div>

      <div className="glass forecast-strip">
        <div className="forecast-strip__title">5-Day Forecast</div>
        <div className="forecast-strip__days">
          {weather.forecast.map(day => (
            <div key={day.day} className="forecast-day">
              <span className="forecast-day__name">{day.day}</span>
              <span className="forecast-day__icon">{getWeatherEmoji(day.icon)}</span>
              <span className="forecast-day__high">{day.high}°</span>
              <span className="forecast-day__low">{day.low}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
