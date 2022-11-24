import express, { Response, Request } from "express";
import resize from "./api/resize";

const routes = express.Router();

routes.use("/resize", resize);

routes.get("/", (req:Request, res:Response):void => {
  res.send("Welcome to Image Processing API.");
});

export default routes;
