'use strict';

const cursor = document.getElementById('cursor');
const polygon = document.getElementById('polygon');

/* Отобразить панель опций фигуры, по которой произойдет клик: */
cursor.addEventListener('click', () => {
    if (currentFigure !== null) {
        currentFigure.showOptions();
    }
});

/* Удаление выделенной фигуры при помощи клавиши Delete: */
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 46 && currentFigure !== null && !currentFigure.somePointTaken && !someFigureTaken) {
        if(currentFigure.groupID != "0"){
            let group = svgPanel.getElementById(currentFigure.groupID);
            group.remove();
        }
        showOptions();
        currentFigure.hideRefPoints();
        svgPanel.removeChild(currentFigure.svgFig);
        currentFigure.svgFig = null;
        currentFigure = null;
        selectedFigures = [];
    }
});

class Figure {
    constructor(svgFigure) {
        this.svgFig = svgFigure;
        this.refPoints = [];
        this.finished = false;
        this.isShowing = false;
        this.somePointTaken = false;
    }

    getMergeCoords(event) {
        const click = getMouseCoords(event);
        for (let i = 0; i < this.refPoints.length; i++) {
            if (this.refPoints[i].containsToArea(click)) {
                return [this.refPoints[i], true];
            }
        }
        return [click, false];
    }

    findIndexMerged(point, miss = -1) {
        for (let i = 0; i < this.refPoints.length; i++) {
            if (i != miss && this.refPoints[i].containsToArea(point)) {
                return i;
            }
        }
    }

    hideOrShow() {
        this.isShowing = true;
        currentFigure = this;

        const check = ( () => {
            return this.svgFig !== null && !this.somePointTaken && !someFigureTaken;
        }).bind(this);

        const hide = ( (e) => {
            if (e.ctrlKey) {
            } else
            if (this.isShowing && this.svgFig !== null) {
                this.hideRefPoints();

                selectedFigures.splice(selectedFigures.indexOf(this), 1);

                if (currentFigure == this) {

                    if (cursor.checked) {
                        hideAllOptions();
                    }
                    currentFigure = null;

                }
                this.isShowing = false;
            }
            Figure.refreshSelectedFiguresCounter();

            if(selectedFigures.length < 2){
                document.getElementById("create-group").parentNode.hidden = true;
            }
        } ).bind(this);
        drawPanel.addEventListener('mousedown', hide);

        this.svgFig.addEventListener('mousedown', ( (e) => {
            if(this.isShowing){
                this.hideRefPoints();
                this.isShowing = false;
                selectedFigures.splice(selectedFigures.indexOf(this), 1);
            } else {
                if (check() && !this.isShowing && cursor.checked) {
                    selectedFigures.push(this);
                    this.showRefPoints();
                    this.showOptions();
                    currentFigure = this;
                    this.isShowing = true;
                    Figure.refreshSelectedFiguresCounter();
                }
            }
            if(selectedFigures.length >= 2){
                document.getElementById("create-group").parentNode.hidden = false;
            }
        } ).bind(this));

        this.svgFig.addEventListener('mouseover', () => {
            if (check() && (!this.isShowing || cursor.checked)) {
                drawPanel.removeEventListener('mousedown', hide);
            }
        });
        this.svgFig.addEventListener('mouseout', () => {
            if (check()) {
                drawPanel.addEventListener('mousedown', hide);
            }
        });
    }





    createTmpCopy() {}

    deleteTmpCopy() {
        svgPanel.removeChild(this.copy);
        delete this.copy;
    }

    static addPanelListener(type, inputs, selectors, ind, update) {
        inputs[ind].addEventListener('keydown', (e) => {
            if (currentFigure instanceof type) {
                if (e.keyCode == 13) {
                    if (inputs[ind].value < 0) {
                        inputs[ind].value = 0;
                    }
                    update();
                }
            }
        });
        selectors[ind].addEventListener('click', () => {
            if (currentFigure instanceof type) {
                update();
            }
        });
    }

    static refreshSelectedFiguresCounter() {
        let el = document.getElementById("selected-counter-label");
        if (el){
            el.parentNode.removeChild(el);
            el = document.getElementById("select-counter");
            el.parentNode.removeChild(el);
        }
        document.getElementById("selected-instrument-block").innerHTML += '<b id="selected-counter-label">Выбранных элементов:</b><div id="select-counter">'+selectedFigures.length+'</div>';

    }
}

class RefPoint {
    constructor(figure, coords, instrument) {
        this.figure = figure;
        this.circle = createSVGElem('circle', '#FFFFFF', '#000000');
        this.circle.setAttribute('r', 3);
        this.circle.setAttribute('cx', coords.x);
        this.circle.setAttribute('cy', coords.y);
        this.circle.addEventListener('mouseover', this.dispatchAndColor.bind(this, 'mouseover', '#0000FF', instrument));
        this.circle.addEventListener('mouseout', this.dispatchAndColor.bind(this, 'mouseout', '#FFFFFF', instrument));
    }

    static createSVGPoint(coords) {
        const point = svgPanel.createSVGPoint();
        point.x = coords.x;
        point.y = coords.y;
        return point;
    }

    dispatchAndColor(event, color, instrument) {
        if ( (instrument.checked && (!someFigureTaken || !this.figure.finished) ) ||
            (cursor.checked && !someFigureTaken) ) {
            this.figure.svgFig.dispatchEvent(new Event(event));
            this.circle.setAttribute('fill', color);
        }
    }

    containsToArea(p) {
        return (Math.abs(p.x - this.x) <= this.r && Math.abs(p.y - this.y) <= this.r);
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }

    set x(v) { this.circle.setAttribute('cx', v); }
    set y(v) { this.circle.setAttribute('cy', v); }
    set r(v) { this.circle.setAttribute('r', v); }
    get x() { return +this.circle.getAttribute('cx'); }
    get y() { return +this.circle.getAttribute('cy'); }
    get r() { return +this.circle.getAttribute('r'); }
}
