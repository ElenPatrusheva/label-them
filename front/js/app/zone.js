let zones = [];

function initZones(inputZones){
    /*
    *creates an array of given polygon zones,
    *which are not occupied by default
    */
    for (let zone of inputZones){
        
        console.log("createzone");
        console.log(zone);
        zones.push(new Zone(zone));
    };
}
function Path(points, id){
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.points = points;
    this.isOccupied = false;
    this.clickListener = null;
    let path = "";
    for (let pair of this.points){
        path += pair[0] + "," + pair[1] + " ";
    }
    this.pathId = id;
    this.node.setAttribute("id", "polygon_" + id);
    this.node.setAttribute("points", path);
    this.onclick = function(){
        console.log("default onclick path");
    };
    this.invalidate = function(){
        this.node.setAttribute("class", this.isOccupied? "occupied":"normal");
    };
    this.onClick = function(event){
        console.log("zone is selected, occupied status changed");
        this.isOccupied = !this.isOccupied;
        this.invalidate();
        onSave();
    };
    this.onClick = this.onClick.bind(this);
    this.setOnClick = function(bool){
        if (bool){
            this.node.addEventListener("click", this.onClick, false);
        }
        else{
            console.log(this);
            this.node.removeEventListener("click", this.onClick, false);
        }
    };
    this.invalidate();
    this.scale = function(scaleFactor){
        let scaledPath = "";
        for (let pair of this.points){
            scaledPath += (pair[0] * scaleFactor) + "," + (pair[1] * scaleFactor) + " ";
        }
        this.node.setAttribute("points", scaledPath);
    };
}

function Zone(zone, type="poly"){
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.path = new Path(zone.points, zone.id);
    this.node.append(this.path.node);
    this.type = type;
    this.zoneScale = 1;
    this.pointsList = [];
    svgImg.append(this.node);
    this.onClick = function(bool){
        this.path.setOnClick(bool);
    };
}

// add helping messanges