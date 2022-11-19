import express from "express";
import routes from "./routes/index";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const port = 3000;
const app = express();
let logStream = fs.createWriteStream(path.join("./", "api-logger.log"), {
  flags: 'a'
})

app.use(morgan(':method :url :status - :response-time ms', {
  stream: logStream
}));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

export default app;