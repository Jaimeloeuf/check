// Setup environment variables
require("dotenv").config();

// setup app
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(require("helmet")()); // middleware which adds http headers

const authMiddleware = require("firebase-auth-express-middleware")({
  firebaseAdmin: require("firebase-admin"),
});

/**
 * @notice Import and Mount all the routers for the different routes
 */
app.use("/", require("./routes/default"));
app.use("/search", authMiddleware, require("./routes/search"));
app.use("/report", authMiddleware, require("./routes/report"));
// app.use("/error", require("./routes/error"));

// Mount the 404 and 500 error handling middleware last
const { _404, _500 } = require("express-error-middlewares");
app.use(_404);
app.use(_500);

/**
 * @notice Setup PORT last to ensure all setup is done before server starts listening to traffic
 */
const port = process.env.PORT || 3000; // Defaults to PORT 3000
app.listen(port, () => console.log(`Server running on port: ${port}`));
