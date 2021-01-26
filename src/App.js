import React, { useState } from 'react';
import './App.css';

//const api = {
 // key : "f54ffcd3580928b6ea60dea4b7aedc6d",
 //file changed base : "http://api.openweathermap.org/data/2.5/"
//};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = evt =>{
    if(evt.key === "Enter"){
      //fetch(`${api.base}weather?q=${query}&APPID={api.key}`)  https://crossorigin.me/http://
      fetch (`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=f54ffcd3580928b6ea60dea4b7aedc6d`)
     .then(res => res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(result);
        //console.log(query);
      });
    }
  }

  const dateBuilder = (d) =>{
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();

   return `${day} ${date} ${month} ${year}`
   
  }

  return (
    <div className="wrap">
    <div className={(typeof weather.main != "undefined") ? 
    //((weather.main.temp>26) ? 'App clear' : 'App')
     ((weather.weather[0].main==="Clear") ? 'App clear' : 
     (weather.weather[0].main==="Clouds") ? 'App clouds' : 
     (weather.weather[0].main==="Rain") ? 'App rain' : 
     (weather.weather[0].main==="Haze") ? 'App haze' : 
     (weather.weather[0].main==="Mist") ? 'App mist' :
     (weather.weather[0].main==="Smoke") ? 'App smoke' :
     'App') 
        : 'App'}>

      <div>
        <main>
          <h2>WEATHER</h2>
          {/*search box*/}
          <div className="search-box">
            <input type="text" 
            className="search-bar"
            placeholder="search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
          {/*search box*/}

        {(typeof weather.main != "undefined") ? (
          <div>
            {/*location and date box*/}
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          {/*location and date box*/}

          {/*weather box*/}
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}ºC 
            </div>
            <div className="humidity">
            Humidity : {Math.round(weather.main.humidity)}
            </div>
            <div className="weathe-type">
              {weather.weather[0].main}
            </div>

          </div>
          {/*weather box*/}
          </div>
          ) : ('')}
        </main>
      </div>
    </div>
    </div>
  );
}

export default App;
