var svgImg;

var currentScale = 1;

function initSvg() {
    svgImg = document.getElementById("svg_img");
    /*global initCoordinates*/
    /*eslint no-undef: "error"*/
    initCoordinates(svgImg);
    let input = JSON.parse('{"zones":[{"id":0, "points":[[30, 30],[150, 20],[300, 240],[200, 350] ]}, {"id":1, "points":[[370, 120],[600, 240],[700, 30] ]}]}');
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