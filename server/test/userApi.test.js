const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

// Testing user API endpoint
describe("POST /user", function(done) {
    const randomString = Math.random()
      .toString(36)
      .substr(2, 5);
    it("respond with 200 created", function(done) {
      request(app)
        .post("/user")
        .send({ fname: "test", lname: "test", email: `${randomString}@gmail.com`, password: "1" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
  
    it("respond with 400 on login data validation error", function(done) {
      request(app)
        .post("/user")
        .send({ email: "www", password: "123" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 on existing email", function(done) {
      request(app)
        .post("/user")
        .send({ fname: "test", lname: "test", email: "viduni.ushanka@gmail.com", password: "1" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 on validation errors", function(done) {
      request(app)
        .post("/user")
        .send({ fname: "test", lname: "test" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });
  