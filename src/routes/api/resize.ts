import express, {Request, Response} from "express";
import fs from "fs";
import resizeImage from "../../modules/resizeImage";
import path from "path";

const routes = express.Router();

/**
 *  main end point for the resize service
 *  */
routes.get("/", (req:Request, res:Response):void => {
  const filename = req.query.filename as string;
  const heightQuery = req.query.height as string;
  const widthQuery = req.query.width as string;
  const height = parseInt(heightQuery);
  const width = parseInt(widthQuery);
  const inputPath = `images/original/`;
  const outputPath = `images/thumbnail/`;
  const inputFile = `${inputPath}${filename}.jpg`;
  const outputFile = `${outputPath}${filename}_[${width}x${height}]_thumb.jpg`;
  let resizeOption: resizeOptionObj;

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
    res
      .status(404)
      .send(
        "Welcome to Resize API, kindly Add image file name and the required dimensions."
      );
    return;
  }
  // check if file name is missing
  else if (filename === undefined) {
    res.status(404).send("Image file name is missing.");
    return;
  }
  // check if both height and width are missing
  else if (heightQuery === undefined && widthQuery === undefined) {
    res
      .status(404)
      .send("Image Hight / Width are missing, kindly send at least one.");
    return;
  } else if (Number.isNaN(width) && Number.isNaN(height)) {
    res
      .status(404)
      .send("Image Hight / Width must be numbers, kindly send at least one.");
    return;
  }
  // else if (!(Number.isInteger(width))) {
  //   res.status(404).send("Image Width must be a numbers, kindly send at least one.");
  //   return;
  // }
  // else if (!(Number.isInteger(height))) {
  //   res.status(404).send("Image Height must be a numbers, kindly send at least one.");
  //   return;
  // }
  else if (!(width > 0 || height > 0)) {
    res
      .status(404)
      .send(
        "Image Hight / Width must greater than zero, kindly send at least one."
      );
    return;
  }
  // check if height is missing
  else if (Number.isNaN(height)) {
    checkResizedImageExistence();
    resizeOption = { width: width };
    return;
  }
  // check if width is missing
  else if (Number.isNaN(width)) {
    checkResizedImageExistence();
    resizeOption = { height: height };
    return;
  }
  // then both height and width are exist
  else {
    checkResizedImageExistence();
    resizeOption = { width: width, height: height };
    return;
  }

  async function checkResizedImageExistence(): Promise<void> {
    try {
      const resizedImageAvaliable = await fs.existsSync(outputFile);
      // if resized image exist will send cached image
      // if not found will resize the image then send it
      if (resizedImageAvaliable) {
        res
          .status(304)
          .sendFile(
            path.join(
              __dirname,
              `../../../images/thumbnail/${filename}_[${width}x${height}]_thumb.jpg`
            )
          );
      } else {
        checkInputImageExistence();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to check for input image file existence
  // if file is found will continue the resizing process
  // if not found will send error message as a response
  async function checkInputImageExistence(): Promise<void> {
    try {
      // check if file exist
      const inputImageAvaliable = await fs.existsSync(inputFile);
      if (inputImageAvaliable) {
        console.log(resizeOption);
        resizeImage(res, inputFile, outputFile, resizeOption);
      } else {
        res
          .status(404)
          .send("Image File name is not found, kindly check file name.");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

export default routes;
