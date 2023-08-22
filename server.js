const app = require("./app");
const { dbConnection } = require("./utils");

require("dotenv").config();
require("colors");

const { DEV_SERVER_PORT = 3000 } = process.env;

// mongoose.set("strictQuery", true);

dbConnection();

app.listen(DEV_SERVER_PORT, () => {
  console.log(
    `Server running. Use our API on port: ${DEV_SERVER_PORT}`.black
      .bgBrightGreen
  );
});
