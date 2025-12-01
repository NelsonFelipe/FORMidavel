const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Points to the Vite frontend server
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      VITE_API_URL: 'http://localhost:5001/api/v1', // The test backend URL
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});