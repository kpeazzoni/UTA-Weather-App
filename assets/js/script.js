// var apiKey = '2ea0ff78c58ceb45b6e3b5e1c308163c';
var apiKey = 'ea1cfe6f6396974dcf51cb771e7643a2';

// 7ab439372a6b7834b1058543aced3bee
// 2ea0ff78c58ceb45b6e3b5e1c308163c

var currentWeather = document.getElementById('current-weather');
var submitbtn = document.getElementById('citySearch');
var searchInput = document.querySelector('input');
var displayFiveDay = document.getElementById('display-five-day');

submitbtn.addEventListener('click', searchSubmit);

// city search button
function searchSubmit(event) {
    event.preventDefault()
    if (!searchInput.value) {
        return;
    } else {
        var city = searchInput.value.toUpperCase().trim();
       fetchCurrentWeather(city);
        fetchFiveDayWeather(city);
       searchInput.value = "";
    }
    // saveSearch();
}


//  current day weather fetch
function fetchCurrentWeather(city) {
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather).then((results) => {
        return results.json();
    })
    .then(function(data)    {
        displayCurrentWeather(data, city);
    })
}
// function saveSearch() {
//     localStorage.setItem('cities', data.city.name)
//     console.log('save seraches', data.city.name)
//  }
// // weather = data from line 26
function displayCurrentWeather(weather, cityName) {
    var city = document.createElement('h3');
    city.textContent = cityName;

    var dateEl = document.createElement('p');
    dateEl.textContent = 'Today: ' + dayjs.unix(weather.dt).format('MM/DD/YYYY');

    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var icon = document.createElement('img');
    icon.setAttribute('src', iconUrl);
    icon.setAttribute('alt', weather.weather[0].description);

    var tempEl = document.createElement('p');
    tempEl.textContent = 'Temp: ' + weather.main.temp + ' °F';

    var humidityEl = document.createElement('p');
    humidityEl.textContent ='Humidity: ' +  weather.main.humidity + '%';

    var windEl = document.createElement('p');
    windEl.textContent = 'Wind speed: ' + weather.wind.speed + 'mph';

    currentWeather.append(city, dateEl,icon, tempEl, humidityEl, windEl);  
}


// five day weather fetch
function fetchFiveDayWeather(city) {
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    const fiveDayWeather = document.getElementById('fiveday-weather');
   
    fetch(apiUrlForecast)
    .then((results) => {  
        return results.json();
    })
    .then((data) => {   
        displayFiveDayWeather(data);
    });
   
 }
 function displayFiveDayWeather(allWeatherData) {
    var fiveDayForecast = allWeatherData.list;
    console.log("five", fiveDayForecast);
    for (var i = 0; i < fiveDayForecast.length; i=i+8) {
       
       displayFiveDay.classList = "card-body text-center";
        var dailyFiveDayForecast = fiveDayForecast[i];
       
        var dateEl = document.createElement('p');
        dateEl.textContent = 'date: ' + dayjs.unix(dailyFiveDayForecast.dt).format('MM/DD/YYYY');

        var iconUrl = `https://openweathermap.org/img/w/${dailyFiveDayForecast.weather[0].icon}.png`;
        var icon = document.createElement('img');
        icon.setAttribute('src', iconUrl);
        icon.setAttribute('alt', dailyFiveDayForecast.main.icon);

        var tempEl = document.createElement('p');
        tempEl.innerHTML = 'Temp: ' + dailyFiveDayForecast.main.temp + ' °F';

        var humidityEl = document.createElement('p');
        humidityEl.textContent ='Humidity: ' +  dailyFiveDayForecast.main.humidity + '%';

        var windEl = document.createElement('p');
        windEl.textContent = 'Wind speed: ' + dailyFiveDayForecast.wind.speed + 'mph';

        displayFiveDay.append(dateEl, icon, tempEl, humidityEl, windEl);  
}
}

// var pastSearches = function(event) {
//     var pastCityEl = document.createElement("button");
//     pastCityEl.textContent = //past city?;
// }
// pastCityEl.addEventListener("click", pastSearches);

// displayFiveDayWeather(data.list[i]);
// history- on click for past city buttons will just need to run the city search again

// for the 5 day: call it at the same time you cal display current weather- pass over data.cord.lat, data.cord.long
// fetchFiveDay- going to do the same thing as 21-25 only with the forecast URL var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
//  data.list- 40 elements of forecast for 5 days. loop over that list and make a card with the data just like display current weather but loop with a +=8- 




// function displayCurrentWeather(weather, cityName) {
//     var city = document.getElementById('city-heading');
//     city.textContent = weather.main.name;

//     var dateEl = document.getElementById('today-date');
//     dateEl.textContent = 'Today: ' + dayjs.unix(weather.dt).format('MM/DD/YYYY');

//     var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
//     var icon = document.getElementById('weather-icon');
//     icon.setAttribute('src', iconUrl);
//     icon.setAttribute('alt', weather.weather[0].description);

//     var tempEl = document.getElementById('today-temp');
//     tempEl.textContent = 'Temp: ' + weather.main.temp + ' °F';

//     var humidityEl = document.getElementById('today-humidity');
//     humidityEl.textContent ='Humidity: ' +  weather.main.humidity + '%';

//     var windEl = document.getElementById('today-wind');
//     windEl.textContent = 'Wind speed: ' + weather.wind.speed + 'mph';

//     currentWeather.append(city, dateEl, icon, tempEl, humidityEl, windEl);  
// }

// dummy data:
