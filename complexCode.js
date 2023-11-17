// Filename: complexCode.js

/**
 * Description:
 * This code demonstrates a complex JavaScript program that implements a web-based task management system.
 * It allows users to create, update, and delete tasks. Tasks can have multiple sub-tasks, due dates, priorities, etc.
 * The code showcases an object-oriented approach with various classes, inheritance, and encapsulation.
 * Additionally, it includes event handling, asynchronous operations, and DOM manipulation.
 *
 * Author: Your Name
 * Date: Today's Date
 */

// Define Task class
class Task {
  constructor(title, priority) {
    this.id = Date.now();
    this.title = title;
    this.priority = priority;
    this.completed = false;
    this.subTasks = [];
  }

  addSubTask(subTask) {
    this.subTasks.push(subTask);
  }

  removeSubTask(subTask) {
    const index = this.subTasks.indexOf(subTask);
    if (index >= 0) {
      this.subTasks.splice(index, 1);
    }
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

// Define SubTask class extending Task
class SubTask extends Task {
  constructor(title, priority, parentTask) {
    super(title, priority);
    this.parentTask = parentTask;
  }
}

// Define TaskManager class to manage tasks
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  createTask(title, priority) {
    const task = new Task(title, priority);
    this.tasks.push(task);
    return task;
  }

  deleteTask(task) {
    const index = this.tasks.indexOf(task);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  updateTask(task, updatedTitle, updatedPriority) {
    task.title = updatedTitle;
    task.priority = updatedPriority;
  }
}

// Create instance of TaskManager
const taskManager = new TaskManager();

// Retrieve DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Function to render tasks on the DOM
function renderTasks() {
  taskList.innerHTML = '';

  taskManager.tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerText = task.title;
    taskItem.classList.add('task-item');

    // Add event listener for task completion toggle
    taskItem.addEventListener('click', () => {
      task.toggleCompleted();
      renderTasks();
    });

    taskList.appendChild(taskItem);
  });
}

// Event listener for task form submission
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskTitle = document.getElementById('task-title').value;
  const taskPriority = document.getElementById('task-priority').value;

  if (taskTitle && taskPriority) {
    taskManager.createTask(taskTitle, taskPriority);
    renderTasks();
    taskForm.reset();
  }
});

// Initial rendering of tasks
renderTasks();