const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = require("./helpers/evn");

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

