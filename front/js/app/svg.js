var svgImg;

var polygons = {};

let currentPolygon = null;
var selectedPolygon = null;

let polygonId = 0;

let redoPoints = [];

var currentScale = 1;

function initSvg() {
    svgImg = document.getElementById("svg_img");
    /*global initCoordinates*/
    /*eslint no-undef: "error"*/
    initCoordinates(svgImg);
}

function svgImgCancelPolygon() {
    if (currentPolygon !== null) {
        svgImg.removeChild(currentPolygon.node);
        currentPolygon = null;
    }
}

function svgImgOnClick(event) {
    if (selectedPolygon !== null && selectedPolygon.shouldConsumeEvent.apply(selectedPolygon, [event])) {
        return;
    }

    let point = getPoint(event);

    if (currentPolygon !== null && !currentPolygon.shouldClose(point.x, point.y) &&
        currentPolygon.shouldConsumeEvent.apply(currentPolygon, [event])) {
        return;
    }

    if (redoPoints.length > 0) {
        redoPoints = [];
    }

    if (currentPolygon !== null) {
        if (currentPolygon.shouldClose(point.x, point.y)) {
            closePolygon();
        } else {
            currentPolygon.addPoint(point.x, point.y);
        }
    } else {
        currentPolygon = new Polygon(point.x, point.y, polygonId);
        currentPolygon.polygonScale = currentScale;

        svgImg.append(currentPolygon.node);

        currentPolygon.setDragEnabled(true);
        // resetting classes and parameters values
        resetDOM();
    }
}

function svgImgDeleteSelectedPolygon() {
    if (selectedPolygon !== null) {
        if (selectedPolygon.polygonId in polygons) {
            delete polygons[selectedPolygon.polygonId];
            onPolygonDeleted(selectedPolygon);

            svgImg.removeChild(selectedPolygon.node);

            selectedPolygon = null;
        }
    }
}

function svgScale(scaleFactor) {
    currentScale = currentScale * scaleFactor;

    if (currentPolygon !== null) {
        currentPolygon.scale(scaleFactor);
    }

    for (let key in polygons) {
        polygons[key].scale(scaleFactor);
    }
}

function undoLastPoint() {
    if (currentPolygon === null) {
        return;
    }

    let lastPointIdx = currentPolygon.pointsList.length - 1;

    if (lastPointIdx <= 0) {
        svgImg.removeChild(currentPolygon.node);
        currentPolygon = null;
    } else {
        let point = currentPolygon.removePoint(lastPointIdx);
        redoPoints.push(point);
        console.log(point);
    }
}

function redoLastPoint() {
    if (currentPolygon === null || redoPoints.length < 1) {
        return;
    }

    let point = redoPoints.pop();

    console.log(point);

    currentPolygon.addPoint(point[0], point[1]);
}

function closePolygon() {
    currentPolygon.close();
    currentPolygon.onPolygonClick = onPolygonClick;
    currentPolygon.onPolygonModified = onPolygonChanged;
    polygons[polygonId] = currentPolygon;
    polygonId = polygonId + 1;

    // Assigning polygons points to the dataEntity (saving polygons points)
    onPolygonClosed(currentPolygon);

    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
        selectedPolygon.setDragEnabled(false);
    }

    selectedPolygon = currentPolygon;
    selectedPolygon.setSelected(true);
    selectedPolygon.setDragEnabled(true);
    showPolygonSelectedMessage();
    onPolygonSelected(selectedPolygon);

    currentPolygon = null;
}

function onPolygonClick(polygon) {
    if (selectedPolygon !== null) {
        selectedPolygon.setSelected(false);
        selectedPolygon.setDragEnabled(false);
    }

    selectedPolygon = polygon;

    // Bring it to top
    svgImg.append(selectedPolygon.node);

    polygon.setSelected(true);
    polygon.setDragEnabled(true);


    onPolygonSelected(selectedPolygon);

    showPolygonSelectedMessage();

}

function onPolygonChanged(polygon) {
    onPolygonModified(polygon);
}

function showPolygonSelectedMessage() {
    /*global MessageTypeEnum*/
    /*eslint no-undef: "error"*/
    showMessage(activeLanguage.characterizeObjectInTheRightMenu, MessageTypeEnum.WARNING);
    setTimeout(function () {
        showMessage(
            activeLanguage.markupImageWithToolsNotificationString, MessageTypeEnum.INFO);
    }, 5000);
}

function resetSVGPolygonData() {
    polygons = {};
    currentPolygon = null;
    selectedPolygon = null;
    polygonId = 0;
}

/*
 * handles resizing of the svg for 1 to 1 mapping between image height and svg layer height
 * accepts Image() as input
 **/
function resizeSvg(img) {
    // make parent div for svg one
    let parent = document.getElementById("canvas-parent");

    let svg = document.getElementById("svg_img");

    // 28 is the width of two 14px paddings from each side of the svg layer, specified in bootstrap
    parent.style.minHeight = (img.height + 16) + "px";

    let height = img.height;
    // resizing svg if image width is smaller than the width of the block for the image
    // to avoid redundant markup over empty space in the block
    // and resizing svg if image width is bigger than the width of the block for the image
    // to present the whole svg layer to markup rather then its part
    let width = img.width;

    // modify both svg dimensions
    svg.style.width = width;
    svg.style.height = height;
}

function addPolygonFromObject(object) {
    let points = object["points"];

    let polygon = new Polygon(points[0][0], points[0][1], polygonId);
    polygon.polygonScale = currentScale;

    svgImg.append(polygon.node);

    polygon.setDragEnabled(true);

    for (let i = 1; i < points.length; i++) {
        let pt = points[i];
        polygon.addPoint(pt[0], pt[1]);
    }

    polygon.close();
    polygon.onPolygonClick = onPolygonClick;
    polygon.onPolygonModified = onPolygonChanged;
    polygon.onClassUpdate(object["parameters"]["class"]);
    polygons[polygonId] = currentPolygon;
    polygonId = polygonId + 1;

    return polygon;
}
