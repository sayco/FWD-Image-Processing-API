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

import supertest from "supertest";
import app from "../index";
import resizeImage from "../modules/resizeImage";
import { response } from "express";

const request = supertest(app);

/**
 * Testing the API root and endpoints
 */
describe("Testing Image Processing API Response", () => {
  // testing the server is running by checking to the root api respond
  it("Is server running, responds to api root", async () => {
    try {
      const res = await request.get(apiRoot);
      expect(res.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
  // testing the resize endpoint
  it("Testing /resize endpoint response", async () => {
    try {
      const res = await request.get(resizeEndpoint);
      expect(res.status).toBe(404);
    } catch (error) {
      console.log(error);
    }
  });
});

describe("Testing resize function", () => {
  // testing image processing
  it("Test specs for image processing ", async () => {
    try {
      expect(async () => {
        await resizeImage(
          response,
          testInputFile,
          testOutputFile,
          testingOptions
        );
      }).not.toThrow();
    } catch (error) {
      console.log(error);
    }
  });
});

/**
 * testing Resize endpoint different scenarios
 */
describe("Testing Image Resizing API", () => {
  // testing resize endpoint with image file name only without dimensions
  it("responds to /resize with file name only", async () => {
    try {
      const res = await request.get(
        `${resizeEndpoint}?filename=${resizeFilename}`
      );
      expect(res.text).toBe(
        "Image Hight / Width are missing, kindly send at least one."
      );
    } catch (error) {
      console.log(error);
    }
  });
  // testing resize endpoint with image file name and the required image width only
  it("responds to /resize with file name and width only", async () => {
    try {
      const res = await request.get(
        `/api/resize?filename=udacity&width=300`
      );
      expect(res.header["content-type"]).toMatch("image/jpeg");
    } catch (error) {
      console.log(error);
    }
  });
  // testing resize endpoint with image file name and the required image height only
  it("responds to /resize with file name and height only", async () => {
    try {
      const res = await request.get(
        `/api/resize?filename=udacity&height=290`
      );
      expect(res.headers["content-type"]).toMatch("image/jpeg");
    } catch (error) {
      console.log(error);
    }
  });
  // testing resize endpoint with image file name and the required image width and height
  it("responds to /resize with file name and height and width", async () => {
    try {
      const res = await request.get(
        `/api/resize?filename=udacity&width=260&height=260`
      );
      expect(res.header["content-type"]).toMatch("image/jpeg");
    } catch (error) {
      console.log(error);
    }
  });
});

describe("Testing Failure response", async () => {
  // testing resize endpoint with wrong image file name
  it("responds to /resize with wrong image file name", async () => {
    try {
      const res = await request.get(
        `${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`
      );
      expect(res.status).toBe(404);
    } catch (error) {
      console.log(error);
    }
  });

  // testing resize endpoint with wrong image file name
  it("responds to /resize with wrong hight and width data type", async () => {
    try {
      const res = await request.get(
        `${resizeEndpoint}?filename=${resizeWrongFilename}&width=aa&height=bb`
      );
      expect(res.status).toBe(404);
    } catch (error) {
      console.log(error);
    }
  });
});
