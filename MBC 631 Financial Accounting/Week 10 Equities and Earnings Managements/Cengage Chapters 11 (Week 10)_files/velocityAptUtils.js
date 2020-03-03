if (typeof(__included_aptutils_js) == "undefined") {
__included_aptutils_js = true;
(function() {

    function AptUtils()
    {
    }

    /**
    * Adjust the width of each element in elementToSize
    *
    * @param elementsToSize  All elements in this jQuery list will be sized
    * @param textRows An array of inputId/string objects containing the text to size the elements to.
    * @param minWidth The minimum width to set the elements to
    */    
    AptUtils.adjustElementWidths = function(elementsToSize, textRows, minWidth)
    {
        if (elementsToSize.length == 0)
            return;
             
        if (!minWidth)
            minWidth = 0;
            
        var width = getMaxCellWidth(textRows, elementsToSize, minWidth, elementsToSize.is('select') ? 30 : 3);

        elementsToSize.css('width', width);
    };
    
    // Get the width, in pixels, of the longest rendered text row
    function getMaxCellWidth(textRows, elementsToSize, minWidth, padWidth)
    {
        var width = 0;

        var id = 'tEmPeLeMeNt';
        var element = jQuery('<span style="white-space: nowrap;" id="' + id + '"/>').appendTo(jQuery('body'));
        for (var x = 0; x < textRows.length; x++)
        {
            var styleFromElement = jQuery('[id="' + textRows[x].id + '"]');
            element.css('font-family', styleFromElement.css('font-family'));
            element.css('font-size', styleFromElement.css('font-size'));
            element.html(unescape(textRows[x].text));
            width = Math.max(width, element.innerWidth());
        }
        element.remove();
        width += padWidth;
        width = Math.max(width, minWidth);
        width += "px";
        return width;
    }
    
    // The input option list methods are provided as a convenient way for the templates
    // to maintain separate lists of text input options/input element ids for separate columns 
    
    var inputOptionList = new Object();
    AptUtils.addToInputOptionList = function(listId, optionText, inputElementId)
    {
        if (!listId || listId == '')
            return;
        if (!inputOptionList[listId])
        {
            inputOptionList[listId] = new Array();
        }
        inputOptionList[listId].push({
            id : inputElementId,
            text: optionText
        });
    }
    
    AptUtils.getInputOptionList = function(listId)
    {
        if (!inputOptionList[listId])
            return new Array();
        return inputOptionList[listId];
    }

    // Make public    
    window.AptUtils = AptUtils;

})();}