// var apiKey = '2ea0ff78c58ceb45b6e3b5e1c308163c';
const apiKey = 'ea1cfe6f6396974dcf51cb771e7643a2';

// 7ab439372a6b7834b1058543aced3bee
// 2ea0ff78c58ceb45b6e3b5e1c308163c

let currentWeather = document.getElementById('current-weather');
let submitbtn = document.getElementById('citySearch');
let searchInput = document.querySelector('input');
let displayFiveDay = document.getElementById('display-five-day');
let pastSearchBtnEl = document.getElementById("past-search-btns");

submitbtn.addEventListener('click', searchSubmit);


// city search button
function searchSubmit(event) {
        event.preventDefault()
    if (!searchInput.value) {
        return;
    } else {
        let city = searchInput.value.toUpperCase().trim();
        $("#display-five-day").empty();
        $("#current-weather").empty();
        fetchCurrentWeather(city);
        fetchFiveDayWeather(city);
        searchInput.value = "";
    }
    pastSearch(city);
}

//  current day weather fetch
function fetchCurrentWeather(city) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather).then((results) => {
        return results.json();
    })
    .then(function(data)    {
        console.log(data);  
        displayCurrentWeather(data, city);
    })
}
// var savedSearch = function(){
//     localStorage.setItem("cities", JSON.stringify(data.name));
// }

// // weather = data from line 26
function displayCurrentWeather(weather, cityName) {
        let city = document.createElement('h3');
        city.textContent = cityName;

        let dateEl = document.createElement('p');
        dateEl.textContent = 'Today: ' + dayjs.unix(weather.dt).format('MM/DD/YYYY');

        let iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        let icon = document.createElement('img');
        icon.setAttribute('src', iconUrl);
        icon.setAttribute('alt', weather.weather[0].description);

        let tempEl = document.createElement('p');
        tempEl.textContent = 'Temp: ' + weather.main.temp + ' °F';

        let humidityEl = document.createElement('p');
        humidityEl.textContent ='Humidity: ' +  weather.main.humidity + '%';

        let windEl = document.createElement('p');
        windEl.textContent = 'Wind speed: ' + weather.wind.speed + 'mph';

        currentWeather.append(city, dateEl,icon, tempEl, humidityEl, windEl);  
        
        let cityName = weather.name;
        console.log("this is the data", weather.name);
        storedCityName = JSON.parse(localStorage.getItem("cityName")) || [];
        storedCityName.push(cityName);
        localStorage.setItem("cityName", JSON.stringify(storedCityName));
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
    for (var i = 0; i < fiveDayForecast.length; i=i+8) {
       
        let cardEl= document.createElement('div');
        let cardHeadingEl = document.createElement('h3');
        let cardBodyEl = document.createElement('div');
        
        cardEl.classList = "card mx-2"
        cardHeadingEl.classList = "card-title text-center d-flex h3";
        cardBodyEl.classList = "card-body text-center";
        // displayFiveDay.classList = "d-flex";
        
        let dailyFiveDayForecast = fiveDayForecast[i];
       
        let dateEl = document.createElement('p');
        dateEl.textContent = 'DATE: ' + dayjs.unix(dailyFiveDayForecast.dt).format('MM/DD/YYYY');

        const iconUrl = `https://openweathermap.org/img/w/${dailyFiveDayForecast.weather[0].icon}.png`;
        let icon = document.createElement('img');
        icon.setAttribute('src', iconUrl);
        icon.setAttribute('alt', dailyFiveDayForecast.main.icon);

        let tempEl = document.createElement('p');
        tempEl.innerHTML = 'Temp: ' + dailyFiveDayForecast.main.temp + ' °F';

        let humidityEl = document.createElement('p');
        humidityEl.textContent ='Humidity: ' +  dailyFiveDayForecast.main.humidity + '%';

        let windEl = document.createElement('p');
        windEl.textContent = 'Wind speed: ' + dailyFiveDayForecast.wind.speed + 'mph';

        cardEl.append(cardHeadingEl);
        cardHeadingEl.append(dateEl, icon)
        cardBodyEl.append(tempEl, humidityEl, windEl);
        cardEl.append(cardBodyEl);
        displayFiveDay.append(cardEl);  
}
}

let pastSearch = function(cityName) {
        let  pastSearchEl = document.createElement("button");
        pastSearchEl.textContent = cityName;
        pastSearchEl.classList = "d-flex w-100 past-search-city btn-light border p-2";
        pastSearchEl.id = `${cityName}`
        pastSearchEl.setAttribute("data-city", cityName);
        pastSearchBtnEl.append(pastSearchEl);

    $(`#${cityName}`).on("click", function() {
        $("#display-five-day").empty();
        $("#current-weather").empty();
        fetchCurrentWeather($(this).attr("data-city"));
        fetchFiveDayWeather($(this).attr("data-city"));
      });
}

