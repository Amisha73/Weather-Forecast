let btn = document.getElementById("btn");
let container = document.querySelector(".container");

btn.addEventListener("click", () => {
  // Corrected to use 'value' to get the input value
  let cityName = document.getElementById("cityName").value;
  if (cityName.length <= 0) {
    container.innerHTML = `<h1 class='error'>Please Enter City Name</h1>`;
    setTimeout(() => {
      container.innerHTML = "";
    }, 1000);
    return;
  }

  // API key
  let apiKey = "a5667f98d71a05fedcdf4cd7a639139a";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  // Fetch the API
  fetch(api)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => ShowData(data))
    .catch(() => {
      container.innerHTML = `<h1 class='error'>Please Enter Correct City Name</h1>`;
      setTimeout(() => {
        container.innerHTML = "";
      }, 1000);
    });
});

// Show the result
let ShowData = (data) => {
  const WeatherImages = {
    Clear: "Sun.jpeg",
    Clouds: "Clouds.jpg",
    Haze: "Haze.jpeg",
    Rain: "Rain.jpg",
    Snow: "snow.jpg",
  };
  //   if (data.weather[0].main === "Clear") {
  //     images = "sun";
  //   } else if (data.weather[0].main === "Clouds") {
  //     images = "Clouds";
  //   } else if (data.weather[0].main === "Haze") {
  //     images = "Haze";
  //   }else if (data.weather[0].main === "Rain") {
  //     images = "Rain";
  //   }else if (data.weather[0].main === "Snow") {
  //     images = "Snow";
  //   }

  let weatherCondition = data.weather[0].main; 
  let imageFile = WeatherImages[weatherCondition];

  container.innerHTML = `
    <div class="weatherContainer">
      <img src="Images/${imageFile}" alt="Weather Icon" id="img" />
      <div id="weatherName">${Math.floor(data.main.temp - 273.15)}°C, ${
    data.weather[0].main
  }</div>
    </div>
    <div class="cityName">${data.name}</div>
    <div class="otherInfo">
      <div class="horiCenter">
        <i class="fas fa-water"></i>
        <div class="text">
          <p>${data.main.humidity}%</p>
          <p>humidity</p>
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
};
