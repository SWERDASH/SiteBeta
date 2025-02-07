import { tasks, saveTasksToStorage } from "./tasks.js";
localStorage.removeItem('login');

if (document.querySelector('.ver')){
    document.querySelector('.ver').addEventListener('click', () => {
        verify();
    });
}

export let login;

function verify(){
    login = document.querySelector('.login').value;
    let pass = document.querySelector('.password').value;
    let logins = ['admin', 'TaskManager', 'swerdash'];
    let passwords = ['TaskAdmin', 'password', 'anim'];
    let n = (element) => element == login;
    if ((logins.findIndex(n) != undefined) & (pass == passwords[logins.findIndex(n)])){
         loadTaskManagerPanel(login);
    }else{
        alert('Неверный логин или пароль');
    }
}

export function loadTaskManagerPanel(login){
    let newScript1 = document.createElement("script");
    newScript1.src = './scripts/main.js';
    newScript1.type = 'module';
    let newScript2 = document.createElement("script");
    newScript2.src = './scripts/select2.js';
    newScript2.type = 'module';
    let newScript4 = document.createElement("script");
    newScript4.src = './scripts/taskmanager.js';
    newScript4.type = 'module';
         document.querySelector('.page').innerHTML = `
        <div class="frame taskframe">
            <div class="filter tskm">
                <div class="custom-select custom-tskm">
                    <select class="subj" id="subj" title="Предмет" name="select">
                        <option id="0">Предметы</option>
                        <option id="1">Математика</option>
                        <option id="2">Русский</option>
                        <option id="3">Литература</option>
                        <option id="4">Английский</option>
                        <option id="5">Физика</option>
                        <option id="6">Химия</option>
                        <option id="7">История</option>
                        <option id="8">Общество</option>
                        <option id="9">География</option>
                        <option id="10">Биология</option>
                        <option id="0">Предметы</option>
                    </select>
                </div>
                <input type="date" class="date date-tskm" min="2025-01-01" max="2025-05-31">
                <div class="custom-select custom-tskm">
                    <select class="type" id="type" title="Не важно" name="select">
                        <option id="0">Не важно</option>
                        <option id="1">Устно</option>
                        <option id="2">Письменно</option>
                        <option id="0">Не важно</option>
                    </select>
                </div>
            </div>
            <textarea class="text text-input" placeholder="Задание" rows="5" cols="33"></textarea>
            <div class="button addTask">Добавить</div>
        </div>
        <div class="taskmanager">
            <div class="homework">
                <img src="photos/images.jpeg">
            </div>
        </div>
        <div class="loginNow">${login}</div>
        `;
        document.body.appendChild(newScript1);
        document.body.appendChild(newScript2);
        document.body.appendChild(newScript4);
        renderTaskManager(login);
}

export function renderTaskManager(login){
    if (document.querySelector('.taskframe')){
        let output = document.querySelector('.homework');
        let outputHTML = '';
        tasks.forEach((task) => {
            if((task.dateId != 0) & ((login == task.author) || (login == "swerdash"))){
                outputHTML += `<div class="task-item ${task.author}">

                <div class="task-name">${task.name}</div>
                <div class="task">${task.task}</div>
                <div class="task-date">${task.date}</div>
                <div class="task-type">${task.type}</div>
                <div class="task-author">${task.author}</div>
                <div class="delete">Удалить</div>
                
                    </div>`;
            }
        });
        output.innerHTML = outputHTML;
        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', () =>{
                tasks.splice(tasks.id, 1);
                saveTasksToStorage();
                renderTaskManager(login);
            });
        });
    }
}