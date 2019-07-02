
//let currentPolygon = null;
//let redoPoints = [];

var svgImg;

//var zones = {};

//var selectedZone = null;

let zoneId = 0;

var currentScale = 1;

function initSvg() {
    svgImg = document.getElementById("svg_img");
    /*global initCoordinates*/
    /*eslint no-undef: "error"*/
    initCoordinates(svgImg);
    let input = JSON.parse('{"zones":[{"id":0, "points":[[0, 0],[600, 240],[200, 350] ]}, {"id":1, "points":[[70, 120],[6, 240],[700, 30] ]}]}');
    console.log(input);
    initZones(input.zones);
}

function svgScale(scaleFactor) {
    currentScale = currentScale * scaleFactor;
    for (zone of zones) {
        zone.path.scale(currentScale);
    }
}
/*
function onZoneClick(zone) {
    if (selectedZone !== null) {
        selectedZone.setSelected(false);
        selectedZone.setDragEnabled(false);
    }

    selectedZone = zone;

    // Bring it to top
    svgImg.append(selectedZone.node);

    zone.setSelected(true);
    //TODO: what is dragEnabled
    zone.setDragEnabled(true);


    onZoneSelected(selectedZone);

    showZoneSelectedMessage();

}
*/
// function showZoneSelectedMessage() {
//     /*global MessageTypeEnum*/
//     /*eslint no-undef: "error"*/
//     showMessage(activeLanguage.characterizeObjectInTheRightMenu, MessageTypeEnum.WARNING);
//     setTimeout(function () {
//         showMessage(
//             activeLanguage.markupImageWithToolsNotificationString, MessageTypeEnum.INFO);
//     }, 5000);
// }
/*
function resetSVGPolygonData() {
    polygons = {};
    currentPolygon = null;
    selectedPolygon = null;
    polygonId = 0;
}
*/
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