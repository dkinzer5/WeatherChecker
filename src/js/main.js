//Variables to build the Fetch URL
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const base = 'https://api.darksky.net/forecast/';
const key = 'dabb5db3df15680798d5c40bd2024ff4/';

//Grab elements from DOM
const locationButton = document.querySelector('#locationFinder');
const displayGrid = document.querySelector('#grid');
const boxes = document.querySelectorAll('.box');
console.log(boxes);

// Functions
function findLocation() {

    if(!navigator.geolocation) {
       console.log('OOPS');
    }

    function success(position) {
        console.log('yes');
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        let newUrl = base + key + latitude + ',' + longitude;
        console.log(newUrl);
        //Fetch data 
        fetch(corsProxyUrl + newUrl)
            .then(response => response.json())
            .then(data  => {
                console.log(data);
                let daily = data.daily.data;
                daily.forEach(day => {
                    let highTemp = day.apparentTemperatureHigh; 
                    let lowTemp = day.apparentTemperatureLow;
                    let summary = day.summary;
                    let div = document.createElement('div');
                    div.innerHTML = `<div class="day">
                                        <h1> Today </h1>
                                     </div>
                                     <div class="info">
                                        <p class="date">Jan 15, 2018</p>
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
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

locationButton.addEventListener('click', findLocation);