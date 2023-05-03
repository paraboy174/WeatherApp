const apikey = "46f80a02ecae410460d59960ded6e1c6";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network Response failed")
        }
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity = ${data.main.humidity}%`,
            `wind speed =${data.wind.speed}m/s`,
        ];

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`;

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}°c`;

        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) =>
            `<div>${detail}</div>`)

    } catch (error) {

    }
}