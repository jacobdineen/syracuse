/**
 * main.js
 *
 * Common routines for controlling the javascript aspect of the BCA user
 * interface. (v 2.0)
 */

var isIE = (document.all); //is browser IE?

var MESmai1 = "Popup window failed to open.  If you have popup blocking\nsoftware running, you will need to disable it in order to view this window.";

/**
 * Determines whether an object is a window object (or at least an object for which the document property is defined)
 */
function isWindow(object)
{
    return typeof(object) != "undefined" && object && (object != null) && (typeof(object.document) != 'undefined');
}

/**
 * Find the window with the given name. This will first try to find the window through the current window's parents. If it doesn't
 * find it this way, it will recursively look through the root window's children
 * 
 * @param name
 *            Name of the window to find
 */
function findWindow(name)
{
    var currentWindow = window;
    var rootWindow = null;
    var i = 0; //prevent any weird infinite loops. Should never happen, but it can't hurt to be safe

    while (rootWindow == null && i < 20)
    {
        if (currentWindow == null)
            return null;

        //quicky return. Most of the time this will happen. The recursive find is for the unusual cases
        if (currentWindow.name == name)
            return currentWindow;

        if (currentWindow == currentWindow.parent)
            rootWindow = currentWindow;
        else
        {
            // in the case of tNow running in an iframe, access is restricted to the parent window object of the iframe window object.
            try {
                // if the  currentWindow is an iframe, accessing the name var will throw a permission exception, otherwise recurse up the hierarchy.
                if ( currentWindow.parent.name != null )
                    currentWindow = currentWindow.parent;
            }
            catch(err) {
                // if this is an iframe, we consider the iframe window object to be the root, no more recursion.
                rootWindow = currentWindow;
            }
        }

        i++;
    } //while

    if (rootWindow != null)
    {
        //time for a recursive find
        return findWindowInChildrenRecursive(name, rootWindow);
    } //if

    return null;
}

/**
 * Recursive helper function for findWindow().
 * 
 * @param name
 *            Name of the window to find
 * @param currentWindow
 *            The current recursive window. This function will recursively check this window and its children, so if you call this
 *            explicitly (i.e. not through findWindow(name)), then make sure you pass in the root window.
 */
function findWindowInChildrenRecursive(name, currentWindow)
{
    try
    {
        //make sure that we're not trying to access a frame outside our domain
        var nameAccessTest = currentWindow.name;
    } //try
    catch(e)
    {
        //we can't look in here (access denied), so return null
        return null;
    } //catch

    if (currentWindow == null)
        return null;
    else if (currentWindow.name == name)
        return currentWindow; //found the answer

    //this isn't the right window. Look through children frames
    var children = currentWindow.frames;

    if (children == null)
        return null;

    var i = 0;
    for (i = 0; i < children.length; i++)
    {
        var nextRecursiveAttempt = findWindowInChildrenRecursive(name, children[i]);
        if (nextRecursiveAttempt != null)
            return nextRecursiveAttempt;
    } //for

    return null;
}

/**
 * Open a new tab.
 * 
 * @param theUrl
 *            URL for new tab.
 * @param name
 *            Title to show in tab.
 * @param initial
 *            (optional) URL to open with the very first time. Note that the page will be set to this URL, and there is not an
 *            immediate redirect to the main URL specified. That URL will be requested the next time the tab is clicked or reloaded.
 * @param isRemoveHistory
 *            it enables not to save url in history of Home2 module, that could be useful if it is required to skip some stages in
 *            going back.
 */
