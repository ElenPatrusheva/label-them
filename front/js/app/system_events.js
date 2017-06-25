/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

/*global DataCollector*/
/*eslint no-undef: "error"*/
var dc = new DataCollector();

function onSave() {
    dc.getJSON();
}

function onPolygonClosed(data, calledByHistory = false) {
    /*global DataEntity*/
    /*eslint no-undef: "error"*/
    let de = new DataEntity(data.polygonId);
    dc.addEntity(de, data.polygonId);

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordPolygon(HistoryRecordTypeEnum.ADD_OBJECT, data);
    }
}

function onPolygonSelected(data, calledByHistory = false) {
    dc.selectEntity(data.polygonId);
    setClassesAndParametersValues(dc.getActiveEntity())
}

function onPolygonDeleted(data, calledByHistory = false) {
    dc.deleteEntity(data.polygonId);

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordPolygon(HistoryRecordTypeEnum.DELETE_OBJECT, data);
    }
}

function onBoolParamUpdate(name, isChecked, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if(value === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: value});
    }

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_BOOLEAN_PARAMETERS_VALUE,
            dc.getActiveEntity().polygonId, name, isChecked, previousParameterValue);
    }
}

function onObjectClassUpdate(value, calledByHistory = false) {
    let previousClassValue = dc.getActiveEntity().getParameterByName("class");
    if(value === null) {
        dc.getActiveEntity().deleteParameterByName("class");
    } else {
        dc.getActiveEntity().setParams({"class": value});
    }

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordClass(HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS,
            dc.getActiveEntity().polygonId, value, previousClassValue);
    }
}

function onSelectParamUpdate(name, value, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if(value === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: value});
    }

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_SELECT_PARAMETERS_VALUE,
            dc.getActiveEntity().polygonId, name, value, previousParameterValue);
    }
}

function onStringParamUpdate(name, value, calledByHistory = false) {
    let previousParameterValue = dc.getActiveEntity().getParameterByName(name);
    if(value === null) {
        dc.getActiveEntity().deleteParameterByName(name);
    } else {
        dc.getActiveEntity().setParams({[name]: value});
    }

    onSave();

    if(calledByHistory === false) {
        addHistoryRecordParameter(HistoryRecordTypeEnum.MODIFY_STRING_PARAMETERS_VALUE,
            dc.getActiveEntity().polygonId, name, value, previousParameterValue);
    }
}

function resetDataCollector() {
    dc = new DataCollector();
}
