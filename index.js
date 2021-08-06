const colors = require("colors");

const {
   inquirerMunu,
   pause,
   leerInput,
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
            const lugar = await leerInput("Ciudad: ");
            console.log(lugar);
            console.log("Infomacion de la ciudad\n".green);
            console.log("Ciudad: ");
            console.log("Lat: ");
            console.log("Log: ");
            console.log("Temperatura: ");
            console.log("Minimo: ");
            console.log("Maximo: ");

            break;

         default:
            break;
      }

      opt !== 0 && (await pause());
   } while (opt !== 0);
};
main();
