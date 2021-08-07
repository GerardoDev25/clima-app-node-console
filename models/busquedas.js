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

   get paramsMapbox() {
      return {
         access_token: process.env.MAPBOX_KEY,
         limit: 5,
         language: "es",
      };
   }

   async ciudad(lugar = "") {
      try {
         const intance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox,
         });

         const resp = await intance.get();
         return resp.data.features.map((lugar) => ({
            id: lugar.id,
            name: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
         }));
      } catch (err) {
         return [];
      }
   }
}

module.exports = Busquedas;
