var apiKey = 'ea1cfe6f6396974dcf51cb771e7643a2';
// 7ab439372a6b7834b1058543aced3bee

var currentWeather = document.getElementById('current-weather');
var submitbtn = document.getElementById('citySearch');
var searchInput = document.querySelector('input');

submitbtn.addEventListener('click', searchSubmit);

function searchSubmit(event) {
    if (!searchInput.value) {
        return;
    } else {
        var city = searchInput.value.trim();
        fetchCurrentWeather(city);
        searchInput.value = "";
    }
}

function fetchCurrentWeather(city) {
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather).then((results) => {
        console.log('data: ' + results);  
        return results.json();
    })
    .then(function(data){
        displayCurrentWeather(data, city);
        fetchFiveDayWeather(data);
        console.log(data);
    })
}
// weather = data from line 26
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
    tempEl.textContent = 'Temp: ' + weather.main.temp + ' F';

    var humidityEl = document.createElement('p');
    humidityEl.textContent ='Humidity: ' +  weather.main.humidity + '%';

    var windEl = document.createElement('p');
    windEl.textContent = 'Wind speed: ' + weather.wind.speed + 'mph';

    currentWeather.append(city, dateEl,icon, tempEl, humidityEl, windEl,);
}

function fetchFiveDayWeather(city) {
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&units=imperial&appid=${apiKey}`;
    const fiveDayWeather = document.createElement('div');
    fetch(apiUrlForecast).then((results) => {
        console.log('data: ' + results);  
        return results.json();
    })
    .then((data) => {   
        const forecastData = data.list;
        for (var i = 0; i < data.list.length; i++) {
            displayCurrentWeather(data.list[i]);
        }

    });
   
 }


// for the 5 day: call it at the same time you cal display current weather- pass over data.cord.lat, data.cord.long
// fetchFiveDay- going to do the same thing as 21-25 only with the forecast URL var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
//  data.list- 40 elements of forecast for 5 days. loop over that list and make a card with the data just like display current weather but loop with a +=8- 