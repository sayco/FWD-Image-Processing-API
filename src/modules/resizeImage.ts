import express from 'express';
import { promises as fs } from 'fs';
import sharp from 'sharp';


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
async function resizeImage(res:express.Response, inputFile: string, outputFile: string, resizeOption:resizeOptionObj):Promise<void>{
    try {
      // check if file exist
      const imageData = await fs.access(outputFile);
      
      // file exist
      // send the file only
      // console.log("Resized Image file is Already Exist.");
      sharp(outputFile)
        .toBuffer()
        .then((data) => {
          res.type("image/jpeg");
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
          res.type("image/jpeg");
          res.send(data);
          fs.writeFile(outputFile, data);
        });
    }
   }
  
export default resizeImage;