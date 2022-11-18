import express from "express";
//import resize from "../../modules/resize";
import sharp from "sharp";
import { promises as fs } from "fs";

const routes = express.Router();

// main end point for the resize service
routes.get("/", (req, res) => {

  let filename      = req.query.filename as string;
  let heightQuery   = req.query.height as string;
  let widthQuery    = req.query.width as string;
  let height        = parseInt(heightQuery);
  let width         = parseInt(widthQuery);
  let inputPath     = `images/original/`;
  let outputPath    = `images/thumbnail/`;
  let inputFile     = `${inputPath}${filename}.jpg`;
  let outputFile    = `${outputPath}${filename}_[${width}x${height}]_thumb.jpg`;
  let resizeOption  = {};

  // check if file name is missing
  if (filename === undefined) {
    console.log("File Name is missing.");
    res.send("Image file name is missing.");
  }

  // make sure at least one of resize dimensions are exist
  // check if both height and width are missing
  if (heightQuery === undefined && widthQuery === undefined) {
    console.log("Both Width and Height are missing.");
    res.send("Image Hight / Width are missing, kindly send at least one.");
  }
  // check if height is missing
  else if (heightQuery === undefined) {
    console.log("Height is missing");
    resizeOption = { width: width };
    resizeImage();
  }
  // check if width is missing
  else if (widthQuery === undefined) {
    console.log("Width is missing");
    resizeOption = { height: height };
    resizeImage();
  }
  // then both height and width are exist
  else {
    resizeOption = { width: width, height: height };
    resizeImage();
  }
  
  // main function to resize image
  // check if file is already exist
  // if exist will send it
  // if not exist will resize then send
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
          res.type('image/jpeg');
          res.send(data);
        });
    } catch (error) {
      // file dose not exist
      // do the resize process
      console.log("File dose not exist.");
      sharp(inputFile)
        .resize(resizeOption)
        .jpeg()
        .toBuffer()
        .then((data) => {
          res.type('image/jpeg');
          res.send(data);
          fs.writeFile(outputFile, data);
        });
    }
  }
});

export default routes;