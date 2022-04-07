/*Панели опций*/
const optionsPolygon = document.getElementById('options-polygon');

/*Механика работы селектора*/
const allSelectors = document.querySelectorAll('.selector');
for (let i = 0; i < allSelectors.length; i++) {
    let input = allSelectors[i].querySelectorAll('.selector-field');
    let allOptions = allSelectors[i].querySelectorAll('.selector-li');
    input[0].value = allOptions[0].innerHTML;
    for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].addEventListener('click', function() { input[0].value = allOptions[j].innerHTML; });
    }
}

/*Функция, скрывающая всю панель опций*/
const hideAllOptions = () => {
    optionsPolygon.classList.remove('show-option');
};

/*Функция, включающая конкретную панель*/
const showOptions = () => {
    hideAllOptions();

if (currentInstrument.alt == 'Многоугольник') {
        optionsPolygon.classList.add('show-option');
    }
};
