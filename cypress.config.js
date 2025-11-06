const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    apiUrl: 'https://demoqa.com',
     defaultCommandTimeout: 10000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/tests/**/*.js"  },
});
