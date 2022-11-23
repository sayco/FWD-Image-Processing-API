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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
});
/**
 * Testing the API root and endpoints
 */
describe("Testing Image Processing API", () => {
    // testing the server is running by checking to the root api respond
    it("Is server running, responds to api root", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(apiRoot);
        expect(res.status).toBe(200);
    }));
    // testing the resize endpoint
    it("Testing resize endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(resizeEndpoint);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    }));
});
/**
 * Testing the API root and endpoints
 */
describe("Testing Image Processing API", () => {
    // testing the server is running by checking to the root api respond
    it("Is server running, responds to api root", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(apiRoot);
        expect(res.status).toBe(200);
    }));
    // testing the resize endpoint
    it("Testing resize endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(resizeEndpoint);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    }));
});
/**
 * testing Resize endpoint different scenarios
 */
describe("Testing Image Resizing API", () => {
    // testing resize endpoint with image file name only without dimensions
    it("responds to /resize with file name only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeFilename}`);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    }));
    // testing image processing
    //   it("Test specs for image processing ", async () => {
    //   expect(async () => {
    //     await resizeImage(server.response,testInputFile, testOutputFile, testWidth, testHeight);
    //   }).not.toThrow();
    // });
    // testing resize endpoint with image file name and the required image width only
    it("responds to /resize with file name and width only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}`);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("image/jpeg");
    }));
    // testing resize endpoint with image file name and the required image height only
    it("responds to /resize with file name and height only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeFilename}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("image/jpeg");
    }));
    // testing resize endpoint with image file name and the required image width and height
    it("responds to /resize with file name and height and width", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("image/jpeg");
    }));
    // testing resize endpoint with wrong image file name
    it("responds to /resize with wrong image file name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    }));
});
