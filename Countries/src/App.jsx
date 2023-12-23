import { useState, useEffect } from "react";
import axios from "axios";


const App = () => {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState(null)
  const [weatherDetails, setWeatherDetails] = useState([])
  const [error, setError] = useState('')



  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        console.log(response.data)
        setCountries(response.data || [])
      })
      .catch((error) => {
        setError('Error fetching data', error)
        setCountries([]);
      })
  }, [])

  const handleInputChange = (event) => {
    setQuery(event.target.value)
    filteredCountries(event.target.value)
  }

  const filteredCountries = (query) => {
    const filtered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase())
    })
    setSuggestions(filtered)
  }

  const handleClick = (country) => {
    setSelected(country)
    fetchWeatherData(country.capital, country.altSpellings[0])
  }


  const fetchWeatherData = async (capital, countryCode) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const base_url = 'https://api.openweathermap.org/data/2.5/weather'

    try {
      const response = await axios.get(`${base_url}?q=${capital},${countryCode}&APPID=${api_key}`)
      const weatherData = response.data
      setWeatherDetails(weatherData)

    } catch (error) {
      setError('Something went wrong', error)
    }
  }

  useEffect(() => {
    if (suggestions.length === 1) {
      const country = suggestions[0]
      fetchWeatherData(country.capital, country.altSpellings[0])
    }
  }, [suggestions])



  return (
    <>
      <div>
        find countries <input
          value={query} onChange={handleInputChange} />
      </div>
      <div>
        {suggestions.length > 10 ? (
          <p>Too many matches, please specify another filter</p>
        ) : (
          <div>
            {suggestions.map((country, index) => (
              <div key={country.name.common}>

                {suggestions.length === 1 && index === suggestions.length - 1 ? (
                  <>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Language: {Object.values(country.languages).join(',')}</p>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

                    {weatherDetails.weather && weatherDetails.weather.length > 0 && (
                      <div>
                        <h2>Weather of {country.capital}</h2>
                        <p>Description: {weatherDetails.weather[0].description}</p>
                        <p>Temperature {weatherDetails.main.temp} kelvin</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}.png`} alt="Weather icon" />
                        <p>Wind {weatherDetails.wind.speed} m/h</p>
                      </div>
                    )}

                  </>
                ) : (
                  <p>
                    {country.name.common}
                    <button onClick={() => handleClick(country)}>show</button>
                  </p>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {selected && (
          <div>
            <h1>{selected.name.common}</h1>
            <p>Capital: {selected.capital}</p>
            <p>Language: {Object.values(selected.languages).join(', ')}</p>
            <img src={selected.flags.png} alt={`Flag of ${selected.name.common}`} />

            {weatherDetails && Object.keys(weatherDetails).length !== 0 && (
              <div>
                <h2>Weather of {selected.capital}</h2>
                {weatherDetails.weather && weatherDetails.weather.length > 0 && (
                  <div>
                    <p>Description: {weatherDetails.weather[0].description}</p>
                    <p>Temperature {weatherDetails.main.temp} kelvin</p>
                    <img src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}.png`} alt="Weather icon" />
                    <p>Wind {weatherDetails.wind.speed} m/h</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  )
}

export default App