import Axios from "axios";
import React, { useEffect, useState } from "react";

function Filter({ value, onChange, setShowCountry }) {
  return (
    <div>
      find countries
      <input value={value} onChange={(e) => {
          onChange(e.target.value)
            setShowCountry(false)
       }} />
    </div>
  );
}

function Country({ country }) {
  var [weather, setWeather] = useState(null);
  useEffect(() => {
    Axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=Helsinki`
    ).then((data) => {
      setWeather(data.data.current);
    });
  }, []);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="256" alt={`flag of ${country.name}`} />
      {
        weather && <div>
          <h2>weather in {country.capital}</h2>
          <p>temperature: {weather.temperature} Celsius</p>
          <img src={weather.weather_icons[0]} />
          <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
      }
    </div>
  );
}

function Display({ filter, countries, showCountry, setShowCountry }) {
  if (filter.length > 0) {
    var matches = countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (matches.length === 1) {
      return <Country country={matches[0]} />;
    } else if (matches.length > 10) {
      return "Too many matches, specify another filter";
    } else {
      return (
        <div>
          {matches.map((match) => (
            <div key={match.name}>
              <p style={{ display: "inline" }}>{match.name}</p>{" "}
              <button onClick={() => setShowCountry(match)}>show</button>
            </div>
          ))}
          {showCountry && <Country country={showCountry} />}
        </div>
      );
    }
  }

  return <div></div>;
}

function App() {
  var [filter, setFilter] = useState("");
  var [countries, setCountries] = useState([]);
  var [showCountry, setShowCountry] = useState(false);

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all").then((data) =>
      setCountries(data.data)
    );
  }, []);

  return (
    <div>
      <Filter value={filter} onChange={setFilter} setShowCountry={setShowCountry} />
      <Display
        filter={filter}
        countries={countries}
        showCountry={showCountry}
        setShowCountry={setShowCountry}
      />
    </div>
  );
}

export default App;
