const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const hbs = require("hbs");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nodemailer.6719@gmail.com",
    pass: "npambebfzpdmdgrb",
  },
});

app.post("/send-email", function (req, res) {
  let mailOptions = {
    from: req.body.email,
    to: "nodemailer.6719@gmail.com", // list of receivers
    subject: "Chesskraft Registration", // Subject line
    text: req.body.message, // plain text body
    html: `<b>Name: ${req.body.name}</b><br />
    <b>Contact: ${req.body.phone}</b><br />
    <b>Gender: ${req.body.gender}</b><br />
    <b>Email: ${req.body.email}</b><br />
    <b>Message: ${req.body.message}</b><br />
    `, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.redirect("/");
  });
});

// static path

const staticPath = path.join(__dirname, "../public");

const template_path = path.join(__dirname, "../server/templates/views");
console.log(template_path);
const partials_path = path.join(__dirname, "../server/templates/partials");

// set view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// static website render
app.use(express.static(staticPath));

// routing
app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/tournament", (req, res) => {
  res.render("tournament");
});

// app.get("*", (req, res) => {
// //   res.render("404error", {
// //     errorMsg: "Oops page not found! Go Back",
// //   });
// });

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
