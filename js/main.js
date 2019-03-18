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
          var advice = document.getElementsByClassName('advice')[0];

          document.getElementsByClassName('temp')[0].innerHTML = "The tempature ATM is: " + temp + " &#x2103; and it feels like " + feels + " &#x2103;";
          document.getElementsByClassName('wind')[0].innerHTML = "The wind is going: " + wind + " kilometer per hour";

          //wind advice
          if(wind <= 11 && wind >= 0){
            //Soft
            advice.innerHTML = "The wind is in a PERFECT condition to land!";

          }if(wind >= 12 && wind < 28){
            //Normal
            advice.innerHTML = "The wind is in a normal condition to land!";

          }if(wind >= 28 && wind < 61){
            //Hard
            advice.innerHTML = "The wind is in a rough condition to land!";

          }if(wind >= 62){
            //Storm
            advice.innerHTML = "The wind is in the WORST condition to land!";
          }

          //degrees advice



        })
        .catch(function(error){
          console.log('FAILED REQUEST', error);
        });
    }
}
