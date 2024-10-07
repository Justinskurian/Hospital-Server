const express = require("express");
require("dotenv").config();
var hospital = require("./routes/hospital");

const app = express();

app.use(express.json());
app.use('/', hospital);

app.listen(process.env.PORT, () =>{
    console.log("Server is up and running")
});