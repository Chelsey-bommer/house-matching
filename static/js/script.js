/** Functie geeft dichtbije stedenlijst bij locatie **/
const loader = document.querySelector('div.loader')

function findLocation() {
  function success(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?radius=100&minPopulation=30000`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': '873fdd2e2fmsh81540b4d55e8862p18db48jsnd50b25f4c0ca'
      }
    }

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw 'failed to fetch data'
      })
      .then((objectData) => {

        /* Loop data in options in form */
        objectData.data.forEach(element => {
          function addCities() {
            const option = document.createElement('option');
            option.innerHTML = String(element.city)
            option.value = String(element.city)
            document.getElementById('huizen1').appendChild(option);

          }
          addCities()

        })
      })

      .catch((err) => console.error('Error:', err))
      .finally(() => {
        if (loader) {
          loader.classList.add('loading-animation')
        }
      })
  }



  function error() {
    console.log('Unable to retrieve your location')
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
}

findLocation()
