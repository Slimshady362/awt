const EventEmitter = require("events");

const eventEmitter = new EventEmitter();


const eventCount = {
  login: 0,
  logout: 0,
  purchase: 0,
  profileUpdate: 0
};

eventEmitter.on("login", (username) => {
  eventCount.login++;
  console.log(`${username} logged in`);
});

eventEmitter.on("logout", (username) => {
  eventCount.logout++;
  console.log(`${username} logged out`);
});

eventEmitter.on("purchase", (username, item) => {
  eventCount.purchase++;
  console.log(`${username} purchased ${item}`);
});

eventEmitter.on("profileUpdate", (username, field) => {
  eventCount.profileUpdate++;
  console.log(`${username} updated ${field}`);
});

eventEmitter.on("summary", () => {
  console.log("Event Summary:", eventCount);
});

module.exports = { eventEmitter, eventCount };
