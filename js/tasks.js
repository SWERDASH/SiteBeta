import { renderTaskManager, login } from "./taskmanager.js";

export let tasks;

loadTasksFromStorage();

export function saveTasksToStorage(){
/*    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3090/api/save", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    const data = JSON.stringify(tasks);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Данные сохранены:", xhr.responseText);
        }
    };

    xhr.send(data);*/
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasksFromStorage(){
/*    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3090/api/save", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            tasks = JSON.parse(xhr.responseText);
            console.log(tasks);
            renderTasks();
        }
    };
    xhr.send();*/
    tasks = JSON.parse(localStorage.getItem("tasks"));
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

export function isDuplicate(itemINFO, itemID, itemDATE, itemTYPE){
    var dubl = 1;
    tasks.forEach((task) => {
        if ((task.task === itemINFO) & (task.id === itemID) & (task.date === itemDATE) & (task.typeId === itemTYPE)){
            dubl = 0;
        } else { dubl = 1; }
    });
    return dubl;
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
        console.log(isDuplicate(taskinfo, id, date, typeId));
        if (isDuplicate(taskinfo, id, date, typeId)){
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
                    saveTasksToStorage();
                    renderTaskManager(login);
            } else{
                alert('Дубликат');
            }
    } else {
        alert('Укажите всю информацию');
    }
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
