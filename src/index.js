import './style.css';
import MyImage from './images/dots.png';
import EnterIcon from './images/enter.png';

let tasks = [
  {
    description: 'Task 1',
    completed: false,
    index: 1,
    icon: MyImage,
  },
  {
    description: 'Task 2',
    completed: true,
    index: 2,
    icon: MyImage,
  },
  {
    description: 'Task 3',
    completed: false,
    index: 3,
    icon: MyImage,
  },
];

function renderTasks() {
  const taskList = document.getElementById('task-list');

  const addNewPlaceholder = document.createElement('li');
  addNewPlaceholder.className = 'task-item add-new';
  addNewPlaceholder.innerHTML = `
    <span class="task-description">Add new item</span>
    <img src="${EnterIcon}" class="enter-icon">
  `;
  taskList.prepend(addNewPlaceholder);

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.dataset.index = task.index;

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    taskItem.appendChild(taskContent);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    taskContent.appendChild(checkbox);

    const description = document.createElement('span');
    description.textContent = task.description;
    description.className = 'task-description';
    taskContent.appendChild(description);

    const icon = document.createElement('img');
    icon.src = `${task.icon}`;
    icon.className = 'task-icon';
    taskItem.appendChild(icon);

    taskList.appendChild(taskItem);
  });

  const clearButton = document.createElement('button');
  clearButton.id = 'clear-button';
  clearButton.textContent = 'Clear All Completed';
  clearButton.addEventListener('click', clearCompletedTasks);
  taskList.appendChild(clearButton);
}

renderTasks();
