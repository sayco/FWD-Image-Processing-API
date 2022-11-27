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
const apiRoot = "/api";
const resizeEndpoint = "/api/resize";
const resizeFilename = "udacity";
const resizeWrongFilename = "udacityyyy";
const resizeWidth = "200";
const resizeHeight = "200";
const testFilename = "udacity";
const testInputPath = `images/original/`;
const testOutputPath = `images/thumbnail/`;
const testInputFile = `${testInputPath}${testFilename}.jpg`;
const testOutputFile = `${testOutputPath}${testFilename}_test.jpg`;
const testWidth = 200;
const testHeight = 200;
const testingOptions = {
    height: testWidth,
    width: testHeight,
};
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resizeImage_1 = __importDefault(require("../modules/resizeImage"));
const request = (0, supertest_1.default)(index_1.default);
/**
 * Testing the API root and endpoints
 */
describe("Testing Image Processing API Response", () => {
    // testing the server is running by checking to the root api respond
    it("Is server running, responds to api root", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(apiRoot);
        expect(res.status).toBe(200);
    }));
    // testing the resize endpoint
    it("Testing /resize endpoint response", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(resizeEndpoint);
        expect(res.status).toBe(404);
    }));
});
describe("Testing resize function", () => {
    // testing image processing
    it("Test specs for image processing ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, resizeImage_1.default)(testInputFile, testOutputFile, testingOptions);
        })).not.toThrow();
    }));
});
/**
 * testing Resize endpoint different scenarios
 */
describe("Testing Image Resizing API", () => {
    // testing resize endpoint with image file name only without dimensions
    it("responds to /resize with file name only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/resize?filename=udacity`);
        expect(res.text).toBe("Image Hight / Width are missing, kindly send at least one.");
    }));
    // testing resize endpoint with image file name and the required image width only
    it("responds to /resize with file name and width only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/resize?filename=udacity&width=300`);
        expect(res.type).toMatch("image/jpeg");
    }));
    // testing resize endpoint with image file name and the required image height only
    it("responds to /resize with file name and height only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/resize?filename=udacity&height=290`);
        expect(res.headers["content-type"]).toMatch("image/jpeg");
    }));
    // testing resize endpoint with image file name and the required image width and height
    it("responds to /resize with file name and height and width", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/resize?filename=udacity&width=260&height=260`);
        expect(res.header["content-type"]).toMatch("image/jpeg");
    }));
});
describe("Testing Failure response", () => __awaiter(void 0, void 0, void 0, function* () {
    // testing resize endpoint with wrong image file name
    it("responds to /resize with wrong image file name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`);
        expect(res.status).toBe(404);
    }));
    // testing resize endpoint with wrong image file name
    it("responds to /resize with wrong hight and width data type", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeWrongFilename}&width=aa&height=bb`);
        expect(res.status).toBe(404);
    }));
}));
