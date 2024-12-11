document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter new task...';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => {
        if (taskInput.value.trim()) {
            addTaskToList(taskInput.value.trim());
            taskInput.value = ''; // Clear input after adding
        }
    });

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(addButton);

    document.getElementById('task-list').appendChild(taskContainer);
}

function addTaskToList(taskValue) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        taskContainer.remove();
        removeTaskFromCookie(taskValue);
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(taskContainer);

    saveTaskToCookie(taskValue);
}

function saveTaskToCookie(taskValue) {
    document.cookie = `task_${encodeURIComponent(taskValue)}=true; path=/`;
}

function removeTaskFromCookie(taskValue) {
    document.cookie = `task_${encodeURIComponent(taskValue)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
