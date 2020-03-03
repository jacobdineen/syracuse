//
// popupTools.js
//
// Functions to return the coordinates of an anchor, and open a popup nearby.

/*
NOTES:

getAnchorPosition(anchorname)
  Returns an Object() having .x and .y properties of the pixel coordinates
  of the upper-left corner of the anchor. Position is relative to the PAGE.

getAnchorWindowPosition(anchorname)
  Returns an Object() having .x and .y properties of the pixel coordinates
  of the upper-left corner of the anchor, relative to the WHOLE SCREEN.

1) For popping up separate browser windows, use getAnchorWindowPosition.
   Otherwise, use getAnchorPosition

2) Your anchor tag MUST contain both NAME and ID attributes which are the
   same. For example:
   <A NAME="test" ID="test"> </A>

3) There must be at least a space between <A> </A> for IE5.5 to see the
   anchor tag correctly. Do not do <A></A> with no space.
*/

/**
 * Global variable for use with help popup. 
 * Accessed by helpPopup() and help popup window.
 */
var oHelpWindow = null;
var bHelpWindowLocked = false;

/**
 * The default size of a popup window, if none specified.
 * Used by doPopupToUrl() and popupWindow().
 */
var DEFAULT_POPUP_SCALE_FACTOR = 0.9;

/**
 * Default values of features for popup windows.
 * Used by doPopupToUrl() and popupWindow().
 */
var DEFAULT_POPUP_FEATURES = {
    'width'      : Math.floor(window.screen.availWidth  * DEFAULT_POPUP_SCALE_FACTOR),
    'height'     : Math.floor(window.screen.availHeight * DEFAULT_POPUP_SCALE_FACTOR),
    'location'   : 'no',
    'status'     : 'no',
    'menubar'    : 'no',
    'resizable'  : 'yes',
    'scrollbars' : 'yes'
};

/**
 * Opens a URL in a named popup window, centered on screen by default, with
 * default features (as specified by the global DEFAULT_POPUP_FEATURES),
 * and gives the window focus.
 * The default features can be overridden and additional features specified
 * using the 'features' param, described below.
 *
 * @param url The URL to be opened in the popup window.
 * @param windowName The name of the popup window.  Should not have spaces, to
 *        insure IE compatibility.
 * @param features The features to use in opening new window.
 * NOTE: features can be specified as an object (an associative array of
 * feature name/value pairs), or just as a String (similar to Window.open()).
 * @param callback Optional reference to callback function to install in
 * newly opened window.
 * @return The newly opened window object.
 */
function popupWindow(url,windowName,features,callback) {
    // slip ILRN-19846: assert no spaces in windowName
    windowName = windowName.replace(/ /g,"");

    // callback is optional
    var callback = (arguments.length >= 4 ? arguments[3] : null);
    if (typeof(features) == "string") {
        var featuresList = features.split(',');
        var attr;
        features = {};
        for (var i = 0; i < featuresList.length; i++) {
            attr = featuresList[i].split('=');
            features[attr[0]] = attr[1];
        }
    } else if (typeof(features) != "object" || features == null) {
        features = {};
    }

    // Set default features
    for (var name in DEFAULT_POPUP_FEATURES)
        if (typeof(features[name]) == "undefined" || features[name] == null || features[name] == "")
            features[name] = DEFAULT_POPUP_FEATURES[name];

    // Get the left and top coordinates if specified.
    var left = features['left'];
    var top  = features['top'];
    var screenX = features['screenX'];
    var screenY = features['screenY'];
    
    if (typeof(left) == "string") {
        left = parseInt(left,10);
    }
    if (typeof(top) == "string") {
        top = parseInt(top,10);
    }
    if (typeof(screenX) == "string") {
        screenX = parseInt(screenX,10);
    }
    if (typeof(screenY) == "string") {
        screenY = parseInt(screenY,10);
    }
    
    if (!isNaN(left)) {
        left = Math.max(0, left);
    }
    if (!isNaN(top)) {
        top = Math.max(0, top);
    }
    if (!isNaN(screenX)) {
        screenX = Math.max(0, screenX);
    }
    if (!isNaN(screenY)) {
        screenY = Math.max(0, screenY);
    }

    // Center the window horizontally if no left or screenX coord is specified
    if (! isNaN(features['width' ]) && isNaN(left) && isNaN(screenX))
        left = Math.floor((window.screen.availWidth - features['width' ]) / 2);

    // Center the window vertically if no top or screenY coord is specified
    if (! isNaN(features['height']) && isNaN(top ) && isNaN(screenY))
        top = Math.floor((window.screen.availHeight - features['height']) / 2);

    // If screenX is defined but left    is not, use screenX for left.
    // If screenY is defined but top     is not, use screenY for top.
    // If left    is defined but screenX is not, use left for screenX.
    // If top     is defined but screenY is not, use top  for screenY.
    if (  isNaN(left) && ! isNaN(screenX)) left    = screenX;
    if (  isNaN(top ) && ! isNaN(screenY)) top     = screenY;
    if (! isNaN(left) &&   isNaN(screenX)) screenX = left;
    if (! isNaN(top ) &&   isNaN(screenY)) screenY = top;

    // If NS/Moz features are specified, copy them to IE features, and vice-versa
    features['left'   ] = left;
    features['screenX'] = screenX;
    features['top'    ] = top;
    features['screenY'] = screenY;

    // Transform features object into a string
    var featuresArray = [];
    for (var name in features)
        featuresArray.push(name + "=" + features[name]);
    var featuresString = featuresArray.join(",");

    // open the window
    var newWindow = window.open(url,windowName,featuresString);

    // detect blocked popup
    if (newWindow != null)
    {
        // Removed test for window.focus because 'focus' is not a property of
        // a Window object.
        newWindow.focus();
    }
    else
    {
        alert(MESput1);
    }

    // Don't bother adding callback to new window if none specified
    if (callback != null) {
        // Add callback to new window
        newWindow.callback = callback;
    }

    return newWindow;
}