function openView( theUrl, name, initial, isRemoveHistory){

    isRemoveHistory = isRemoveHistory || false;

    var rhsWindow = findWindow('rhs');

    var clearHistory = '';
    if (isRemoveHistory){
        clearHistory = '&clearHistory=' + escape(theUrl);
    }

    if (rhsWindow != null)
    {
        //we found the rhs window. Use the better method for tab opening.
        if (initial != null){
            rhsWindow.location.href = '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&openInitial=' + escape(initial) + '&name=' + encodeURIComponent(name) + clearHistory;
        } else {
            rhsWindow.location.href = '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&name=' + encodeURIComponent(name) + clearHistory;
        }
    }
    else
    {
        //do the original method for tab opening. This is occasionally buggy in IE
        if (initial != null) {
            window.open( '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&openInitial=' + escape(initial) + '&name=' + encodeURIComponent(name) + clearHistory,'rhs');
        } else {
            window.open( '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&name=' + encodeURIComponent(name) + clearHistory, 'rhs');
        }
    }    
}

/**
 * Navigate from an iFrame
 * 
 * @param theURL
 *            the URL to navigate to
 */
function openViewFromIFrame(theURL, requestArgs)
{
    var contentWindow = findWindow('contentWindow');
    
    //ILRN-18995: escaping an undefined value returns and then concatenating
    //that to the string 'url' gives you urlundefined.  we don't want that.
    if(requestArgs)
        theURL += escape(requestArgs);
    
    contentWindow.location.href = theURL;
}

/**
 * Navigate to a URL in the content iFrame
 * 
 * @param theURL
 *            the URL to navigate to
 * 
 */
function openViewInIFrame(theURL, requestArgs)
{
    var contentIFrame = findWindow('contentiFrame');
    
    //ILRN-18995: escaping an undefined value returns and then concatenating
    //that to the string 'url' gives you urlundefined.  we don't want that.
    if(requestArgs)
        theURL += escape(requestArgs);
    
    contentIFrame.location.href = theURL;
}

/**
 * Similar to openView, but only opens a tab if the page says it's ok to
 */
function openViewWithCheck(theUrl, name, initial)
{
    if (isOkToLoadNewPage()) {
        openView(theUrl, name, initial);
    }
}

/**
 * Replace one tab with a different URL.
 * 
 * @param theUrl
 *            New URL to load into tab.
 * @param name
 *            Title to show in new tab.
 * @param old
 *            URL of tab to close.
 * @param initial
 *            (optional) URL to open with the very first time.
 */
function replaceView( theUrl, name, old, initial )
{
    var rhsWindow = findWindow('rhs');

    if (rhsWindow != null)
    {
        //we found the rhs window. Use the better method for tab replacing.
        if (typeof(initial)!='undefined')
            rhsWindow.location.href = '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&openInitial=' + escape(initial) + '&name=' + encodeURIComponent(name) + '&close=' + escape(old);
        else
            rhsWindow.location.href = '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&name=' + encodeURIComponent(name) + '&close=' + escape(old);
    } //if
    else
    {
        //do the original method for tab replacing. This is occasionally buggy in IE
        if (typeof(initial)!='undefined')
            window.open( '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&openInitial=' + escape(initial) + '&name=' + encodeURIComponent(name) + '&close=' + escape(old), 'rhs' );
        else
            window.open( '/ilrn/bca/user/home/rhs?open=' + escape(theUrl) + '&name=' + encodeURIComponent(name) + '&close=' + escape(old), 'rhs' );
    } //else
}

/**
 * Similar to replaceView, but only opens a tab if the page says it's ok to
 */
function replaceViewWithCheck (theUrl, name, old, initial )
{
    if (isOkToLoadNewPage()) {
        replaceView(theUrl, name, old, initial );
    }
}

/**
 * Close a tab.
 * 
 * @param url
 *            URL of tab to close, or "ACTIVE" to close the currently active tab.
 */
function closeView( url )
{
    var rhsWindow = findWindow('rhs');
    if (rhsWindow != null)
    {
        //we found the rhs window. Use the better method for tab closing.
        rhsWindow.location.href = '/ilrn/bca/user/home/rhs?close=' + escape(url);
    }
}

/**
 * Close a tab. Check whether the operation is allowed before closing the page.
 * 
 * @param url
 *            URL of tab to close.
 */
function closeViewWithCheck( url )
{
    if (isOkToLoadNewPage() && isOkToCloseOldPage()) {
        closeView(url);
    }
}

