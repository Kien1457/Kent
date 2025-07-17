const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /accounts", () => {
  it("should create an account and return 201 with the account object.", async () => {
    const payload = { name: "John Doe", email: "kent@gmail.com" };
    const res = await request(app)
      .post("/accounts")
      .send(payload)
      .set("Accept", "application/json");
    expect(res.status).to.equal(201);
    expect(res.body).to.include.keys("id", "name", "email");
    expect(res.body.name).to.equal(payload.name);
    expect(res.body.email).to.equal(payload.email);
  });

  it("should return 200 and an array of accounts", async () => {
    const res = await request(app)
      .get("/accounts")
      .set("Accept", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
