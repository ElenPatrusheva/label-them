import { threadId } from "worker_threads";

//import { threadId } from "worker_threads";

let zones = [];

function InitZones(inputZones){
    /*
    *creates an array of given polygon zones,
    *which are not occupied by default
    */
    for (zone in inputZones){
        zones.push(new Zone(zone));
    };
}
//TODO: add id, to make it possible to change 
function Path(points){
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.points = points;
    this.state = "normal"
    path = ""
    for (pair in this.points){
        path += pair[0] + "," + pair[1] + " ";
    }
    this.node.setAttribute("points", path);
    this.onclick = function(){
        console.log("default onclick path");
    }
    this.updateColor = function (color) {
        this.node.style.fill = color;
    }
    this.invalidate = function(){
        this.node.setAttribute("class", this.state);
    }
}

function Zone(zone, type="poly"){
    this.isOccupied = False;
    this.zoneId = zone.id;
    this.node = document.createElement("http://www.w3.org/2000/svg", "g");
    this.path = new Path(zone.points);
    this.node.append(this.path.node);
    this.type = type;
    this.zoneScale = 1;
    this.pointsList = [];

    this.onClick = function(){
        console.log("zone # " + zone.id + " is selected, occupied status changed from " + 
        this.isOccupied + " to " + !this.isOccupied);
        this.isOccupied = !this.isOccupied;
        //TODO change style
    };
    this.onMouseOver = function(){
        //TODO change style
    };
    this.onMouseOut = function(){
        //TODO change style
    };
    //TODO:maybe it is better to move this to the path, or even merge the path with the polygon 
    
    this.path.node.addEventListener("click", this.onClick(), true);
    this.path.node.addEventListener("mouseover", this.onMouseOver(), true);
    this.path.node.addEventListener("mouseout", this.onMouseOut(), true);
}

//TODO make it scalable