function openUrlWithCheck( url, target ) {
    if (isOkToLoadNewPage()) {
        window.open(url, target || "_self");
    }
}

function openUrlWithCheck2(url, target)
{
    openUrlWithCheck("/ilrn/bca/user/home" + url, target);
}

/**
 * Open help frame
 */
function openHelp( context )
{
    var newUrl = '/ilrn/bca/user/home/?show-help=' + escape( context ) ;
    var helpWindow = window.open(newUrl, 'helpPopup', 'width=640,height=480,resizable=1,top=0,right=100%');
    if (isWindowLocalToMainJS(helpWindow))
        helpWindow.focus()
    else
        alert(MESmai1);
}

/**
 * Close help frame
 */
function closeHelp()
{
    parent.close();
}

/**
 * Opens the paste popup
 */
function openPaste(pasteType, pasteID)
{
    win = window.open("/ilrn/bca/user/paste/target?pasteType="+pasteType+"&pasteID="+pasteID,
        'clipPop', 'toolbar=no,location=no,width=640,height=480,resizable,scrollbars');
    if (isWindowLocalToMainJS(win))
    {
        win.focus();
        return win;
    }
    alert(MESmai1);
}

/**
 * Open Modal window
 * Use only with popup windows that have an internal iframe
 */
function openModal( loc , width , height )
{
    if (navigator.userAgent.indexOf('MSIE')!=-1)
    {
        window.showModalDialog( loc , window ,'dialogWidth:' + width +'px; dialogHeight:' + height +'px; scroll: no; help: no; center: yes; resizable: yes; status: no')
    }
    else
    {
        window.open( loc ,'editScore','width=' + width +',height=' + height +',scrollbars=0,resizable=1,modal=1')
    }
}

/**
 * image pre-loader / mouseover script builder / error handler - 1 function
 *
 * this function pre loads mouseover images
 * and constructs mouseover/mouseout functions from
 * parameters defined in the html.
 * it also creates an onerror event handler which will try to
 * reload the images in 2 seconds if it fails to load the first time.
 * EXAMPLE: <img src="url" overSrc="url" border="0"/>
 * NOTE: overSrc must be defined for outSrc to function
 * if outSrc is not specified, the original src will be used
 */
function processImageEventHandlers()
{
    for ( var i = 0; i < document.images.length; i++ )
    {
        var overSrc = document.images[i].getAttribute( 'overSrc' );
        var outSrc = document.images[i].getAttribute( 'outSrc' );
        var origSrc = document.images[i].getAttribute( 'src' );

        // process mouseover/mouseout handlers
        if ( overSrc != null && overSrc != "" )
        {
            // create mouseover
            document.images[i].onmouseover = new Function ( 'this.src = "' + overSrc +'"' );
            // pre load image
            var x = new Image();
            x.src = overSrc;

            if ( outSrc != null && outSrc != "" )
            {
                // create mouseout using passed parameter
                document.images[i].onmouseout = new Function ( 'this.src = "' + outSrc +'"' );
                // pre load image
                var x = new Image();
                x.src = outSrc;
            }
            else
            {
                // if mouseout doesn't exist - use original src property
                document.images[i].onmouseout = new Function ( 'this.src = "' + origSrc +'"' );
            }
        }

        // process error event handler
        // this will try to reload the image in 2 seconds if it fails to load the first time
        document.images[i].onerror = new Function ( 'setTimeout( "this.src =\'' + origSrc + '\'" , 2000)' );
    }
}

function printWindow() {
    bV = parseInt(navigator.appVersion);
    window.parent.helpText.focus();
    if (bV >= 4) window.print();
}

/**
 * Function to check if it is ok to load a new page, used by tabs, and could
 * be used elsewhere where the user's input could be lost if a page is reloaded.
 *
 * To use, the preUnloadCallback variable (in the same scope as the scope
 * in which the isOkToLoadNewPage function executes) should be set to
 * point to a function that returns a boolean.  If this variable exists
 * and is not null, the function will be called.
 *
 * @return The return value of preUnloadCallback if found, otherwise true.
 */
