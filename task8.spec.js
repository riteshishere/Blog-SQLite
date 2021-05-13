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

describe("Tasl 8 tests #start_test:", function() {
    it("should check blog show page", function(done) {
        request(app)
        .post('/login')
        .set('Accept','application/json')
        .send({email : "led@zeppelin.com" , password : "stairwaytoheaven"})
        .end(function(err,res){
            // console.log(res.header['location'])
            // const imagePath = path.join(__dirname,"/testingImages/test3.1.jpeg")
            
            Cookies = res.headers['set-cookie'];
            var req = request(app).post('/blog');
        
            req.cookies = Cookies;
            req.set('Accept','application/json')
            .field({
            blog_heading : "Project-Blog",
            blog : "I hope your journey with us so far is good and you have learnt something new from us. Your first big project with us is now ready you can now add it to your resume :)", 
            })
            // .attach('file',imagePath)
            .end(function (err, res) {
            req = request(app).get("/homepage")
            req.cookies = Cookies;
            req.set('Accept','application/json')
            .end(function(err,res){
            //    console.log(res.text)
               const dom = new JSDOM(res.text);
               expect(res.text).to.include("Project-Blog");
               done()
           })
        });
      })
    })
    it("should check upvote blog functionaloity", function(done) {
        req = request(app)
        .get('/profile')
        req.cookies = Cookies
        req.set('Accept','application/json')
        .end(function(err,res){
            console.log(res.text)
            let dom =new JSDOM(res.text)
            let blogId = dom.window.document.getElementsByName("deleteBlogId")[0].getAttribute("value");
            console.log(blogId)
            req = request(app).post("/upvote")
            req.cookies = Cookies
            req.set('Accept','application/json')
            .send({blogId : blogId})
            .end(function(err,res){
                req = request(app).get('/blogshow')
                .query({id : blogId})
                req.cookies = Cookies;
                req.set('Accept','application/json')
                .end(function(err,res){
                    let dom = new JSDOM(res.text)
                    let totalLikes = dom.window.document.getElementsByName("totalLikes")[0].textContent
                    let totalDislikes = dom.window.document.getElementsByName("totalDislikes")[0].textContent
                    expect(Number(totalLikes)).to.be.equal(1)
                    expect(Number(totalDislikes)).to.be.equal(0)
                    done()
                })
            })
        })
    })
    it("should check downvote blog functionaloity", function(done) {
        req = request(app)
        .get('/profile')
        req.cookies = Cookies
        req.set('Accept','application/json')
        .end(function(err,res){
            console.log(res.text)
            let dom =new JSDOM(res.text)
            let blogId = dom.window.document.getElementsByName("deleteBlogId")[0].getAttribute("value");
            console.log(blogId)
            req = request(app).post("/downvote")
            req.cookies = Cookies
            req.set('Accept','application/json')
            .send({blogId : blogId})
            .end(function(err,res){
                req = request(app).get('/blogshow')
                .query({id : blogId})
                req.cookies = Cookies;
                req.set('Accept','application/json')
                .end(function(err,res){
                    let dom = new JSDOM(res.text)
                    console.log(res.text)
                    let totalLikes = dom.window.document.getElementsByName("totalLikes")[0].textContent
                    let totalDislikes = dom.window.document.getElementsByName("totalDislikes")[0].textContent
                    expect(Number(totalLikes)).to.be.equal(0)
                    expect(Number(totalDislikes)).to.be.equal(1)
                    done()
                })
            })
        })
    })
    it("should check comment #end_test", function(done) {
        req = request(app)
        .get('/profile')
        req.cookies = Cookies
        req.set('Accept','application/json')
        .end(function(err,res){
            console.log(res.text)
            let dom =new JSDOM(res.text)
            let blogId = dom.window.document.getElementsByName("deleteBlogId")[0].getAttribute("value");
            console.log(blogId)
            req = request(app).post("/comment")
            req.cookies = Cookies
            req.set('Accept','application/json')
            .send({blogId : blogId,
                comment : "Konfinity Is Great :)"})
            .end(function(err,res){
                req = request(app).get('/blogshow')
                .query({id : blogId})
                req.cookies = Cookies;
                req.set('Accept','application/json')
                .end(function(err,res){
                    let dom = new JSDOM(res.text)
                    expect(res.text).to.include("Konfinity Is Great :)")
                    done()
                    process.exit();
                })
            })
        })
    })
})