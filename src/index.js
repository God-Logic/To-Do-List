import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

const taskList = document.getElementById('task-list');
const newTaskForm = document.getElementById('new-task-form');
const newTaskInput = document.querySelector('.new-task-input');
const removeButton = document.querySelector('.remove-button');

let tasks = [];

function toggleTaskCompleted(taskItem, index) {
  tasks[index].completed = !tasks[index].completed;
  taskItem.classList.toggle('completed');
}

function renderTasks() {
  // Clear existing tasks in the task list
  taskList.innerHTML = '';

  // Render all tasks
  tasks.forEach((task, index) => {
    // Create task item element
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.dataset.index = index;

    // Create task checkbox element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => {
      toggleTaskCompleted(taskItem, index);
    });
    taskItem.appendChild(checkbox);

    // Create task description element
    const description = document.createElement('div');
    description.textContent = task.description;
    description.className = 'task-description';
    taskItem.appendChild(description);

    // Create task icon element
    const icon = document.createElement('button');
    icon.innerHTML = '<i class="fa fa-ellipsis-v fa-xl"></i>';
    icon.className = 'task-icon';
    taskItem.appendChild(icon);

    // Append task item to task list
    taskList.appendChild(taskItem);
  });
}

function addNewTask(event) {
  event.preventDefault();
  const taskDescription = newTaskInput.value.trim();
  if (taskDescription) {
    const newTask = {
      description: taskDescription,
      completed: false,
      icon: './images/dots.png',
    };
    tasks.push(newTask);
    newTaskInput.value = '';
    renderTasks();
  }
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

// Add event listener for adding a new task
newTaskForm.addEventListener('submit', addNewTask);

// Add event listener for removing completed tasks
removeButton.addEventListener('click', clearCompletedTasks);
