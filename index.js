const { inquirerMunu, pause } = require("./helpers/inquirer");

const main = async () => {
   let opt = "";

   do {
      console.clear();
      opt = await inquirerMunu();
      console.log(opt);

      opt !== 0 && (await pause());
   } while (opt !== 0);
};
main();
