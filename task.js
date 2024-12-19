    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    let tasks = [];

    function updateEmptyState() {
        emptyState.style.display = tasks.length === 0 ? 'block' : 'none';
    }
    updateEmptyState();

    addTaskButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    function addTask(taskText) {
        if (!taskText.trim()){
             return;
        }
        const task = {
            id: tasks.length + 1,
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTask(task);
        updateEmptyState();
        taskInput.value = '';
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="complete-button">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-button" >Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }


    taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) {
            return;
        }
        const taskId = parseInt(taskItem.dataset.id);
        if (e.target.classList.contains('complete-button')) {
            toggleComplete(taskId);
        } else if (e.target.classList.contains('delete-button')) {
            deleteTask(taskId);
        }
    });

    function toggleComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }else{
                return task;
            }
        });
        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        taskElement.classList.toggle('completed');
        const completeButton = taskElement.querySelector('.complete-button');
        completeButton.textContent = taskElement.classList.contains('completed') ? 'Undo' : 'Complete';
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        taskElement.remove();
        updateEmptyState();
    }
