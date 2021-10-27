//Current time

var time = new Date();
let hour = time.getHours();
let min = time.getMinutes();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let days = day[time.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${days} ${hour} : ${min}`;

//Changing Celsius to Ferinheight

/*let ferinheight = document.querySelector("#fer");
ferinheight.addEventListener("click", tempInFer);

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", tempInCel);*/

//Entering User's Search

function showWeather(response) {
  document.querySelector("#users-city").innerHTML = response.data.name;
  document.querySelector("#temp-num").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function place(city) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  place(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

place("New York");