/**
 * 10 Jun 2005 SLG - The following generates a popup window intended for Help
 * System popups. Adding this here allows us to change window size and/or other
 * popup window parameters, and have the changes affect all Help popups.
 *
 * param url is a String that determines what url to load in the popup.
 */

function helpPopup(url)
{
    var features = "width=700,height=550,scrollbars=yes";
    
    if(!bHelpWindowLocked)
    {
        bHelpWindowLocked = true;
        
        // The popup may already exist. If so, set its location to the new URL
        try
        {
            oHelpWindow.location = url;
        }
        catch(e)
        {
            // The above will error if oHelpWindow is null or the popup was closed 
            // in which case we open a new window and point oHelpWindow to the new window.
            
            oHelpWindow = null;
        }
        
        if(!oHelpWindow || oHelpWindow.closed)
        {
            // the help window hasn't been created yet, or has been closed by the user:
            // open a new reusable popup window for help content
            oHelpWindow = popupWindow(url, '', features);
        }

        oHelpWindow.focus();
        
        bHelpWindowLocked = false;
    }
    else
    {
		setTimeout("helpPopup('" + url + "')", 100);
    }
    return oHelpWindow;
}

/**
 * For displaying "See How" videos.
 * param link, anchor tag object.
 */
function videoPopup(link)
{
	if(!window['videoWindows']) 
	{
		window['videoWindows'] = {};
	}
	var videoWindow = window['videoWindows'];
	
	link = jQuery(link);
	if(!link.hasClass('inactive') && !link.parent().hasClass('inactive'))
	{
		var url = link.attr('href');
	    var features = {
            width: 780,
            height: 620,
            top: window.screenTop,
            left: window.screenLeft,
            screenX: window.screenX,
            screenY: window.screenY,
            scrollbars: "no"
	    };
	    var videoName = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
	    
	    // The popup may already exist. If so, set its location to the new URL
	    try
	    {
	    	videoWindows[videoName].location = url;
	    }
	    catch(e)
	    {
	        // The above will error if oVideoWindow is null or the popup was closed 
	        // in which case we open a new window and point oVideoWindow to the new window.
	    	videoWindows[videoName] = null;
	    }
	    
	    if(!videoWindows[videoName] || videoWindows[videoName].closed)
	    {
	        // the video window hasn't been created yet, or has been closed by the user:
	        // open a new reusable popup window for help content
	    	videoWindows[videoName] = popupWindow(url, '', features);
	    }
	
	    videoWindows[videoName].focus();
	    return videoWindows[videoName];
	}
}

/**
 * For displaying Technical Support
 */
var sendTechSupportRequest = (function() {
    var DEFAULT_ACTION = '/ilrn/global/techSupport.do';
    var TARGET = 'cnowTechSupport';

    function addDataToForm(form, name, value) {
        if (value && name) {
            var input = document.createElement('input');
            input.setAttribute('id', name);
            input.setAttribute('name', name);
            input.setAttribute('value', value);
            form.appendChild(input);
        }
    }

    function applyDataToForm(form, data) {
        Object.keys(data).forEach(function(key) {
            addDataToForm(form, key, data[key]);
        });
    }

    return function(options) {
        var action = DEFAULT_ACTION;
        var target = TARGET + (new Date()).getTime();

        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('target', target);

        if (options) {
            if (options.host && options.host.length) {
                var host = (options.host[options.host.length - 1] !== '/' ? options.host : options.host.substr(0, options.host.length - 1));
                action = host + action;
            }

            if (options.mode) {
                addDataToForm(form, 'mode', options.mode);
            }

            if (options.data) {
                applyDataToForm(form, options.data);
            }
        }
        
        addDataToForm(form, "javaScriptEnabled", true);
        
        if (typeof SystemCheck === "function") {
            addDataToForm(form, "popupsEnabled", SystemCheck.isPopupsEnabled());
            addDataToForm(form, "javaVersion", SystemCheck.getJavaVersion());
            addDataToForm(form, "flashVersion", SystemCheck.getFlashVersion());
        }

        form.setAttribute('action', action);

        document.body.appendChild(form);

        popupWindow('', target, 'width=980,height=600,scrollbars=yes,resizable=yes');

        form.submit();

        document.body.removeChild(form);
    };
})();

