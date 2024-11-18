//module importation
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// app initialization
const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
