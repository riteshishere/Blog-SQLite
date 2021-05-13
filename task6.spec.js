const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;
const fs = require("fs")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const wget = require("wget-improved");
const path = require("path")

var Cookies;
var blogId;
describe("Task 6 tests #start_test:", function () {
    it("should check profile page", function (done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
            .end(function (err, res) {
                console.log(res.header['location'])

                Cookies = res.headers['set-cookie'];

                var req = request(app).get('/profile');

                req.cookies = Cookies;
                req.set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        // console.log(res.text)
                        expect(res.text).to.include("Test 3")
                        expect(res.text).to.include("Hello Led")
                        expect(res.text).to.not.include("Test Lost Frequencies");
                        expect(res.text).to.not.include("Hi!!! Are you with me?");
                        done()
                    })
            })
    })
    it("should check remove blog funtionality #end_test", function (done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
            .end(function (err, res) {
                console.log(res.header['location'])

                Cookies = res.headers['set-cookie'];

                var req = request(app).get('/profile');

                req.cookies = Cookies;
                req.set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        // console.log(res.text)
                        let dom = new JSDOM(res.text)
                        const deleteBlogId = dom.window.document.getElementsByName("deleteBlogId")[0].getAttribute("value");
                        const editButton = dom.window.document.getElementsByName("editBlogId").length;
                        console.log("----editButton", editButton)
                        // const imagePath = path.join(__dirname,"/testingImages/test3.1.jpeg")
                        req = request(app).get('/removeblog')
                            .query({ deleteBlogId: deleteBlogId })
                        req.cookies = Cookies;
                        req.set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .end(function (err, res) {
                                req = request(app).get("/profile")
                                req.cookies = Cookies;
                                req.set('Accept', 'application/json')
                                    .end(function (err, res) {
                                        let dom = new JSDOM(res.text)
                                        const editButtonAfterDelete = dom.window.document.getElementsByName("editBlogId").length;
                                        expect(editButton).to.equal(editButtonAfterDelete + 1);
                                        done()
                                        process.exit()
                                    })
                            })
                    })
            })
    })
})
