function fitbProcessSingleElement(element) {
    var value;
    if (element.options) {
        var selectElement = element.options[element.selectedIndex];
        value = selectElement.value;
        if (value === "") {
            value = selectElement.innerHTML;
        }
    } 
    else {
        value = element.value;
        if (!value || jQuery.trim(value) === "") {
            value = "blank";
        }
    }
    if (value == "##null") {
        throw "applets not loaded";
    }
    return value;
}

function answer (id) {
	return document.getElementById("answer" + id);
}

function raw (id) {
	return document.getElementById("raw" + id);
}

function strChar (val) {
	return String.fromCharCode(val);
}

function setValue (id, v)
{
	document.getElementById (id).value=v;
}

function onlyAllowValidKeys(keyCode)
{
    if (keyCode==13)
        return false;
    else
        return true;
}

function blankSync( input, hidden, blank, processor )
{
    var element = document.getElementById( input );
    var theValue = (element.getFieldValue != null) ? element.getFieldValue() : element.value;

    if (!theValue || jQuery.trim(theValue) === "") {
        theValue = blank;
    }
    
    if (processor) {            
        theValue = processor(theValue);
    }
    document.getElementById( hidden ).value = theValue;
}
function fitbOnLoadElementProcessor(inputContainer)
{
    // Initialize all FITB text input elements by firing their onChange events
    jQuery(".blankSync").change();
}

function fitbInFocusElementProcessor(inputContainer)
{
    // If a FITB text entry elements has focus, fire change event on it
	jQuery(".blankSync").filter(":focus").change();
}