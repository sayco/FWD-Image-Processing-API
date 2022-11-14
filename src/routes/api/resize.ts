import express from "express";
import resize from "../../modules/resize";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Resize API.");
})


export default routes;