const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;
const fs = require("fs")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const wget = require("wget-improved");
const path = require('path')

const f2 = path => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        rej("Error in reading");
      } else {
        res(data);
      }
    });
  });
};

const f3 = path => {
  return new Promise((res, rej) => {
    fs.access(path, err => {
      if (err) {
        rej(0);
      } else {
        res(1);
      }
    });
  });
};

var Cookies;

describe("Task 4 tests #start_test:", function () {
  it("should check blogs at homepage", function (done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
      .end(function (err, res) {
        console.log(res.header['location'])
        // const imagePath = path.join(__dirname,"/testingImages/test3.1.jpeg")

        Cookies = res.headers['set-cookie'];
        var req = request(app).post('/createBlog');

        req.cookies = Cookies;
        req.set('Accept', 'application/json')
          .send({
            blog_heading: "Test 3",
            blog: "Hi!!! This is content for task 3",
          })
          //  .attach('file',imagePath)
          .end(function (err, res) {
            req = request(app).get("/homepage")
            req.cookies = Cookies;
            req.set('Accept', 'application/json')
              .end(function (err, res) {
                //  console.log(res.text)
                const dom = new JSDOM(res.text);
                //  console.log(dom.window.document.getElementsByTagName("h2")[3])
                expect(res.text).to.include("Test 3");
                //  expect(dom.window.document.getElementsByTagName("img").length).to.be.at.least(1)
                done()
              })
          });
      });
  })
  it("should check blogs at home page #end_test", function (done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: "lost@frequencies.com", password: "areyouwithme" })
      .end(function (err, res) {
        console.log(res.header['location'])
        // const imagePath = path.join(__dirname,"/testingImages/test3.1.jpeg")

        Cookies = res.headers['set-cookie'];
        var req = request(app).post('/createBlog');

        req.cookies = Cookies;
        req.set('Accept', 'application/json')
          .send({
            blog_heading: "Test Lost Frequencies",
            blog: "Hi!!! Are you with me?",
          })
          //  .attach('file',imagePath)
          .end(function (err, res) {
            req = request(app).get("/homepage")
            req.cookies = Cookies;
            req.set('Accept', 'application/json')
              .end(function (err, res) {
                const dom = new JSDOM(res.text);
                //  console.log(dom.window.document.getElementsByTagName("h2")[3])
                expect(res.text).to.include("Test 3");
                //  expect(dom.window.document.getElementsByTagName("img").length).to.be.at.least(1)
                done()
                process.exit();
              })
          });
      });
  })
});
