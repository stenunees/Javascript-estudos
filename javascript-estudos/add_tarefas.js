// interactiveTaskManager.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Task {
    constructor(id, title, description, priority = "normal", completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = completed;
    }

    markAsCompleted() {
        this.completed = true;
    }

    updateDetails(title, description, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    addTask(title, description, priority = "normal") {
        const newTask = new Task(this.currentId, title, description, priority);
        this.tasks.push(newTask);
        this.currentId++;
        console.log(`Task "${title}" added successfully!`);
    }

    listTasks(filter = "all") {
        let filteredTasks = this.tasks;

        if (filter === "completed") {
            filteredTasks = this.tasks.filter(task => task.completed);
        } else if (filter === "pending") {
            filteredTasks = this.tasks.filter(task => !task.completed);
        }

        if (filteredTasks.length === 0) {
            console.log("No tasks found.");
        } else {
            console.log("Task List:");
            filteredTasks.forEach(task => {
                console.log(`ID: ${task.id} | Title: ${task.title} | Completed: ${task.completed}`);
            });
        }
    }

    markTaskAsCompleted(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.markAsCompleted();
            console.log(`Task "${task.title}" marked as completed.`);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }

    removeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            console.log(`Task "${this.tasks[taskIndex].title}" removed.`);
            this.tasks.splice(taskIndex, 1);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }
}

// Instanciando o TaskManager
const taskManager = new TaskManager();

// Função para exibir o menu e processar entradas do usuário
const showMenu = () => {
    console.log(`
    ==== Task Manager ====
    1. Add Task
    2. List All Tasks
    3. List Completed Tasks
    4. List Pending Tasks
    5. Mark Task as Completed
    6. Remove Task
    7. Exit
    `);

    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter task title: ', (title) => {
                    rl.question('Enter task description: ', (description) => {
                        rl.question('Enter task priority (low, normal, high): ', (priority) => {
                            taskManager.addTask(title, description, priority);
                            showMenu(); // Exibir o menu novamente após adicionar a tarefa
                        });
                    });
                });
                break;
            case '2':
                taskManager.listTasks();
                showMenu(); // Exibir o menu após listar as tarefas
                break;
            case '3':
                taskManager.listTasks('completed');
                showMenu(); // Exibir o menu após listar as tarefas concluídas
                break;
            case '4':
                taskManager.listTasks('pending');
                showMenu(); // Exibir o menu após listar as tarefas pendentes
                break;
            case '5':
                rl.question('Enter task ID to mark as completed: ', (id) => {
                    taskManager.markTaskAsCompleted(parseInt(id));
                    showMenu(); // Exibir o menu após marcar a tarefa como concluída
                });
                break;
            case '6':
                rl.question('Enter task ID to remove: ', (id) => {
                    taskManager.removeTask(parseInt(id));
                    showMenu(); // Exibir o menu após remover a tarefa
                });
                break;
            case '7':
                console.log('Exiting Task Manager...');
                rl.close(); // Fecha o programa
                break;
            default:
                console.log('Invalid option, please choose again.');
                showMenu(); // Exibir o menu novamente se a opção for inválida
                break;
        }
    });
};

// Iniciar o programa exibindo o menu
showMenu();
