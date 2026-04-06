const form = document.getElementById("contactForm");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Toast */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* Theme */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* Form Validation */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let valid = true;

  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  if (name.value.trim() === "") {
    name.nextElementSibling.textContent = "Full name is required";
    valid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (email.value.trim() === "") {
    email.nextElementSibling.textContent = "Email is required";
    valid = false;
  } else if (!email.value.match(emailPattern)) {
    email.nextElementSibling.textContent = "Enter a valid email";
    valid = false;
  }

  if (message.value.trim() === "") {
    message.nextElementSibling.textContent = "Message cannot be empty";
    valid = false;
  }

  if (valid) {
    showToast("Message Sent Successfully ✅");
    form.reset();
  }
});

/* Todo Functions */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      ${task.text}
      <div class="task-actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  if (taskInput.value.trim() === "") return;

  tasks.push({ text: taskInput.value, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
  showToast("Task Added ✅");
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showToast("Task Deleted ❌");
}

addTaskBtn.addEventListener("click", addTask);

renderTasks();