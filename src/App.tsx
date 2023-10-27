import { useState } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  async function handleGetWeather() {
    const apiKey = "c0f56b8afc36d0d7cfea1fd8badbe3ef";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data: WeatherData = response.data;

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null); // Reset the state in case of an error
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-300 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Weather App</h2>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="px-4 py-2 border rounded-lg mb-4 w-full max-w-md mx-auto focus:ring-blue-500"
          placeholder="Enter city"
        />
        <button
          onClick={handleGetWeather}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition-colors duration-300"
        >
          Get Weather
        </button>

        {weather && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-700">
              Weather for {weather.name}
            </h3>
            <p className="text-lg">Temperature: {weather.main.temp} K</p>
            <p className="text-lg">Humidity: {weather.main.humidity}%</p>
            <p className="text-lg">
              Description: {weather.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
