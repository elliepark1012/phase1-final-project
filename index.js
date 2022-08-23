
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
    
    getJSON('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11693/2022-08-18/2022-08-20?unitGroup=us&key=276XSQHSHP7GMC4YFTCXB24NG&contentType=json',
    function(err, data) {
    if(err !== null) {
    alert('예상치 못한 오류 발생.' + err);
    } else {
    loadWeather(data);
    }
    });

    function loadWeather(data) {
      let range=document.querySelector('.range');
      let date = document.querySelector('.date');
      let tempMax= document.querySelector('.tempmax');
      let tempMin= document.querySelector('.tempmin');
      let temp = document.querySelector('.temp');
      let humidity= document.querySelector('.humidity');
      let sunrise= document.querySelector('.sunrise');
      let sunset=document.querySelector('.sunset');
      let description=document.querySelector('.description');
      let icon=document.querySelector('.icon');
      let weatherIcon = data.days[0].icon;

      range.append(`Weather from ${data.days[0].datetime} to ${data.days[2].datetime}`);
      date.append (`Today is: ${data.days[0].datetime}`);
      temp.append (`Current Temperature: ${data.days[0].temp} °F`);
      description.append (`${data.days[0].description}`);
      tempMax.append (`Max Temperature: ${data.days[0].tempmax} °F`);
      tempMin.append (`Min Temperature: ${data.days[0].tempmin} °F`);
      humidity.append (`Humidity: ${data.days[0].humidity}`);
      sunrise.append (`Sunrise Time: ${data.days[0].sunrise}`);
      sunset.append (`Sunset Time: ${data.days[0].sunset}`);
      icon.innerHTML = `<img src='https://www.visualcrossing.com/img/${weatherIcon}.3f13edae.svg'>`;
      
    }
    

 