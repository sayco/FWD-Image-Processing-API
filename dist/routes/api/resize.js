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
    let height = parseInt(req.query.height);
    let width = parseInt(req.query.width);
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
    // check if both height and width are missing
    if (height === NaN && width === NaN) {
        console.log("Both Width and Height are missing.");
        res.send("Image Hight / Width are missing, kindly send at least one.");
    }
    // check if height is missing
    if (height === NaN) {
        console.log("Height is missing");
        resizeOption = { width: width };
        resizeImage();
    }
    // check if width is missing
    if (width === NaN) {
        console.log("Width is missing");
        resizeOption = { height: height };
        resizeImage();
    }
    function resizeImage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if file exist
                const imageData = yield fs_1.promises.access(outputFile);
                // file exist
                // send the file only
                console.log("File Already Exist.");
                (0, sharp_1.default)(outputFile)
                    .toBuffer()
                    .then((data) => {
                    res.type('image/jpg');
                    res.send(data);
                });
            }
            catch (error) {
                // file dose not exist
                // do the resize process
                console.log("File dose not exist.");
                (0, sharp_1.default)(inputFile)
                    .resize({ width: width, height: height })
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
