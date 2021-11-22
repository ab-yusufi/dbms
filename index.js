const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

// parse application/json
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//Routes
const pAuthRoutes = require("./routes/p_auth");
const patientRoutes = require("./routes/patient");
const hAuthRoutes = require("./routes/h_auth");
const serviceRoutes = require("./routes/service");
const bookingRoutes = require("./routes/booking");

app.use("/api/p", pAuthRoutes);
app.use("/api/h", hAuthRoutes);
app.use("/api", serviceRoutes);
app.use("/api", bookingRoutes);
app.use("/api", patientRoutes);

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running at Port ${PORT}`);
});
