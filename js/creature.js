/*create a new file, drawing space*/

function deleteChild(node, parent) {
    for (var i = 0; i < node.childNodes.length;)
        deleteChild(node.childNodes[i], node);

    if (node.childNodes.length == 0) {
        parent.removeChild(node);
        return;
    }
}

function deleteAllChildren(node) {
    for (var i = 0; i < node.childNodes.length;)
        deleteChild(node.childNodes[i], node);
}

function createSVGPanel() {
    var
        width = prompt("New File's Width:", 900),
        height = prompt("New File's Height:", 500);

    if (width < 1 || height < 1) {
        alert("Invalid SVG Size!")
        return;
    }

    deleteAllChildren(svgPanel);

    svgPanel.setAttribute('width', width);
    svgPanel.setAttribute('height', height);
}