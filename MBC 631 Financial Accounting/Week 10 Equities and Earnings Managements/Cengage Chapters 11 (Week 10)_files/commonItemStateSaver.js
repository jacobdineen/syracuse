// ILRN-29200, save assignment state functionality

function processSingleElement(element) {
    var value = element.value;
    if (value == "##null") {
        throw "applets not loaded";
    }
    return value;
}