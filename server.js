const app = require('./app');

const mongoose = require("mongoose");

const localEnv = require('dotenv');
localEnv.config(); 

const PORT = process.env.PORT || 3000;

//Assemble database path from ENV variables. TODO: create new Mongo DB

/*

const DB_HOST = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`;

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Mongoose: failed to connect to database");
    console.log(error.message);
    process.exit(1);
  });

  */

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}. Press [Ctrl + C] in terminal to stop it.`)
})
