/** functie voor form visibility **/
window.addEventListener('load', () => {
  document.getElementById('text1').style.display = 'none';
  document.getElementById('huizen1').style.display = 'block';
});


/** Functie geeft dichtbije stedenlijst bij locatie **/
function findLocation ()  {
  function success (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let obj;

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?radius=100&minPopulation=30000`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': '873fdd2e2fmsh81540b4d55e8862p18db48jsnd50b25f4c0ca'
      }
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => (obj = data))
      .then(() => console.log(obj.data))

      .then(() => {
        const objec = String(obj.data[4].city);
        const kop = document.getElementById('stad5');
        kop.innerHTML = objec;
        document.getElementById('stad5').value = objec;
      })

      .then(() => {
        const objec = String(obj.data[3].city);
        const kop = document.getElementById('stad4');
        kop.innerHTML = objec;
        document.getElementById('stad4').value = objec;
      })

      .then(() => {
        const objec = String(obj.data[2].city);
        const kop = document.getElementById('stad3');
        kop.innerHTML = objec;
        document.getElementById('stad3').value = objec;
      })

      .then(() => {
        const objec = String(obj.data[1].city);
        const kop = document.getElementById('stad2');
        kop.innerHTML = objec;
        document.getElementById('stad2').value = objec;
      })

      .finally(() => {
        const objec = String(obj.data[0].city);
        const kop = document.getElementById('stad1');
        kop.innerHTML = objec;
        document.getElementById('stad1').value = objec;
      })

      .catch((err) => console.error('error:' + err));
  }

  function error () {
    console.log('Unable to retrieve your location');
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

findLocation();
