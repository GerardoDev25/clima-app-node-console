require("dotenv").config();
const colors = require("colors");

const {
   inquirerMunu,
   pause,
   leerInput,
   listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
   const busquedas = new Busquedas();
   let opt = "";

   do {
      console.clear();
      opt = await inquirerMunu();

      switch (opt) {
         case 1:
            //  * obtener el termino de busqueda
            const termino = await leerInput("Ciudad: ");

            // * buscar los lugares
            const lugares = await busquedas.ciudad(termino);

            // * seleccionar el lugar
            const id = await listarLugares(lugares);
            if (id === "0") continue;

            const { name, lng, lat } = lugares.find(
               (l) => l.id === id
            );

            // * guardar en db
            busquedas.agregarHistorial(name);

            const { desc, min, max, temp } =
               await busquedas.climaLugar(lat, lng);

            console.clear();
            console.log("Infomacion de la ciudad: \n".green);
            console.log("Ciudad: ", name);
            console.log("Lat: ", lng);
            console.log("Log: ", lat);
            console.log("Temperatura: ", temp);
            console.log("Minimo: ", min);
            console.log("Maximo: ", max);
            console.log("Descripcion: ", desc);

            break;

         case 2:
            // * historial
            busquedas.historial.forEach((lugar, index) => {
               console.log(`${index + 1}. `.green, lugar);
            });
            break;
         default:
            break;
      }

      opt !== 0 && (await pause());
   } while (opt !== 0);
};
main();
