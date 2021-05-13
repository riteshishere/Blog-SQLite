const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const app = require("./app");
const assert = chai.assert;
let request = require("supertest");

const f1 = p => {
  return new Promise((resolve, reject) => {
    fs.readdir(p, (err, files) => {
      if (err) {
        reject(0);
      } else {
        resolve(files);
      }
    });
  });
};

describe("Task 1 tests #start_test", function() {
  it("should ensure directory exist1", done => {
    f1("backend").then(res => {
      expect(res).to.include("controllers");
      done();
    });
  });
  it("should ensure directory exist2", done => {
    f1("backend").then(res => {
      expect(res).to.include("databases");
      done();
    });
  });
  it("should ensure directory exist3", done => {
    f1("backend").then(res => {
      expect(res).to.include("routes");
      done();
    });
  });
  it("should ensure directory exist4", done => {
    f1("client").then(res => {
      expect(res).to.include("views");
      done();
    });
  });
});

describe("Task 1 test part 2", function() {
  it("should check the port", function(done) {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .end(function(err, res) {
        assert.equal(res.status, 302);
        done();
      });
  });
  it("should check the ports #end_test", function(done) {
    request(app)
      .get("/login")
      .set("Accept", "application/json")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
        process.exit();
      });
  });
});
