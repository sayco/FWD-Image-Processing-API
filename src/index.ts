import express from "express";
import fs from "fs";
import routes from "./routes/index";
import morgan from "morgan";
import path from "path";
import port from "./config";

const app = express();
const logStream = fs.createWriteStream(path.join("./", "api-logger.log"), {
  flags: "a",
});

app.use(
  morgan(":method :url :status - :response-time ms", {
    stream: logStream,
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;


  