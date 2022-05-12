'use strict';

/*Функция, изменяющая надпись "Выбранный инструмент"*/
function changeLabelSelected() {
    const label = document.getElementById("selected-instrument");
    label.innerText = currentInstrument.alt;

    let el = document.getElementById("selected-counter-label");
    if (el){
        el.parentNode.removeChild(el);
        el = document.getElementById("select-counter");
        el.parentNode.removeChild(el);
    }

    if(currentInstrument.alt == "Курсор"){
        document.getElementById("selected-instrument-block").innerHTML += '<b id="selected-counter-label">Выбранных элементов:</b><div id="select-counter">'+selectedFigures.length+'</div>';
    }
}

/*Функция, возвращающая координаты объемлющего элемента*/
const getBoxCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    return { top: box.top + pageYOffset, left: box.left + pageXOffset };
};

/*Функция, возвращающая координаты мыши.*/
const getMouseCoords = (event) => {
    const coords = getBoxCoords(drawPanel);
    return { x: event.pageX - coords.left, y: event.pageY - coords.top };
};

/*Функция, создающая SVG элемент. При желании добавить новые аргументы по
умолчанию, добавлять их в конец. При этом обычные аргументы добавлять нельзя.*/
const createSVGElem = (type, f = paletteColor, s = paletteColor, sw = '1', so = '1', fo = '1') => {

    const elem = document.createElementNS(svgNS, type);
    elem.setAttribute('fill', f);
    elem.setAttribute('stroke', s);
    elem.setAttribute('stroke-width', sw);
    elem.setAttribute('stroke-opacity', so);
    elem.setAttribute('fill-opacity', fo);
    return elem;
};

const copySVGStyle = (dest, src) => {
    const copy = attr => dest.setAttribute(attr, src.getAttribute(attr));
    copy('fill');
    copy('stroke');
    copy('stroke-width');
    copy('stroke-opacity');
    copy('fill-opacity');
};
