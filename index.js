const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const appRoutes = require('./routes/appRoutes');
const dotenv = require('dotenv');



const app = express();

dotenv.config(); 

const db = process.env.db_url;
  
const port = process.env.port;

mongoose
  .connect(db)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.set("views", "pages");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



app.use(appRoutes);


app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
