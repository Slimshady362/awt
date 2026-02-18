function showWelcome(name) {
  const welcome = document.getElementById("welcomeMessage");
  welcome.textContent = `Welcome, ${name}`;
}

function clearWelcome() {
  document.getElementById("welcomeMessage").textContent = "";
}

async function emitEvent(type) {
  const username = document.getElementById("username").value;
  const extra = document.getElementById("extra").value;

  if (!username) return;

  let body = { username };

  if (type === "purchase") body.item = extra;
  if (type === "profile-update") body.field = extra;

  await fetch("/" + type, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (type === "login") {
    showWelcome(username);
  }

  if (type === "logout") {
    clearWelcome();
  }

  updateStats();
}

async function updateStats() {
  const res = await fetch("/summary");
  const data = await res.json();

  document.getElementById("loginCount").textContent = data.login;
  document.getElementById("logoutCount").textContent = data.logout;
  document.getElementById("purchaseCount").textContent = data.purchase;
  document.getElementById("updateCount").textContent = data.profileUpdate;
}

updateStats();
