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

            const { name, lng, lat } = lugares.find(
               (l) => l.id === id
            );

            console.log("Infomacion de la ciudad\n".green);
            console.log("Ciudad: ", name);
            console.log("Lat: ", lng);
            console.log("Log: ", lat);
            // console.log("Temperatura: ");
            // console.log("Minimo: ");
            // console.log("Maximo: ");

            break;

         default:
            break;
      }

      opt !== 0 && (await pause());
   } while (opt !== 0);
};
main();
