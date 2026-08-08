const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todoInput = $("#todo-input");
const addBtn = $("#add-btn");
const inputError = $("#input-error");
const todoList = $("#todo-list");
const filterBtns = $$(".filter-btn");
const todoStats = $("#todo-stats");
const clearCompletedBtn = $("#clear-completed-btn");

let todos = [];
let currentFilter = "all";

function showError(msg) {
  inputError.textContent = msg;
  inputError.classList.remove("hidden");
}
function clearError() {
  inputError.textContent = "";
  inputError.classList.add("hidden");
}
function render() {
  const activeTodos = todos.filter((todo) => !todo.deleted);
  let filtered = activeTodos;
  if (currentFilter === "active")
    filtered = activeTodos.filter((todo) => !todo.completed);
  if (currentFilter === "completed")
    filtered = activeTodos.filter((todo) => todo.completed);
  todoList.innerHTML = "";
  if (filtered.length === 0) {
    todoList.innerHTML = `<li class="text-center text-slate-400 py-8 italic">Không có todo nào</li>`;
  } else {
    filtered.forEach((todo) => {
      const li = document.createElement("li");
      li.dataset.id = todo.id;
      li.className =
        "flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition duration-150 ease-in-out group";

      if (todo.isEditing) {
        li.innerHTML = `
        <div class="w-full">
          <input class="edit-input w-full px-3 py-1.5 border border-indigo-400 rounded focus:outline-none focus:border-purple-600 text-slate-800" value="${todo.text}" type="text"/>
          <p></p>
        </div>`;
      } else {
        li.innerHTML = `
        <div class="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <input type="checkbox" ${todo.completed ? "checked" : ""} class="todo-toggle w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"/>
        <span class="todo-text truncate cursor-pointer font-medium ${todo.completed ? "line-through text-slate-400" : "text-slate-700"}">${todo.text}</span>
        </div>
        <button class="delete-btn opacity-80 group-hover:opacity-100 text-red-500 hover:text-red-700 px-3 py-1 text-sm rounded hover:bg-red-50 transition"><i class="fa-solid fa-trash pointer-events-none "></i></button>`;
      }
      todoList.appendChild(li);
    });
  }
  const completedCount = activeTodos.filter((t) => t.completed).length;
  todoStats.textContent = `${completedCount}/${activeTodos.length} mục đã hoàn thành`;
  if (completedCount > 0) {
    clearCompletedBtn.classList.remove("hidden");
  } else {
    clearCompletedBtn.classList.add("hidden");
  }
}
function handleAddTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    showError("Vui lòng nhập nội dung to do!");
    return;
  }
  clearError();
  todos.push({ id: Date.now(), text, completed: false, deleted: false });
  todoInput.value = "";
  todoInput.focus();
  render();
}

addBtn.addEventListener("click", handleAddTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddTodo();
});

todoList.addEventListener("change", (e) => {
  if (e.target.classList.contains("todo-toggle")) {
    const id = Number(e.target.closest("li").dataset.id);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = e.target.checked;
      render();
    }
  }
});

todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  const todo = todos.find((t) => t.id === id);
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Bạn có chắc chắn muốn xóa todo này không?")) {
      todo.deleted = true;
      render();
    }
  }
});

todoList.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("todo-text")) {
    const id = Number(e.target.closest("li").dataset.id);
    todos.forEach((t) => (t.isEditing = t.id === id));
    render();
    const editInput = todoList.querySelector(".edit-input");
    if (editInput) {
      editInput.focus();
      editInput.setSelectionRange(
        editInput.value.length,
        editInput.value.length,
      );
    }
  }
});

todoList.addEventListener("keydown", (e) => {
  if (!e.target.classList.contains("edit-input")) return;
  const id = Number(e.target.closest("li").dataset.id);
  const todo = todos.find((t) => t.id === id);
  if (e.key === "Enter") {
    const newText = e.target.value.trim();
    if (!newText) {
      const errEl = e.target.nextElementSibling;
      errEl.textContent = "Vui lòng nhập nội dung todo";
      errEl.classList.remove("hidden");
      return;
    }
    todo.text = newText;
    todo.isEditing = false;
    render();
  } else if (e.key === "Escape") {
    todo.isEditing = false;
    render();
  }
});

todoList.addEventListener("focusout", e => {
  if (e.target.classList.contains("edit-input")) {
    const id = Number(e.target.closest("li").dataset.id);
    const todo = todos.find(t => t.id === id);
    if (todo && todo.isEditing) {
      const newText = e.target.value.trim();
      if (newText) {
        todo.text = newText;
      }
      todo.isEditing = false;
      render();
    }
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => {
      b.className = "filter-btn px-3 py-1.5 rounded-md text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition";
    })
    btn.className = "filter-btn px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-600 text-white shadow-sm transition";
    currentFilter = btn.dataset.filter;
    render();
  })
})

clearCompletedBtn.addEventListener("click", () => {
  if (confirm("Xóa tất cả công việc đã hoàn thành?")) {
    todos.forEach(t => {
      if (t.completed) t.deleted = true;
    })
    render();
  }
})
render();
