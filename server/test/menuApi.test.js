const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

// Testing post menu API endpoint
describe("POST /menu", function(done) {
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
  
    let menuData = {
      name: "testMenu"
    };
    it("respond with 200 created", function(done) {
      request(app)
        .post("/menu")
        .send(menuData)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 on invalid name", function(done) {
      request(app)
        .post("/menu")
        .send({})
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