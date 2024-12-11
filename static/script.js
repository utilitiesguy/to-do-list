document.getElementById('add-task-btn').addEventListener('click', addTask);

window.addEventListener('DOMContentLoaded', loadTasksFromCookies);

function addTask() {
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter new task...';
    taskInput.classList.add('task-input');

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.classList.add('add-btn');

    addButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            // Add task to the list and to cookies
            addTaskToList(taskValue, false); // false indicates not completed
            saveTaskToCookies(taskValue, false); // Save task with initial unchecked state
            taskInput.value = ''; // Clear the input field after adding the task
        } else {
            alert("Task cannot be empty!"); // Show alert if input is empty
        }
    });

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(addButton);

    document.getElementById('task-list').appendChild(taskContainer);
}

function addTaskToList(taskValue, isChecked) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;

    checkbox.addEventListener('change', function() {
        const taskText = taskContainer.querySelector('.task-text');
        if (checkbox.checked) {
            taskText.classList.add('checked');
        } else {
            taskText.classList.remove('checked');
        }
        saveTasksState();
    });

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    taskText.classList.add('task-text');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function() {
        taskContainer.remove();
        removeTaskFromCookies(taskValue);
        saveTasksState();
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(taskContainer);
}

function saveTaskToCookies(taskValue, isChecked) {
    const tasks = getTasksFromCookies();
    tasks.push({ task: taskValue, done: isChecked });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/to-do-list`;
}

function removeTaskFromCookies(taskValue) {
    const tasks = getTasksFromCookies();
    const updatedTasks = tasks.filter(task => task.task !== taskValue);
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(updatedTasks))}; path=/to-do-list`;
}

function getTasksFromCookies() {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    return cookies ? JSON.parse(decodeURIComponent(cookies.split('=')[1])) : [];
}

function loadTasksFromCookies() {
    const tasks = getTasksFromCookies();
    tasks.forEach(task => {
        addTaskToList(task.task, task.done);
    });
}

function saveTasksState() {
    const tasks = [];
    const taskContainers = document.querySelectorAll('.task-container');
    taskContainers.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        const taskText = container.querySelector('.task-text').textContent;
        tasks.push({ task: taskText, done: checkbox.checked });
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/to-do-list`;
}
