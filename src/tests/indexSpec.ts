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
    const res = await request.get(apiRoot);
    expect(res.status).toBe(200);
  });
  // testing the resize endpoint
  it("Testing /resize endpoint response", async () => {
    const res = await request.get(resizeEndpoint);
    expect(res.status).toBe(404);
  });
});

describe("Testing resize function", () => {
  // testing image processing
  it("Test specs for image processing ", async () => {
    expect(async () => {
      await resizeImage(
        response,
        testInputFile,
        testOutputFile,
        testingOptions
      );
    }).not.toThrow();
  });
});

/**
 * testing Resize endpoint different scenarios
 */
describe("Testing Image Resizing API", () => {
  // testing resize endpoint with image file name only without dimensions
  it("responds to /resize with file name only", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeFilename}`
    );
    expect(res.text).toBe(
      "Image Hight / Width are missing, kindly send at least one."
    );
  });
  // testing resize endpoint with image file name and the required image width only
  it("responds to /resize with file name and width only", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeFilename}&width=270`
    );
    expect(res.header["content-type"]).toBe("image/jpeg");
  });
  // testing resize endpoint with image file name and the required image height only
  it("responds to /resize with file name and height only", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeFilename}&height=250`
    );
    expect(res.header["content-type"]).toBe("image/jpeg");
  });
  // testing resize endpoint with image file name and the required image width and height
  it("responds to /resize with file name and height and width", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.header["content-type"]).toBe("image/jpeg");
    // console.log(res.header["content-type"]);
  });
});

describe("Testing Failure response", async () => {
  // testing resize endpoint with wrong image file name
  it("responds to /resize with wrong image file name", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.status).toBe(404);
  });

  // testing resize endpoint with wrong image file name
  it("responds to /resize with wrong hight and width data type", async () => {
    const res = await request.get(
      `${resizeEndpoint}?filename=${resizeWrongFilename}&width=aa&height=bb`
    );
    expect(res.status).toBe(404);
  });
});
