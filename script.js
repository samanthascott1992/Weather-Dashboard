
$(document).ready(function () {


var history = JSON.parse(window.localStorage.getItem("history")) || [];

    $("#search-btn").on("click", function () {

        var searchValue = $("#search-value").val()

        searchWeather(searchValue)

    })
    $(".history").on("click", function () {

        searchWeather($(this).text())

    })
    function makeRow(text) {

       var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
       $(".history").prepend(li);

    }

    function searchWeather(searchValue) {

        var yourApiKey = "ef8ea8087cbda61b4ebad7da96701611"

        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+searchValue + "&appid="+ yourApiKey + "&units=imperial";

        $.ajax({

            type: "GET",
            url: queryUrl,
            dataType: "JSON", success: function (response) {

                if (history.indexOf(searchValue) === -1) {

                    history.push(searchValue)

                    window.localStorage.setItem("history", JSON.stringify(history))

                    makeRow(searchValue)
                }

                var currentDay = new Date().toString().substr(0, 15);
                
                var card = $("<div>").addClass("card");
                var date = $("<h3>").addClass("card-text").text(searchValue + " " + currentDay);
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " degrees");

                var cardBody = $("<div>").addClass("card-body");
                cardBody.append(date,temp, humid, wind);

                var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + yourApiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
                $.ajax({
                    type: "GET",
                    url: uvQueryUrl,
                    dataType: "JSON", success: function(uvData) {
                        
                        var uvIndex = $("<p>").addClass("card-text").text("UV Index " + uvData.value);
                        cardBody.append(uvIndex);
                    }
                })

                card.append(cardBody);
                $("#today").prepend(card);
              

                getForecast(searchValue);


            }
        })
    }

    function getForecast(searchValue) {

        var yourApiKey = "ef8ea8087cbda61b4ebad7da96701611"

        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+searchValue + "&appid="+yourApiKey+"&units=imperial";

        $.ajax({

            type: "GET",
            url: queryUrl,
            dataType: "JSON", success: function (response) {

            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast for: </h4>" + searchValue).append("<div class=\"row\">")


            for(var i=0; i< response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1)

                {

                    console.log(response);
                    var col = $("<div>").addClass("col-md-2")
                    var card = $("<div>").addClass("card bg-primary text-white")
                    var body = $("<div>").addClass("card-body p-2")
                    var date = $("<p>").addClass("date").text(response.list[i].dt_txt.substr(0,10))
                    var icon = $("<img>").addClass("card-text").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png" )
                    var p1= $("<p>").addClass("card-text").text("Temperature " + response.list[i].main.temp_max)
                    var p2= $("<p>").addClass("card-text").text("Humidity " + response.list[i].main.humidity)

                    body.append(icon)
                    col.append(card.append(body.append(date, icon, p1, p2)))

                    $("#forecast .row").append(col)

                }
            }

            }


        })
    }




})