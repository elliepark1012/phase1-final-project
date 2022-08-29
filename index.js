let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let dateString = year + '-' + month  + '-' + day;

  const getJSON = function(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        const status = xhr.status;
        if(status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    };
  
    getJSON(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11693/${dateString}?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=json`,
    function(err, data) {
    if(err !== null) {
    alert('unexpected error' + err);
    } else {
    loadWeather(data);
    hourly(data)
    }
  });

    function loadWeather(data) {
      let date = document.querySelector('.date');
      let tempMax= document.querySelector('.tempmax');
      let tempMin= document.querySelector('.tempmin');
      let temp = document.querySelector('.temp');
      let humidity= document.querySelector('.humidity');
      let sunrise= document.querySelector('.sunrise');
      let sunset=document.querySelector('.sunset');
      let description=document.querySelector('.description');
      let icon=document.querySelector('.icon');

      date.append (`Today is ${data.days[0].datetime}`);
      temp.append (`Current Temperature: ${data.days[0].temp} °F`);
      description.append (`${data.description}`);
      tempMax.append (`Max Temperature: ${data.days[0].tempmax} °F`);
      tempMin.append (`Min Temperature: ${data.days[0].tempmin} °F`);
      humidity.append (`Humidity: ${data.days[0].humidity}`);
      sunrise.append (`Sunrise Time: ${data.days[0].sunrise}`);
      sunset.append (`Sunset Time: ${data.days[0].sunset}`);
      icon.innerHTML = `<img src='https://www.visualcrossing.com/img/${data.days[0].icon}.3f13edae.svg' />`;
    }

    let container, df;
    document.addEventListener('DOMContentLoaded', hourly);

    function hourly(data){
    container = document.getElementById('container');

        data.days[0].hours.forEach((hours)=>{
            let div = document.createElement('div');
            div.classList.add('hour');
            let timestamp = hours.datetime;
            div.id = 'ts_' + timestamp.toString();
            let temperature = parseInt(hours.temp);
            div.textContent = temperature.toString().concat('\u00B0');
            div.title = hours.summary;
          
            let span = document.createElement('span');
            span.textContent = timestamp
            
            div.appendChild(span);
            container.appendChild(div);
        });
    }

    buttonGoogleMap = document.getElementById("googlemap");
    buttonGoogleMap.addEventListener("click",function(){
      document.location.href ='https://www.google.com/maps'
    });
    buttonFerry = document.getElementById("ferry");
    buttonFerry.addEventListener("click", function(){
    document.location.href = 'https://www.ferry.nyc/routes-and-schedules/route/rockaway/';
    })
