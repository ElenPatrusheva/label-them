/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

/*global DataCollector*/
/*eslint no-undef: "error"*/
var dc = new DataCollector();

/**
 * Event fired on save of labeling data
 * @event onSave
 */
function onSave() {
    dc.getJSON();
}

function onZoneSelected(data, calledByHistory = false) {
    dc.selectEntity(data.zoneId);
    setClassesAndParametersValues(dc.getActiveEntity());
}

/**
 * Event fired on update of object's boolean parameter
 * @event onBoolParamUpdate
 * @fires onSave
 */
function onBoolParamUpdate(name, isChecked, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if (isChecked === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: isChecked});
    }

    onSave();

    if (calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_BOOLEAN_PARAMETERS_VALUE,
            dc.getActiveEntity().zoneId, name, isChecked, previousParameterValue);
    }
}

/**
 * Event fired on update of object's class
 * @event onObjectClassUpdate
 * @fires onSave
 */
function onObjectClassUpdate(value, calledByHistory = false) {
    let previousClassValue = dc.getActiveEntity().getParameterByName("class");
    if (value === null) {
        dc.getActiveEntity().deleteParameterByName("class");
    } else {
        dc.getActiveEntity().setParams({"class": value});
    }

    zones[dc.getActiveEntity().zoneId].onClassUpdate(value);

    onSave();

    if (calledByHistory === false) {
        addHistoryRecordClass(HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS,
            dc.getActiveEntity().zoneId, value, previousClassValue);
    }


}

/**
 * Event fired on update of object's select parameter
 * @event onSelectParamUpdate
 * @fires onSave
 */
function onSelectParamUpdate(name, value, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if (value === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: value});
    }

    onSave();

    if (calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_SELECT_PARAMETERS_VALUE,
            dc.getActiveEntity().zoneId, name, value, previousParameterValue);
    }
}

/**
 * Event fired on update of object's string parameter
 * @event onStringParamUpdate
 * @fires onSave
 */
function onStringParamUpdate(name, value, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if (value === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: value});
    }

    onSave();

    if (calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_STRING_PARAMETERS_VALUE,
            dc.getActiveEntity().zoneId, name, value, previousParameterValue);
    }
}

/**
 * Event fired on zoom in or zoom out of the main canvas
 * @event onZoom
 * @fires onScroll
 */
function onZoom() {
    /*global onScroll*/
    /*eslint no-undef: "error"*/
    onScroll();
}

/**
 * Reset current data collector to gather data of a new polygon
 */
function resetDataCollector() {
    dc = new DataCollector();
}
