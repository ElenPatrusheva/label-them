
//import { threadId } from "worker_threads";

let zones = [];

function initZones(inputZones){
    /*
    *creates an array of given polygon zones,
    *which are not occupied by default
    */
    for (zone of inputZones){
        
        console.log("createzone");
        console.log(zone);
        zones.push(new Zone(zone));
    };
}
//TODO: add id, to make it possible to change 
function Path(points){
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.points = points;
    this.isOccupied = false;
    path = "";
    for (pair of this.points){
        path += pair[0] + "," + pair[1] + " ";
    }
    console.log(path);
    this.node.setAttribute("points", path);
    this.onclick = function(){
        console.log("default onclick path");
    }
    this.invalidate = function(){
        this.node.setAttribute("class", this.isOccupied? "occupied":"normal");
    }
    this.onClick = function(event){
        console.log("zone is selected, occupied status changed");
        this.isOccupied = !this.isOccupied;
        this.invalidate();
    };
    this.invalidate();
    this.scale = function(scaleFactor){
        let scaledPath = "";
        for (pair of this.points){
            scaledPath += (pair[0] * scaleFactor) + "," + (pair[1] * scaleFactor) + " ";
        }
        this.node.setAttribute("points", scaledPath);
    }
}

function Zone(zone, type="poly"){
    this.zoneId = zone.id;
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.path = new Path(zone.points);
    this.node.append(this.path.node);
    this.type = type;
    this.zoneScale = 1;
    this.pointsList = [];
    svgImg.append(this.node);
    
}

//TODO make it scalable, add helping messanges