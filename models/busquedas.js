class Busquedas {
   historial = [
      "Taria",
      "Santa Cruz",
      "La paz",
      "Cochabanba",
      "Sucre",
      "Pando",
   ];

   constructor() {
      // todo leer db si existe
   }

   async ciudad(lugar = "") {
      console.log(lugar);

      return []; // las ciudades que coincidan
   }
}

module.exports = Busquedas;
