
import { renderTaskManager, login } from "./taskmanager.js";
/*
class Task{
    id;
    typeId;
    name;
    task;
    date;
    type;
    dateId;
    
    constructor(taskDetails){
        this.id = taskDetails.id;
        this.typeId = taskDetails.typeId;
        this.name = taskDetails.name;
        this.task = taskDetails.task;
        this.date = taskDetails.date;
        this.type = taskDetails.type;
        this.dateId = taskDetails.dateId;
    }
}
*/
export let tasks = [{}];

loadTasksFromStorage();

export function saveTasksToStorage(path, data){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromStorage (){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [{
            id: 1,
            typeId: 1,
            name: "Ошибка",
            task: "Сервер получил запрос, но не может отобразить контент",
            date: "204",
            type: "Error",
            dateId: 0
        }];
    }
}
export function addTask(){
    var x, t, taskinfo;
    x = document.getElementById('subj');
    t = document.getElementById('type');
    taskinfo = document.querySelector('.text').value;
    let date = document.querySelector('.date').value;
    let id = parseInt(x.selectedOptions[0].id, 10);
    let typeId = parseInt(t.selectedOptions[0].id, 10);
    let name = '';
    let type = '';
    switch(id){
        case 1:
            name = "Математика";
            break;
        case 2:
            name = "Русский";
            break;
        case 3:
            name = "Литература";
            break;
        case 4:
            name = "Английский";
            break;
        case 5:
            name = "Физика";
            break;
        case 6:
            name = "Химия";
            break;
        case 7:
            name = "История";
            break;
        case 8:
            name = "Общество";
            break;
        case 9:
            name = "География";
            break;
        case 10:
            name = "Биология";
            break;
    }
    switch(typeId){
        case 1:
            type = "Устно";
            break;
        case 2:
            type = "Письменно";
            break;
    }
    if ((id != 0) & (date.length != 0) & (taskinfo.length != 0) & (type.length != 0)){
        console.log(id, date, type, taskinfo);
        let dublicate = 0;
        tasks.forEach((task) => {
            if((taskinfo != task.taskinfo)){
                dublicate = 0;
            }else{
                dublicate = 1;
            }
        });
        if (dublicate === 0){
                tasks.push({
                    id: id,
                    typeId: typeId,
                    name: name,
                    task: taskinfo,
                    date: date,
                    type: type,
                    author: login
                });
                alert(`
                    Задание добавлено: 
                    ${name} 
                    ${date} 
                    ${type} 
                    ${taskinfo}
                    `);
                    console.log(`added ${id} ${date} ${type} ${taskinfo}`);
            } else{
                alert('Дубликат');
            }
    } else {
        alert('Укажите всю информацию');
    }
    saveTasksToStorage("./tasks.json", tasks);
    renderTaskManager(login);
}

export function renderTasks(){
    var x, t;
    x = document.getElementById('subj');
    t = document.getElementById('type');
    let id = parseInt(x.selectedOptions[0].id, 10);
    let date = document.querySelector('.date').value;
    let type = parseInt(t.selectedOptions[0].id, 10);
    let output = document.querySelector('.homework');
    let outputHTML = '';
    console.log(id, date, type);
    tasks.forEach((task) => {
        if ((task.id === id || id === 0) 
        & (task.date === date || !date & task.dateId !== 0)
        & (task.typeId === type || type === 0)){
            outputHTML += `<div class="task-item ${task.author}">

            <div class="task-name">${task.name}</div>
            <div class="task">${task.task}</div>
            <div class="task-date">${task.date}</div>
            <div class="task-type">${task.type}</div>
            
                </div>`;
        }
        });
    output.innerHTML = outputHTML;
}
