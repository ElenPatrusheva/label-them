var svgImg;

var polygons = {};

let currentPolygon = null;
let selectedPolygon = null;

let polygonId = 0;

function initSvg(ms) {
    svgImg = document.getElementsByClassName('svg-img')[0];
    initCoordinates(svgImg);
}

function svgImgOnClick(event) {
    let point = getPoint(event);

    if (currentPolygon !== null) {
        if (currentPolygon.shouldClose(point.x, point.y)) {
            closePolygon(currentPolygon);
        } else {
            currentPolygon.addPoint(point.x, point.y);
        }
    } else {
        currentPolygon = new Polygon(point.x, point.y, polygonId);
        svgImg.append(currentPolygon.node);
        console.log(currentPolygon.node);

        // resetting classes and parameters values
        resetDOM();
    }
}

function svgImgOnClickSelect(event) {
    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
        selectedPolygon = null;
    }
}

function closePolygon() {
    currentPolygon.close();
    currentPolygon.onPolygonClick = onPolygonClick;
    polygons[polygonId] = currentPolygon;
    polygonId = polygonId + 1;

    // Assigning polygons points to the dataEntity (saving polygons points)
    onPolygonClosed(currentPolygon);

    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
    }

    selectedPolygon = currentPolygon;
    selectedPolygon.setSelected(true);
    showPolygonSelectedMessage();
    onPolygonSelected(selectedPolygon);

    currentPolygon = null;
}

function onPolygonClick(polygon) {

    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
    }


    polygon.setSelected(true);


    selectedPolygon = polygon;

    onPolygonSelected(selectedPolygon);

    showPolygonSelectedMessage();
    // Bring it to top
    svgImg.append(selectedPolygon.node);
}

function showPolygonSelectedMessage() {
    showMessage("Please, characterize the selected object in the right menu.",
        MessageTypeEnum.WARNING);
    setTimeout(function () {
        showMessage(
            "Please, markup the image displayed below using the tools from the block on the left.",
            MessageTypeEnum.INFO);
    }, 5000);
}

function resetSVGPolygonData() {
    polygons = {};
    currentPolygon = null;
    selectedPolygon = null;
    polygonId = 0;
}