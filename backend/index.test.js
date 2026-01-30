const request = require("supertest");

// We import the app without starting the DB — tests hit the real EC2 backend
const BASE = "https://dv61z46ptns4g.cloudfront.net";

describe("Backend API endpoints", () => {
  const testEmail = `jest_test_${Date.now()}@test.com`;
  const testPassword = "TestPass123";
  let authToken = "";

  // --- Auth ---
  test("POST /signup — creates user, returns JWT", async () => {
    const res = await request(BASE).post("/signup").send({
      name: "Jest Tester",
      email: testEmail,
      password: testPassword,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("name", "Jest Tester");
    expect(res.body).toHaveProperty("email", testEmail);
    authToken = res.body.token;
  }, 15000);

  test("POST /signup — duplicate email returns 409", async () => {
    const res = await request(BASE).post("/signup").send({
      name: "Jest Tester",
      email: testEmail,
      password: testPassword,
    });
    expect(res.status).toBe(409);
  }, 15000);

  test("POST /login — valid credentials return JWT + user info", async () => {
    const res = await request(BASE).post("/login").send({
      email: testEmail,
      password: testPassword,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email", testEmail);
    authToken = res.body.token;
  }, 15000);

  test("POST /login — wrong password returns 401", async () => {
    const res = await request(BASE).post("/login").send({
      email: testEmail,
      password: "wrongpassword",
    });
    expect(res.status).toBe(401);
  }, 15000);

  // --- Data endpoints ---
  test("GET /allHoldings — returns array", async () => {
    const res = await request(BASE).get("/allHoldings");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000);

  test("GET /allPositions — returns array", async () => {
    const res = await request(BASE).get("/allPositions");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000);

  test("GET /allOrders — returns array", async () => {
    const res = await request(BASE).get("/allOrders");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000);

  // --- Orders ---
  test("POST /newOrder — BUY order saved successfully", async () => {
    const res = await request(BASE).post("/newOrder").send({
      name: "TCS",
      qty: 2,
      price: 4218.75,
      mode: "BUY",
      option: "CNC",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Order placed successfully");
  }, 15000);

  test("POST /newOrder — missing fields returns 400", async () => {
    const res = await request(BASE).post("/newOrder").send({
      name: "TCS",
      qty: 1,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  }, 15000);

  test("POST /newOrder — SELL order saved successfully", async () => {
    const res = await request(BASE).post("/newOrder").send({
      name: "TCS",
      qty: 1,
      price: 4250.00,
      mode: "SELL",
      option: "MIS",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  }, 15000);
});
