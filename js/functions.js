let themes;
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import weekday from 'https://unpkg.com/dayjs@1.11.10/esm/plugin/weekday/index.js';
dayjs.extend(weekday);
//Переключение темы
export function themeSwitcher(){
    if (themes == 0){
        themes = 1;
    }
    else{
        themes = 0;
    }
    saveToStorage();
}

export function themeSwitch(){
    if (themes == 0){
        document.querySelector('html').classList.add('theme-inv');
        document.querySelector('.themeSwitch').innerHTML = '<img class="themeImg" src="thumbnails/sun.png">';
    }
    else {
        document.querySelector('html').classList.remove('theme-inv');
        document.querySelector('.themeSwitch').innerHTML = '<img class="themeImg" src="thumbnails/moon.png">';
    }
}

export function loadFromStorage(){
    themes = localStorage.getItem('themes');
    if (!themes){
        themes = 1;
    }
}

export function saveToStorage(){
    localStorage.setItem('themes', themes);
}
//Расписание
export function daily(){
    const time = dayjs().format('H');
    const now = dayjs();
    var den = now.format('D');
    var wek = now.format('dd');
    var mes = now.format('MMM');
    var dayw = "";
    var month = "";
    console.log(wek);
    if (!(wek == "Sa" || wek == "Su") & (parseInt(time, 10) >= 12)){
        den = now.add(1, 'days').format('D');
        if ((mes == "Jan" & den == 31) 
            || (mes == "Feb" & den != 28)
            || (mes == "Mar" & den == 31) 
            || (mes == "Apr" & den == 30) 
            || (mes == "May" & den == 31) 
            || (mes == "Sep" & den == 30) 
            || (mes == "Okt" & den == 31) 
            || (mes == "Nov" & den == 30)){
                mes = now.add(1, 'month').format('MMM');
                den = now.add(1, 'days').format('D');
                wek = now.add(0, 'days').format('dd');
            }
    }
    switch(wek){
        case "Mo":
            dayw = "ponedelnik";
            break;
        case "Tu":
            dayw = "vtornik";
            break;
        case "We":
            dayw = "sreda";
            break;
        case "Th":
            dayw = "chetverg";
            break;
        case "Fr":
            dayw = "piatnitsa";
            if(parseInt(time, 10) >= 16){
                dayw = "ponedelnik";
                den = now.add(3, 'days').format('D');
            }
            break;
        case "Sa":
            dayw = "ponedelnik";
            den = now.add(2, 'days').format('D');
            break;
        case "Su":
            dayw = "ponedelnik";
            den = now.add(1, 'days').format('D');
            break;
        default:
            dayw = "ponedelnik";
    }
    switch(mes){
        case "Jan":
            month = "ianvaria";
            break;
        case "Feb":
            month = "fevralia";
            break;
        case "Mar":
            month = "marta";
            break;
        case "Apr":
            month = "aprelia";
            break;
        case "May":
            month = "maia";
            break;
        case "Sep":
            month = "sentiabria";
            break;
        case "Okt":
            month = "oktiabria";
            break;
        case "Nov":
            month = "noiabria";
            break;
        case "Dec":
            month = "dekabria";
            break;
    }
    var url = `https://gimn25.eduface.ru/uploads/62400/62391/section/2192375/${den}_${month}_2025_goda__${dayw}_.pdf`;
    open(url, "_blank");
};
var settings = 0;
export function openSettings(){
    var mainButtons;
    var topButtons;
    if (settings == 0) {
        document.querySelector('.settings').classList.remove("noOpen")
        document.querySelector('.settings').classList.add("open")
        settings = 1;
        mainButtons = `
        <input class="editMainButtons" type="color">
        <input class="editMainText" type="color">
        <div class="reset"><img class="resetImg" src="icons/undo.svg"></div>
            `;
        topButtons = ``;
    } else {
        document.querySelector('.settings').classList.remove("open")
        document.querySelector('.settings').classList.add("noOpen")
        settings = 0;
        mainButtons = ``;
        topButtons = ``;
    }
    document.querySelector('.main-buttons-edit').innerHTML = mainButtons;
}

export function changeMainText(){
    var text = document.querySelector('.editMainText').value;
    document.querySelectorAll('.button').forEach((button) => {
        button.style.color = text;
    });
}

export function changeMainButton(){
    var bgcolor = document.querySelector('.editMainButtons').value;
    document.querySelectorAll('.button').forEach((button) => {
        button.style.backgroundColor = bgcolor;
    });
}

export function reset(){
    var text = document.querySelector('.editMainText');
    var bgcolor = document.querySelector('.editMainButtons');
    text.value = 0;
    bgcolor.value = 0;
    document.querySelectorAll('.button').forEach((button) => {
        button.removeAttribute('style');
    });
}

export function saveStyle(){
    var text = document.querySelector('.button').style.color;
    var bgcolor = document.querySelector('.button').style.backgroundColor;
    localStorage.setItem('stylesText', text);
    localStorage.setItem('stylesBg', bgcolor);
}

export function loadStyle(){
    document.querySelectorAll(".button").forEach((button) => {
        button.style.color = localStorage.getItem('stylesText');
        button.style.backgroundColor = localStorage.getItem('stylesBg');
    });
    if (document.querySelector('.ver')){
        document.querySelector('.ver').style.color = localStorage.getItem('stylesText');
        document.querySelector('.ver').style.backgroundColor = localStorage.getItem('stylesBg');
    }
}