/**
 * Pops up a new window displaying the contents of the given url. The new
 * window will be centered on the screen and have no location or status bars.
 *
 * param url String representing the url to load in the new window
 * param callback A function to use as a callback to facilitate communication
 * between the popup and the opener
 */

function doPopupToUrl(url, callback, windowname)
{
    // create the popup window with default features
    if (windowname == null)
    {
        windowname = 'name';
    }
    return popupWindow(url, windowname, null, callback);
}

// getAnchorPosition(anchorname)
//   This function returns an object having .x and .y properties which are the coordinates
//   of the named anchor, relative to the page.

if(typeof(browserDOMVersion == "undefined"))
{
    var browserDOMVersion;
    if (document.getElementById)
        browserDOMVersion = "getElementById";
    else if (document.all)
        browserDOMVersion = "all";
    else if (document.layers)
        browserDOMVersion = "layers";
    else
        browserDOMVersion = "";
}

//rendered text is pulled out into variables so that student facing xsls can overload it and have it translated
var MESput1="Popup window failed to open.  If you have popup blocking\nsoftware running, you will need to disable it in order to view this window.";
var MESput2="Rejoinder";

function getAnchorPosition(anchorname) {
    // This function will return an Object with x and y properties
    var useWindow=false;
    var coordinates=new Object();
    var x=0,y=0;
    // Browser capability sniffing
    var use_gebi=false, use_css=false, use_layers=false;
    if (browserDOMVersion == "getElementById") { use_gebi=true; }
    else if (browserDOMVersion == "all") { use_css=true; }
    else if (browserDOMVersion == "layers") { use_layers=true; }
    // Logic to find position
     /*if (use_gebi && document.all) {
        x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
        y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
        }*/
    if (use_gebi) {
        var o=document.getElementById(anchorname);
        x=AnchorPosition_getPageOffsetLeft(o);
        y=AnchorPosition_getPageOffsetTop(o);
        }
     else if (use_css) {
        x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
        y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
        }
    else if (use_layers) {
        var found=0;
        for (var i=0; i<document.anchors.length; i++) {
            if (document.anchors[i].name==anchorname) { found=1; break; }
            }
        if (found==0) {
            coordinates.x=0; coordinates.y=0; return coordinates;
            }
        x=document.anchors[i].x;
        y=document.anchors[i].y;
        }
    else {
        coordinates.x=0; coordinates.y=0; return coordinates;
        }
    coordinates.x=x;
    coordinates.y=y;
    return coordinates;
    }

// getAnchorWindowPosition(anchorname)
//   This function returns an object having .x and .y properties which are the coordinates
//   of the named anchor, relative to the window
function getAnchorWindowPosition(anchorname) {
    var coordinates=getAnchorPosition(anchorname);
    var x=0;
    var y=0;
    if (browserDOMVersion == "getElementById") {
        if (isNaN(window.screenX)) {
            x=coordinates.x-document.body.scrollLeft+window.screenLeft;
            y=coordinates.y-document.body.scrollTop+window.screenTop;
            }
        else {
            x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
            y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
            }
        }
    else if (browserDOMVersion == "all") {
        x=coordinates.x-document.body.scrollLeft+window.screenLeft;
        y=coordinates.y-document.body.scrollTop+window.screenTop;
        }
    else if (browserDOMVersion == "layers") {
        x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
        y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
        }
    coordinates.x=x;
    coordinates.y=y;
    return coordinates;
    }

// Functions for IE to get position of an object
function AnchorPosition_getPageOffsetLeft (el) {
    var ol=el.offsetLeft;
    while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
    return ol;
    }
function AnchorPosition_getWindowOffsetLeft (el) {
    return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
    }
function AnchorPosition_getPageOffsetTop (el) {
    var ot=el.offsetTop;
    while((el=el.offsetParent) != null) { ot += el.offsetTop; }
    return ot;
    }
function AnchorPosition_getWindowOffsetTop (el) {
    return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
    }


//call popup

