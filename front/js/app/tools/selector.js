/**
 * Created by alnedorezov on 5/26/17.
 */
function initSelector() {
    
    function handleClicksOnZoneWithSelectorTool(event, zone) {
        zoneOnClick(event, zone);
    }
    // function handleClicksOnSvgWithSelectorTool(event) {
    //     svgImgOnClick(event);
    // }

    function handleKeyUp(event) {
        if (event.keyCode === 8 || event.keyCode === 46) {
            svgImgDeleteSelectedSelector();
        }
    }

    function handleKeydown(event) {
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
            if (event.shiftKey) {
                redoLastPoint();
            } else {
                undoLastPoint();
            }
        }
    }

    function handleContextMenu(event, zone) {
        // console.log(event);
        event.returnValue = false;
        zoneCancelSelector();
    }
//TODO: set up events
    /*global Tool*/
    /*eslint no-undef: "error"*/
    Tool.selector = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(Tool, {
            onClick(isButtonPressed) {
                if (typeof isButtonPressed === "boolean" || isButtonPressed instanceof Boolean) {
                    if (isButtonPressed) {
                        console.log("slector enabled");
                        for (zone of zones){
                            zone.path.node.addEventListener("click", zone.path.onClick.bind(zone.path), false);
                            //zone.addEventListener("contextmenu", function(){handleContextMenu("contextmenu", zone)}, true);
                        }
                        window.addEventListener("keydown", handleKeydown, true);
                        window.addEventListener("keyup", handleKeyUp, true);

                    } else {
                        console.log("selector disabled");
                        for (zone of zones) {
                            zone.path.node.removeEventListener("click", zone.path.onClick.bind(zone.path), false);
                            //zone.removeEventListener("contextmenu", function(){handleContextMenu("contextmenu", zone)}, true);    
                        }
                        window.removeEventListener("keydown", handleKeydown, true);
                        window.removeEventListener("keyup", handleKeyUp, true);
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_selector"
        });
    };
}
