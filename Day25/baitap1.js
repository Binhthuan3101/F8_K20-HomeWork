const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todoInput = $("#todo-input");
const addWork = $("#add-btn");
const todoList = $("#todo-list");
const todoCount = $("#todo-count");

let tasks = [];
function updateCount() {
  const activeTasks = todoList.querySelectorAll("li:not(.completed)").length;
  todoCount.textContent = `Còn ${activeTasks} việc chưa xong`;
}

function triggerAlert() {
  todoInput.style.border = "2px solid red";
  todoInput.style.outline = "none";
  setTimeout(() => {
    todoInput.style.border = "";
    todoInput.style.outline = "";
  }, 800);
}

function render() {
  const html = tasks
    .map((task, index) => {
      return `
        <li>
            ${task}
            <button class="delete-btn" onclick="deleteTask(${index})">
            <i class="fa-solid fa-trash"></i>
            </button>
        </li>`;
    })
    .join("");
  todoList.innerHTML = html;
  updateCount();
}

function addTodo() {
  const text = todoInput.value.trim();
  todoInput.focus();
  if (text === "") return;
  const isDuplicate = tasks.some(
    (task) => task.toLowerCase() === text.toLowerCase(),
  );
  if (isDuplicate) {
    triggerAlert();
    return;
  }
  tasks.push(text);
  todoInput.value = "";
  render();
}

addWork.addEventListener("click", addTodo);
window.deletedTask = function (index) {
  tasks.splice(index, 1);
  render();
};
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

todoList.addEventListener("click", function (event) {
  const target = event.target;
  if (
    !target.classList.contains("delete-btn") &&
    !target.classList.contains("fa-trash")
  ) {
    const li = target.closest("li");
    if (li) {
      li.classList.toggle("completed");
      if (li.classList.contains("completed")) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.5";
      } else {
        li.style.textDecoration = "none";
        li.style.opacity = "1";
      }
      updateCount();
    }
  }
});
