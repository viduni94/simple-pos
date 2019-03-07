const request = require("supertest");
let app = require("../server1");
const mongoose = require("mongoose");

//==================== Order API test ====================

// Testing get all orders API endpoint
describe("GET /order", function(done) {
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
  it("respond with json containing a list of all orders", function(done) {
    request(app)
      .get("/order")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Testing post order API endpoint
describe("POST /order", function(done) {
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

  let orderData = {
    id: "5c6e3ef41b5ce04615a0b482",
    orderDate: "1551861256873",
    status: true,
    userId: "5c6902f5eb2d6a2c8b79c9e9",
    customerId: "5c6e2bbd87f5c9354b7d26bb",
    orderItems: [
      {
        foodItem: "5c74a16fc66e2266aaf37c6d",
        itemCount: 3
      }
    ],
    createdDate: "1551861256873"
  };
  it("respond with 200 created", function(done) {
    request(app)
      .post("/order")
      .send(orderData)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

// Testing update an order status by id API endpoint
describe("PUT /order/:id", function(done) {
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
  it("respond with json containing single order", function(done) {
    let id = mongoose.Types.ObjectId("5c7fae202adb8a1cc0af9be0");
    request(app)
      .put(`/order/${id}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  // Testing update an order status by id for non-existing order
  it("respond with order not found", function(done) {
    let id = mongoose.Types.ObjectId("5c7fae202adb8a1cc0af9abc");
    request(app)
      .put(`/order/${id}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

// Testing add an order item to order API endpoint
describe("POST /order/orderItem", function(done) {
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

  let id = mongoose.Types.ObjectId("5c7fb1bd95831f248a1ed6cc");

  let newItem = {
    foodItem: "5c74a16fc66e2266aaf37c6d",
    itemCount: 2,
    orderId: id
  };

  it("respond with json containing single updated order", function(done) {
    request(app)
      .post("/order/orderItem")
      .send(newItem)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  let id1 = mongoose.Types.ObjectId("5c7fae202adb8a1cc0af9abc");

  let newItem1 = {
    foodItem: "5c74a16fc66e2266aaf37c6d",
    itemCount: 2,
    orderId: id1
  };

  it("respond with order not found", function(done) {
    request(app)
      .post("/order/orderItem")
      .send(newItem1)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

// Testing delete an order item from order API endpoint
describe("DELETE /order/orderItem/:orderId/:itemId", function(done) {
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
  it("respond with json containing single order", function(done) {
    let orderId = mongoose.Types.ObjectId("5c7fafc03e60ec2013f10d3a");
    let itemId = mongoose.Types.ObjectId("5c7fafc03e60ec2013f10d3b");
    request(app)
      .delete(`/order/orderItem/${orderId}/${itemId}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  // Testing update an order status by id for non-existing order
  it("respond with order not found", function(done) {
    let orderId = mongoose.Types.ObjectId("5c7fae202adb8a1cc0af9abc");
    let itemId = mongoose.Types.ObjectId("5c7fae202adb8a1cc0af9be1");
    request(app)
      .delete(`/order/orderItem/${orderId}/${itemId}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

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

  let customerData = {
    fname: "test",
    lname: "testtest",
    userId: id,
    mobile: mobile
  };

  it("respond with 200 created", function(done) {
    request(app)
      .post("/customer")
      .send(customerData)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

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
});
process.exit(1);
