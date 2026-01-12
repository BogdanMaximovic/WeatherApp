// Define UI Vars
const place = document.getElementById('place');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const description = document.getElementById('description');
const mainForecast = document.getElementById('mainForecast');
const hidden = document.getElementById('hidden');
const forecastInfo = document.getElementById('forecastInfo');

document.getElementById('search').addEventListener('click',function(e){
    
	const city = document.getElementById('text').value
    if (!city) alert('Please insert city name!');
    const apiSite = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&';
    const apiKey = 'appid=d108ea747e0359604e7c0b4e531b4f6c';
    const url = apiSite + apiKey;

  function getForecast(data) {

        mainForecast.classList.add("d-block");
        forecastInfo.classList.add("d-block");
        hidden.classList.add("d-none");

        var cityName = data.city.name;
        var dateShort = data.list[0].dt_txt;
        var dateShort = String(dateShort).slice(10, 16);
        var kTemp = data.list[0].main.temp;
        var temperature = kTemp - 273;
        var temperature = temperature.toFixed(1);
        var icon = data.list[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var desc = data.list[0].weather[0].description;

        place.textContent = `${cityName}`;
        date.textContent = `${dateShort} h`;
        temp.textContent = `${temperature} °C`;
        weatherIcon.setAttribute("src", iconUrl);
        description.textContent = `${desc}`;

        let preparedForecast = prepareForecast(data.list);
        let forecastMoreInfo = forecastMore(data);
    }

    function loadJSON(path, success, error) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState === XMLHttpRequest.DONE) {
	            if (xhr.status === 200) {
	                if (success)
	                    success(JSON.parse(xhr.responseText));
	            } else {
	                if (error)
	                    error(xhr);
	            }
	        }
	    };
	    xhr.open("GET", path);
	    xhr.send();
	}
	loadJSON(url,getForecast)

});

function prepareForecast($days) {

    var data = [];

    for (var i = 0; i < $days.length; i += 8) {

        var date = $days[i].dt_txt;
        var date = String(date).slice(5);
        var temps = $days[i].main.temp;
        var temps = temps - 273;
        var temps = temps.toFixed(1);
        var icon = $days[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var cloud = $days[i].clouds.all;
        var descPath = $days[i].weather[0].description;
        var description = descPath.charAt(0).toUpperCase() + descPath.slice(1).toLowerCase();

        var prepared_day = {
            date: date,
            icon: iconUrl,
            cloud: cloud,
            description: description,
            temps: temps
        };

        data.push(prepared_day);

        var dateAndTime = document.getElementById("dateAndTime");
        var icon = document.getElementById("icon");
        var cloud = document.getElementById("cloud");
        var temp = document.getElementById("temperature");
        var desc = document.getElementById("desc");

        // create row in table
        var row = document.createElement("td");
        row.setAttribute('data-rb', i);
        var textDate = document.createTextNode(prepared_day.date);
        row.appendChild(textDate);
        dateAndTime.appendChild(row);

        var row = document.createElement("td");
        var rowImg = document.createElement("img");
        rowImg.setAttribute('src', iconUrl);
        icon.appendChild(row).appendChild(rowImg);

        var row = document.createElement("td");
        var textCloudy = document.createTextNode(`Cloudiness ${prepared_day.cloud} % `);
        row.appendChild(textCloudy);
        cloud.appendChild(row);

        var row = document.createElement("td");
        var textTemps = document.createTextNode(`${prepared_day.temps} °C `);
        row.appendChild(textTemps);
        temp.appendChild(row);

        var row = document.createElement("td");
        var textDescription = document.createTextNode(prepared_day.description);
        row.appendChild(textDescription);
        desc.appendChild(row);

    }
    return data;
}

function forecastMore(data) {

	document.getElementById('dateAndTime').addEventListener('click', function moreData(e){
		var row = e.target;
        var rb = row.getAttribute('data-rb');
        
        const forecastMoreInfo = document.getElementById('forecastMoreInfo');
        const moreInfo = document.getElementById('dateAndTime');
        forecastMoreInfo.classList.add("d-block"); 
        moreInfo.style.cursor = "pointer";

            function appendingInfo(forecastMore) {
            var arrayRow = [];
            
            for (var i = 0; i < list.length; i++) {

                // get data
                var hours = list[i].dt_txt;
                var hours = String(hours).slice(10, 16);
                var icon = list[i].weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                var temperature = list[i].main.temp;
                var temperature = temperature - 273;
                var temperature = temperature.toFixed(1);
                var descPath = list[i].weather[0].description;
                var descript = descPath.charAt(0).toUpperCase() + descPath.slice(1).toLowerCase();
                var humidity = list[i].main.humidity;
                var pressure = list[i].main.pressure;
                var wind = list[i].wind.speed;
                var wind = wind.toFixed(1);

                var thisDay = {
                    hours: hours,
                    icon: iconUrl,
                    temperature: temperature,
                    descript: descript,
                    humidity: humidity,
                    pressure: pressure,
                    wind: wind
                };
                arrayRow.push(thisDay);

                // Define UI Vars
                var hours = document.getElementById("hours");
                var icony = document.getElementById("icony");
                var temperatury = document.getElementById("temperatury");
                var descriptiony = document.getElementById("descriptiony");
                var humiditi = document.getElementById("humiditi");
                var pressuree = document.getElementById("pressuree");
                var windy = document.getElementById("windy");

                // create row in table
                var row = document.createElement("td");
                var textHours = document.createTextNode(`${thisDay.hours}h`);
                row.appendChild(textHours);
                hours.appendChild(row);

                var row = document.createElement("td");
                var rowicon = document.createElement("img");
                rowicon.setAttribute('src', iconUrl);
                icony.appendChild(row).appendChild(rowicon);

                var row = document.createElement("td");
                var textTemperature = document.createTextNode(`${thisDay.temperature} °C `);
                row.appendChild(textTemperature);
                temperatury.appendChild(row);

                var row = document.createElement("td");
                var textDesc = document.createTextNode(`${thisDay.descript}`);
                row.appendChild(textDesc);
                descriptiony.appendChild(row);

                var row = document.createElement("td");
                var textHumidity = document.createTextNode(`Humidity ${thisDay.humidity} % `);
                row.appendChild(textHumidity);
                humiditi.appendChild(row);

                var row = document.createElement("td");
                var textPresure = document.createTextNode(`${thisDay.pressure} Pa `);
                row.appendChild(textPresure);
                pressuree.appendChild(row);

                var row = document.createElement("td");
                var textWind = document.createTextNode(`${thisDay.wind} m/s `);
                row.appendChild(textWind);
                windy.appendChild(row);

            }

            return arrayRow;
           
        };

    function removeEv(forecastMore){
        const rowDay = document.getElementById("dateAndTime");
        rowDay.removeEventListener("click", moreData);
    }

        if (rb == 0) {
            var list = data.list.slice(0, 8)
            appendingInfo(forecastMore);
            removeEv(forecastMore);
        } else if (rb == 8) {
            var list = data.list.slice(8, 16)
            appendingInfo(forecastMore);
            removeEv(forecastMore);
        } else if (rb == 16) {
            var list = data.list.slice(16, 24)
            appendingInfo(forecastMore);
           removeEv(forecastMore);
        } else if (rb == 24) {
            var list = data.list.slice(24, 32)
            appendingInfo(forecastMore);
            removeEv(forecastMore);
        } else {
            var list = data.list.slice(32)
            appendingInfo(forecastMore);
            removeEv(forecastMore);
       }
    })
}
