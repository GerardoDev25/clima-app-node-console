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

   get paramsOpenWeather() {
      return {
         appid: process.env.OPENWEATHER_KEY,
         units: "metric",
         lang: "es",
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

   async climaLugar(lat, lon) {
      try {
         const intance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.paramsOpenWeather, lat, lon },
         });

         const resp = await intance.get();
         const { weather, main } = resp.data;

         return {
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp,
         };
      } catch (error) {
         console.error(error);
      }
   }

   agregarHistorial(lugar = "") {
      
      this.historial.unshift(lugar);
      
   }
}

module.exports = Busquedas;
