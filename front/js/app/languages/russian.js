/**
 * Created by alnedorezov on 6/29/17.
 */
function initRussianLanguageSupport() {
    /*global language*/
    /*eslint no-undef: "error"*/
    language.russian = function () {
        /*global fromPrototype*/
        /*eslint no-undef: "error"*/
        return fromPrototype(language, {
            getLanguageName() {
                return "russian";
            },
            notTheFullImageWillBeShownNotificationString: "Ширина изображения превышает размер выделенного " +
            "под него блока. Пожалуйста, используйте горизонтальную прокрутку для просмотра всего изображения " +
            "и разметьте его при помощи инструментов расположенных в блоке слева.",
            markupImageWithToolsNotificationString: "Пожалуйста, разметьте отображённое ниже изображение при помощи " +
            "инструментов расположенных в блоке слева.",
            miniMap: "Мини карта",
            disableEditing: "Отключить редактирование", 
            enableEditing: "Разрешить редактирование"
        });
    };
}
