// Define UI Vars
const mainInfo = document.getElementById('mainInfo');
const hidden = document.getElementById('hidden');
const main = document.getElementById('main');
const place = document.getElementById('location');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const weather_icon = document.getElementById('weather_icon');
const moreWeatherInfo = document.getElementById('moreWeatherInfo');
const infoWeather = document.getElementById('infoWeather');

// search for weather info
document.getElementById('search').addEventListener('click', function(){
	
	const city = document.getElementById('text').value
	if (!city) alert('Please insert city name!');
	const apiSite = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&';
    const apiKey = 'appid=a4c35d01517f9258aa465d9e2f5baff8';
    const url = apiSite + apiKey;

	function getWeather(data) {
		
		hidden.classList.add("d-none");
        mainInfo.classList.add("d-block");
        mainInfo.classList.add("d-block");
        infoWeather.classList.add("d-none");

		// calculating whether it's day or night
	    const date = new Date();
	    var sunrise = new Date(data.sys.sunrise * 1000);
	    var sunset = new Date(data.sys.sunset * 1000);

		// icons for day or night
		if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
		const weatherIconID = `wi wi-owm-day-${data.weather[0].id}`;
		} else if (date.getHours() >= sunset.getHours()) {
		const weatherIconID = `wi wi-owm-night-${data.weather[0].id}`;
		}
	    var sunrise = String(sunrise).slice(16, 25);
	    var sunset = String(sunset).slice(16, 25);

        // weather icon
        const icon = data.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";

        // Calculating Kelvin temp.
        const kTemp = data.main.temp;
        const temperature = kTemp - 273;

        // getting a background image based on weather condition
        const word_desc = data.weather[0].main;
        background_image = get_bkg_img(word_desc);

        // basic info
        place.textContent = data.name;
        country.textContent = data.sys.country;
        temp.textContent = temperature.toFixed(1) + ' °C';
        weather_icon.setAttribute("src", iconUrl);
        mainInfo.style.backgroundImage = "url(frc-bkg/" + background_image + ")";
        
        //more info
        moreWeatherInfo.addEventListener('click', function(){

        	infoWeather.classList.add("d-block");

            let cloudy = data.clouds.all;
            let humiditi = data.main.humidity;
            let pressures = data.main.pressure;
            let windSpeed = data.wind.speed;
            let descriptions = data.weather[0].description;

            const cloud = document.getElementById('cloud');
            const humidity = document.getElementById('humidity');
            const pressure = document.getElementById('pressure');
            const wind = document.getElementById('wind');
            const sunrises = document.getElementById('sunrises');
            const sunsets = document.getElementById('sunsets');
            const description = document.getElementById('description');

            cloud.textContent = ` Cloudiness ${cloudy} % `;
            humidity.textContent = ` Humidity ${humiditi} % `;
            pressure.textContent = ` Presure ${pressures} Pa `;
            wind.textContent = ` Wind speed ${windSpeed}  m/s `;
            sunrises.textContent = ` Sunrise at ${sunrise}  AM `;
            sunsets.textContent = ` Sunset at ${sunset}  PM `;
            description.textContent = ` Above us is ${descriptions}. Enjoy in the weather.`;
        })
    };
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
	loadJSON(url,getWeather)
});


function get_bkg_img(word_desc) {
    
    let weather_condition_backgrounds = {
        'Thunderstorm': 'thunderstormy.png',
        'Drizzle': 'drizzly.png',
        'Rain': 'rainday.png',
        'Snow': 'snowy.png',
        'Clear': 'skyclean.png',
        'Clouds': 'cloud.png',
        'default': 'defalty.png',
    };

    if (word_desc in weather_condition_backgrounds) {
        background_image = weather_condition_backgrounds[word_desc];
    } else {
        background_image = weather_condition_backgrounds['default'];
    }
    return background_image;
};

function reLoad(){
    location.reload();
};

function getBackground(){
    let documentBody = document.body;
    documentBody.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
    documentBody.style.fontFamily = "sans-serif";
    documentBody.style.height = "100vh";
    // for other browsers
    documentBody.style.backgroundImage = "-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,0.7)),to(rgba(0,0,0,0.7))),url(bkg/back.png)";
    documentBody.style.backgroundImage = "-moz-linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
    documentBody.style.backgroundImage = "-o-linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
}
