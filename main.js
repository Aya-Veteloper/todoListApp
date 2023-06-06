const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
const deleteTasks = document.querySelector('.delete');
// const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-all');


//getting localStorage To do list
let todos = JSON.parse(localStorage.getItem('todo-list'));

// filters.forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelector('span.active').classList.remove('active');
//         btn.classList.add('active');
//         showTodo(btn.id)
//     });
// });


function showTodo(){
    let li = "";
    if (todos){
        todos.forEach((todos, id) => {
            let isCompleted = todos.status == 'completed'? 'checked' : '';
                li += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                                <p class='${isCompleted}'>${todos.name}</p>
                            </label>
                            <button onclick='deleteTask(${id})' class="delete">Delete</button>
                        </li>`
        });
        taskBox.innerHTML = li;
    }
}

showTodo('all');

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length)
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
})

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add('checked');
        todos[selectedTask.id].status = 'completed'
    } else {
        taskName.classList.remove('checked');
        todos[selectedTask.id].status = 'pending'
    }
    localStorage.setItem('todo-list', JSON.stringify(todos));
}


// deleteTasks.addEventListener('click', deleteTask)

function deleteTask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
}


taskInput.addEventListener('keyup', e => {
    let userTask = taskInput.value.trim();
    if (e.key === 'Enter' && userTask){
        if(!todos) { //if todos is not exist, pass an empty array to todos 
            todos = [];
        }
        taskInput.value = ""
        let taskInfo = {name: userTask, status: 'pending'};
        todos.push(taskInfo); //adding new task to todos
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo();
    }
    
})