function callPopup ( anchorname, msg )
    {
        //Determine coordinates for popup
        var x, y, pheight, pwidth, pscroll;
        var maxH = window.screen.availHeight;
        var maxW = window.screen.availWidth;
        pheight = 100; pwidth = 200; pscroll = "no";
        if (msg.length > 100) {pheight= 400; pwidth=400; pscroll ="yes"};
        var anchor = getAnchorWindowPosition(anchorname);
        x = anchor.x + 10; y = anchor.y + 10;
        if (parseInt(anchor.y + pheight) > maxH) {y = maxH-pheight-10;};
        if (parseInt(anchor.x + pwidth) > maxW) {x = maxW-pwidth-10};
        //Open window at the specified coodinates
        rejoinderWindow = window.open("/blank.html","window_"+anchorname,"toolbar=no,location=no,status=no,menubar=no,scrollbars=" + pscroll +",resizable,alwaysRaised,dependent,titlebar=no,width="+ pwidth +",height="+ pheight +",screenX="+ x +",left="+ x +",screenY="+ y +",top=" + y);
        if (isWindow(rejoinderWindow))
        {
            rejoinderWindow.document.open();
            rejoinderWindow.document.write("<head><title>"+MESput2+"</title>");
            rejoinderWindow.document.write("<link rel='stylesheet' type='text/css' href='/style_sheet_v2.css'></head>");
            rejoinderWindow.document.write('<body bgcolor="silver"><div align="left" style="display:inline"><a name="leftTop">&nbsp;</a></div>');
            rejoinderWindow.document.write('<div align="center"><table width="100%" height="100%" border="0" align="left"><tr><td><b>' + msg + '</b></td></tr></table></div></body>');
        }
        else
            alert(MESput1);
    }

///this function measures the distance between two anchors

function measureAnchors( a1, a2 )
    {
        var anchor1 = getAnchorPosition(a1);
        var anchor2 = getAnchorPosition(a2);
        var anchorDistance = new Object();
        anchorDistance.x = abs(anchor2.x - anchor1.x);
        anchorDistance.y = abs(anchor2.y - anchor1.y);
        return anchorDistance;
    }

// returns x and y coordinates for a given window size which will center the window on the screen.
function getCenterCoordinates( width, height )
{
    var obj = new Object();
    obj.x = Math.floor((window.screen.availWidth  - width ) / 2);
    obj.y = Math.floor((window.screen.availHeight - height) / 2);
    return obj;
}

// Object prototype version of above function
function Coords(width, height)
{
    this.x = Math.floor((window.screen.availWidth  - width ) / 2);
    this.y = Math.floor((window.screen.availHeight - height) / 2);
}


/**
* This is called by Flash problemtypes when needed, and used when feedback is a URL instead of a message
*/
function displayRejoinderPopup(URL, uid)
{
    /*
     * Get the sessid and book path.  Then build a URL like:
     * http://localhost:3714/bca/user/context-quiz/<sessid>/<book>/<chapter>/resources/feedback.htm?error=10
     * In other words, chop off everything from "run?" to the end, and then append the rejoinder URL.
     *
     * if URL < 3, there is not rejoinder specified. if !isSubmit, user did not click submit button.
     */

    if(URL.length < 3)
         return;

     var winLoc = window.location.href;
     var myURL;
     var win;

     // If this is a context-quiz, construct myURL according to context-quiz format...
     if(winLoc.search(/context-quiz/) != -1)
     {
       var arrURL = winLoc.split("run");
       myURL = arrURL[0] + URL;
     }
     // Not context-quiz...
     else
     {
       myURL = URL;
     }

   /*
    * Absense of "error" and "img" signifies usage of string rejoinder-action.
    * Presense of "img" in URL indicates image rejoinder.
    * "error in URL signifies usage of static feedback page (feedback.htm).
    * Here we use a browser dialog box instead of a pop-up window.
    */
   if(URL.search(/error/) != -1)
        win = popupWindow(myURL, "rejoinderPopupWin", "width=640,height=480,scrollbars,resizable");
}

/*
 * Creates a modal dialog, using either the
 * native javascript function window.showModalDialog(),
 * or the popupWindow function.
 * 
 * @param modalOptions Option string to be used by native showModalDialog()
 * @param nonModalOptions Option string to be used by popupWindow()
 */
function doModalWin(url, name, modalOptions, nonModalOptions)
{
    //  Chrome 2.0 has a bug in window.showModalDialog
    var canUseShowModalDialog = (!!window.showModalDialog && !isChrome2());

    if (canUseShowModalDialog) 
    {
        // use native javascript showModalDialog function
        var win = window.showModalDialog(url,name,modalOptions);
        return win;
    }
    else
    {
        // simulate a modal popup window
        var win = popupWindow(url,name,nonModalOptions);
        return win;
    }
}

function isChrome2()
{
    return (navigator.userAgent.indexOf('Chrome/2') >= 0);
}
