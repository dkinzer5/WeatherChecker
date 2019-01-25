//Variables to build the Fetch URL
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const base = 'https://api.darksky.net/forecast/';
const key = 'dabb5db3df15680798d5c40bd2024ff4/';
let longitude = ''; //-118.243683
let latitude = ''; //34.052235

//Make days and months array
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];

//Grab elements from DOM
const locationButton = document.querySelector('#locationFinder');
const displayGrid = document.querySelector('#grid');
const boxes = document.querySelectorAll('.box');



/**************************  Functions *******************************/
function getDeviceLocation() {

    if(!navigator.geolocation) {
       console.log('Not supported by browser');
    }

    function success(position) {
        console.log('Success!');
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        let newUrl = base + key + latitude + ',' + longitude;

        // Fetch data 
        fetch(corsProxyUrl + newUrl)
            .then(response => response.json())
            .then(data  => {
                let daily = data.daily.data;
                daily.forEach(day => {
                    //get temps and weather summary
                    let highTemp = day.apparentTemperatureHigh; 
                    let lowTemp = day.apparentTemperatureLow;
                    let summary = day.summary;
                    //get timestamp and convert to date
                    let timestamp = day.time;
                    let fullDate = new Date(timestamp * 1000);
                    let namedDay = days[fullDate.getDay()];
                    let date = fullDate.getDate();
                    let month = fullDate.getMonth();
                    let year = fullDate.getFullYear(0);
                    let div = document.createElement('div');
                    div.innerHTML = `<div class="day">
                                        <h1> ${namedDay} </h1>
                                     </div>
                                     <div class="info">
                                        <p class="date">${months[month]} ${date}, ${year}</p>
                                        <h1>${highTemp} / ${lowTemp}</h1>
                                        <p>${summary}</p>
                                     </div>`;
                    div.className = 'box'; 
                    displayGrid.appendChild(div);
                })
            })

    }

    function error(e){
        console.log(e);
        alert('Oops! No location service..Try zipcode feature');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}


/************************* Event Listeners **************************/
locationButton.addEventListener('click', getDeviceLocation);


window.onload = function() {
    getDeviceLocation();  
}