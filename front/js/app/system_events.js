/**
 * Created by Alexey Merzlikin on 14.04.2017.
 */

/*global DataCollector*/
/*eslint no-undef: "error"*/
let dc = new DataCollector();
/**
 * Event fired on save of labeling data
 * @event onSave
 */
function onSave() {
    dc.getJSON();
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
