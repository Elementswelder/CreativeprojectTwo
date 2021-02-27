fetch('https://api.covid19api.com/summary')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
    let resultsNew = "";
    console.log(json);
    results += '<p>Total Deaths Worldwide: </p><span>' + numberWithCommas(json.Global.TotalDeaths) + '</span>';
    results += '<p>Total Cases Worldwide: </p><span>' + numberWithCommas(json.Global.TotalConfirmed) + '</span>';
    results += '<p>Total Recoverd Worldwide: </p><span>' + numberWithCommas(json.Global.TotalRecovered) + '</span>';

    resultsNew += '<p>New Deaths TODAY: </p><span>' + numberWithCommas(json.Global.NewDeaths) + '</span>';
    resultsNew += '<p>New Cases TODAY: </p><span>' + numberWithCommas(json.Global.NewConfirmed) + '</span>';
    resultsNew += '<p>New Recovered TODAY: </p><span>' + numberWithCommas(json.Global.NewRecovered) + '</span>';

       document.getElementById("totalNumber").innerHTML = results;
       document.getElementById("totalNew").innerHTML = resultsNew;
  });

  document.getElementById("countrySubmit").addEventListener('click', function(event){
    event.preventDefault();
    const valueTwo = document.getElementById("input").value;
    if (valueTwo == ""){
      return;
    }
    else {
      newValue = valueTwo.toLowerCase();
      console.log(newValue);
      whiteSpaceRemove(newValue);
    }
    const newUrl = "https://api.covid19api.com/country/" + newValue + "/status/confirmed";
    fetch(newUrl)
    .then(function(response){
      return response.json();
    }) .then(function(json){

    let resultsCountry = "";

    resultsCountry += "<span>" + valueTwo + "</span>";
    resultsCountry += '<p>Has COVID?: </p><span>' + json[json.length-1].Status.capitalize() + '</span>';
    resultsCountry += '<p>Total Confimed Cases</p><span>' + numberWithCommas(json[json.length-1].Cases) + '</span>';


    document.getElementById("countryInfo").innerHTML = resultsCountry;
    })
  });

  fetch('https://api.covid19api.com/version')
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let info = "";
      console.log(json);
      info += "Version: " + json;
      info += "<p>To learn more about this API please click <a href='https://documenter.getpostman.com/view/10808728/SzS8rjbc#83c6f85b-9617-4378-b5bc-c9c0e17dbc5d'>HERE</a></p>";


         document.getElementById("api").innerHTML = info;
    });



function whiteSpaceRemove(string) {
  newString = string.replace(/\s/g, "-");
  console.log(newString);
  return newString;
}


  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



//Turn countries into slugs https://api.covid19api.com/countries

// Have a thanks COVID api at the bottom or a page that credits them with all the info https://api.covid19api.com/stats
