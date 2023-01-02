'use strict';

/*array of tools*/

const instruments = [];

/*ID's of tools*/

const ids = ['cursor', 'hand', 'pen', 'text',
    'line', 'ellipse', 'rect', 'polygon',
    'brush', 'eraser', 'pipette', 'zoom'
];

/*current selected tool*/

let currentInstrument = null;

/*current selected shape*/

let currentFigure = null;

/*is the point of the shape captured*/

let someFigureTaken = false;

const drawPanel = document.getElementById('draw-panel');
const leftPanel = document.getElementById('left-panel');
let svgPanel = document.getElementById('svg-panel');
const svgNS = 'http://www.w3.org/2000/svg';

/*Add all the tools to the array and assign the handlers*/

for (let i = 0; i < ids.length; i++) {
    instruments[i] = document.getElementById(ids[i]);
    instruments[i].addEventListener('click', function() { currentInstrument = this; });
    instruments[i].addEventListener('click', changeLabelSelected);
    instruments[i].addEventListener('click', showOptions);
}

let buttonColor = document.getElementById('button-color');
let colorPicker = document.getElementById('color-picker');
buttonColor.addEventListener('click', function() { colorPicker.classList.toggle('show-option'); });

let paletteColor = '#000000';