//
// compatabilityTools.js
//
// Functions to assist with compatability in older browsers
//

//for student facing files need any text to be in a variable, that way it can be overloaded by the xsl, and translated where needed
var MEScot1="Sorry, your current browser does not support this content. \nPlease upgrade your browser. Refer to the CengageNOW System Requirements to determine the appropriate browser and version for your system.";

// Before redefining document.getElementById, capture browser version in a variable
var browserDOMVersion;
if (document.getElementById)
    browserDOMVersion = "getElementById";
else if (document.all)
    browserDOMVersion = "all";
else if (document.layers)
    browserDOMVersion = "layers";
else
    browserDOMVersion = "";

// Redefine document.getElementById to use function getDocElement (definition below)
if (!(document.getElementById))
    document.getElementById = getDocElement;

// returns a universal object reference
// this function should return a valid object independent of the browser version
function getDocElement( elemID )
{
    if (document.all)
        return document.all[elemID];
    else if (document.layers)
        return document.layers[elemID];
    else
        alert(MEScot1);
}

function getAnswerForSafari(uid){
    i = 1;
    ans = null;
    while (i < 6 ) {
        script = "ans = " + uid + ".getAnswer" + i + "();";
        try {
            eval( script);
            return ans;
        }catch (e) {
            ans = null;
        }
        i ++;
   }
    return ans;
}

// use to set the value of a textarea in Safari
function setTextAreaContents(theTextArea, newValue)
{
    if (navigator.userAgent.indexOf('Safari') != -1)
        theTextArea.innerHTML = newValue;

    theTextArea.value = newValue;
}

function getInvokeMethodForSafari(uid,err,args){
    i = 1;
    ermessage = null;
    while (i < 6 ) {
        script = "ermessage = " + uid + ".invokePluginMethod" + i + "(\""+err+"\",\" "+args+"\");";
        try {
            eval( script);
            return;
        }catch (e) {
            ermessage = null;
        }
        i ++;
   }
    return;
}
//set focus to the first applet on  page
function setFocusToFirstApplet(){
                 var applets = document.getElementsByTagName("APPLET");
                 if (applets.length==0)
                     return;
                 for (var i=0; i < applets.length; i++) {
                     try{
                         if (!applets[i].isComplete()){
                             setTimeout("setFocusToFirstApplet()", 100);
                             return;
                         }
                     }
                     catch(e){
                         continue;
                     }

                 }
                 try {
                     var applet=applets[0];
                     applet.invokeAppletMethod('focusGainedForJS','');
                 }
                 catch(e){
                     return;
                 };
};

//creates non-IE versions of insertAdjacentElement, insertAdjacentHTML, and insertAdjacentText for non-IE browsers (e.g. Mozilla)
if(typeof(HTMLElement) != "undefined" && navigator.userAgent.indexOf("Safari") == -1) {
	if (!HTMLElement.prototype.insertAdjacentElement) {
		HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
		{
			switch (where)
			{
				case 'beforeBegin':
					this.parentNode.insertBefore(parsedNode,this);
					break;
				case 'afterBegin':
					this.insertBefore(parsedNode,this.firstChild);
					break;
				case 'beforeEnd':
					this.appendChild(parsedNode);
					break;
				case 'afterEnd':
					if (this.nextSibling) 
						this.parentNode.insertBefore(parsedNode,this.nextSibling);
					else 
						this.parentNode.appendChild(parsedNode);
					break;
			}
		}
	
		HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr)
		{
			var r = this.ownerDocument.createRange();
			r.setStartBefore(this);
			var parsedHTML = r.createContextualFragment(htmlStr);
			this.insertAdjacentElement(where,parsedHTML);
		}
	
	
		HTMLElement.prototype.insertAdjacentText = function(where,txtStr)
		{
			var parsedText = document.createTextNode(txtStr);
			this.insertAdjacentElement(where,parsedText);
		}
	}
} else {
// khtml support (Safari, Konqueror)
// HTMLElement is undefined in khtml
	function insertAdjacentText(target, where, txtStr) {
		var parsedText = document.createTextNode(txtStr);
		insertAdjacentElement(target, where, parsedText);
	}

	function insertAdjacentHTML(target, where, htmlStr) {
		var r = target.ownerDocument.createRange();
		r.setStartBefore(target);
		var parsedHTML = r.createContextualFragment(htmlStr);
		insertAdjacentElement(target, where, parsedHTML);
	}
	
	// ILRN-12671: param name should be parsedNode, not parsedHTML
	function insertAdjacentElement(target, where, parsedNode) {
		switch (where) {
			case 'beforeBegin':
				target.parentNode.insertBefore(parsedNode, target);
				break;
			case 'afterBegin':
				target.insertBefore(parsedNode, target.firstChild);
				break;
			case 'beforeEnd':
				target.appendChild(parsedNode);
				break;
			case 'afterEnd':
				if (target.nextSibling) 
					target.parentNode.insertBefore(parsedNode, target.nextSibling);
				else 
					target.parentNode.appendChild(parsedNode);
				break;
		}
	}
}
