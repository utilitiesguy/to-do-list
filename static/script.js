// Add event listener to the "Add Task" button
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Load tasks from cookies on page load
window.addEventListener('DOMContentLoaded', loadTasksFromCookies);

function addTask() {
    // Create an input for task entry
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter new task...';
    taskInput.classList.add('task-input');

    // Create an "Add" button to confirm the task input
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.classList.add('add-btn');

    addButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            // Add task to the list and to cookies
            addTaskToList(taskValue);
            saveTaskToCookies(taskValue);
            taskInput.value = ''; // Clear the input field after adding the task
        } else {
            alert("Task cannot be empty!"); // Show alert if input is empty
        }
    });

    // Create a container for the new task input and button
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(addButton);

    // Add the task input container to the DOM
    document.getElementById('task-list').appendChild(taskContainer);
}

function addTaskToList(taskValue) {
    // Create a container for each task
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // Checkbox to mark task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Add event listener for checking/unchecking the task
    checkbox.addEventListener('change', function() {
        const taskText = taskContainer.querySelector('.task-text');
        if (checkbox.checked) {
            taskText.classList.add('checked');
        } else {
            taskText.classList.remove('checked');
        }
        // Save the state of tasks to cookies
        saveTasksState();
    });

    // Task text span
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    taskText.classList.add('task-text');

    // Delete button to remove the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function() {
        taskContainer.remove();
        removeTaskFromCookies(taskValue);
        saveTasksState();
    });

    // Append checkbox, task text, and delete button to task container
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(deleteButton);

    // Add the task container to the task list
    document.getElementById('task-list').appendChild(taskContainer);
}

function saveTaskToCookies(taskValue) {
    const tasks = getTasksFromCookies();
    tasks.push(taskValue);
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/to-do-list`;
}

function removeTaskFromCookies(taskValue) {
    const tasks = getTasksFromCookies();
    const updatedTasks = tasks.filter(task => task !== taskValue);
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(updatedTasks))}; path=/to-do-list`;
}

function getTasksFromCookies() {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    return cookies ? JSON.parse(decodeURIComponent(cookies.split('=')[1])) : [];
}

function loadTasksFromCookies() {
    const tasks = getTasksFromCookies();
    tasks.forEach(task => addTaskToList(task));
}

function saveTasksState() {
    const tasks = [];
    const taskContainers = document.querySelectorAll('.task-container');
    taskContainers.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        const taskText = container.querySelector('.task-text').textContent;
        if (checkbox.checked) {
            tasks.push({ task: taskText, done: true });
        } else {
            tasks.push({ task: taskText, done: false });
        }
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/to-do-list`;
}
