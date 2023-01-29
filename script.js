const form = document.querySelector("form");
const weatherInfo = document.getElementById("weather-info");
const API_KEY = "YOUR_API_KEY";

form.addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();

  const city = document.getElementById("city").value;

  if (city === "") {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const icon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

      weatherInfo.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Weather in ${data.name}</h5>
            <img src="${icon}" alt="Weather Icon">
            <p class="card-text">${weather.main} - ${weather.description}</p>
            <p class="card-text">Temperature: ${data.main.temp}&#8451;</p>
            <p class="card-text">Feels like: ${data.main.feels_like}&#8451;</p>
            <p class="card-text">Humidity: ${data.main.humidity}%</p>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.log(error);
    });

  form.reset();
}
