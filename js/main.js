window.onload = function(){
    var button = document.getElementsByClassName('request')[0];

    button.onclick = function(){
      var city = document.getElementById('city').value;


      fetch('http://api.apixu.com/v1/current.json?key=37584b76510f41bb8bd141910191803&q='+city)
        .then(function(res){
          return res.json();
        })
        .then(function(data){
          console.log(data);
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
            document.getElementsByClassName('location')[0].innerHTML = "The location that you selected: " + locationN + " , " + locationR + " , " + locationC;
          }else{
            document.getElementsByClassName('location')[0].innerHTML = "The location that you selected: " + locationN + " , " + locationC;
          }

          document.getElementsByClassName('temp')[0].innerHTML = "The tempature ATM is: " + temp + " &#x2103; and it feels like " + feels + " &#x2103;";
          document.getElementsByClassName('wind')[0].innerHTML = "The wind is going: " + wind + " kilometer per hour";

          var tempAdvice = true;
          var windAdvice = true;

          //degrees advice
          if(temp > -100){
            //extremely cold
            tMeter.innerHTML = "The tempature is extremely cold, DONT LAND!";
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
            advice.innerHTML = "You can NOT safely land";
          }

        })
        .catch(function(error){
          console.log('FAILED REQUEST', error);
        });
    }
}
