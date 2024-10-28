//change environment to staging or production when needed



const environment = process.env.TEST_ENV || "staging";
//run is >> TEST_ENV=production npx cucumber-js or change the default value above

module.exports = { environment };