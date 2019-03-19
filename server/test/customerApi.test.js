const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

// Testing post customer API endpoint
describe("POST /customer", function(done) {
    let token = null;
    before(function(done) {
      request(app)
        .post("/login")
        .send({ email: "viduni.ushanka@gmail.com", password: "123" })
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  
    let id = mongoose.Types.ObjectId("5c6902f5eb2d6a2c8b79c9e9");
    let mobile = Math.floor(Math.random() * 10000000000).toString();
  
    it("respond with 200 created", function(done) {
      request(app)
        .post("/customer")
        .send({
          fname: "test",
          lname: "testtest",
          userId: id,
          mobile: mobile
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
    it("respond with 400", function(done) {
      request(app)
        .post("/customer")
        .send({
          fname: "test",
          lname: "testtest",
          userId: id,
          mobile: "0777774444"
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400", function(done) {
      request(app)
        .post("/customer")
        .send({
          fname: "test",
          lname: "testtest",
          mobile: "0777774444"
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400", function(done) {
      request(app)
        .post("/customer")
        .send({
          fname: "t",
          lname: "testtest"
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400", function(done) {
      request(app)
        .post("/customer")
        .send({
          lname: "testtest"
        })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });