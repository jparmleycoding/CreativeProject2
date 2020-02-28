document.getElementById("Click").addEventListener('click', function(event) {
  event.preventDefault();
  let day = document.getElementById('dayInput').value;
  let s = document.getElementById('selector');
  let month = s.options[s.selectedIndex].value;
  //if (day === "") {return;}
  const url = "https://calendarific.com/api/v2/holidays?&api_key=1e8987608eae734d15e2db76ca694f131982c563&country=US&year=2020&month=" + month + "&day=" + day;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let fedCheck = false;
    let fedHol = "<h2>Federal Holiday:</h2>";
    let genHol = "";
    for (let i = 0; i < json.response.holidays.length; i++) {
      if (json.response.holidays[i].type[0] == "National holiday") {
        fedCheck = true;
        fedHol += "<h3>" + json.response.holidays[i].name + "</h3>";
      }
      genHol += "<h3>" + json.response.holidays[i].name + " - " + json.response.holidays[i].type[0] + "</h3>";
      genHol += "<p>" + json.response.holidays[i].description + "<p>"
    }
    if (!fedCheck) { fedHol = "<h2>No Federal Holidays</h2>"; }
    document.getElementById("resultsFD").innerHTML = fedHol;
    document.getElementById("resultsGH").innerHTML = genHol;
    let wcHour = "";
    if (!fedCheck) {
      wcHour += "<h2>We're Open!</h2><p>Our regular hours are as follows:<br>Mon-Fri: 9am-9pm<br>Sat-Sun: 9am-12pm</p>";
    }
    else {
      wcHour += "<h2>Sorry!</h2><p>We're closed due to a federal holiday.</p>";
    }
    document.getElementById('resultsWC').innerHTML = wcHour;
  })
});
