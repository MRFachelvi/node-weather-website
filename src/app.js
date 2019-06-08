const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//express path config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirectory));

//index
app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Robby Fachlevi"
  });
});

//about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Robby Fachlevi"
  });
});

//help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    msg: "Please contact me for more info",
    name: "Robby Fachlevi"
  });
});

//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address."
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

//404 handler
app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "Article not found!",
    name: "Robby Fachlevi"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found!",
    msg: "404 Page not Found",
    name: "Robby Fachlevi"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
