/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: 'c8b806f6e1f861fd6ab3054a1318be73',
    baseURL: 'https://api.openweathermap.org/data/2.5/'
};

function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if (e.key === 'Enter') {
            fetch(`${api.baseURL}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(data => {
                    setWeather(data)
                    setQuery('')
                })
                .catch(err => console.error("Error fetching weather data:", err));
        }
    };

    const dateBuilder = (d) => {
        let months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day}, ${date} ${month} ${year}`;
    };

    return (
        <div>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {weather.main ? (
                    <div className='content'>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className='date'>
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2>No Results Found</h2>
                )}
            </main>
        </div>
    );
}

export default Weather;
