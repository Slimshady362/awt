const express = require("express");
const path = require("path");

const { eventEmitter, eventCount } = require("./events/eventEmitter");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes for emitting events
app.post("/login", (req, res) => {
  eventEmitter.emit("login", req.body.username);
  res.json({ message: "Login event emitted" });
});

app.post("/logout", (req, res) => {
  eventEmitter.emit("logout", req.body.username);
  res.json({ message: "Logout event emitted" });
});

app.post("/purchase", (req, res) => {
  eventEmitter.emit("purchase", req.body.username, req.body.item);
  res.json({ message: "Purchase event emitted" });
});

app.post("/profile-update", (req, res) => {
  eventEmitter.emit("profileUpdate", req.body.username, req.body.field);
  res.json({ message: "Profile update event emitted" });
});

app.get("/summary", (req, res) => {
  eventEmitter.emit("summary");
  res.json(eventCount);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
