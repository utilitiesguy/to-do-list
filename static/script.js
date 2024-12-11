let taskList = document.getElementById('task-list');
let addButton = document.getElementById('add-task-btn');

// Add Task button functionality
addButton.addEventListener('click', function() {
    let taskInput = prompt("Enter your task: ");
    if (taskInput) {
        addTaskToList(taskInput);
    }
});

// Function to add the task to the list
function addTaskToList(taskValue, isChecked = false) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // Create checkbox for task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;  // Set checkbox state according to saved data
    checkbox.addEventListener('change', function() {
        updateTaskState(taskContainer, taskValue, checkbox.checked);
    });

    // Create task text
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskValue;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Task';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function() {
        taskContainer.remove();
        saveTasks();  // Save tasks after delete
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(deleteButton);

    taskList.appendChild(taskContainer);

    // Save tasks after adding
    saveTasks();
}

// Save tasks (checkbox state and task list) to localStorage
function saveTasks() {
    const tasks = [];
    const taskContainers = document.querySelectorAll('.task-container');

    taskContainers.forEach(taskContainer => {
        const checkbox = taskContainer.querySelector('input[type="checkbox"]');
        const taskText = taskContainer.querySelector('.task-text').textContent;
        tasks.push({ taskText, isChecked: checkbox.checked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));  // Store task state in localStorage
}

// Load tasks from localStorage and display them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load from localStorage

    tasks.forEach(task => {
        addTaskToList(task.taskText, task.isChecked);  // Pass task state (isChecked) when adding

        const taskContainers = document.querySelectorAll('.task-container');
        const taskContainer = taskContainers[taskContainers.length - 1]; // Get the last added task
        const checkbox = taskContainer.querySelector('input[type="checkbox"]');
        const taskText = taskContainer.querySelector('.task-text');

        checkbox.checked = task.isChecked;  // Ensure checkbox stays in the correct state
        if (task.isChecked) {
            taskText.classList.add('checked');  // Apply "checked" style if the task was checked
        }
    });
}

// Update task state when checkbox is clicked
function updateTaskState(taskContainer, taskValue, isChecked) {
    const taskText = taskContainer.querySelector('.task-text');
    if (isChecked) {
        taskText.classList.add('checked');  // Mark the task as completed
    } else {
        taskText.classList.remove('checked');  // Remove completed styling
    }
    saveTasks();  // Save the updated state to localStorage
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
