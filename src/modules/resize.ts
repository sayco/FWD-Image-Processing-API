import express from "express";
import sharp from "sharp";
import { promises as fs } from "fs";


async function resizeImage(inputFile, outputFile, width, hight) {
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
      .resize(width, hight)
      .jpeg()
      .toBuffer()
      .then((data) => {
        res.type('image/jpg');
        res.send(data);
        fs.writeFile(outputFile, data);
      });
  }
}


export default resizeImage;