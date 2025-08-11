document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const weatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "8c0fbc09c4db5a87405bc7ffbd162c4d";
  weatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    const data = await fetchWeatherData(city);

    weatherInfo.classList.remove("hidden");
    displayWeatherData(data);
  });
  async function fetchWeatherData(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      showError();
    }
  }
  function displayWeatherData(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp} °C`;
    description.textContent = data.weather[0].description;
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "City not found. Please try again.!";
  }
});
