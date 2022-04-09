/* Скрипт для для копирования и вставки фигур с помощью Ctrl+C, Ctrl+V*/

'use strict'

let newSvgFig;
let constr;

const copy = () => {
    switch(constr.name) {
        case 'Polygon':
            newSvgFig = createSVGElem('polygon');
            for (let i = 0; i < currentFigure.svgFig.points.numberOfItems; i++) {
                const point = svgPanel.createSVGPoint();
                point.x = currentFigure.svgFig.points[i].x + 30;
                point.y = currentFigure.svgFig.points[i].y + 30;
                newSvgFig.points.appendItem(point);
            }
            break;

    }
};

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.keyCode == 67 && currentFigure) {
        constr = currentFigure.constructor;
        copy();
    }
    if(e.ctrlKey && e.keyCode == 86 && newSvgFig) {
        if(constr.name !== 'Polygon'){
            currentFigure = constr.create(newSvgFig);
        } else {
            currentFigure = Polyline.create(newSvgFig);
        }
        copy();
    }
});
