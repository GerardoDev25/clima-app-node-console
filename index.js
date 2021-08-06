const { leerInput } = require("./helpers/inquirer");

const main = async () => {
   const texto = await leerInput('message');
    console.log(texto);
   
};
main();
