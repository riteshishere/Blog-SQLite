const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;
const fs = require("fs")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const wget = require("wget-improved");

var Cookies;
var blogId;
describe("Task 5 tests #start_test:", function() {
    // it("should check blog at blog page", function(done) {
    //     request(app)
    //     .post('/login')
    //     .set('Accept','application/json')
    //     .send({email : "led@zeppelin.com" , password : "stairwaytoheaven"})
    //     .end(function(err,res){
    //         console.log(res.header['location'])

    //         Cookies = res.headers['set-cookie'];

    //         var req = request(app).get('/blogshow?id=1');

    //         req.cookies = Cookies;
    //         req.set('Accept','application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             const dom = new JSDOM(res.text);
    //             // console.log(res.text)
    //             // expect(res.text).to.include("test3.1.jpeg");
    //             done()
                
    //         })
    //     });
    // })
    it("should check blog page", function(done) {
        request(app)
        .post('/login')
        .set('Accept','application/json')
        .send({email : "led@zeppelin.com" , password : "stairwaytoheaven"})
        .end(function(err,res){
            console.log(res.header['location'])

            Cookies = res.headers['set-cookie'];

            var req = request(app).get('/blog?id=1');

            req.cookies = Cookies;
            req.set('Accept','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                const dom = new JSDOM(res.text);
                expect(res.text).to.include("Test 3");
                 done()
            })
        });
    })
    it("should check blog page #end_test", function(done) {
        request(app)
        .post('/login')
        .set('Accept','application/json')
        .send({email : "led@zeppelin.com" , password : "stairwaytoheaven"})
        .end(function(err,res){
            console.log(res.header['location'])

            Cookies = res.headers['set-cookie'];

            var req = request(app).get('/blog?id=1');

            req.cookies = Cookies;
            req.set('Accept','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                const dom = new JSDOM(res.text);
                console.log(res.text)
                expect(res.text).to.include("Hi!!! This is content for task 3");
                 done()
                 process.exit()
            })
        });
    })
})