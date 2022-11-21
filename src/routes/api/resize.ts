import express from "express";
import { promises as fs } from "fs";
import resizeImage from "../../modules/resizeImage";

const routes = express.Router();

/**
 *  main end point for the resize service
 *  */
routes.get("/", (req, res) => {
  const filename = req.query.filename as string;
  const heightQuery = req.query.height as string;
  const widthQuery = req.query.width as string;
  const height = parseInt(heightQuery);
  const width = parseInt(widthQuery);
  const inputPath = `images/original/`;
  const outputPath = `images/thumbnail/`;
  const inputFile = `${inputPath}${filename}.jpg`;
  const outputFile = `${outputPath}${filename}_[${width}x${height}]_thumb.jpg`;
  let resizeOption:resizeOptionObj;
  
  interface resizeOptionObj {
    width?: number;
    height?: number;
 }

  // make sure at least one of resize dimensions are exist
  // check if no queries provided by the user
  if (
    filename === undefined &&
    heightQuery === undefined &&
    widthQuery === undefined
  ) {
    res.send(
      "Welcome to Resize API, kindly Add image file name and the required dimensions."
    );
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
  async function checkInputImageExistence():Promise<void>{
    try {
      // check if file exist
      const imageData = await fs.access(inputFile);
      // console.log("Input Image file is found.");
      resizeImage(res, inputFile, outputFile, resizeOption);
    } catch (error) {
      // console.log("Input Image file is not found.");
      res.send("Image File name is not found, kindly check file name.");
    }
  }

});

export default routes;
