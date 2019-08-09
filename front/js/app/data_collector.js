/**
 * Created by Alexey Merzlikin on 08.04.2017.
 */

let outputJSON = "";
let globalAcceptMode = false;
/**
 * Represents a list of labeled objects.
 * @constructor
 */
function DataCollector() {
    this.activeEntity = null;
}

/** Class representing a data entity to be exported */
class DataEntityToBeExported {
    constructor(entity) {
        /*global polygonId, polygons*/
        /*eslint no-undef: "error"*/
        this.id = entity.pathId;
        this.status = entity.isOccupied;
    }
}
/**
 * Get data collector's list of entities as JSON
 * @return {string} outputJSON - list of entities as JSON
 */
DataCollector.prototype.getJSON = function () {
    let dataEntities = [];
    for (let i in zones){
        dataEntities[i] = (new DataEntityToBeExported(zones[i].path));
    }
    outputJSON = JSON.stringify(dataEntities);
    if (window.thisTask !== undefined && window.thisTask !== null) {
        console.log(outputJSON);
        window.thisTask.setSolutionOutputValue("result", outputJSON);
    } else {
        console.log(outputJSON); // To check output values on localhost
    }
    //return outputJSON;
};