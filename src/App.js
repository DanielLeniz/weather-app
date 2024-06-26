import React, { useState } from "react";
import axios from "axios";
import { REACT_APP_API_KEY, REACT_APP_API_URL } from "./api";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `${REACT_APP_API_URL}/weather?q=${location}&units=imperial&appid=${REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <Search />
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">Feels Like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
              <p className="bold">Humidity</p>
              {data.main ? <p>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p className="bold">Wind Speed</p>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
