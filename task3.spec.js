const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;
const fs = require("fs")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const wget = require("wget-improved");

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

describe("Task 3 tests #start_test:", function () {
  it("should check homepage page buttons #end_test", function (done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
      .end(function (err, res) {
        console.log(res.header['location'])

        Cookies = res.headers['set-cookie'];
        var req = request(app).get('/homepage');
        // Set cookie to get saved user session
        req.cookies = Cookies;
        req.set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            const dom = new JSDOM(res.text);
            expect(dom.window.document.getElementsByTagName("button").length).to.gt(
              3
            );
            done()
            process.exit();
          });
      });
  })
});
