exports.Task = extend(TolokaHandlebarsTask, function (options) {
    TolokaHandlebarsTask.call(this, options);
}, {
    onRender: function () {
        $(document).ready(function () {
            var acceptMode = document.referrer.includes("status=SUBMITTED");

            initDOM();
            initMultiLanguageSupport();
            initPresentationLayer(acceptMode);
            initToolbar(acceptMode);
            initMinimap();
        });

        window.thisTask = this;

    },
    onDestroy: function () {
        /*global resetDataCollector*/
        /*eslint no-undef: "error"*/
        resetDataCollector();
        /*global resetSVGPolygonData*/
        /*eslint no-undef: "error"*/
        resetSVGPolygonData();
    }
});

function extend(ParentClass, constructorFunction, prototypeHash) {
    constructorFunction = constructorFunction || function () {
    };
    prototypeHash = prototypeHash || {};
    if (ParentClass) {
        constructorFunction.prototype = Object.create(ParentClass.prototype);
    }
    for (let i in prototypeHash) {
        constructorFunction.prototype[i] = prototypeHash[i];
    }
    return constructorFunction;
}