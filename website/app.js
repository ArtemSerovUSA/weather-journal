/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ae1ca9fc46f71d8a2045144757a19cfa&units=imperial';
const base = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

// GET Request to OpenWeatherMap API
const getData = async (base, zip, apiKey) => {
    const url = base+zip+apiKey;
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log(allData);
        return allData;
    }catch (e) {
        console.log("We've got an ERROR:", e);
    }
}

// POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(e) {
        console.log("We've got an ERROR:", e);
    }
};

// Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
        document.getElementById('content').innerHTML = `My Feelings: ${data.my_feelings}`;
        document.getElementById('feels').innerHTML = `Feels like: ${data.feels}`;
        document.getElementById('wind').innerHTML = `Wind Speed: ${data.wind}`;
        document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.icon}@2x.png">`;
        document.getElementById('city').innerHTML = `City: ${data.city}`;
        document.getElementById('visibility').innerHTML = `Visibility: ${data.visibility}`;
    } catch (e) {
        console.log("We've got an ERROR:", e);
    }
};

// GET Data - Post DATA - Update UI of the APP
document.getElementById('generate').addEventListener('click', generate);

function generate() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Get Data
    getData(base, zip, apiKey)
        .then(function (data){
            // Post Data
            postData('/add',{
                temp: Math.round(data.main.temp),
                feels: Math.round(data.main.feels_like),
                visibility: data.visibility,
                wind: data.wind.speed,
                icon: data.weather[0].icon,
                city: data.name,
                date: newDate,
                my_feelings: feelings,
            });
        })
        // Update UI
        .then(() => updateUI());
}
