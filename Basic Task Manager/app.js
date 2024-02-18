document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.querySelector('button');

    addTaskButton.addEventListener('click', () => addTask(taskInput));
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput);
        }
    });
});

function addTask(input) {
    const taskList = document.getElementById('taskList');
    const taskValue = input.value.trim();

    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = createTaskElement(taskValue);

    // Add task to the list
    taskList.appendChild(taskItem);

    // Save tasks to local storage
    saveTasks();

    // Clear input field
    input.value = '';
}

function createTaskElement(taskValue) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Task description
    taskItem.textContent = taskValue;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteTask(taskItem));

    taskItem.appendChild(deleteButton);

    // Add complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', () => completeTask(taskItem));

    taskItem.appendChild(completeButton);

    return taskItem;
}

function deleteTask(taskItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasks();
}

function completeTask(taskItem) {
    taskItem.classList.toggle('completed');

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Store task descriptions and completion status in an array
    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            description: taskItem.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        // Populate the task list with saved tasks
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.description);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
}
