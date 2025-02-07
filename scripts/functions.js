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
    if ((mes == "Jan" & den == 31) 
        || (mes == "Feb" & den == 28)
        || (mes == "Mar" & den == 31) 
        || (mes == "Apr" & den == 30) 
        || (mes == "May" & den == 31) 
        || (mes == "Sep" & den == 30) 
        || (mes == "Okt" & den == 31) 
        || (mes == "Nov" & den == 30)){
            wek = now.add(1, 'days').format('dd');
            den = now.add(2, 'days').format('D');
            mes = now.add(1, 'month').format('MMM');
        }
    if (!(wek == "Sa" || wek == "Su" || wek == "Fr") & (parseInt(time, 10) >= 12)){
        wek = now.add(1, 'days').format('dd');
        den = now.add(1, 'days').format('D');
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
            if((parseInt(time, 10) >= 16) & wek == "Sa"){
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