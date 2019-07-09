/**
 * Created by alnedorezov on 5/26/17.
 */
function initSelector() {
    
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
                        for (let key in zones){
                            //zones[key].path.node.addEventListener("click", zones[key].path.onClick.bind(zones[key].path), false);
                            zones[key].onClick(true);                            
                        }
                        btnSelector.setAttribute("title", activeLanguage.disableEditing);
                        console.log(zones);

                    } else {
                        console.log("selector disabled");
                        for (let key in zones) {
                            zones[key].onClick(false);
                            //zones[key].path.node.removeEventListener("click", zones[key].path.onClick.bind(zones[key].path), false);
                        }
                        btnSelector.setAttribute("title", activeLanguage.enableEditing);
                        console.log(zones);
                        
                    }
                }
            },
            isProlonged: true,
            buttonId: "btn_selector"
        });
    };
}
