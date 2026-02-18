const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];
let lastDeleted = null;

app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    text: req.body.text
  };

  todos.push(newTodo);
  res.json(newTodo);
});


app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    lastDeleted = todos[index];
    todos.splice(index, 1);
  }

  res.json({ success: true });
});

// UNDO last delete
app.post("/undo", (req, res) => {
  if (lastDeleted) {
    todos.push(lastDeleted);
    lastDeleted = null;
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
