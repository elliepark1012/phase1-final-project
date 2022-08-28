

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
    
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11693/${dateString}?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=json`

    getJSON(url,
    function(err, data) {
    if(err !== null) {
    alert('unexpected error' + err);
    } else {
    loadWeather(data);
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
      let iconSet = data.days[0].icon;

    
      date.append (`Today is ${data.days[0].datetime}`);
      temp.append (`Current Temperature: ${data.days[0].temp} °F`);
      description.append (`${data.description}`);
      tempMax.append (`Max Temperature: ${data.days[0].tempmax} °F`);
      tempMin.append (`Min Temperature: ${data.days[0].tempmin} °F`);
      humidity.append (`Humidity: ${data.days[0].humidity}`);
      sunrise.append (`Sunrise Time: ${data.days[0].sunrise}`);
      sunset.append (`Sunset Time: ${data.days[0].sunset}`);
      icon.innerHTML = `<img src='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?${iconSet}=icons1&aggregateHours=24&combinationMethod=aggregate&shortColumnNames=true&contentType=json&unitGroup=metric&locationMode=single&locations=49.1791,-122.3161&forecastDays=7&key=276XSQHSHP7GMC4YFTCXB24NG'>`;
      
    }

let req = new Request(url, {method:'GET'});
let container, df;

document.addEventListener('DOMContentLoaded', init);

function init(){
    container = document.getElementById('container');
    df = new DocumentFragment();
    
    fetch(req)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('BAD HTTP');
        }
    })
    .then((json)=>{
        json.days.forEach((hours)=>{
            let div = document.createElement('div');
            div.classList.add('hour');
            let timestamp = hours.datetime;
            div.id = 'ts_' + timestamp.toString();
            let temp = parseInt(hours.temperature);
            div.textContent = temp.toString().concat('\u00B0');
            div.title = hours.summary;
          
            let span = document.createElement('span');
            let timmy = new Date(timestamp * 1000);
            span.textContent = timmy.getHours().toString().concat(":00");
            
            div.appendChild(span);
            df.appendChild(div);
        });
        container.appendChild(df);
    })
    .catch((err)=>{
        console.log( err.message );
    })
  }




    // function hourly(){
    //     data.days.hours.forEach((hours) => {
    //       let div = document.createElement('div');
    //       div.classList.add('hour');
    //       let timeStamp = hours.datetime;
    //       div.id = 'ts_' + timeStamp.toString();
    //       let tempHourly = parseInt(hours.temp);
    //       div.textContent = tempHourly.toString().concat('\u0000');
    //       div.title = hours.summary;

    //       let span = document.createElement('span');
    //       span.textContent = "0:00";

    //       let temp = parseInt

    //       div.appendChild(span);
    //       df.appendChild(div);
    //     });
    //     container.appendChild(df);
    //   }



    buttonGoogleMap = document.getElementById("googlemap");
    buttonGoogleMap.addEventListener("click",function(){
      document.location.href ='https://www.google.com/maps'
    });


    buttonFerry = document.getElementById("ferry");
    buttonFerry.addEventListener("click", function(){
    document.location.href = 'https://www.ferry.nyc/routes-and-schedules/route/rockaway/';
})
