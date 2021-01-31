//Testing connection to HTML
// console.log("Can you see me!?");

//Global Vars
const apiKey = "da8d78402fe98dcc0eda65e6fe199638";
const cityButton = $("#city-click")
const searchBar = $("#list");
let searchHistory = "";
let currentWeatherDiv = $('#current-weather')

//Testing LocalStorage 
$("#city-click").on("click", function (event) {
    event.preventDefault();
    const cityClick = $("#city-input").val().trim();
    if (cityClick == "") {
        return;
    }
    localStorage.setItem("cityName", cityClick);
    // console.log(cityClick);
    showSearched(cityClick);
    citySearching();
    weatherSearch();
})

//Placing the typed city straight onto the page
function showSearched(city) {
    const li = document.createElement("li");
    li.textContent = city;
    searchBar.prepend(li);
}


//Pre-pending, user input. Saving last searched item
function citySearching() {
    const citySearch = localStorage.getItem("cityName");
    getWeather(citySearch);
}
citySearching();


function getWeather(cityName) {
    //Current and 5 day forecast constants
    const apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";

    //If no data is called 
    // if (textData == "") {
    //     return;
    // }   else {
    // console.log($("#city-input"));

    //Typical AJAX
    $.ajax({
        url: apiWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // const weatherCard = $(".weather-card").append("<div>").addclass("weather-body")
        //So card doent retain old info!
        // weatherCard.empty();
        // weatherCard.html('');

        // Select div where we will append the info and empty it
        currentWeatherDiv.empty();
        // get date, city name, temp, humidity, speed and icon and set them to variables
        // append them to currentWeatherDiv

        //const currentTime = weatherCard.append("<p>");
        // Going to add class 
        // weatherCard.append(currentTime);

        //Time next, aiming to try out a timing template
        const dateTime = new Date(response.dt * 1000);
        const currentDate = $('<p>').text(dateTime.toLocaleDateString('en-US'));
        console.log(currentWeatherDiv);

        let currentTemp = ("<p>" + "Temperature: " + response.main.temp + "</p>");
        // Setting Humidity
        let currentHumidity = ("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        // Wind (lol I can't stop thinking captain planet)
        let currentWind = ("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        let currentIcon = (`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

        currentWeatherDiv.append(currentDate, currentTemp, currentHumidity, currentWind, currentIcon);

        let long = response.coord.lon;
        let lat = response.coord.lat;

        fiveDayForecast(cityName);
        getUV(lat, long);
    });
}

//Aiming to call weather API
function weatherSearch(event) {
    const textData = $("#city-input").val();
    // if (event.target.matches)
    // console.log("Hi");
    getWeather(textData)


}

function fiveDayForecast(cityName) {

    const apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: apiFive,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //Creating cards
        let fiveDayDiv = $("#weather-card");
        let day = response.list;

        fiveDayDiv.empty();

        // For each for 5 days
        for (let i = 4; i < day.length; i += 8) {

            let fiveDayCard = $("<div>").addClass("card fiveDayColor");
            let FiveDayTime = new Date(response.list[i].dt * 1000);

            FiveDayTime = FiveDayTime.toLocaleDateString("en-US");
            fiveDayCard.html("<p>" + FiveDayTime + "</p>" + `<img src='https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png'>` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>")

            fiveDayDiv.append(fiveDayCard);
        }
    });
}

// Aiming for UV AJAX "crosses fingers"

function getUV(lat, long) {

    const UV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${lat}&lon=${long}&appip=${apiKey}`;

    //Typical AJAX
    $.ajax({
        url: UV,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //Same principle as the temp, humidity, and wind speed 
        const todaysUV = $("<p>").text("UV Index: " + response.value).addClass("weather-card");
        currentWeatherDiv.append(todaysUV);
        // todaysUV.addClass("todayUV");
        // currentTemp.append(currendUV);
    });
}