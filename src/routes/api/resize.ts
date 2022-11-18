import express from "express";
//import resize from "../../modules/resize";
import sharp from "sharp";
import { promises as fs } from "fs";

const routes = express.Router();

// main end point for the resize service
routes.get("/", (req, res) => {

  let filename = req.query.filename as string;
  let height = parseInt(req.query.height as string);
  let width = parseInt(req.query.width as string);
  let inputPath = `images/original/`;
  let outputPath = `images/thumbnail/`;
  let inputFile = `${inputPath}${filename}.jpg`;
  let outputFile = `${outputPath}${filename}_[${width}x${height}]_thumb.jpg`;

  // check if use send the file name
  if (filename === undefined) {
    res.send("Image file name is missing.");
  }

  // check if use send the file name
  if (height === NaN && width === NaN) {
    res.send("Image Hight / Width are missing, kindly send at least one.");
  }

  // check if use send the file name
  if (height === NaN) {
    res.send("Image Hight is missing.");
  }

  // check if use send the file name
  if (width === NaN) {
    res.send("Image Width is missing.");

  }
  
  async function resizeImage() {
    try {
      // check if file exist
      const imageData = await fs.access(outputFile);
      // file exist
      // send the file only
      console.log("File Already Exist.");
      sharp(outputFile)
        .toBuffer()
        .then((data) => {
          res.type('image/jpg');
          res.send(data);
        });
    } catch (error) {
      // file dose not exist
      // do the resize process
      console.log("File dose not exist.");
      sharp(inputFile)
        .resize({ width: width, height: height})
        .jpeg()
        .toBuffer()
        .then((data) => {
          res.type('image/jpg');
          res.send(data);
          fs.writeFile(outputFile, data);
        });
    }
  }
  resizeImage();
});

export default routes;