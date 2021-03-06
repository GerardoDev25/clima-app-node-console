const fs = require("fs");
const axios = require("axios");

class Busquedas {
   historial = [];
   dbPath = "./db/database.json";

   constructor() {
      this.leerDB();
   }

   get historiaCapitalizado() {
      return this.historial.map((lugar) =>
         lugar
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
      );
   }

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

   // ? guardar el historial
   agregarHistorial(lugar = "") {
      if (this.historial.includes(lugar.toLocaleLowerCase()))
         return;

      this.historial = this.historial.splice(0, 5);

      this.historial.unshift(lugar.toLocaleLowerCase());

      this.guardarDB();
   }

   guardarDB() {
      const payload = {
         historial: this.historial,
      };

      fs.writeFileSync(this.dbPath, JSON.stringify(payload));
   }

   // ? leer de bd
   leerDB() {
      if (!fs.existsSync(this.dbPath)) return;

      const info = fs.readFileSync(this.dbPath, "utf-8");
      const data = JSON.parse(info);
      this.historial = [...data.historial];
   }
}

module.exports = Busquedas;
