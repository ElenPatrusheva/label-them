/**
 * Created by alnedorezov on 5/31/17.
 */
// loading remote image
let img = new Image();
let latestNotificationFromCanvas = null;
let minimapImage = new Image();

function initPresentationLayer(acceptMode) {
    img.src = document.getElementById("img_url").innerText;
    img.onload = function () {
        resize();
        /*global initZoom*/
        /*eslint no-undef: "error"*/
        initZoom();
        window.addEventListener("resize", resize, false);
    };

    minimapImage = $("#minimap_img")[0];
    minimapImage.src = img.src;
    minimapImage.onload = function () {
        //Draw rectangle on the minimap on initialization
        /*global onScroll*/
        /*eslint no-undef: "error"*/
        onScroll();
        /*global redrawMinimapOnResize*/
        /*eslint no-undef: "error"*/
        redrawMinimapOnResize();
    };


    initSvg();
    //changeScrollingPositionInTheHistoryBlock();
    //scrollHistoryTableBodyToBottom();
    //TODO: change while using toloka 
    if (acceptMode) {
        let tmp = window.thisTask.getSolution().output_values.result;
        console.log(tmp);
        let zonesArray = JSON.parse(tmp);
        console.log(zonesArray);
        //let zonesArray = JSON.parse('[{"id":0, "status": false}, {"id":1, "status": true}]')
        for (let zone of zones) {
            for (let zoneData of zonesArray){
                if (zoneData.id == zone.path.pathId){
                    if (zoneData.status){
                        zone.path.onClick();
                    }
                }
            }            
        }
    }
}

/*
 * handles resizing of the canvas and of the svg layer for 1 to 1 mapping between image height and canvas & svg height
 * sends a notification to the user if not the full image will be shown
 **/
function resize() {
    /*global resizeCanvas*/
    /*eslint no-undef: "error"*/
    latestNotificationFromCanvas = resizeCanvas(img);
    /*global resizeSvg*/
    /*eslint no-undef: "error"*/
    currentScale = 1;
    zoomCount = 0;
    resizeSvg(img);

    //changeScrollingPositionInTheHistoryBlock();
    //scrollHistoryTableBodyToBottom();
    showMessageToTheUserDependingOnTheLatestNotificationFromCanvas();
    /*global redrawMinimapOnResize*/
    /*eslint no-undef: "error"*/
    redrawMinimapOnResize();
}

function showMessageToTheUserDependingOnTheLatestNotificationFromCanvas() {
    if (latestNotificationFromCanvas === "Not the full image will be shown") { // Notify the user that not the full image will be shown
        showMessage(activeLanguage.notTheFullImageWillBeShownNotificationString, MessageTypeEnum.WARNING);
    } else { // Display the instructions for the user
        showMessage(
            activeLanguage.markupImageWithToolsNotificationString, MessageTypeEnum.INFO);
    }
}
