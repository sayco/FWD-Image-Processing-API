import express from "express";
import axios from "axios";
import router from '../routes/index';
import server from "../index";





server.use('/', router);

const apiRoot = "http://localhost:3000/api";
const resizeEndpoint = "http://localhost:3000/api/resize";
const resizeFilename = "udacity";
const resizeWrongFilename = "udacityyyy";
const resizeWidth = "200";
const resizeHeight = "200";

describe('Testing Image Processing API', () => {

  it('Is server running, responds to api root', async () => {
    const res = await axios.get(apiRoot);
    expect(res.status).toBe(200);
    //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    //expect(res.text).toEqual('hello world!');
  });

  it("Testing resize endpoint", async () => {
    const res = await axios.get(resizeEndpoint);
    expect(res.status).toBe(200);
  });
});


describe('Testing Image Resizing API', () => {
  // testing name only without dimentions
  it("responds to /resize with file name only", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeFilename}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
  });

  it("responds to /resize with file name and width only", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('image/jpeg');
  });


  it("responds to /resize with file name and height only", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeFilename}&height=${resizeHeight}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('image/jpeg');
  });

  it("responds to /resize with file name and height and width", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeFilename}&width=${resizeWidth}&height=${resizeHeight}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('image/jpeg');
  });

  it("responds to /resize with wrong image file name", async () => {
    const res = await axios.get(`${resizeEndpoint}?filename=${resizeWrongFilename}&width=${resizeWidth}&height=${resizeHeight}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8');  });
});