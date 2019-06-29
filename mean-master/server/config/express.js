const path = require("path");
const express = require("express");
const httpError = require("http-errors"); // Create HTTP errors for Express,
const logger = require("morgan"); // HTTP request logger middleware for node.js
const bodyParser = require("body-parser"); // Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

const cookieParser = require("cookie-parser"); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const compress = require("compression"); //Returns the compression middleware using the given options. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
const methodOverride = require("method-override");  
// Create a new middleware function to override the req.method property with a new value. This value will be pulled from the provided getter.
const cors = require("cors"); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.Certain CORS requests are considered 'complex' and require an initial OPTIONS request (called the "pre-flight request"). An example of a 'complex' CORS request is one that uses an HTTP verb other than GET/HEAD/POST (such as DELETE) or that uses custom headers. To enable pre-flighting, you must add a new OPTIONS handler for the route you want to support:
const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! 
// It's best to use Helmet early in your middleware stack so that its headers are sure to be set.You can disable a middleware that's normally enabled by default. This will disable frameguard but include the other defaults
const swaggerUi = require("swagger-ui-express"); //This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.Swagger version is pulled from npm module swagger-ui-dist. Please use a lock file or specify the version of swagger-ui-dist you want to ensure it is consistent across environments.
// You may be also interested in:
const swaggerDocument = require("./swagger.json");
const routes = require("../routes/index.route");
const config = require("./config");
const passport = require("./passport");

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}

// Choose what fronten framework to serve the dist from
var distDir = "../../dist/";
if (config.frontend == "react") {
  distDir = "../../node_modules/material-dashboard-react/dist";
} else {
  distDir = "../../dist/";
}

//
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + "/index.html"));
});

console.log(distDir);
//React server
app.use(
  express.static(
    path.join(__dirname, "../../node_modules/material-dashboard-react/dist")
  )
);
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use("/api/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
