// Add event listener to the "Add Task" button
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Load tasks from cookies on page load
window.addEventListener('DOMContentLoaded', loadTasksFromCookies);

function addTask() {
    // Create a new input for task entry
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter new task...';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => {
        if (taskInput.value.trim()) {
            addTaskToList(taskInput.value.trim());
            saveTaskToCookies(taskInput.value.trim());
            taskInput.parentElement.remove(); // Remove the task input after adding
        } else {
            alert("Task cannot be empty!"); // Show a message if input is empty
        }
    });

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(addButton);

    document.getElementById('task-list').appendChild(taskContainer);
}

function addTaskToList(taskValue) {
    // Create a container for each task
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // Checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Task text
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        taskContainer.remove();
        removeTaskFromCookies(taskValue);
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(deleteButton);

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
    const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('tasks='));
    return cookies ? JSON.parse(decodeURIComponent(cookies.split('=')[1])) : [];
}

function loadTasksFromCookies() {
    const tasks = getTasksFromCookies();
    tasks.forEach(task => addTaskToList(task));
}
