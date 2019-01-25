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
const loading = document.querySelector('.location');
const modal = document.querySelector('#simpleModal');
const about = document.querySelector('#about');
const closeBtn = document.querySelector('.closeBtn');



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
                    let highTemp = Math.round(day.apparentTemperatureHigh); 
                    let lowTemp = Math.round(day.apparentTemperatureLow);
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
                                        <h1> &#x2B06; ${highTemp}°F</h1>
                                        <h1> &#x2B07; ${lowTemp}°F</h1>
                                        <p>${summary}</p>
                                     </div>`;
                    div.className = 'box'; 
                    displayGrid.appendChild(div);
                })
            })
            loading.style.display = "none";
    }

    function error(e){
        console.log(e);
        alert('Oops! No location service..Try zipcode feature');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function closeModal() {
    console.log('abc');
    modal.style.display = "none";
}

function openModal() {
    modal.style.display = "block";
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

/************************* Event Listeners **************************/
locationButton.addEventListener('click', getDeviceLocation);
about.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

/*************************Window Load********************************/
window.onload = function() {
    getDeviceLocation(); 
}
