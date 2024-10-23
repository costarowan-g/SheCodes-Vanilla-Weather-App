function updateTemperature(response) {
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  let icon = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  let cityElement = document.querySelector("#weather-app-city");
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time-date");
  let iconImage = document.querySelector("#weather-app-icon");

  console.log(response);

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windSpeedElement.innerHTML = windSpeed;
  timeElement.innerHTML = formatDate(date);
  iconImage.innerHTML = icon;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ab7t243ba2b8a25f4fb421dc30o50328";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ab7t243ba2b8a25f4fb421dc30o50328";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
  console.log(apiURL);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-max-temp">${Math.round(
                day.temperature.maximum
              )}°</div>
              <div class="weather-forecast-min-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
              </div>
            </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Lisbon");
