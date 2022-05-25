/* functie voor form visibility */
window.addEventListener("load", () => {
  document.getElementById("text1").style.display = "none";

  document.getElementById("huizen1").style.display = "block";

  document.getElementById("text2").style.display = "none";

  document.getElementById("slider").style.display = "block";
});

function findLocation() {
  const functionStatus = document.querySelector("#status");

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?radius=100&minPopulation=25000`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": `873fdd2e2fmsh81540b4d55e8862p18db48jsnd50b25f4c0ca`,
      },
    };

    let obj;
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => (obj = data))
      .then(() => console.log(obj.data))

      .then(() => {
        const objec = String(obj.data[4].city);
        const kop = document.getElementById("stad5");
        kop.innerHTML = objec;
        document.getElementById("stad5").value = objec;
      })

      .then(() => {
        const objec = String(obj.data[3].city);
        const kop = document.getElementById("stad4");
        kop.innerHTML = objec;
        document.getElementById("stad4").value = objec;
      })

      .then(() => {
        const objec = String(obj.data[2].city);
        const kop = document.getElementById("stad3");
        kop.innerHTML = objec;
        document.getElementById("stad3").value = objec;
      })

      .then(() => {
        const objec = String(obj.data[1].city);
        const kop = document.getElementById("stad2");
        kop.innerHTML = objec;
        document.getElementById("stad2").value = objec;
      })

      .finally(() => {
        const objec = String(obj.data[0].city);
        const kop = document.getElementById("stad1");
        kop.innerHTML = objec;
        document.getElementById("stad1").value = objec;
      })

      .catch((err) => console.error("error:" + err));
  }

  function error() {
    functionStatus.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    functionStatus.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

findLocation();
