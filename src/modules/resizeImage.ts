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
  inputFile: string,
  outputFile: string,
  resizeOption: resizeOptionObj
) {
  try {
    await sharp(inputFile)
      .resize(resizeOption)
      .jpeg()
      .toBuffer()
      .then((data) => {
        fs.writeFile(outputFile, data);
        //return data;
      });
  } catch (error) {
    console.log(error);
  }
}

export default resizeImage;