function isOkToLoadNewPage() {
    try {
        if (typeof(preUnloadCallback) != "undefined" && preUnloadCallback != null) {
            return preUnloadCallback();
        }
        return true;
    }
    catch (e) {
        return true;
    }
}

/**
 * Similar to isOkToLoadNewPage, a function to check if it is ok to close the old page, used by tabs, and could
 * be used elsewhere where the user's input could be lost if a page is closed.
 *
 * To use, the preCloseCallback variable (in the same scope as the scope
 * in which the isOkToLoadNewPage function executes) should be set to
 * point to a function that returns a boolean.  If this variable exists
 * and is not null, the function will be called.
 *
 * @return The return value of preCloseCallback if found, otherwise true.
 */
function isOkToCloseOldPage() {
    try {
        if (typeof(preCloseCallback) != "undefined" && preCloseCallback != null) {
            return preCloseCallback();
        } else {
            return true;
        }
    }
    catch (e) {
        return true;
    }
}

// determine screen resolution on various browsers - 2 functions
// each returns a value in pixels.
function getViewportHeight()
{
    // supported in Mozilla, Opera, and Safari
     if( window.innerHeight )
         return window.innerHeight;
    // supported in standards mode of IE, but not in any other mode
     if( window.document.documentElement.clientHeight )
         return document.documentElement.clientHeight;
    // supported in quirks mode, older versions of IE, and mac IE (anything else).
    return window.document.body.clientHeight;
}

function getViewportWidth()
{
    // supported in Mozilla, Opera, and Safari
     if( window.innerWidth )
         return window.innerWidth;
    // supported in standards mode of IE, but not in any other mode
     if( window.document.documentElement.clientWidth )
         return document.documentElement.clientWidth;
    // supported in quirks mode, older versions of IE, and mac IE (anything else).
    return window.document.body.clientWidth;
}

/*
 * Used to close tabs, this function was refactored out of several xsl files where it was being redefined. This is redeclared in
 * studentScore.xsl for many of the skins.
 */
function closeTab()
{
    if (window.opener)
        window.close();
    else if (parent.opener)
        parent.close();
    else    
        parent.closeView( 'ACTIVE' );
}

// return a hash table of arguments from the query string of the current url - 1 function
// returns null if there are no arguments
function getArgs()
{
    var argHash = new Object();
    var arg, val;
    var tmp = '' + window.location.search;
    // query string present?
    if ( tmp.length > 0 )
    {
       // remove question mark
       if ( tmp.charAt(0) == '?' )
           tmp = tmp.substring( 1 );

       // multiple arguments?
       if ( tmp.indexOf( '&' ) != -1 )
       {
           // break string into pieces
           var tmp2 = tmp.split( '&' );
           for ( var i=0; i < tmp2.length; i++)
           {
               // valid argument?
               if ( tmp2[i].indexOf( '=' ) != -1 )
               {
                    arg = tmp2[i].slice( 0, tmp2[i].indexOf('=') );
                    val = tmp2[i].slice( tmp2[i].indexOf('=')+1 , tmp2[i].length )
               }
               else
               {
                    arg = tmp2[i];
                    val = null;
               }
               argHash[ arg ] = val;
           }
       }
       // single argument
       else
       {
           var tmp2 = tmp.split( '=' );
           argHash[ tmp2[0] ] = tmp2[1];
       }
       return argHash;
    }
    return null;
}

