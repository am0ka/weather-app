import React from 'react';
// Replacement for CSS in ReactJS
import styled from 'styled-components';
import Search from './Search';
import PrintErr from './PrintErr';
import Result from './Result';

const Wrapper = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.4em;
  padding: 20px 0;
  color: #fff;
  height: 64px;
  text-align: center;
`;

export default class App extends React.Component {
  state = {
    // Input string of city
    entry: '',
    // Data from API in JSON format
    data: null,
    // Is there any errors?
    err: false,
    // For searcher's placeholder
    prev: ''
  };

  // Binding input with state
  handleCityState = e => {this.setState({entry: e.target.value})};

  // Like a form action, started on 'Enter' key
  searcher = e => {
    e.preventDefault();
    document.activeElement.blur();
    const API = {
      key: "d4294386216839f73977877d7003f924",
      // For today's weather
      base1: "https://api.openweathermap.org/data/2.5/weather",
      // For 5 day forecast
      base2: "https://api.openweathermap.org/data/2.5/forecast"
    };
    const {entry} = this.state;
    const query1 = `${API.base1}?q=${entry}&units=metric&APPID=${API.key}`;
    const query2 = `${API.base2}?q=${entry}&units=metric&APPID=${API.key}`;
    // Fetching both queries simultaniously
    Promise.all([fetch(query1), fetch(query2)])
      .then(([res1, res2]) => {
        // Error handling
        if (res1.ok === false)
          throw Error(res1.statusText);
        if (res2.ok === false)
          throw Error(res2.statusText);
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        // Convertation of numeric day of the week to string
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                      "Thursday", "Friday", "Saturday"];
        // Convertation of numeric month to string
        const months = ["January", "February", "March", "April",
                        "May", "June", "July", "August", "September",
                        "October", "November", "December"];
        const curDate = new Date();
        const today = `${days[curDate.getDay()]}, ${curDate.getDate()}
                      ${months[curDate.getMonth()]}`;
        const precipitaion = (res1.rain === undefined ? '-'
        : res1.rain["1h"]);
        // Reference to http://snowfence.umn.edu/Components/winddirectionanddegrees.htm
        const windDir = ((res1.wind.deg >= 348 || res1.wind.deg < 11) ? "N"
        : (res1.wind.deg >= 11 && res1.wind.deg < 33) ? "NNE"
        : (res1.wind.deg >= 33 && res1.wind.deg < 56) ? "NE"
        : (res1.wind.deg >= 56 && res1.wind.deg < 78) ? "ENE"
        : (res1.wind.deg >= 78 && res1.wind.deg < 101) ? "E"
        : (res1.wind.deg >= 101 && res1.wind.deg < 123) ? "ESE"
        : (res1.wind.deg >= 123 && res1.wind.deg < 146) ? "SE"
        : (res1.wind.deg >= 146 && res1.wind.deg < 168) ? "SSE"
        : (res1.wind.deg >= 168 && res1.wind.deg < 191) ? "S"
        : (res1.wind.deg >= 191 && res1.wind.deg < 213) ? "SSW"
        : (res1.wind.deg >= 213 && res1.wind.deg < 236) ? "SW"
        : (res1.wind.deg >= 236 && res1.wind.deg < 258) ? "WSW"
        : (res1.wind.deg >= 258 && res1.wind.deg < 281) ? "W"
        : (res1.wind.deg >= 281 && res1.wind.deg < 303) ? "WNW"
        : (res1.wind.deg >= 303 && res1.wind.deg < 326) ? "NW" : "NNW")
        this.setState({
          data: {
            city: res1.name,
            country: res1.sys.country,
            today,
            desc: res1.weather[0].description,
            main: res1.weather[0].main,
            temp: res1.main.temp,
            max: res1.main.temp_max,
            min: res1.main.temp_min,
            humidity: res1.main.humidity,
            wind_speed: res1.wind.speed,
            wind_dir: windDir,
            pres: res1.main.pressure,
            prec: precipitaion,
            forecast: res2.list
          },
          err: false,
          entry: '',
          prev: entry
        });
      })
      // Error handling -> showing error message in console and in DOM
      .catch(e => {
        console.log(e);
        this.setState({
          data: null,
          err: true
        });
      });
  }

  render() {
    const {entry, data,  err, prev} = this.state;
    return (
        <Wrapper>
          <Title>ReactWeather</Title>
          <Search
          value={entry}
          onchange={this.handleCityState}
          onsubmit={this.searcher}
          prev={prev}
        />
        {/* If city name entered correctly, show output */}
        {(data && <Result data={data} />)
        // Else show error
        || (err && <PrintErr />)}
        </Wrapper>
    );
  }
}