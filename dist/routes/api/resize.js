"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import resize from "../../modules/resize";
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const routes = express_1.default.Router();
// main end point for the resize service
routes.get("/", (req, res) => {
    let filename = req.query.filename;
    let heightQuery = req.query.height;
    let widthQuery = req.query.width;
    let height = parseInt(heightQuery);
    let width = parseInt(widthQuery);
    let inputPath = `images/original/`;
    let outputPath = `images/thumbnail/`;
    let inputFile = `${inputPath}${filename}.jpg`;
    let outputFile = `${outputPath}${filename}_[${width}x${height}]_thumb.jpg`;
    let resizeOption = {};
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
        checkInputImageExistence();
        console.log("Height is missing");
        resizeOption = { width: width };
    }
    // check if width is missing
    else if (widthQuery === undefined) {
        checkInputImageExistence();
        console.log("Width is missing");
        resizeOption = { height: height };
    }
    // then both height and width are exist
    else {
        checkInputImageExistence();
        resizeOption = { width: width, height: height };
    }
    // function to check for input image file existence
    // if file is found will continue the resizing process
    // if not found will send error message as a response
    function checkInputImageExistence() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if file exist
                const imageData = yield fs_1.promises.access(inputFile);
                console.log("Input Image file is found.");
                resizeImage();
            }
            catch (error) {
                console.log("Input Image file is not found.");
                res.send("Image File name is not found, kindly check file name.");
            }
        });
    }
    // main function to resize image
    // check if resized file is already exist
    // if exist will send it as a response
    // if not exist will resize then send it
    function resizeImage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if file exist
                const imageData = yield fs_1.promises.access(outputFile);
                // file exist
                // send the file only
                console.log("Resized Image file is Already Exist.");
                (0, sharp_1.default)(outputFile)
                    .toBuffer()
                    .then((data) => {
                    res.type('image/jpeg');
                    res.send(data);
                });
            }
            catch (error) {
                // file dose not exist
                // do the resize process
                //console.log(error);
                console.log("Resized Image File dose not exist, will create one.");
                (0, sharp_1.default)(inputFile)
                    .resize(resizeOption)
                    .jpeg()
                    .toBuffer()
                    .then((data) => {
                    res.type('image/jpeg');
                    res.send(data);
                    fs_1.promises.writeFile(outputFile, data);
                });
            }
        });
    }
});
exports.default = routes;