function getQueryString(name)
{
    var strName, strValue;
    var strTemp = window.location.search;
    // query string present?
    if (strTemp.length > 0)
    {
        var arrNames = new Array();
        var arrValues = new Array();

        // remove question mark
        if (strTemp.charAt(0) == "?")
            strTemp = strTemp.substring(1);

        // multiple name-value pairs?
        if (strTemp.indexOf("&") != -1)
        {
            // break string into pieces
            var arrTemp = strTemp.split("&");
            for (i = 0; i < arrTemp.length; ++i)
            {
                // valid name-value pair?
                if (arrTemp[i].indexOf("=") != -1)
                {
                    arrNames[i] = arrTemp[i].slice(0, arrTemp[i].indexOf("="));
                    arrValues[i] = arrTemp[i].slice(arrTemp[i].indexOf("=") + 1, arrTemp[i].length)
                }
                else
                {
                    arrNames[i] = null;
                    arrValues[i] = null;
                }
            }
        }
        // single name-value pair
        else
        {
            arrNames[0] = strTemp.slice(0, strTemp.indexOf("="));
            arrValues[0] = strTemp.slice(strTemp.indexOf("=") + 1, strTemp.length)
        }

        // Find the requested value and return it
        for (i = 0; i < arrNames.length; ++i)
        {
            if (arrNames[i] == name)
            return arrValues[i];
        }
    }
    // If we made it this far, the name-value pair does not exist.  Return null.
    return null;
}

/*
 * A copy of isWindow() , the original of which is found in /js/systemCheck.js. This local copy is here because main.js shows up in
 * so many places (77, to be exact), and I didn't feel it productive to chase down all these instances and make sure that
 * sysCheck.js was included as well, just for a one-line function. So now main.js has its own copy here.
 */
function isWindowLocalToMainJS(object)
{
    return object && (object != null) && (typeof(object.document) != 'undefined');
}

/*
 * use with if-online for urls that have a bunch of stuff to be escaped. url - some url that include the domain. heading - some
 * heading, not sure where this is used. cfg - all the key value pairs that define your new window, for example
 * 'resizable=yes,scrollbars=yes,status=no,width=700,height=450'.
 */
function onlineCheck(url,heading,cfg)
{
    url = escape(url);
    url = url.replace(/\//g,"%2f");
    url = '/ilrn/bca/user/if-online?on=' + url + '&off=%2fplaceholder.html';
    //alert(url + '\n' + heading + '\n' + cfg);
    window.open(url,heading,cfg,'_new');
}

/*
 *  A couple of functions to help with localization. IE can't display localized text through a javascript confirm or alert box,
 * A modal window set up as an alert or a confirm will do the trick, but doesn't exist for non IE browsers. 
 * See slip 23115
*/
function modalAlert(alertMessage)
{
    if (window.showModalDialog)
        window.showModalDialog("/ilrn/accounts/modalAlert.do",alertMessage,"dialogWidth:500px; dialogHeight:200px; center:yes; help:no; resizable:yes; status:no");
    else
        alert(alertMessage);
}

function modalConfirm(confirmMessage)
{
    if (window.showModalDialog)
        return window.showModalDialog("/ilrn/accounts/modalConfirm.do",confirmMessage,"dialogWidth:500px; dialogHeight:200px; center:yes; help:no; resizable:yes; status:no");
    return confirm(confirmMessage)
}

/*
 * Changes display property.
 */
function changeDisplay(div) {
    div.style.display = div.style.display == "none" ? "block" : "none"; 
}

//ILRN-34119, ILRN-34120: need a way to get the topmost window in our app.
function findMyTopWindow(currentWindow)
{
    if(typeof(currentWindow) == 'undefined')
        currentWindow = window;
        
    if(currentWindow == top)
        return currentWindow;

    if(!findMyTopWindow.canAccessContainer(currentWindow))
        return currentWindow;
    
    return findMyTopWindow(currentWindow.parent);
}

findMyTopWindow.canAccessContainer = function(currentWindow)
{
    try
    {
        if(currentWindow.parent.name == null)
            return false;
        
        //seeing strange behavior in IE.  We're going to do these checks manually.
        if(currentWindow.location.host != currentWindow.parent.location.host)
            return false;
            
        if(currentWindow.location.protocol != currentWindow.parent.location.protocol)
            return false;
            
        if(currentWindow.location.port != currentWindow.parent.location.port)
            return false;
            
        return true;
    }
    catch(e)
    {
        //alert("Caught: " + e);
        return false;
    }
}
