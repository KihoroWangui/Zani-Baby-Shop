require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 to avoid React port conflict

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Generate OAuth token
app.get("/token", async (req, res) => {
  const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    console.log("OAuth token generated:", response.data.access_token);
    res.json(response.data);
  } catch (error) {
    console.error("Error generating OAuth token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// STK Push endpoint
app.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone and amount are required" });
  }

  // Sandbox credentials
  const SHORTCODE = process.env.SHORTCODE || "174379";
  const PASSKEY = process.env.PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const CALLBACK_URL = process.env.CALLBACK_URL || "https://your-ngrok-url-or-domain/mpesa/callback";

  console.log("STK Push request received:", { phone, amount, SHORTCODE, CALLBACK_URL });

  try {
    // 1️⃣ Get OAuth token
    const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64");
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenResponse.data.access_token;

    // 2️⃣ Prepare STK Push
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");

    const stkPayload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: CALLBACK_URL,
      AccountReference: "Zani-Baby-Shop",
      TransactionDesc: "Payment for Order",
    };

    console.log("Sending STK Push with payload:", stkPayload);

    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    console.log("STK Push response:", stkResponse.data);
    res.json(stkResponse.data);
  } catch (error) {
    console.error("STK Push error:", error.response?.data || error.message);
    res.status(500).json({ error: "STK Push failed" });
  }
});

// STK Callback endpoint
app.post("/mpesa/callback", (req, res) => {
  console.log("STK Callback received:", JSON.stringify(req.body, null, 2));
  // TODO: Save transaction status to DB
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});