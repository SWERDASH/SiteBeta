import { loadFromStorage, themeSwitch, themeSwitcher, daily, openSettings, changeMainText, changeMainButton, reset, saveStyle, loadStyle} from './functions.js';
loadFromStorage();
themeSwitch();
loadStyle();
document.querySelector('.themeSwitch').addEventListener('click', () => {
        themeSwitcher();
        themeSwitch();
});

if (document.querySelector('.mainBack')){
document.querySelector('.mainBack').addEventListener('click', () => {
        open("homepage.html", "_top");
    });
};

if (document.querySelector('.daily')){
    document.querySelector('.daily').addEventListener('click', () => {
        daily();
    });
};

if (document.querySelector('.ht')){
    document.querySelector('.ht').addEventListener('click', () => {
        open("hometask.html", "_top");
    });
};

if (document.querySelector('.settings')){
    document.querySelector('.settings').addEventListener('click', () => {
        openSettings();
        document.querySelector('.editMainText').addEventListener('change', () => {
            changeMainText();
            saveStyle();
        });
        document.querySelector('.editMainButtons').addEventListener('change', () => {
            changeMainButton();
            saveStyle();
        });
        document.querySelector('.reset').addEventListener('click', () => {
            reset();
            saveStyle();
        });
        var colors = (document.querySelector('.button').style.color).replace(/[rgb()]/g, "").split(", ");
        document.querySelector('.editMainText').value = rgbToHex(colors[0], colors[1], colors[2]);
        var Bgcolors = (document.querySelector('.button').style.backgroundColor).replace(/[rgb()]/g, "").split(", ");
        document.querySelector('.editMainButtons').value = rgbToHex(Bgcolors[0], Bgcolors[1], Bgcolors[2]);
    });
};
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }
  
  
  