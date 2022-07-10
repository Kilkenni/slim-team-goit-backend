const app = require("./app");
const mongoose = require("mongoose");
const {DB_HOST, PORT=3000} = require("./helpers/env");


// Assemble database path from ENV variables. TODO: create new Mongo DB
// const DB_HOST = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Database connection successful at host ${DB_HOST}`);
    app.listen(PORT);
  })
  .then(() =>
    console.log(
      `Server running. Use our API on port: ${PORT}. Press [Ctrl + C] in terminal to stop it.`
    )
  )
  .catch((err) => {
    console.error("ERROR ", err);
    process.exit(1);
  });

// ! Времення до создания БД
// app.listen(PORT, () => {
//   console.log(
//     `Server running. Use our API on port: ${PORT}. Press [Ctrl + C] in terminal to stop it.`
//   );
// });
