/**
 * Module dependencies.
 */
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

// Allow Cross-Origin requests
app.use(cors());

// Routes
const pingRoutes = require("../api/routes/pingRoutes");
const favoritesRoutes = require("../api/routes/favoritesRoutes");

app.use("/api/ping", pingRoutes);
app.use("/api/favorites", favoritesRoutes);

// handle undefined Routes
app.use("*", (req, res, next) => {
  res.status(404).send({ error: "undefined route" });
});

module.exports = app;

global.mainWindow = {
  webContents: {
    send: (e, d) => {
      console.log("webContents:", e, d);
    },
  },
};
