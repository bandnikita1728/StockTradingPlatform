require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "stocktrading_secret_2026";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ── Auth ──────────────────────────────────────────────────────────────────────

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email: email.toLowerCase(), password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Signup successful", name: user.name, email: user.email, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password).catch(() => password === user.password);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", name: user.name, email: user.email, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Holdings & Positions ──────────────────────────────────────────────────────

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Orders ────────────────────────────────────────────────────────────────────

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ date: -1 });
    res.json(allOrders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode, option } = req.body;
    if (!name || !qty || !price || !mode)
      return res.status(400).json({ error: "name, qty, price, mode are required" });

    const order = new OrdersModel({ name, qty: Number(qty), price: Number(price), mode, option: option || "MIS", status: "COMPLETE" });
    await order.save();

    if (mode === "BUY") {
      const existing = await HoldingsModel.findOne({ name });
      if (existing) {
        const totalQty = existing.qty + Number(qty);
        const avgPrice = ((existing.avg * existing.qty) + (Number(price) * Number(qty))) / totalQty;
        existing.qty = totalQty;
        existing.avg = parseFloat(avgPrice.toFixed(2));
        existing.price = Number(price);
        await existing.save();
      } else {
        await new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "+0.00%",
          day: "+0.00%",
        }).save();
      }
    }

    if (mode === "SELL") {
      const existing = await HoldingsModel.findOne({ name });
      if (existing) {
        if (existing.qty <= Number(qty)) {
          await HoldingsModel.deleteOne({ name });
        } else {
          existing.qty = existing.qty - Number(qty);
          await existing.save();
        }
      }
    }

    res.json({ message: "Order placed successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Seed ─────────────────────────────────────────────────────────────────────

app.post("/seedHoldings", async (req, res) => {
  try {
    const count = await HoldingsModel.countDocuments();
    if (count > 0) return res.json({ message: "Holdings already seeded", count });

    const starter = [
      { name: "BHARTIARTL", qty: 2, avg: 1285.00, price: 1847.30, net: "+43.77%", day: "+0.92%" },
      { name: "HDFCBANK",   qty: 2, avg: 1520.00, price: 1892.00, net: "+24.47%", day: "+0.72%" },
      { name: "INFY",       qty: 1, avg: 1600.00, price: 1892.35, net: "+18.27%", day: "+1.24%" },
      { name: "ITC",        qty: 5, avg: 390.00,  price: 498.75,  net: "+27.88%", day: "+0.63%" },
      { name: "RELIANCE",   qty: 1, avg: 2950.00, price: 3284.15, net: "+11.33%", day: "+1.05%" },
      { name: "SBIN",       qty: 4, avg: 720.00,  price: 892.45,  net: "+23.95%", day: "+1.38%" },
      { name: "TCS",        qty: 1, avg: 3850.00, price: 4218.75, net: "+9.58%",  day: "-0.45%", isLoss: true },
    ];
    await HoldingsModel.insertMany(starter);
    res.json({ message: "Holdings seeded successfully", count: starter.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
// mongodb connected
// signup login
