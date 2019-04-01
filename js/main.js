window.onload = function(){

    var button = document.getElementsByClassName('request')[0];

    button.onclick = function(){

      // hier pak ik de inhoud van de input
      var result = document.getElementById('result').value;

      // hier pak ik de gehele container voor de afbeelding
      var divBG = document.getElementsByClassName('container')[0];

      //hier fetch ik de openweather API met als Query het resultaat van de input
      fetch('https://api.apixu.com/v1/current.json?key=37584b76510f41bb8bd141910191803&q='+result)
        .then(function(res){
          return res.json();
        })
        .then(function(data){

          //hieronder pak ik alle data van de API om later te tonen
          var temp = data.current.temp_c;
          var feels = data.current.feelslike_c;
          var wind = data.current.wind_kph;
          var locationN =  data.location.name;
          var locationR = data.location.region;
          var locationC = data.location.country;

          // Hier pak ik alle DOM elementen om die later te tonen en animaties aan toe te voegen
          var lTitle = document.getElementsByClassName('lTitle')[0];
          var locationDiv = document.getElementsByClassName('location')[0];
          var tempDiv = document.getElementsByClassName('temp')[0];
          var windDiv = document.getElementsByClassName('wind')[0];

          var aTitle = document.getElementsByClassName('aTitle')[0];
          var advice = document.getElementsByClassName('advice')[0];
          var tMeter = document.getElementsByClassName('tempAdvice')[0];
          var wMeter = document.getElementsByClassName('windAdvice')[0];


          //Hier kijk ik of er een locatie is ingevoerd zo niet kijkt hij naar het land
          if(locationR){
            locationDiv.innerHTML = "The location that you selected: " + locationN + ", " + locationR + ", " + locationC + ". ";
          }else{
            locationDiv.innerHTML = "The location that you selected: " + locationN + ", " + locationC + ". ";
          }

          tempDiv.innerHTML = "The tempature ATM is: " + temp + "&#x2103; and it feels like " + feels + "&#x2103; . ";
          windDiv.innerHTML = "The wind is going: " + wind + " kilometer per hour . ";

          var tempAdvice = true;
          var windAdvice = true;

          //Hieronder volgt een temperatuur check, om te kijken of de raket mag landen
          if(temp > -100 && temp < 0){
            //Extreem koud
            tMeter.innerHTML = "The tempature is extremely cold";
            tempAdvice = false;

          }if(temp >= 0 && temp < 11){
            //koud
            tMeter.innerHTML = "The tempature is cold.";

          }if(temp >= 11 && temp < 22){
            //Normaal
            tMeter.innerHTML = "The tempature is normal.";

          }if(temp >= 22 && temp < 32){
            //Heet
            tMeter.innerHTML = "The tempature is hot!";
            tempAdvice = false;

          }if(temp >= 32){
            //Extreem heet
            tMeter.innerHTML = "The tempature is extremely hot!";
            tempAdvice = false;
          }

          //wind advice
          if(wind <= 11 && wind >= 0){
            //Zacht
            wMeter.innerHTML = "The wind is in a PERFECT condition.";

          }if(wind >= 11 && wind < 28){
            //Normaal
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

          //Hier check ik of het advice goed is en als dat niet zo is dan zegt de applicatie dat de raket niet mag landen
          if(windAdvice && tempAdvice){
            advice.innerHTML = "You can safely land, both conditions are good!";
          }else{
            advice.innerHTML = "You can NOT safely land!";
          }

          //Hieronder geef ik animaties aan de tekst en de afbeelding van de resultaten
          TweenLite.set(lTitle, {opacity: 0, x: -150});
          TweenLite.to(lTitle, 0.5, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.4);
          TweenLite.set(locationDiv, {opacity: 0, x: -150});
          TweenLite.to(locationDiv, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.6);
          TweenLite.set(tempDiv, {opacity: 0, x: -150});
          TweenLite.to(tempDiv, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.8);
          TweenLite.set(windDiv, {opacity: 0, x: -150});
          TweenLite.to(windDiv, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(1);

          TweenLite.set(aTitle, {opacity: 0, x: -150});
          TweenLite.to(aTitle, 0.5, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.4);
          TweenLite.set(tMeter, {opacity: 0, x: -150});
          TweenLite.to(tMeter, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.6);
          TweenLite.set(wMeter, {opacity: 0, x: -150});
          TweenLite.to(wMeter, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(0.8);
          TweenLite.set(advice, {opacity: 0, x: -150});
          TweenLite.to(advice, 0.8, { ease: Power0.easeOut, opacity: 1, x: 0.1 }).delay(1);

          //Hier fetch ik de Unsplash API
          fetch('https://api.unsplash.com/search/photos/?client_id=479ba9cf6836ac0c108cdd6cf860fe09d65c6b18ee27ccd99094a952e33c3d07&query='+locationN)
          .then(function(res){
            return res.json();
          }).then(function(data){

            //Hieronder pak ik alle data die ik nodig heb uit de API
            var pResult = data.results[0].urls.full;
            var imgW = data.results[0].width;
            var imgH = data.results[0].height;

            document.getElementById('title').style.display = "none";
            document.getElementById('subTitle').style.display = "none";
            document.getElementsByClassName('input')[0].style.color = "#764EBE";

            lTitle.innerHTML = "Location variables";
            aTitle.innerHTML = "Final advice";

            TweenLite.set(divBG, {opacity: 0});
            TweenLite.to(divBG, 3.5, { opacity: 1});

            //Hier zorg ik ervoor dat alleen afbeeldingen worden getoond die verticaal zijn
            if(imgW >= imgH){
               divBG.style.backgroundImage = "url(" + pResult + ")";
             }else{
               for(i = 0; imgW <= imgH; i++){
                   pResult = data.results[i].urls.full;
                   divBG.style.backgroundImage = "url(" + pResult + ")";
               }
            }

          //hieronder worden alle error logs verklaart
          }).catch(function(error){
            console.log('unsplash, something went wrong', error);
          });
        })
        .catch(function(error){
          console.log('Weather, request FAILED ', error);
        });
    }
}
