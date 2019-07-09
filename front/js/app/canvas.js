function drawImg(img) {
    let canvas = document.getElementById("main-canvas");
    let ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
}

/*
 * handles resizing of the canvas for 1 to 1 mapping between image height and canvas height
 * accepts Image() as input
 * returns "Not the full image will be shown" string if canvas.width < img.width
 **/
function resizeCanvas(img) {
    console.log("warning, resize");
    let output = null;

    let canvas = document.getElementById("main-canvas");

    // make canvas fit parent div
    let parent = document.getElementById("canvas-parent");

    // 28 is the width of two 14px paddings from each side of the canvas, specified in bootstrap
    parent.style.minHeight = (img.height + 16) + "px";

    let height = img.height;
    // resizing canvas if image width is smaller than the width of the block for the image
    // to avoid redundant markup over empty space in the block
    // and resizing canvas if image width is bigger than the width of the block for the image
    // to present the whole image to markup rather then its part
    let width = img.width;

    if (parent.clientWidth < img.width) {
        output = "Not the full image will be shown";
    }

    // modify both canvas style and canvas dimension
    canvas.width = width;
    canvas.height = height;
    resizeZones();
    //if (resizeZones === "function"){resizeZones()};
    drawImg(img);

    if (output !== null) { // Notify the user that not the full image will be shown
        return output;
    }
}