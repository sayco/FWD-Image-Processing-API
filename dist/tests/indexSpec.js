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
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../routes/index"));
const index_2 = __importDefault(require("../index"));
index_2.default.use('/', index_1.default);
const apiRoot = "http://localhost:3000/api";
const resizeEndpoint = "http://localhost:3000/api/resize";
const resizeFilename = "udacity";
const resizeWrongFilename = "udacityyyy";
const resizeWidth = "200";
const resizeHeight = "200";
describe('Testing Image Processing API', () => {
    it('Is server running, responds to api root', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(apiRoot);
        expect(res.status).toBe(200);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //expect(res.text).toEqual('hello world!');
    }));
    it("Testing resize endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(resizeEndpoint);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
    }));
});
describe('Testing Image Resizing API', () => {
    // testing name only without dimentions
    it("responds to /resize with file name only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${resizeEndpoint}?filename=${resizeFilename}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
    }));
    it("responds to /resize with file name and width only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('image/jpeg');
    }));
    it("responds to /resize with file name and height only", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${resizeEndpoint}?filename=${resizeFilename}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('image/jpeg');
    }));
    it("responds to /resize with file name and height and width", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('image/jpeg');
    }));
    it("responds to /resize with wrong image file name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
    }));
});
