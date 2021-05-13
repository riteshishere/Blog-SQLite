const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const app = require("./app");
const assert = chai.assert;
let request = require("supertest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const wget = require("wget-improved");
const src1 = "http://localhost:8888/signup";
const output1 = "./signup.html";

const src2 = "http://localhost:8888/login";
const output2 = "./login.html";

// let download1 = wget.download(src1, output1);
// let download2 = wget.download(src2, output2);


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

describe("Task2 Testcases #start_test", function () {
  it("should check signup page's input fields", done => {
    request(app)
      .get('/signup')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const dom = new JSDOM(res.text);
        expect(dom.window.document.getElementsByTagName("input").length).to.equal(
          3
        );
        done();
      })
  });
  it("should check login page's input fields", done => {
    request(app)
      .get('/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const dom = new JSDOM(res.text);
        expect(dom.window.document.getElementsByTagName("input").length).to.equal(
          2
        );
        done();
      })
  });
});


describe("Task 2 tests", function () {
  it("should ensure db file exist", done => {
    f2("./backend/databases/sqltest.js").then(res => {
      expect(res).to.include("dialect");
      done();
    });
  });
  it("should ensure db file exist #end_test", done => {
    f2("./backend/databases/sqltest.js").then(res => {
      expect(res).to.include("users");
      done();
      process.exit();
    });
  });
});

