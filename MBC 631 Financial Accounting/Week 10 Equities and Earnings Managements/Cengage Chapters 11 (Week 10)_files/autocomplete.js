if (typeof(__included_accounting_autocomplete_js) == "undefined") {
    __included_accounting_autocomplete_js = true;
(function() {

ACBgStyle = "white";
ACHighlightStyle = "#FFFF33";

isIE = navigator.userAgent.indexOf("MSIE") != -1;

function ReservedWord(words, caseSensitive) {
    this.words = words;
    this.caseSensitive = caseSensitive;
}

// List of ACAutocomplete objects
ACAutocomplete.AC_FIELDS = new Array();

ACAutocomplete.prototype.getStrings = function(str1)
{
    var res = new Array();
    if (str1 == '' || str1.length < 2) {
        return res;
    }

    for (var i = 0; i < this.reservedWords.length; i++) {
        for (var j = 0; j < this.reservedWords[i].words.length; j++) {
            var word = this.reservedWords[i].words[j];
            if(this.reservedWords[i].caseSensitive){
                if (word.indexOf(str1) > -1) {
                    res.push(word);
                }
            }
            else{
                if (word.toUpperCase().indexOf(str1.toUpperCase()) > -1) {
                    res.push(word);
                }
            }
        }
    }
    return res;

};

ACAutocomplete.prototype.onDivMouseDown = function(target)
{
    if (typeof(target.innerHTML) == "undefined") {
        this.acInput.value = ACunescape(target.parentNode.innerHTML);
    }
    else {
        this.acInput.value = ACunescape(target.innerHTML);
    }
    this.divHide();
};

ACAutocomplete.prototype.onDivMouseDown0 = function(e)
{
    this.ACAutocomplete.onDivMouseDown(ACtarget(e));
};

ACAutocomplete.prototype.onDivMouseOver = function()
{
        if(this.ACAutocomplete.selectedIndex!=-1){
            document.getElementById(this.ACAutocomplete.acDiv.id+"_" + this.ACAutocomplete.selectedIndex).style.backgroundColor = ACBgStyle;
        }
        this.style.backgroundColor = ACHighlightStyle;
        this.ACAutocomplete.selectedIndex = this.index;
};

ACAutocomplete.prototype.select = function(index)
{
        if( !this.isVisible() )
            return;

        if(this.selectedIndex != -1){
            document.getElementById(this.acDiv.id+"_" + this.selectedIndex).style.backgroundColor = ACBgStyle;
        }
        var oDiv = document.getElementById(this.acDiv.id+"_" +index);
        oDiv.style.backgroundColor = ACHighlightStyle;
        this.acInput.value = ACunescape(oDiv.innerHTML);
        this.selectedIndex = index;
};

ACAutocomplete.prototype.divHide = function(){
        this.acDiv.style.visibility = "hidden";
        this.acDiv.parentNode.style.zIndex = 1;
        if(this.IfRef!=null){
            this.IfRef.style.display = "none";
        }
};

ACAutocomplete.prototype.onKeyDown = function(event)
{
       if(event.keyCode==40){ //down arrow

           var newIndex = (this.selectedIndex+1)%this.divCounter;
           this.select(newIndex);
       } else if (event.keyCode==38){ //up arrow
           var newIndex = this.selectedIndex-1;
           if (newIndex<0){
                newIndex = this.divCounter-1;
           }
           this.select(newIndex);
       } else if (event.keyCode==27){ //ESC
           this.acInput.value = this.txt;
           this.divHide();
       } else if (event.keyCode == 9 || event.keyCode==13 || event.keyCode==39 || event.keyCode==37){ //tab, enter, right arrow, left arrow
           this.divHide();
       } else{
           this.textChanged = true;

       }

};

ACAutocomplete.prototype.onKeyUp = function()
{
    if (this.textChanged){
        this.txt = this.acInput.value;
        while ( this.acDiv.hasChildNodes() ){
            this.acDiv.removeChild(this.acDiv.firstChild);
        }

       // may be reset below
       this.acInput.style.color = "";

       var aStr = this.getStrings(this.txt);
       this.divCounter = aStr.length;
       if(this.selectedIndex>this.divCounter-1){
            this.selectedIndex = 0;
       }
       if(this.divCounter>0) {
            var i, n = aStr.length;
            for ( i = 0; i < n; i++ ) {
                var oDiv = document.createElement('div');
                this.acDiv.appendChild(oDiv);
                oDiv.style.whiteSpace = 'nowrap';
                oDiv.innerHTML = aStr[i];
                oDiv.ACAutocomplete = this;
                oDiv.index = i;
                oDiv.id = this.acDiv.id+"_" + i;
                oDiv.onmousedown = ACAutocomplete.prototype.onDivMouseDown0;
                oDiv.onmouseover = ACAutocomplete.prototype.onDivMouseOver;
                if(this.selectedIndex == i){
                    oDiv.style.backgroundColor = ACHighlightStyle;
                }
                oDiv.style.textAlign = "left";
            }

            this.acDiv.style.visibility = "visible";
            //position relative here instead of vm because of IE7 position relative z-index bug
            this.acDiv.parentNode.style.position = "relative";
            //Position based on the position of input field
            var inputPos = jQuery(this.acInput).position();
            if(inputPos.left)
            {
                this.acDiv.style.left = inputPos.left + 'px';
            }
            //Set zIndex for IE7 rendering bug where the dropdown can be hidden behind other dropdowns.  Reset to 1 once the dropdown is hidden again - in ACHide, divHide.
            this.acDiv.parentNode.style.zIndex = 2;

       }
       else {
           // No reserved words match. If more than one character has been entered,
           // turn the field red to indicate an error.
           if (this.txt.length > 1)
               this.acInput.style.color = "red";

           this.selectedIndex = -1;
           this.divHide();
       }

    }
    this.textChanged = false;
};

ACAutocomplete.prototype.checkInput = function(completePartialMatch)
{
    var value = this.acInput.value;
    var reservedWordMatches = this.getStrings(value);
    // If no reserved word matches, clear the input field.
    if (reservedWordMatches.length == 0)
    {
        this.acInput.value = '';
        this.acInput.style.color = '';
    }
    // There was a reserved word match. If the user didn't enter an entire reserved word:
    // if completePartialMatch is true, select the first matching reserved word for the user,
    // otherwise, clear the input.
    else
    {
        for (var x=0; x < reservedWordMatches.length; x++)
        {
            if (this.reservedWords.caseSensitive)
            {
                if (reservedWordMatches[x] == value)
                    return;
            }
            else
            {
                if (reservedWordMatches[x].toUpperCase() == value.toUpperCase())
                    return;
            }
        }
        if (completePartialMatch)
            this.acInput.value = reservedWordMatches[0];
        else
        {
            this.acInput.value = '';
            this.acInput.style.color = '';
        }
    }
};

ACAutocomplete.prototype.onBlur = function()
{
    this.checkInput(true);
};

ACAutocomplete.prototype.onFocus = function()
{
    this.checkInput(false);
};

ACAutocomplete.prototype.isVisible = function()
{
    if( !this.acDiv )
        return false;

    return this.acDiv.style.visibility == "visible";
}

ACAutocomplete.prototype.onKeyUp0 = function()
{
       this.ACAutocomplete.onKeyUp();
};

ACAutocomplete.prototype.onKeyDown0 = function(e)
{
       if (!e) var e = window.event;
       this.ACAutocomplete.onKeyDown(e);
};

ACAutocomplete.prototype.onBlur0 = function()
{
       this.ACAutocomplete.onBlur();
};

ACAutocomplete.prototype.onFocus0 = function()
{
       this.ACAutocomplete.onFocus();
};


ACAutocomplete.prototype.addACListener = function(type, expression)
{
    if(window.addEventListener) {
        document.addEventListener(type, expression, false);
    } else if(window.attachEvent) {
        document.attachEvent('on' + type, expression);
    }
    this.eventListeners.push({ 'type' : type, 'expression' : expression });
}

ACAutocomplete.prototype.removeACListener = function(type, expression)
{
    if (window.removeEventListener) {
        document.removeEventListener(type, expression, false);
    }
    else {
        document.detachEvent('on' + type, expression);
    }
}

// Allow cleaning up event listeners.
ACAutocomplete.prototype.cleanupListeners = function()
{
    for (var i = 0; i < this.eventListeners.length; i++)
    {
        this.removeACListener(this.eventListeners[i].type, this.eventListeners[i].expression);
    }
}

function ACAutocomplete(acDiv, acInput, id, reservedWords){
       this.acDiv = acDiv;
       this.id = id;
       this.IfRef = null;
       this.acInput = acInput;
       this.selectedIndex = -1;
       this.divCounter = 0;
       this.txt = "";
       this.reservedWords = reservedWords;
       // remember listeners so we can clean them up later.
       this.eventListeners = new Array();

       // If initial value (from a pre ILRN-40754 answer) doesn't match a reserved
       // word, turn the field red to indicate an error.
       if (acInput.value.length > 1 && this.getStrings(acInput.value).length == 0)
           this.acInput.style.color = 'red';
       this.textChanged = false;
       acInput.ACAutocomplete = this;
       this.acInput.onkeydown = ACAutocomplete.prototype.onKeyDown0;
       this.acInput.onkeyup = ACAutocomplete.prototype.onKeyUp0;
       this.acInput.onblur = ACAutocomplete.prototype.onBlur0;
       this.acInput.onfocus = ACAutocomplete.prototype.onFocus0;

        if (document.layers) {
           document.captureEvents(Event.MOUSEUP);
        }
       this.addACListener('mouseup', function(e) {ACHide(acDiv.id, this.id+"_iframe" );});
       this.addACListener('keyup', function(e) { if (e.keyCode == 27) {ACHide(acDiv.id, this.id+"_iframe" );}});

       // remember all the autocomplete fields so they can be cleanup up.
       ACAutocomplete.AC_FIELDS.push(this);
}

function ACHide(divId, ifId){
    var acDiv = document.getElementById(divId);
    
    if (acDiv) {
        acDiv.style.visibility = "hidden";
        acDiv.parentNode.style.zIndex = 1;
    }

    var ifRef = document.getElementById(ifId);
    
    if(ifRef){
       ifRef.style.display = "none";
    }
}

function ACinitAutocomplete(acDiv, acInput, id, reservedWords){
    new ACAutocomplete(acDiv, acInput, id, reservedWords);
}

function ACcleanupAutocomplete()
{
    for (var i = 0; i < ACAutocomplete.AC_FIELDS.length; i++)
    {
        ACAutocomplete.AC_FIELDS[i].cleanupListeners();
    }
    ACAutocomplete.AC_FIELDS = new Array();
}

function ACtarget(e) {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    return targ;
}


function ACunescape(s) {
  var toReplace = new Array("&lt;", "&gt;","&quot;","&amp;","&#160;");
  var _replace = new Array ("<",">","\"","&"," ");
  for (var i=0; i<_replace.length; i++) {
    s = ACreplaceAll(s, toReplace[i], _replace[i]);
  }
  return s;
}

function ACreplaceAll(str, rgExp, rText) {
    while (str.search(rgExp) != -1)
        str = str.replace(rgExp, rText);
    return str;
}

/*
 * IMPORTANT: Export the public objects that we want visible to the outside world. Anything not exported here
 * will not be accessible to consumer applications.
 */
window.ACinitAutocomplete = ACinitAutocomplete;
window.ACAutocomplete = ACAutocomplete;
window.ReservedWord = ReservedWord;
window.ACcleanupAutocomplete = ACcleanupAutocomplete;

})();

/**
 * For Auto Complete fields when form selector element is used.
 * Extends the width of the form select element, to display long option values,
 * when it has focus or when the mouse pointer is over it.
 */
jQuery(document).ready(function()
{
  jQuery(".expandSelect").each(function() {
      // Get and set initial selector state.
    var initialWidth = jQuery(this).css("width");
    jQuery(this).css("position", "absolute");
    jQuery(this).attr("initialWidth", initialWidth); // The css width value for normal state.
    jQuery(this).css("width", "auto");
    jQuery(this).attr("maxWidth", jQuery(this).width()); // Width required to display full content.
    jQuery(this).css("width",  initialWidth);
    jQuery(this).css("position", "");
    jQuery(this).attr("freezeState", "false"); // Keeps the mouse out code from firing when true.

    // Nest selector in spans to maintain proper layout when selector is expanded.
    jQuery(this).parent().css("text-align", "left");
    jQuery(this).wrap("<span></span>");    
    jQuery(this).parent().css("display", "inline-block");
    if (jQuery.browser.msie && parseInt(jQuery.browser.version.substr(0,1)) != 7)
    {
        jQuery(this).parent().css("position", "relative");
    }    
    jQuery(this).parent().css("vertical-align", "top");
    jQuery(this).parent().css("height", jQuery(this).height());
    jQuery(this).parent().css("width", jQuery(this).css("width"));
    jQuery(this).parent().css("margin", "0px 3px 0px 0px");

    function removePlaceholder(thisRef) {
        jQuery(".autocompleteplaceholder", jQuery(thisRef).parent()).remove();
    }
    
    function addPlaceholder(thisRef) {
        removePlaceholder(thisRef);
        var placeholder = jQuery(thisRef).clone();
        placeholder.attr({"id": jQuery(thisRef).attr("id") + "autocompleteplaceholder", "name": "autocompleteplaceholder"});
        placeholder.addClass("autocompleteplaceholder").css({visibility:"hidden", width: "98%", position:""}).insertAfter(thisRef);        
    }
    
    jQuery(this).focus(function(){
      // Check to see if width should be changed.
      if(jQuery(this).attr("maxWidth") >= jQuery(this).width())
      {
        addPlaceholder(this);
        jQuery(this).css("width","auto");
        jQuery(this).attr("freezeState", "true");
        jQuery(this).css("position","absolute");
      }
    });
    jQuery(this).mouseover(function(){
      // Check to see if width should be changed.
      if(jQuery(this).attr("maxWidth") >= jQuery(this).width() && jQuery(this).attr("freezeState") != "true")
      {
        addPlaceholder(this);
        jQuery(this).css("width","auto");
        jQuery(this).css("position","absolute");
      }
    });
    jQuery(this).blur(function(){
      // Reset to initial width.
      removePlaceholder(this);
      jQuery(this).css("width", jQuery(this).attr("initialWidth"));
      jQuery(this).css("position","");
      jQuery(this).attr("freezeState", "false");
    });
    jQuery(this).mouseout(function(){
      // To avoid reset to initial width when selector still has focus.
      if(jQuery(this).attr("freezeState") == "true")
        return;
      removePlaceholder(this);
      jQuery(this).css("width", jQuery(this).attr("initialWidth"));
      jQuery(this).css("position","");
    });
  });
});
}
