// api information for current weather 
var yourApiKey = "ef8ea8087cbda61b4ebad7da96701611"

// $.get("api.openweathermap.org/data/2.5/weather?q={city name}&appid={yourApiKey}", function(data, status) {
//     console.log(data);
//     console.log(status);
// });

// // api.openweathermap.org/data/2.5/weather?q={city name}&appid={yourApiKey}



// api information for 5 day forecast 

$.get("http://api.openweathermap.org/data/2.5/forecast?q=Tampa&units=imperial&appid=ef8ea8087cbda61b4ebad7da96701611", function(data, status) {
    // console.log(data.list[0].main.temp_max);
    console.log(data.list);
// loop through array to check if dt_txt property includes a certain time in the day ex 12pm 
 for (var i = 0; i < data.list.length; i++) {
    // console.log(data.list[i].dt_txt);
    if (data.list[i].dt_txt.includes("12:00:00")) {
        console.log(data.list[i]);
    } 
};

});

