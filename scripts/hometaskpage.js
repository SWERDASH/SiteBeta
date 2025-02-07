import { renderTasks } from "./tasks.js";

renderTasks();
document.querySelectorAll('.custom-select').forEach((bt) => {
    bt.addEventListener('click', () =>{
        renderTasks();
    })
});

document.querySelector('.date-choose').addEventListener('change', () => {
    renderTasks();
});

