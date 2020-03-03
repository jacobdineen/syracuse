// ILRN-29200, save assignment state functionality
var filteredSubmitScript = null;
if (typeof(enableSaveContinueButton) == "function") {
    enableSaveContinueButton();
}
    
function filterSubmitScript(script) {
    // strip quotes
    return script.replace(/alert\s*\(.*?\);/g, "{}").replace(/strChar\s*\(\s*34\s*\)/g, "''");
}

function getCurrentItemState() {
    var buttonClickElement = document.getElementById("buttonClick");
    if (buttonClickElement && buttonClickElement.value == "1") {
        return "SUBMIT_IN_PROGRESS";
    }
    
    //TODO: this is based on goofball current assumption that there is only a single item.
    var theItem = CovalentItemManager.getInstance().getAllItems()[0];
    
    return theItem.getSubmitMap();
}

function ptInputContainerLocator(covalentItem)
{
    return document.getElementById('ptForm' + covalentItem.getId());
}
