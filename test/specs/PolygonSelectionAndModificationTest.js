var assert = require("assert");
let projectFolderName = "label-them";
describe("webdriver.io page", function () {
    it("Polygons selection and modification of classes and parameters of the selected polygon", function () {
        /*global browser*/
        /*eslint no-undef: "error"*/
        browser.url("http://localhost:63342/" + projectFolderName + "/front/main_local.html");
        if (browser.desiredCapabilities.platform === "WINDOWS" || browser.desiredCapabilities.platform === "LINUX") {
            browser.windowHandleSize({width: 1920, height: 1080});
        }

        // Step 1
        browser.leftClick("#canvas-parent", 100, 100);
        browser.leftClick("#canvas-parent", 100, 200);
        browser.leftClick("#canvas-parent", 200, 100);
        browser.leftClick("#canvas-parent", 100, 100);

        // Step 2
        var selectBox = $(".class-param");
        selectBox.selectByValue("class 0");

        // Step 3
        var checkBox = $(".bool-param");
        checkBox.click();

        // Step 4
        browser.leftClick("#canvas-parent", 300, 300);
        browser.leftClick("#canvas-parent", 300, 400);
        browser.leftClick("#canvas-parent", 400, 300);
        browser.leftClick("#canvas-parent", 300, 300);


        // Step 5
        selectBox.selectByValue("class 1");

        // Step 6 checkbox's default value is false
        // checkBox.click();

        // Step 7
        // - // Removed in the releases after 1.4

        // Step 8
        browser.leftClick("#canvas-parent", 120, 120);

        // Step 9
        checkBox.click();

        // Step 10
        browser.leftClick("#canvas-parent", 320, 320);

        // Step 11
        selectBox.selectByValue("class 0");

        // Step 12
        checkBox.click();

        // Step 13
        browser.click("#btn_save");

        // Get outputJson
        var result = browser.execute("return outputJson;");
        console.log(result.value);

        var pointsTemp = [[[100, 100], [100, 200], [200, 100]], [[300, 300], [300, 400], [400, 300]]];
        let error = 2;
        let jsonResponse = JSON.parse(result.value);
        let results = [];

        for (let k = 0; k < jsonResponse.length; k++) {
            let points = jsonResponse[k].points;
            let tempPoints = pointsTemp[k];
            // assert
            for (let i = 0; i < points.length; i++) {
                for (let j = 0; j < 2; j++) {
                    let point = points[i][j];
                    let difference = Math.abs(points[i][j] - tempPoints[i][j]);
                    results.push(difference <= error);
                }
            }

        }
        results.forEach(function (obj) {
            assert.equal(obj, true);
        });
    });
});