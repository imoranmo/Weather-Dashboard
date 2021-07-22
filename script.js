var cityTextel = document.querySelector('.City');
var tempTextel = document.querySelector('.Temp');
var windTextel = document.querySelector('.Wind');
var humidityTextel = document.querySelector('.Humidity');
var uvTextel = document.querySelector('.UV');
var cityname = document.querySelector('#City');
var inputForm = document.querySelector('.btn');
var cityBtn = document.querySelector('#City-buttons');
var array =[]


var SubmitForm =  function (event) {
  event.preventDefault();
   var city = cityname.value.trim();
 console.log (city)
   if (city) {
    getWeather(city);

   }
}

 function getArray() {

  var storedArray = JSON.parse(localStorage.getItem("array"));

  if (storedArray !== null) {
    array = storedArray;
  }

 }

 function storeArray() {
 
  localStorage.setItem("array", JSON.stringify(array));
}

function createButton (name) {
 var maincity = name
  if (array.length === 0 ){
    array.push(maincity);
    var newcity = document.createElement('button');
    newcity.classList = 'btn col-12';
    newcity.textContent = maincity;
    newcity.setAttribute ('city', maincity);
    cityBtn.appendChild (newcity);
    maincity ="";

  } else if ( array.length > 0){
    array.push(maincity);

  for (var i = 0; i < array.length; i++) {
    var currentCity = array[i]
    var namecheck = Boolean (currentCity !== name)

    console.log (namecheck)

    if (namecheck === false)
      var newcity = document.createElement('button');
      newcity.classList = 'btn col-12';
      newcity.textContent = currentCity;
      newcity.setAttribute ('city', currentCity);
      cityBtn.appendChild (newcity);

 }}
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
        var name = data.name.trim();
        img.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        cityTextel.textContent = data.name + " (" + date + ")";
        cityTextel.appendChild(img);
        console.log (data);
        
        createButton(name)

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
             var uviIndex = data.current.uvi
             console.log (data)

              if (uviIndex <=2) {
                 uvTextel.style.background ='green';
                 uvTextel.style.color ='white';
              }

              if (uviIndex >=3 && uviIndex <=5) {
                uvTextel.style.background ='yellow';
             }
             if (uviIndex >=6 && uviIndex <=7) {
              uvTextel.style.background ='orange';
              uvTextel.style.color ='white';
              } 

            if (uviIndex >=8 && uviIndex <=10) {
              uvTextel.style.background ='red';
             uvTextel.style.color ='white';
             } 

             if (uviIndex >=11) {
              uvTextel.style.background ='purple';
              uvTextel.style.color ='white';
           }

             for (var i = 1; i <= 5; i++) {
                var round = '.Date' + i;
                var round2 = '.Temp' + i;
                var round3 = '.Wind' + i;
                var round4 = '.Humi' + i;
                var time2 = moment.unix(data.daily[i].dt).format("l");
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

  var cityButtonClick = function (event) {
     var city = event.target.getAttribute ('city')

     if(city) {
      getWeather (city)

     }
  }
  

  inputForm.addEventListener('click', SubmitForm )
  cityBtn.addEventListener('click', cityButtonClick)