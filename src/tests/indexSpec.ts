import axios from "axios";
import router from "../routes/index";
import server from "../index";

server.use("/", router);

const apiRoot = "http://localhost:3000/api";
const resizeEndpoint = "http://localhost:3000/api/resize";
const resizeFilename = "udacity";
const resizeWrongFilename = "udacityyyy";
const resizeWidth = "200";
const resizeHeight = "200";

/**
 * Testing the API root and endpoints
 */
describe("Testing Image Processing API", () => {
  // testing the server is running by checking to the root api respond
  it("Is server running, responds to api root", async () => {
    const res = await axios.get(apiRoot);
    expect(res.status).toBe(200);
  });
  // testing the resize endpoint
  it("Testing resize endpoint", async () => {
    const res = await axios.get(resizeEndpoint);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
});

/**
 * testing Resize endpoint different scenarios
 */
describe("Testing Image Resizing API", () => {
  // testing resize endpoint with image file name only without dimensions
  it("responds to /resize with file name only", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeFilename}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
  // testing resize endpoint with image file name and the required image width only
  it("responds to /resize with file name and width only", async () => {
    const res = await axios.get(
      `${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}`
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("image/jpeg");
  });
  // testing resize endpoint with image file name and the required image height only
  it("responds to /resize with file name and height only", async () => {
    const res = await axios.get(
      `${resizeEndpoint}?filename=${resizeFilename}&height=${resizeHeight}`
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("image/jpeg");
  });
  // testing resize endpoint with image file name and the required image width and height
  it("responds to /resize with file name and height and width", async () => {
    const res = await axios.get(
      `${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("image/jpeg");
  });
  // testing resize endpoint with wrong image file name
  it("responds to /resize with wrong image file name", async () => {
    const res = await axios.get(
      `${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
});
