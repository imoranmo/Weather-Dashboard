var cityTextel = document.querySelector('.City');
var tempTextel = document.querySelector('.Temp');
var windTextel = document.querySelector('.Wind');
var humidityTextel = document.querySelector('.Humidity');
var uvTextel = document.querySelector('.UV');
var cityname = document.querySelector('#City');
var inputForm = document.querySelector('.btn');


var SubmitForm =  function (event) {
  event.preventDefault();
   var city = cityname.value.trim();
 console.log (city)
   if (city) {
    getWeather(city);

   }
}
var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=39b190096fa36624e1e4e84727dd3ec2';
  
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data.coord.lat; 
        var lon = data.coord.lon;
        var date = moment(data.coord.dt).format("l");
        var img = document.createElement("img");
        img.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        cityTextel.textContent = data.name + " (" + date + ")";
        cityTextel.appendChild(img);
   console.log (data)
       
        var weatherAPi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon +'&units=imperial&appid=39b190096fa36624e1e4e84727dd3ec2'

        fetch(weatherAPi)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
             tempTextel.textContent = 'Temp:' + " " + data.current.temp + " °F";
             windTextel.textContent = 'Wind:' + " " + data.current.wind_speed + " MPH";
             humidityTextel.textContent = 'Humidity:' + " " + data.current.humidity + " %";
             uvTextel.textContent = 'UV Index:' + " " + data.current.uvi;
             console.log (data)

             for (var i = 0; i < 5; i++) {
                var text = i + 1;
                var round = '.Date' + text;
                var round2 = '.Temp' + text;
                var round3 = '.Wind' + text;
                var round4 = '.Humi' + text;
                var time2 = moment(data.daily[i].dt).format("l");
                document.querySelector(round).textContent = time2;
                document.querySelector(round2).textContent = 'Temp:' + " " + data.daily[i].temp.max + " °F";
                document.querySelector(round3).textContent = 'Wind:' + " " + data.daily[i].wind_speed + " MPH";
                document.querySelector(round4).textContent = 'Humidity:' + " " + data.daily[i].humidity + " %";

                var img = document.createElement("img");
                img.src = 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png';
                document.querySelector(round).appendChild(img);
             }
    
 
          });
      });
  };

  

  inputForm.addEventListener('click', SubmitForm )