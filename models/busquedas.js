const axios = require("axios");

class Busquedas {
   historial = [
      "Taria",
      "Santa Cruz",
      "La paz",
      "Cochabanba",
      "Sucre",
      "Pando",
   ];

   constructor() {}

   async ciudad(lugar = "") {
      try {
         const res = await axios.get(
            "https://api.mapbox.com/geocoding/v5/mapbox.places/bogota.json?access_token=pk.eyJ1IjoiZ215b2Rlc2Fycm9sbGFkb3IyMyIsImEiOiJja3Mwd296anEwOTg0MndyeTdnOHE5enFsIn0.lkS6T8uSbmPH46JbF4vkyw&autocomplete=true&limit=8&language=es&="
         );
         console.log(res.data);

         return [];
      } catch (err) {
         return [];
      }
   }
}

module.exports = Busquedas;
