
/* functie gebeurd wanneer alles geladen is */
window.addEventListener('load', () => {

  /* Haalt de textfield weg */
  document.getElementById("text1").style.display = "none";

  /* Voegt de dropdown toe */
  document.getElementById("huizen1").style.display = "block";

  /* Haalt de textfield weg */
  document.getElementById("text2").style.display = "none";

  /* Voegt de slider toe */
  document.getElementById("slider").style.display = "block";

});




globalThis.latitude
globalThis.longitude


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

 function success(position) {
    latitude  =   position.coords.latitude;
    longitude =   position.coords.longitude;

    
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?radius=100?minPopulation=20000`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host':'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': `873fdd2e2fmsh81540b4d55e8862p18db48jsnd50b25f4c0ca`
      }
    };

    fetch(url, options)
	  .then(res => res.json())
	  .then(json => console.log(json))
   	.catch(err => console.error('error:' + err));
    

    console.log(url);

    status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

  
}



document.querySelector('#find-me').addEventListener('click', geoFindMe);



















