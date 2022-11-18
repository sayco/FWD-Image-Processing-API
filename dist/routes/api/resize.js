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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const routes = express_1.default.Router();
routes.get("/", (req, res) => {
    let filename = req.query.filename;
    let hight = parseInt(req.query.hight);
    let width = parseInt(req.query.width);
    let inputPath = `images/original/`;
    let outputPath = `images/thumbnail/`;
    let inputFile = `${inputPath}${filename}.jpg`;
    let outputFile = `${outputPath}${filename}_[${width}x${hight}]_thumb.jpg`;
    if (filename === undefined) {
        res.send("Image file name is missing.");
    }
    function resizeImage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageData = yield fs_1.promises.access(outputFile);
                // file exist
                // do the resize process
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
                // send the file only
                console.log("File dose not exist.");
                (0, sharp_1.default)(inputFile)
                    .resize(width, hight)
                    .jpeg()
                    .toBuffer()
                    .then((data) => {
                    res.type('image/jpg');
                    res.send(data);
                    fs_1.promises.writeFile(outputFile, data);
                });
            }
        });
    }
    resizeImage();
});
exports.default = routes;
