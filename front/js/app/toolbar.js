let btnSave;
let btnPolygon;
let btnEdit;
let btnZoomIn;
let btnZoomOut;
let btnBrightnessHigh;
let btnBrightnessLow;
let activeTool;

function isButtonSelected(btn) {
    return btn.style.background === 'rgb(27, 109, 133)';
}

function changeButtonsSelectionState(btn) {
    let isEnabled = isButtonSelected(btn);
    if (isEnabled) {
        btn.style.background = '#ffffff';
    } else {
        btn.style.background = '#1b6d85';
    }
}

function setOnClick(btn) {
    btn.onclick = function () {
        changeButtonsSelectionState(btn);
        let isButtonPressed = isButtonSelected(btn);
        let previouslyActivatedTool = activeTool;

        switch (btn.id) {
            /*global Tool*/
            /*eslint no-undef: "error"*/
            case Tool.save().buttonId:
                activeTool = Tool.save();
                break;
            case Tool.polygon().buttonId:
                activeTool = Tool.polygon();
                break;
            case Tool.brightnessIncrease().buttonId:
                activeTool = Tool.brightnessIncrease();
                break;
            case Tool.brightnessDecrease().buttonId:
                activeTool = Tool.brightnessDecrease();
                break;
            case Tool.zoomIn().buttonId:
                activeTool = Tool.zoomIn();
                break;
            case Tool.zoomOut().buttonId:
                activeTool = Tool.zoomOut();
                break;
        }

        if (!activeTool.isProlonged) {
            activeTool.onClick(isButtonPressed);
            activeTool = previouslyActivatedTool;
            changeButtonsSelectionState(btn);
        } else {
            // If another tool is selected, emulate disabling of previously activated tool
            if (previouslyActivatedTool !== null && previouslyActivatedTool.buttonId !== activeTool.buttonId) {
                previouslyActivatedTool.onClick(false);
                let buttonOfPreviouslyActivatedTool = document.getElementById(previouslyActivatedTool.buttonId);
                changeButtonsSelectionState(buttonOfPreviouslyActivatedTool);
            }

            activeTool.onClick(isButtonPressed);

            if (isButtonPressed === false) {
                activeTool = null;
            }
        }
    };
}

function setElementsOnClick() {
    setOnClick(btnSave);
    setOnClick(btnPolygon);
    setOnClick(btnEdit);
    setOnClick(btnZoomIn);
    setOnClick(btnZoomOut);
    setOnClick(btnBrightnessHigh);
    setOnClick(btnBrightnessLow);
}

function getElements() {
    btnSave = document.getElementById(Tool.save().buttonId);
    btnPolygon = document.getElementById(Tool.polygon().buttonId);
    btnEdit = document.getElementById("btn_edit");          // TODO: Modify when edit tool implemented
    btnBrightnessHigh = document.getElementById(Tool.brightnessIncrease().buttonId);
    btnBrightnessLow = document.getElementById(Tool.brightnessDecrease().buttonId);
    btnZoomIn = document.getElementById(Tool.zoomIn().buttonId);
    btnZoomOut = document.getElementById(Tool.zoomOut().buttonId);
}

function initToolbar(acceptMode) {
    /*global initSave*/
    /*eslint no-undef: "error"*/
    initSave();
    /*global initPolygon*/
    /*eslint no-undef: "error"*/
    initPolygon();
    /*global initBrightnessIncrease*/
    /*eslint no-undef: "error"*/
    initBrightnessIncrease();
    /*global initBrightnessDecrease*/
    /*eslint no-undef: "error"*/
    initBrightnessDecrease();

    /*global initZoomIn, initZoomOut*/
    /*eslint no-undef: "error"*/
    initZoomIn();
    initZoomOut();

    getElements();
    setElementsOnClick();
    /*global initBrightness*/
    /*eslint no-undef: "error"*/
    initBrightness();

    if (!acceptMode) {
        changeButtonsSelectionState(btnPolygon); // polygon tool is selected by default
        btnPolygon.style.display = "block";
        document.getElementById("history-panel").style.display = "block"
    }

    document.addEventListener('DOMContentLoaded', function () {
        setComponentClickable("class-param form-control", acceptMode);
        setComponentClickable("bool-param", acceptMode);
        setComponentClickable("form-control string-param", acceptMode);
        setComponentClickable("select-param form-control", acceptMode);
        setComponentClickable("select-param form-control", acceptMode, 1);
    }, false);

    activeTool = Tool.polygon();
    activeTool.onClick(true);
}

function setComponentClickable(className, isEnabled, index = 0) {
    document.getElementsByClassName(className)[index].disabled = isEnabled;
}