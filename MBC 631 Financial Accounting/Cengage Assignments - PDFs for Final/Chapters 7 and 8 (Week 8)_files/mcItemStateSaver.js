function mcProcessSingleElement(element) {
    element = jQuery(element);
    var inputType = element.attr('type');
    if (inputType == "radio" || inputType == "checkbox") {
        if (element.is(":checked")) {
            return element.val();
        } else {
            return null;
        }
    } else {
        return element.val();
    }
}