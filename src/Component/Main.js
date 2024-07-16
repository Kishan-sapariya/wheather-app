import React, { useState } from "react";
import "./main.css";

function Main() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const apiKey = "27ff5a5280964268a7491226241607";
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
      const data = await fetch(apiUrl);
      if (!data.ok) {
        throw new Error("Error fetching data");
      }
      const parsedData = await data.json();
      setWeatherData(parsedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="City name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h1>Weather in {weatherData.location.country} ({weatherData.location.name})</h1>
          <h3>Temperature: {weatherData.current.temp_c}°C</h3>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <p>Humidity: {weatherData.current.humidity}</p>
          <p>Wind speed: {weatherData.current.wind_kph}</p>
        </div>
      )}
    </div>
  );
}

export default Main;
