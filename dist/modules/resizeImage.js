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
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
/**
   * main function to resize image
   * check if resized file is already exist
   * if exist will send it as a response
   * if not exist will resize then send it
   */
function resizeImage(res, inputFile, outputFile, resizeOption) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check if file exist
            const imageData = yield fs_1.promises.access(outputFile);
            // file exist
            // send the file only
            // console.log("Resized Image file is Already Exist.");
            (0, sharp_1.default)(outputFile)
                .toBuffer()
                .then((data) => {
                res.type("image/jpeg");
                res.send(data);
            });
        }
        catch (error) {
            // file dose not exist
            // do the resize process
            //console.log(error);
            // console.log("Resized Image File dose not exist, will create one.");
            (0, sharp_1.default)(inputFile)
                .resize(resizeOption)
                .jpeg()
                .toBuffer()
                .then((data) => {
                res.type("image/jpeg");
                res.send(data);
                fs_1.promises.writeFile(outputFile, data);
            });
        }
    });
}
exports.default = resizeImage;
