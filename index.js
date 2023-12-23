require("dotenv").config();
const express = require("express");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const ConnectToMongo = require("./Database/Db");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});


app.use(limiter);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "random word",
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }, //oneDay
    resave: true,
  })
);

const PORT = process.env.PORT || 5000;
ConnectToMongo();

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/blog", require("./Routes/Blog"));

app.listen(PORT, () => {
  console.log("backend app is running on http://localhost:5000");
});
