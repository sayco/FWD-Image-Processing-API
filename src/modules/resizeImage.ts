import express from "express";
import { promises as fs } from "fs";
import sharp from "sharp";

interface resizeOptionObj {
  width?: number;
  height?: number;
}

/**
 * main function to resize image
 * check if resized file is already exist
 * if exist will send it as a response
 * if not exist will resize then send it
 */
async function resizeImage(
  res: express.Response,
  inputFile: string,
  outputFile: string,
  resizeOption: resizeOptionObj
): Promise<void> {
  try {
    sharp(inputFile)
      .resize(resizeOption)
      .jpeg()
      .toBuffer()
      .then((data) => {
        res.type("image/jpeg");
        res.status(200).send(data);
        fs.writeFile(outputFile, data);
      });
  } catch (error) {
    console.log(error);
  }
}

export default resizeImage;
