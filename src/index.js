function updateTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  let cityElement = document.querySelector("#weather-app-city");
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time-date");

  console.log(response);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windSpeedElement.innerHTML = windSpeed;
  timeElement.innerHTML = formatDate(date);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Lisbon");
