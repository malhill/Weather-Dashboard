//Testing connection to HTML
console.log("Can you see me!?");

//Global Vars
var apiKey = "da8d78402fe98dcc0eda65e6fe199638";
var cityButton = $("#city-click")
var searchBar = $("#list");
var searchHistory = [];

//Testing LocalStorage 
$("#city-click").on("click", function(event) {
    event.preventDefault();
    var cityClick = $("#city-input").val();
    localStorage.setItem("cityName", cityClick);
    console.log(cityClick);
    citySearching();
})

//Pre-pending, user input. Saving last searched item
function citySearching() {
    var citySearch = localStorage.getItem("cityName");
    var li = document.createElement("li");
    li.textContent = citySearch;
    searchBar.prepend(li);
}
citySearching();

//Aiming to call weather API
$("#city-click").click(function () {
    const textData = $(".text-data").val();

    //Current and 5 day forecast constants
    const apiweather = "https://api.openweathermap.org/data/2.5/weather?q=" + textData + "&Appid=" + apiKey + "&units=imperial";
    const apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + textData + "&Appid=" + apiKey + "&units=imperial";
    
    //If no data is called 
    if (textData == "") {
    } else {
        //Typical AJAX
        $.ajax({
            url: textData,
            method: "GET"
        }).then(function(response) {

            const weatherCard = $(".weather-card").append("<div>").addclass("weather-body")
            //So card doent retain old info!
            weatherCard.empty();
            const currentTime = weatherCard.append("<p>");
            // Going to add class 
            weatherCard.append(currentTime);

            //Time next, aiming to try out a timing template
            const dateTime = new date(response.dt * 1000);
            currentTime.append(response.name + " " + dateTime.toLocaleDateString("en-US"));
            currentTime.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            //Temperature next
            const currentTemp = currentTime.append("<p>");
            currentTime.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // Wind (lol I can't stop thinking captain planet)
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // Aiming for UV AJAX "crosses fingers"
            const UV = "https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}";
        
            //Typical AJAX
            $.ajax({
                url: UV,
                method: "GET"
            }).then(function(response) {

                //Same principle as the temp, humidity, and wind speed 
                const todaysUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("weather-card");
                todaysUV.addClass("todayUV");
                currentTemp.append(currendUV);
            });
        });

        //Put it all together. Similar to the local storage. Typical AJAX call
        $.ajax({
            url: apiFive,
            method: "GET"
        }).then(function (response) {
    
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
        })
    });
    }
});
