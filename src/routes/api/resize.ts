import express from "express";
import resize from "../../modules/resize";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Resize API.");
  console.log(req.query.fullname);
  console.log(req.query.hight);
  console.log(req.query.width);
})


export default routes;