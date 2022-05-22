/* functie voor form visibility */
window.addEventListener("load", () => {
  document.getElementById("text1").style.display = "none";

  document.getElementById("huizen1").style.display = "block";

  document.getElementById("text2").style.display = "none";

  document.getElementById("slider").style.display = "block";
});

//globalThis.latitude = "";
globalThis.longitude = "";

function findLocation() {
  const functionStatus = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {

    latitude = position.coords.latitude;
    String(latitude)
    longitude = position.coords.longitude;
    String(longitude)
    console.log(latitude, longitude);

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": `873fdd2e2fmsh81540b4d55e8862p18db48jsnd50b25f4c0ca`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));


    functionStatus.textContent = "";
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    functionStatus.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    functionStatus.textContent = "Geolocation is not supported by your browser";
  } else {
    functionStatus.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find-me").addEventListener("click", findLocation);
