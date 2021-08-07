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
         console.log(resp.data);

         return [];
      } catch (err) {
         return [];
      }
   }
}

module.exports = Busquedas;
