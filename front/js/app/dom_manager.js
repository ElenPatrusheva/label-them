var selectDefaultParameters = [];
/**
 *  Reset all values of class selector and parameters to default values
 */
function resetClassesAndParametersValues(document) {
    let classParameters = document.getElementsByClassName("class-param");
    Array.prototype.forEach.call(classParameters, parameter => {
        parameter.value = "Select Class";
    });

    let boolParameters = document.getElementsByClassName("bool-param");
    Array.prototype.forEach.call(boolParameters, parameter => {
        parameter.checked = false;
    });

    let stringParameters = document.getElementsByClassName("string-param");
    Array.prototype.forEach.call(stringParameters, parameter => {
        parameter.value = "";
    });

    let selectParameters = document.getElementsByClassName("select-param");
    for (let i = 0; i < selectParameters.length; i++) {
        selectParameters.item(i).value = selectDefaultParameters[i];
    }
}

function setClassesAndParametersValues(dataEntity) {

    resetDOM();

    for (let key in dataEntity.parameters) {
        if (dataEntity.parameters.hasOwnProperty(key)) {
            // console.log(key + " -> " + dataEntity.parameters[key]);
            let el = document.getElementsByName(key)[0];
            // console.log(el);
            if (el.type === "checkbox") {
                el.checked = dataEntity.parameters[key];
            } else {
                el.value = dataEntity.parameters[key];
            }
        }
    }
}

// Message type which correspond to the ones used in bootstrap
var MessageTypeEnum = Object.freeze({SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4});

// Specifying the type of the alert message
function specifyAlertMessageType(messageType) {
    switch (messageType) {
        case MessageTypeEnum.SUCCESS:
            return "alert alert-success";
        case MessageTypeEnum.INFO:
            return "alert alert-info";
        case MessageTypeEnum.WARNING:
            return "alert alert-warning";
        case MessageTypeEnum.DANGER:
            return "alert alert-danger";
        default:
            return "alert alert-info";
    }
}

/**
 * showMessage function displays specified message in message_space block
 * @input message - text of the message to be displayed
 * @input messageType - type of the message to be displayed (can be one of {SUCCESS: 1, INFO: 2, WARNING: 3, DANGER: 4})
 *                      INFO type is used by default
 */
function showMessage(message, messageType) {
    if ((typeof message === "string" || message instanceof String) && document.getElementById("message_space")) {

        // Specify the type of the alert message
        document.getElementById("message_space").className = specifyAlertMessageType(messageType);

        $("#message_space").text(message);
    }
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function initDOM() {
    let jsonParams = document.getElementById("json_params").innerText;
    // Toloka strips all strings of double quotes for reasons unknown so in order
    // to get JSON.parse to work we need to replace all occurence of \ with "
    // otherwise JSON.parse will fail. Need to clarify this with Y.T. manager,
    // but until then this does the job
}

function resetDOM() {
    resetClassesAndParametersValues(document);
}

/**
 * Enables or disables an element (e.g. a button) by adding a disabled class. Does nothing if buttonId is not a string.
 * @param buttonId - a string - Id of the button to enable or disable, without the number (#) sign
 * @param toEnable - a boolean variable, when true - removes "disabled" class, if specified.
 *                   Otherwise adds "disabled" class. (Is true by default)
 *
 * See https://www.w3schools.com/bootstrap/bootstrap_buttons.asp & http://api.jquery.com/removeClass/ for reference.
 */
function enableOrDisableAnElementById(buttonId, toEnable = true) {
    if (!(typeof buttonId === "string" || buttonId instanceof String)) {
        return;
    }

    if (toEnable) {
        $("#" + buttonId).removeClass("disabled");
    } else {
        $("#" + buttonId).addClass("disabled");
    }
}

/**
 * Makes visible or hides an element (e.g. a button) by removing or adding a hidden class.
 * Does nothing if buttonId is not a string.
 * @param buttonId - a string - Id of the button to enable or disable, without the number (#) sign
 * @param toMakeVisible - a boolean variable, when true - removes "hidden" class, if specified.
 *                   Otherwise adds "hidden" class. (Is true by default)
 *
 * See https://www.w3schools.com/bootstrap/bootstrap_buttons.asp & http://api.jquery.com/removeClass/ for reference.
 */
function makeVisibleOrHideAnElementById(buttonId, toMakeVisible = true) {
    if (!(typeof buttonId === "string" || buttonId instanceof String)) {
        return;
    }

    if (toMakeVisible) {
        $("#" + buttonId).removeClass("hidden");
    } else {
        $("#" + buttonId).addClass("hidden");
    }
}

function translateBlocksTitles() {
    let beginH3tag = "<h3 class=\"panel-title\">";
    let endH3tag = "</h3>";
    document.getElementById("minimap-block-title").innerHTML = beginH3tag + activeLanguage.miniMap + endH3tag;
}

function displayLanguageSelection(languagesArray) {
    let languageSelectionBlockCode = [];
    $("#language-selection-sidebar").removeClass("hidden");
    languageSelectionBlockCode.push("<select class=\"form-control\" id=\"language-selection-select\">");
    for (let i = 0; i < languagesArray.length; i++) {
        if (languagesArray[i].hasOwnProperty("getLanguageName")) {
            languageSelectionBlockCode.push("<option ");
            languageSelectionBlockCode.push("value=\"");
            languageSelectionBlockCode.push(i);
            languageSelectionBlockCode.push("\">");
            languageSelectionBlockCode.push(languagesArray[i].getLanguageName());
            languageSelectionBlockCode.push("</option>");
        }
    }
    languageSelectionBlockCode.push("</select>");
    document.getElementById("language-selection-sidebar").innerHTML = languageSelectionBlockCode.join("");
    document.getElementById("language-selection-select").addEventListener("change", function () {
        selectLanguage(languagesArray[document.getElementById("language-selection-select").value])
    }, false);
}
