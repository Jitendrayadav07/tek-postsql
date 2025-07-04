const express = require("express");
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const os = require("os");
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
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.union());

// Sync models with the database
const sequelizeDB = require("./config/db");
sequelizeDB.sequelize.sync(sequelizeDB);

// Use routes
app.use("/api", routes);


// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});