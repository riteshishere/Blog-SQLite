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
describe("Task 7 tests #start_test:", function() {
    it("should check edit blog functionality #end_test", function(done) {
        request(app)
        .post('/login')
        .set('Accept','application/json')
        .send({email : "led@zeppelin.com" , password : "stairwaytoheaven"})
        .end(function(err,res){
            console.log(res.header['location'])

            Cookies = res.headers['set-cookie'];

            var req = request(app).get('/profile');

            req.cookies = Cookies;
            req.set('Accept','application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                // console.log(res.text)
                let dom = new JSDOM(res.text)
                const editBlogId = dom.window.document.getElementsByName("editBlogId")[0].getAttribute("value");
                // const imagePath = path.join(__dirname,"/testingImages/test3.1.jpeg")
                req = request(app).post('/editblog')
                .query({editBlogId : editBlogId})
                .send({
                    blog_heading : "Updated blog",
                    blog : "Hi!!! Now you are up to date.", 
                    editBlogId : editBlogId
                   })
                req.cookies = Cookies;
                req.set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function (err, res){
                    req = request(app).get("/profile")
                    req.cookies = Cookies;
                    req.set('Accept','application/json')
                    .end(function(err,res){
                        // console.log(res.text)
                        expect(res.text).to.include("Updated blog")
                        done()
                        process.exit()
                    })
                })
            })
        })
    })
})