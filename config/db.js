const mongoose = require("mongoose");

module.exports = app => {
  mongoose.connect(
    "mongodb://indra-gunawan:"+ process.env.MLAB_PW +"@ds251889.mlab.com:51889/gits-indonesia",
    () => {
      console.log("Connecting To MongoDB OK");
    }
  );
};