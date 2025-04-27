const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() =>{
    // Enter your API Key in the APIKey variable
    // You can use any weather api for the project
    // Here we are using openweathermap's API which
    // you can find in their website by searching 
    // weather API.
    const APIKey = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m" ;
    const city = document.getElementById('search-btn').value;
    if(city==''){
        return ;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
    
    if(json.cod == '404'){
        container.style.height = '450px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
    }

    container.style.height = '560px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear-new.png';
                break;
            case 'Rain':
                image.src = 'images/rain-new.png';
                break;
            case 'Snow':
                image.src = 'images/snow-new.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud-new.png';
                break; 
            case 'Mist':
                image.src = 'images/mist-new.png';
                break;                  
            case 'Haze':
                image.src = 'images/mist-new.png';
                break;     
            default:
                image.src = 'images/clear-new.png';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

});




// const apiKey ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m" ;
// const searchButton = document.querySelector('.bx-search');
// const searchInput = document.getElementById('search-btn');
// const weatherBox = document.querySelector('.weather-box');
// const notFound = document.querySelector('.not-found');
// const image = document.querySelector('.weather-box img');
// const temperature = document.querySelector('.weather-box .temperature');
// const description = document.querySelector('.weather-box .description');
// const humidity = document.querySelector('.weather-details .humidity span');
// const wind = document.querySelector('.weather-details .wind span');

// searchButton.addEventListener('click', () => {
//     const location = searchInput.value;
//     if (location) {
//         fetchWeather(location);
//     }
// });

// async function fetchWeather(location) {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    
//     if (response.ok) {
//         const data = await response.json();
//         displayWeather(data);
//     } else {
//         notFound.style.display = 'block';
//         weatherBox.style.display = 'none';
//     }
// }

// function displayWeather(data) {
//     const weatherCondition = data.weather[0].main;

//     // Switch statement to set the weather image based on the condition
//     switch (weatherCondition) {
//         case 'Clear':
//             image.src = 'images/clear-new.png';
//             break;
//         case 'Rain':
//             image.src = 'images/rain-new.png';
//             break;
//         case 'Snow':
//             image.src = 'images/snow-new.png';
//             break;
//         case 'Clouds':
//             image.src = 'images/cloud-new.png';
//             break; 
//         case 'Mist':
//             image.src = 'images/mist-new.png';
//             break;                  
//         case 'Haze':
//             image.src = 'images/mist-new.png';
//             break;     
//         default:
//             image.src = 'images/clear-new.png';
//     }

//     // Update the weather information in the UI
//     temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
//     description.innerHTML = `${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)}`;
//     humidity.innerHTML = `${data.main.humidity}%`;
//     wind.innerHTML = `${Math.round(data.wind.speed)}Km/h`;

//     weatherBox.style.display = 'block';
//     notFound.style.display = 'none';
// }