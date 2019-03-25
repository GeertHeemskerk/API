window.onload = function(){
    var button = document.getElementsByClassName('request')[0];

    button.onclick = function(){
      var result = document.getElementById('result').value;
      var divBG = document.getElementsByClassName('container')[0];

      fetch('http://api.apixu.com/v1/current.json?key=37584b76510f41bb8bd141910191803&q='+result)
        .then(function(res){
          return res.json();
        })
        .then(function(data){
          var temp = data.current.temp_c;
          var feels = data.current.feelslike_c;
          var wind = data.current.wind_kph;
          var locationN =  data.location.name;
          var locationR = data.location.region;
          var locationC = data.location.country;
          var advice = document.getElementsByClassName('advice')[0];
          var tMeter = document.getElementsByClassName('tempAdvice')[0];
          var wMeter = document.getElementsByClassName('windAdvice')[0];

          //Check if region is filled in
          if(locationR){
            document.getElementsByClassName('location')[0].innerHTML = "The location that you selected: " + locationN + ", " + locationR + ", " + locationC + ". ";
          }else{
            document.getElementsByClassName('location')[0].innerHTML = "The location that you selected: " + locationN + ", " + locationC + ". ";
          }

          document.getElementsByClassName('temp')[0].innerHTML = "The tempature ATM is: " + temp + "&#x2103; and it feels like " + feels + "&#x2103; . ";
          document.getElementsByClassName('wind')[0].innerHTML = "The wind is going: " + wind + " kilometer per hour . ";

          var tempAdvice = true;
          var windAdvice = true;

          //degrees advice
          if(temp > -100 && temp < 0){
            //extremely cold
            tMeter.innerHTML = "The tempature is extremely cold";
            tempAdvice = false;

          }if(temp >= 0 && temp < 11){
            //cold
            tMeter.innerHTML = "The tempature is cold.";

          }if(temp >= 11 && temp < 22){
            //normal
            tMeter.innerHTML = "The tempature is normal.";

          }if(temp >= 22 && temp < 32){
            //hot
            tMeter.innerHTML = "The tempature is hot!";
            tempAdvice = false;

          }if(temp >= 32){
            //extremely hot
            tMeter.innerHTML = "The tempature is extremely hot!";
            tempAdvice = false;
          }

          //wind advice
          if(wind <= 11 && wind >= 0){
            //Soft
            wMeter.innerHTML = "The wind is in a PERFECT condition.";

          }if(wind >= 11 && wind < 28){
            //Normal
            wMeter.innerHTML = "The wind is in a normal condition.";

          }if(wind >= 28 && wind < 61){
            //Hard
            wMeter.innerHTML = "The wind is in a rough condition.";
            windAdvice = false;

          }if(wind >= 62){
            //Storm
            wMeter.innerHTML = "The wind is in the WORST condition!";
            windAdvice = false;
          }

          if(windAdvice && tempAdvice){
            advice.innerHTML = "You can safely land, both conditions are good!";
          }else{
            advice.innerHTML = "You can NOT safely land!";
          }

        fetch('https://api.unsplash.com/search/photos/?client_id=479ba9cf6836ac0c108cdd6cf860fe09d65c6b18ee27ccd99094a952e33c3d07&query='+locationN)
        .then(function(res){
          return res.json();
        }).then(function(data){

          var pResult = data.results[0].urls.full;
          var imgW = data.results[0].width;
          var imgH = data.results[0].height;

          document.getElementById('title').style.display = "none";
          document.getElementById('subTitle').style.display = "none";
          document.getElementsByClassName('input')[0].style.color = "#764EBE";
          document.getElementsByClassName('lTitle')[0].innerHTML = "Location variables";
          document.getElementsByClassName('aTitle')[0].innerHTML = "Final advice";

          if(imgW >= imgH){
             divBG.style.backgroundImage = "url(" + pResult + ")";
           }else{
             for(i = 0; imgW <= imgH; i++){
                 pResult = data.results[i].urls.full;
                 divBG.style.backgroundImage = "url(" + pResult + ")";
                 console.log(i);
             }
          }
        })
        .catch(function(error){
          console.log('Weather, request FAILED ', error);
        });
    }
}
