import "./style.css";
import MyImage from "./images/dots.png";
import EnterIcon from "./images/enter.png";

let tasks = [];

function toggleTaskCompleted(event) {
  const taskIndex = event.target.closest(".task-item").dataset.index;
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const addNewPlaceholder = document.createElement("li");
  addNewPlaceholder.className = "task-item add-new";
  addNewPlaceholder.innerHTML = `
    <form id="new-task-form">
      <input type="text" class="new-task-input" placeholder="Add new item">
      <img src="${EnterIcon}" class="enter-icon" alt="Enter icon">
    </form>
  `;
  taskList.prepend(addNewPlaceholder);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.dataset.index = index;

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";
    taskItem.appendChild(taskContent);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "task-checkbox";
    checkbox.addEventListener("change", toggleTaskCompleted);
    taskContent.appendChild(checkbox);

    const description = document.createElement("span");
    description.textContent = task.description;
    description.className = "task-description";
    taskContent.appendChild(description);

    const icon = document.createElement("img");
    icon.src = `${task.icon}`;
    icon.className = "task-icon";
    taskItem.appendChild(icon);

    taskList.appendChild(taskItem);
  });

  const clearButton = document.createElement("button");
  clearButton.id = "clear-button";
  clearButton.textContent = "Clear All Completed";
  clearButton.addEventListener("click", clearCompletedTasks);
  taskList.appendChild(clearButton);

  const newTaskForm = document.getElementById("new-task-form");
  const newTaskInput = document.querySelector(".new-task-input");
  const enterIcon = document.querySelector(".enter-icon");

  newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskDescription = newTaskInput.value.trim();
    if (taskDescription) {
      addNewTask(taskDescription);
      newTaskInput.value = "";
    }
  });

  enterIcon.addEventListener("click", (event) => {
    event.preventDefault();
    const taskDescription = newTaskInput.value.trim();
    if (taskDescription) {
      addNewTask(taskDescription);
      newTaskInput.value = "";
    }
  });
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

function addNewTask(taskDescription) {
  const newTask = {
    description: taskDescription,
    completed: false,
    icon: MyImage,
  };
  tasks.push(newTask);
  renderTasks();
}

renderTasks();
