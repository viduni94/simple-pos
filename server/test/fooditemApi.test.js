const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

// Testing post foodItem API endpoint
describe("POST /foodItem", function(done) {
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
  
    let menuId = mongoose.Types.ObjectId("5c7fb9efad2f0afbb27e9d47");
  
    let foodItem = {
      name: "Mocha Latte",
      unitPrice: "500",
      menu: menuId,
      category: "beverages",
      createdDate: "1551861256873"
    };
    it("respond with 200 created", function(done) {
      request(app)
        .post("/foodItem")
        .send(foodItem)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 when input is not valid", function(done) {
      request(app)
        .post("/foodItem")
        .send({
          menu: "1",
          category: "beverages",
          createdDate: "1551861256873"
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
  
  // Testing get all food items API endpoint
  describe("GET /foodItem", function(done) {
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
    it("respond with json containing a list of all food items", function(done) {
      request(app)
        .get("/foodItem")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });