let globalTasks;

class task{
    constructor(taskText, isCompleted) {
        this.taskText = taskText;
        this.isCompleted = isCompleted;
    }
}

window.onload = function (){
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if(allTasks.length>0){
        for(let i=0;i<allTasks.length;i++){
            addTaskToList(allTasks[i].taskText,allTasks[i].isCompleted);
        }
    }

    globalTasks = Array.from(allTasks);
}

function addTaskToList(taskText, isCompleted){
    let taskList = document.getElementById('task-list');
    let newListItem = document.createElement("li");
    newListItem.innerHTML=`<input class="confirm-box" type="checkbox" onclick="onCheckboxChecked(this)">
                <span class="task">${taskText}</span>
                <button class="delete-btn" onclick="onDeleteButtonClick(this)"></button>`;

    if(isCompleted){
        newListItem.children.item(1).classList.add('task-crossed-text');
        newListItem.children.item(0).checked = true;
    }
    taskList.appendChild(newListItem);
}

function onTaskAdd(){
    let taskList = document.getElementById('task-list');
    let newListItem = document.createElement("li");
    let taskText = document.getElementById('input-task').value;
    newListItem.innerHTML=`<input class="confirm-box" type="checkbox" onclick="onCheckboxChecked(this)">
                <span class="task">${taskText}</span>
                <button class="delete-btn" onclick="onDeleteButtonClick(this)"></button>`;
    taskList.appendChild(newListItem);
    document.getElementById('input-task').value='';
    globalTasks.push(new task(taskText, false));
    updateLocalStorage();
}

function onDeleteButtonClick(btn){
    if(btn==null)
        alert('Null passed');
    else{
        let taskText = btn.previousElementSibling.innerText;
        let isCompleted = btn.previousElementSibling.classList.contains('task-crossed-text');
        let index = globalTasks.findIndex(x=> x.taskText == taskText && x.isCompleted == isCompleted);
        if(index>=0)
            globalTasks.splice(index,1);

        updateLocalStorage();
        btn.parentNode.remove();
    }
}

function onCheckboxChecked(box){
    if(box==null)
        console.log('null passed');
    else{
        let textMessage = box.nextElementSibling;
        textMessage.classList.toggle('task-crossed-text');

        let taskText = textMessage.innerText;
        let isCompleted = textMessage.classList.contains('task-crossed-text');
        let index = globalTasks.findIndex(x=> x.taskText == taskText);
        if(index>=0)
            globalTasks[index].isCompleted = isCompleted;

        updateLocalStorage();
    }
}

function updateLocalStorage(){
    localStorage.removeItem('tasks');
    localStorage.setItem("tasks", JSON.stringify(globalTasks));
}