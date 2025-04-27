let btn = document.getElementById("btn");
let currentLocationBtn = document.getElementById("currentLocationBtn");
let container = document.querySelector(".container");
let recentCitiesDropdown = document.getElementById("recentCities");

// Load recent cities from local storage
loadRecentCities();

btn.addEventListener("click", () => {
  let cityName = document.getElementById("cityName").value.trim();
  if (cityName.length <= 0) {
    showError("Please Enter City Name");
    return;
  }
  fetchWeatherData(cityName);
});

currentLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetchWeatherDataByLocation(lat, lon);
    }, () => {
      showError("Unable to retrieve your location.");
    });
  } else {
    showError("Geolocation is not supported by this browser.");
  }
});

recentCitiesDropdown.addEventListener("change", (event) => {
  let selectedCity = event.target.value;
  if (selectedCity) {
    fetchWeatherData(selectedCity);
  }
});

function fetchWeatherData(cityName) {
  let apiKey = "a5667f98d71a05fedcdf4cd7a639139a";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(api)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => {
      showData(data);
      saveRecentCity(cityName);
    })
    .catch(() => {
      showError("Please Enter Correct City Name");
    });
}

function fetchWeatherDataByLocation(lat, lon) {
  let apiKey = "a5667f98d71a05fedcdf4cd7a639139a";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(api)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => {
      showData(data);
      saveRecentCity(data.name);
    })
    .catch(() => {
      showError("Unable to fetch weather data for your location.");
    });
}

function showData(data) {
  const WeatherImages = {
    Clear: "Sun.jpeg",
    Clouds: "Clouds.jpg",
    Haze: "Haze.jpeg",
    Rain: "Rain.jpg",
    Snow: "Snow.jpg",
  };

  let weatherCondition = data.weather[0].main; 
  let imageFile = WeatherImages[weatherCondition];

  container.innerHTML = `
    <div class="weatherContainer">
      <img src="images/${imageFile}" alt="Weather Icon" id="img" />
      <div id="weatherName">${Math.floor(data.main.temp - 273.15)}°C, ${data.weather[0].main}</div>
    </div>
    <div class="cityName">${data.name}</div>
    <div class="otherInfo">
      <div class="horiCenter">
        <i class="fas fa-water"></i>
        <div class="text">
          <p>${data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div class="horiCenter">
        <i class="fas fa-cloud"></i>
        <div class="text">
          <p>${data.wind.speed} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
      <div class="horiCenter">
        <i class="fas fa-map-marker-alt"></i>
        ${data.sys.country}
      </div>
    </div>`;
}

function showError(message) {
  container.innerHTML = `<h1 class='error'>${message}</h1>`;
  setTimeout(() => {
    container.innerHTML = "";
  }, 1000);
}

function saveRecentCity(cityName) {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!recentCities.includes(cityName)) {
    recentCities.push(cityName);
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    loadRecentCities();
  }
}

function loadRecentCities() {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  recentCitiesDropdown.innerHTML = "";
 if (recentCities.length > 0) {
    recentCitiesDropdown.style.display = "block";
    recentCities.forEach(city => {
      let option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      recentCitiesDropdown.appendChild(option);
    });
  } else {
    recentCitiesDropdown.style.display = "none";
  }
}