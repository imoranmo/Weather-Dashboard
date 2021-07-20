var cityTextel = document.querySelector('.City')


var cityname ='San Diego'


var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=39b190096fa36624e1e4e84727dd3ec2';
  
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data.coord.lat; 
        var lon = data.coord.lon;
        cityTextel.textContent = data.name 
   console.log (data)
       
        var weatherAPi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon +'&units=imperial&appid=39b190096fa36624e1e4e84727dd3ec2'

        fetch(weatherAPi)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {

           console.log (data)  
          });
      });
  };

  getWeather(cityname)