const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

// Testing login API endpoint
describe("POST /login", function(done) {
    it("respond with 400 on login data validation error", function(done) {
      let token = null;
      request(app)
        .post("/login")
        .send({ email: "www", password: "123" })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  
    it("respond with 404 on user not found", function(done) {
      let token = null;
      request(app)
        .post("/login")
        .send({ email: "abc@gmail.com", password: "123" })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(404)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  
    it("respond with 400 on password incorrect", function(done) {
      let token = null;
      request(app)
        .post("/login")
        .send({ email: "viduni.ushanka@gmail.com", password: "1" })
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  
    it("respond with 400 on invalid login input", function(done) {
      let token = null;
      request(app)
        .post("/login")
        .send({})
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(400)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  });