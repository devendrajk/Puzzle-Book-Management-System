require("dotenv").config();
const http = require("http");

const { init } = require("./socket");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const axios = require("axios");
const jsforce = require("jsforce");
const studentRoutes = require("./routes/students");
const orderRoutes = require("./routes/orders");
const authRoutes =require("./routes/auth");
const uploadRoutes =
require("./routes/upload");
const invoiceRoutes =
require("./routes/invoice");
const { subscribePlatformEvents } =
require("./services/platformEventService");
const paymentRoutes = require("./routes/payments");
const dashboardRoutes = require("./routes/dashboard");
const oauth2 = require("./config/salesforce");
const { generatePKCE } = require("./config/pkce")
const {
  setConnection
} = require("./services/salesforceService");
const productRoutes = require("./routes/products");
require("./config/snowflake");
const app = express();
const server = http.createServer(app);
require("./workers/orderWorker");
const io = init(server);
const productETLRoutes = require("./routes/productETL");
const snowflakeRoutes = require("./routes/snowflakeRoutes");
// const cometd = new CometD();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
io.on("connection", (socket) => {

    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {

        console.log("Client Disconnected:", socket.id);

    });

});
app.use(express.json());


app.use("/api/students", studentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
    "/api/invoice",
    invoiceRoutes
);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/etl", productETLRoutes);
app.use("/api/snowflake", snowflakeRoutes);
app.use(session({
  secret: process.env.SESSION_SECRET || "salesforce-pkce-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Puzzle Book Backend Running"
  });
});

/* ----------------------------------
   LOGIN
-----------------------------------*/

app.get("/login", async (req, res) => {

  const pkce = await generatePKCE();

  req.session.codeVerifier = pkce.code_verifier;
  req.session.state = pkce.state;

  const url =
    oauth2.getAuthorizationUrl({
      scope: "api refresh_token",
      state: pkce.state,
      code_challenge: pkce.code_challenge,
      code_challenge_method: "S256"
    });

  res.redirect(url);

});

/* ----------------------------------
   CALLBACK
-----------------------------------*/

app.get("/oauth/callback", async (req, res) => {

  try {

    const code = req.query.code;
    const state = req.query.state;

    if (!code)
      return res.status(400).send("Authorization code missing.");

    if (state !== req.session.state)
      return res.status(400).send("Invalid state.");

    const tokenResponse = await axios.post(

      `${process.env.SF_LOGIN_URL}/services/oauth2/token`,

      new URLSearchParams({

        grant_type: "authorization_code",

        client_id: process.env.SF_CLIENT_ID,

        redirect_uri: process.env.SF_REDIRECT_URI,

        code,

        code_verifier: req.session.codeVerifier

      }),

      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        }
      }

    );

    const token = tokenResponse.data;

    const conn = new jsforce.Connection({
  instanceUrl: token.instance_url,
  accessToken: token.access_token
});

    setConnection(conn);
    subscribePlatformEvents(io);


    res.send(`
        <h2>✅ Salesforce Login Successful</h2>
        <p>You can now call:</p>
        <a href="/api/products">
        http://localhost:5000/api/products
        </a>
    `);

  } catch (err) {

    console.error(err.response?.data || err);

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });

  }

});

/* ----------------------------------
   ROUTES
-----------------------------------*/

app.use("/api/products", productRoutes);

/* ----------------------------------
   START
-----------------------------------*/

server.listen(process.env.PORT, () => {

    console.log(
        `Server running on http://localhost:${process.env.PORT}`
    );

    console.log(
        `Login URL: http://localhost:${process.env.PORT}/login`
    );

});

