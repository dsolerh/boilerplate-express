var express = require("express");
var app = express();
let bodyParser = require('body-parser');

console.log("Hello World");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use(bodyParser.urlencoded({extended: true}))

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

function handler(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}`})
}
function postHandler(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}`})
}
app.route('/name').get(handler).post(postHandler)

module.exports = app;
