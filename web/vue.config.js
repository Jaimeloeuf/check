// Use the below code to do pre rendering if needed
// const path = require("path");
// const PrerenderSpaPlugin = require("prerender-spa-plugin");

// const productionPlugins = [
//   new PrerenderSpaPlugin({
//     // Assumes that this is running in project root
//     staticDir: path.join(__dirname, "dist"),

//     // Since this is a landing page with only a single route
//     routes: ["/"],

//     renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
//       // We need to inject a value so we're able to
//       // detect if the page is currently pre-rendered.
//       inject: {},

//       // Wait until the "vue-render-complete" event is dispatched, before creating a snapshot of the page
//       // This event is dispatched on window.document by the main vue app in its "mounted" lifecycle hook
//       renderAfterDocumentEvent: "vue-render-complete",

//       // Should only be used if you want to debug, displays the browser window when rendering.
//       // headless: false,
//     }),
//   }),
// ];

const webpack = require("webpack");

// Get git values to be use in the vue app
const childProcess = require("child_process");
const gitValues = {
  commitHash: childProcess.execSync("git rev-parse HEAD").toString(),
  gitBranch: childProcess
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString(),
};

module.exports = {
  // configureWebpack(config) {
  //   if (process.env.NODE_ENV === "production") {
  //     config.plugins.push(...productionPlugins);
  //   }
  // },

  configureWebpack(config) {
    config.plugins.push(
      // Create a plugin to inject in environment variables like git values and buildTime
      // https://webpack.js.org/plugins/environment-plugin/
      new webpack.EnvironmentPlugin({
        ...gitValues,
        buildTime: Date(),
      })
    );
  },
};
