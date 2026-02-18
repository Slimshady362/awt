const todoList = document.getElementById("todoList");
const undoBtn = document.getElementById("undoBtn");

async function fetchTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.text}
      <button onclick="deleteTodo('${todo.id}')">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (!text) return;

  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch("/todos/" + id, {
    method: "DELETE"
  });

  undoBtn.classList.remove("hidden");
  fetchTodos();
}

async function undoDelete() {
  await fetch("/undo", {
    method: "POST"
  });

  undoBtn.classList.add("hidden");
  fetchTodos();
}

fetchTodos();

