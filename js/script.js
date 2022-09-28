
// Api's
const apiKey = "2f63dc45e3e6914edcfb72becdbc8c69";
const apiCountryUrl = "https://countryflagsapi.com/png/";
const iconUrl = "https://openweathermap.org/img/wn/"
const getWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q="
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Select Elements
let cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const city = document.querySelector('#city')
const country = document.querySelector('#country')
const description = document.querySelector('#description')
const temperature = document.querySelector('.temperature span')
const humidity = document.querySelector('#humidity span')
const wind = document.querySelector('#wind span')
const weatherIcon = document.querySelector('#weather-icon')
const loader = document.querySelector("#loader");

const weatherData = document.querySelector('#weather-data');
const error = document.querySelector('#error');
const errorInfo = document.querySelector('.errorInfo');
const sugestions = document.querySelector('.sugestions');

// Get Unsplash photos

// https://api.unsplash.com/search/photos?query=brazil █


  function showWeather(weatherData) {
    
    const cityName = weatherData.name
    document.body.style.backgroundImage = `url("${apiUnsplash + cityName}")`;
    city.innerText=weatherData.name;
    temperature.innerText=parseInt(weatherData.main.temp);
    humidity.innerText=`${weatherData.main.humidity}%`
    wind.innerText=`${weatherData.wind.speed} km/h`
    description.innerText=weatherData.weather[0].description
    country.src=`${apiCountryUrl}${weatherData.sys.country}`
    weatherIcon.src=`${iconUrl}${weatherData.weather[0].icon}.png`

  }


//   Functions
// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
  };


const showDataWeather = (city)=>{
    // const testData = async ()=>{}
    toggleLoader();
    fetch(`${getWeatherApi}${city}&limit=5&units=metric&appid=${apiKey}&lang=pt_br`)
    .then((response) => {
        if (response.status === 404) {   
           getError();
        }else{
            errorInfo.classList.add('hide')
            showWeatherBox();
            toggleLoader();
            return response.json()
            .then((data) => showWeather(data))
        } 
    })
}

function showWeatherBox(){
    weatherData.classList.remove('hide');
}

// Events
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    errorInfo.classList.add('hide');
    const city = cityInput.value;
    showDataWeather(city)
    cityInput.value='';
})

cityInput.addEventListener('keyup', (e)=>{
     if (e.key === 'Enter') {
        errorInfo.classList.add('hide');
        showDataWeather(e.target.value)
        cityInput.value='';
    }
})

// Error

function getError(){
    errorInfo.classList.remove('hide');
    weatherData.classList.add('hide')
    error.innerText = 'Esta cidade não Existe. Coloque um nome de cidade válido';
}

// Sugestions Cities
const sugestionsCities = [
    'Tokio', 
    'London', 
    'Paris', 
    'Rome',
    'Amsterdam',
    'Brugge'
]
// Dinamic creation of p elements to add cities
for (const city of sugestionsCities) {
    const p = document.createElement('p');
    p.classList.add('sugest-cities')
    p.innerText = city;
    sugestions.appendChild(p);
}

const citiesSuggestion = document.querySelectorAll('.sugest-cities');

for (const city of citiesSuggestion) {
    city.addEventListener('click', (e)=>{    
        showDataWeather(e.target.innerText)
        cityInput.value='';
    }) 
}