const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const routes = require("./routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Sync models with the database
const sequelizeDB = require("./config/db");
sequelizeDB.sequelize.sync(sequelizeDB);

// Use routes
app.use("/v1", routes);


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});