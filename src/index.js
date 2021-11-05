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

function displayForcast(response) {
  console.log(response.data.daily);

  let forcastElement = document.querySelector("#weather-forcast");
  let days = ["thurs", "fri", "sat", "sun", "mon", "tues"];
  let forcastHTML = `<div class="weather-forcast">
      <div class="row">`;

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
              <div class="col-2">
                <div class="weather-forcast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="45px"
                />
                <div class="weather-forcast-temperatures">
                  <span class="weather-forcast-temerature-max"> 18°</span>
                  <span class="weather-forcast-temperatures-min">12°</span>
                </div>
              </div>
             `;
  });

  forcastHTML =
    forcastHTML +
    `</div>
      </div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}

function showWeather(response) {
  document.querySelector("#users-city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temp-num").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);
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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-num");
  // remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-num");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

place("New York");

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//Changing Celsius to Ferinheight

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
