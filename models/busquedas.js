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
            "https://reqres.in/api/users?page=2"
         );
         console.log(res.data);

         return [];
      } catch (err) {
         return [];
      }
   }
}

module.exports = Busquedas;
