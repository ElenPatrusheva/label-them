/**
 * Created by alnedorezov on 6/29/17.
 */
function initEnglishLanguageSupport() {
    /*global language*/
    /*eslint no-undef: "error"*/
    language.english = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(language, {
            getLanguageName() {
                return "english";
            },
            notTheFullImageWillBeShownNotificationString: "Image cannot fit the screen in width. " +
            "Please, uncover the whole image displayed below with the use of horizontal scrolling " +
            "and markup it using the tools from the block on the left.",
            markupImageWithToolsNotificationString: "Please, markup the image displayed below using the tools " +
            "from the block on the left.",
            miniMap: "Mini Map", 
            disableEditing: "Disable editing", 
            enableEditing: "Enable editing"
        });
    };
}
