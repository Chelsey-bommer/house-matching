
/* functie gebeurd wanneer alles geladen is */
if (typeof window !== 'undefined') {
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

}









// to self:  'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/' + latitude + '+' + longitude + '/nearbyCities?radius=100&minPopulation=45000&distanceUnit=km'
