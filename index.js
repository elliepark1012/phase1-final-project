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
    console.log("hey")

    getJSON(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11693/${dateString}?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=json`,
    function(err, data) {
    if(err !== null) {
    alert('unexpected error' + err);
    } else {
      console.log("hello");
    loadWeather(data);
    hourly(data)
    
    }
  });
  console.log("I");
  // fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/chicago%20il?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=jsonttps://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11693/${dateString}?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=json')
  //   .then(resp => resp.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))


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
      icon.innerHTML = `<img src='https://www.visualcrossing.com/img/${data.days[0].icon}.svg' />`;
    }

    let container, df;
    document.addEventListener('DOMContentLoaded', hourly);

    function hourly(data){
    container = document.getElementById('container');
    
        data.days[0].hours.forEach((hours)=>{
            const div = document.createElement('div');
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
            // div = "hotdog";
        });
    }

    buttonGoogleMap = document.getElementById("googlemap");
    buttonGoogleMap.addEventListener("click",function(){
      document.location.href ='https://www.google.com/maps'
    });
    buttonFerry = document.getElementById("ferry");
    buttonFerry.addEventListener("mouseover", function(){
      let img = document.getElementById('timetable')
      let weekendFinder = today.getDay()
      if (weekendFinder === 0 || weekendFinder === 6) {
        console.log('weekend')
        return (img.src='./weekend.png') 
      } else {
        console.log('weekday')
        return (img.src='./weekday.png')
      }
    })

  //  Live Coding - Change your ferry schedule click event to a mouseover event. 
  //  When the person puts their mouseover the icon the appropriate picture (based on the day of the week) 
  //  should come up in the DOM. Make a div with an id of ferryContainer that initially contains the ferry 
  //  picture but switches to the schedule once the mouseover event fires.

  // change to mouseover 
  // a new div id="ferryContainer" with ferry pictures  
  // make img tag 
  // figure out weekday or weekend 
  // setting the right src  
  // .apend weekday /weekend pics to div 
//   const d = new Date();
// let day = d.getDay();
// Get the day of the week of a specific date:

// const d = new Date("July 21, 1983 01:15:00");
// let day = d.getDay();---0,6 weeekend