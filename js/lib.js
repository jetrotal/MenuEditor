'use strict';

/*the function that changes the label "Selected tool"*/

function changeLabelSelected() {
    const label = document.getElementById("selected-instrument");
    label.innerText = currentInstrument.alt;
}

/*function, returning coordinates of surrounding element*/

const getBoxCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    return { top: box.top + pageYOffset, left: box.left + pageXOffset };
};

/*function returning mouse coordinates.*/

const getMouseCoords = (event) => {
    const coords = getBoxCoords(drawPanel);
    return { x: event.pageX - coords.left, y: event.pageY - coords.top };
};

/*This function creates SVG element. If you want to add new arguments with default values, 
add them to the end. You can't add normal arguments.*/

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