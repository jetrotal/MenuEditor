/*Option panels*/
const optionsText = document.getElementById('options-text');
const optionsLine = document.getElementById('options-line');
const optionsRect = document.getElementById('options-rect');
const optionsEllipse = document.getElementById('options-ellipse');
const optionsPolygon = document.getElementById('options-polygon');
const optionsBrush = document.getElementById('options-brush');
const optionsEraser = document.getElementById('options-eraser');
const optionsZoom = document.getElementById('options-zoom');

/*Mechanics of the selector*/
const allSelectors = document.querySelectorAll('.selector');
for (let i = 0; i < allSelectors.length; i++) {
    let input = allSelectors[i].querySelectorAll('.selector-field');
    let allOptions = allSelectors[i].querySelectorAll('.selector-li');
    input[0].value = allOptions[0].innerHTML;
    for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].addEventListener('click', function() { input[0].value = allOptions[j].innerHTML; });
    }
}

/*Function that hides the entire options bar*/
const hideAllOptions = () => {
    optionsText.classList.remove('show-option');
    optionsLine.classList.remove('show-option');
    optionsRect.classList.remove('show-option');
    optionsBrush.classList.remove('show-option');
    optionsEllipse.classList.remove('show-option');
    optionsPolygon.classList.remove('show-option');
    optionsEraser.classList.remove('show-option');
    optionsZoom.classList.remove('show-option');
};

/*Function that shows a specific panel*/
const showOptions = () => {
    hideAllOptions();

    if (currentInstrument.alt.includes('Text')) {
        optionsText.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Line')) {
        optionsLine.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Rectangle')) {
        optionsRect.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Ellipse')) {
        optionsEllipse.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Polygon')) {
        optionsPolygon.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Brush')) {
        optionsBrush.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Eraser')) {
        optionsEraser.classList.add('show-option');
    } else if (currentInstrument.alt.includes('Zoom')) {
        optionsZoom.classList.add('show-option');
    }
};