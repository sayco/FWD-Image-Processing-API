import express from "express";
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



  // make sure at least one of resize dimensions are exist
  // check if no queries provided by the user
  if (filename === undefined && heightQuery === undefined && widthQuery === undefined) {
    res.send("Welcome to Resize API, kindly Add image file name and the required dimensions.");
    return;
  }
  // check if file name is missing
  else if (filename === undefined) {
    //console.log("File Name is missing.");
    res.send("Image file name is missing.");
    return;
  }
  // check if both height and width are missing
  else if (heightQuery === undefined && widthQuery === undefined) {
    // console.log("Both Width and Height are missing.");
    res.send("Image Hight / Width are missing, kindly send at least one.");
    return;
  }
  // check if height is missing
  else if (heightQuery === undefined) {
    checkInputImageExistence();
    // console.log("Height is missing");
    resizeOption = { width: width };
    return;
  }
  // check if width is missing
  else if (widthQuery === undefined) {
    checkInputImageExistence();
    // console.log("Width is missing");
    resizeOption = { height: height };
    return;
  }
  // then both height and width are exist
  else {
    checkInputImageExistence();
    resizeOption = { width: width, height: height };
    return;
  }

  // function to check for input image file existence
  // if file is found will continue the resizing process
  // if not found will send error message as a response
  async function checkInputImageExistence() {
    try {
      // check if file exist
      const imageData = await fs.access(inputFile);
      // console.log("Input Image file is found.");
      resizeImage();
    } catch (error) {
      // console.log("Input Image file is not found.");
      res.send("Image File name is not found, kindly check file name.");
    }
  }
  
  // main function to resize image
  // check if resized file is already exist
  // if exist will send it as a response
  // if not exist will resize then send it
  async function resizeImage() {
    try {
      // check if file exist
      const imageData = await fs.access(outputFile);
      // file exist
      // send the file only
      // console.log("Resized Image file is Already Exist.");
      sharp(outputFile)
        .toBuffer()
        .then((data) => {
          res.type('image/jpeg');
          res.send(data);
        });
    } catch (error) {
      // file dose not exist
      // do the resize process
      //console.log(error);
      // console.log("Resized Image File dose not exist, will create one.");
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