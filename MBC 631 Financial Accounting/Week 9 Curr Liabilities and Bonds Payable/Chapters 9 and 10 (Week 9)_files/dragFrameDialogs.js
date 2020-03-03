var dragFrameDragging=false;
var dragFrameIframeBeingDragged="";
var dragFrameIframeCurrent=null;
var dragFrameIframeObjects=new Object();
var dragFrameIframeWindows=new Object();
var dragFrameIframeMouseDownLeft = new Object();
var dragFrameIframeMouseDownTop = new Object();
var dragFramePageMouseDownLeft = new Object();
var dragFramePageMouseDownTop = new Object();
var dragFrameHandles = new Object();
var ZIndexForLinuxFlash=89;
var dragFrameRaiseSelectedIframe=true;
var dragFrameAllowDragOffScreen=false;
var dragFrameScrollPosition = new Object();
var dragFrameStartPosition = null;

// Method to be used by iframe content document to specify what object can be draggable in the window
function addDragFrameHandle(o, win) {
    if (arguments.length==2 && win==window) {
		var p = win;
		while (p = p.parent) {
			if (p.addDragFrameHandle) { 
                p.addDragFrameHandle(o, win, true); 
                return; 
            }
			if (p == win.top) { 
                return;// Already reached the top, stop looking
            }
        }
		return; // If it reaches here, there is no parent with the addDragFrameHandle function defined, so this frame can't be dragged!
    }
	var topRef=win;
	var topRefStr = "window";
	while (topRef.parent && topRef.parent!=window) {
		topRef = topRef.parent;
		topRefStr = topRefStr + ".parent";
    }
	// Add handlers to child window
	if (typeof(win.dragFrameMainHandlersAdded)=="undefined" || !win.dragFrameMainHandlersAdded) {
		with (win) {
			eval("function OnMouseDownHandler(evt) { if(typeof(evt)=='undefined'){evt=event;}"+topRefStr+".parent.dragFrameBeginDrag(evt, "+topRefStr+") }");
			eval("document.onmousedown = OnMouseDownHandler;");
			eval("function OnMouseUpHandler(evt) { if(typeof(evt)=='undefined'){evt=event;}"+topRefStr+".parent.dragFrameEndDrag(evt, "+topRefStr+") }");
			eval("document.onmouseup = OnMouseUpHandler;");
			eval("function OnMouseMoveHandler(evt) { if(typeof(evt)=='undefined'){evt=event;}"+topRefStr+".parent.dragFrameIframeMove(evt, "+topRefStr+") }");
			eval("document.onmousemove = OnMouseMoveHandler;");
            eval("function OnSelectStartHandler(evt) {return false;}");
            eval("document.onselectstart=OnSelectStartHandler;");
			win.dragFrameHandlersAdded = true;
			win.dragFrameMainHandlersAdded = true;
        }
    }
    // Add handler to this window
	if (typeof(window.dragFrameHandlersAdded)!="undefined" || !window.dragFrameHandlersAdded) {
		eval("function OnMouseMoveHandler(evt) { if(typeof(evt)=='undefined'){evt=event;}dragFrameMouseMove(evt, window) }");
		eval("document.onmousemove = OnMouseMoveHandler;");
		window.dragFrameHandlersAdded=true;
    }
	try {
       o.style.cursor="pointer";
    }
    catch (e) {
    }
	var name = dragFrameGetIframeId(topRef);
	if (dragFrameHandles[name]==null) {
		// Initialize relative positions for mouse down events
		dragFrameHandles[name] = new Array();
		dragFrameIframeMouseDownLeft[name] = 0;
		dragFrameIframeMouseDownTop[name] = 0;
		dragFramePageMouseDownLeft[name] = 0;
		dragFramePageMouseDownTop[name] = 0;
    }
	dragFrameHandles[name][dragFrameHandles[name].length] = o;
}

// Generalized function to get an event position 
function dragFrameGetEventPosition(evt) {
	var pos=new Object();
	pos.x=0;
	pos.y=0;
	if (!evt) {
		evt = window.event;
    }
	if (typeof(evt.pageX) == 'number') {
		pos.x = evt.pageX;
		pos.y = evt.pageY;
	}
	else {
		pos.x = evt.clientX;
		pos.y = evt.clientY;
		if (!top.opera) {
			if ((!window.document.compatMode) || (window.document.compatMode == 'BackCompat')) {
				pos.x += window.document.body.scrollLeft;
				pos.y += window.document.body.scrollTop;
			}
			else {
				pos.x += window.document.documentElement.scrollLeft;
				pos.y += window.document.documentElement.scrollTop;
			}
		}
	}
	return pos;
}

// Gets the ID of a frame given a reference to a window object.
// Also stores a reference to the IFRAME object and it's window object
function dragFrameGetIframeId(win) {
	// Loop through the window's IFRAME objects looking for a matching window object
	var iframes = document.getElementsByTagName("IFRAME");
	for (var i=0; i<iframes.length; i++) {
		var o = iframes.item(i);
        var w = null;
        if (o.contentWindow) {
			// For IE5.5 and IE6
			w = o.contentWindow;
        }
		else if (window.frames && window.frames[o.id] && window.frames[o.id].window) {
			w = window.frames[o.id];
        }
		if (w == win) {
			dragFrameIframeWindows[o.id] = win;
			dragFrameIframeObjects[o.id] = o;
			return o.id; 
        }
    }
	return null;
}

// Gets the page x, y coordinates of the iframe (or any object)
function dragFrameGetObjectXY(o) {
	var res = new Object();
	res.x=0; res.y=0;
	if (o != null) {
		res.x = o.style.left.substring(0,o.style.left.indexOf("px"));
		res.y = o.style.top.substring(0,o.style.top.indexOf("px"));
    }
	return res;
}

// Function to get the src element clicked for non-IE browsers
function getSrcElement(e) {
	var tgt = e.target;
	while (tgt.nodeType != 1) { 
        tgt = tgt.parentNode; 
    }
	return tgt;
}

// Check if object clicked is a 'handle' - walk up the node tree if required
function isHandleClicked(handle, objectClicked) {
	if (handle==objectClicked) { 
        return true; 
    }
	while (objectClicked.parentNode != null) {
		if (objectClicked==handle) {
			return true;
        }
		objectClicked = objectClicked.parentNode;
    }
	return false;
}
	
// Called when user clicks an iframe that has a handle in it to begin dragging
var dialogToBringAgain; // for Safari we need to show iframe twice in case of Flash or Applet at background

function dragFrameBeginDrag(e, win) {
	// Get the IFRAME ID that was clicked on
    dragFrameIframeCurrent = win;
	var iframename = dragFrameGetIframeId(win);
	if (iframename==null) { 
        return; 
    }
	// Make sure that this IFRAME has a handle and that the handle was clicked
	if (dragFrameHandles[iframename]==null || dragFrameHandles[iframename].length<1) {
		return;
    }
	var isHandle = false;
	var t = e.srcElement || getSrcElement(e);
    
    var imgDragElement = t;
    while (imgDragElement != null && imgDragElement.id != "imgDrag") {
        imgDragElement = imgDragElement.parentNode;
    }
    if (imgDragElement != null && (imgDragElement.dragDisabled || eval(imgDragElement.dragBlocked))) {
        makeOpaque(iframename);
        var nextIndex = LayerManager.getNextTop();        
        dragFrameIframeObjects[iframename].style.zIndex=nextIndex;
        dialogToBringAgain = iframename;
        setTimeout("dragFrameIframeObjects[dialogToBringAgain].style.zIndex = "+nextIndex, 10);
        return;
    }
    
    for (var i=0; i<dragFrameHandles[iframename].length; i++) {
		if (isHandleClicked(dragFrameHandles[iframename][i],t)) {
			isHandle=true;
			break;
        }
    }
	if (!isHandle) { 
        return false; 
    }
	dragFrameIframeBeingDragged = iframename;
	if (dragFrameRaiseSelectedIframe) {
  	if (dragFrameRaiseSelectedIframe) {
 		if(isFlashObjectOnLinux(dragFrameIframeBeingDragged)){
 			dragFrameIframeObjects[dragFrameIframeBeingDragged].style.zIndex=ZIndexForLinuxFlash;
 	    }else{
 	        dragFrameIframeObjects[dragFrameIframeBeingDragged].style.zIndex=LayerManager.getNextTop();
 		}
      }
    }
    var o = dragFrameGetObjectXY(dragFrameIframeObjects[dragFrameIframeBeingDragged]);
    
    if (!dragFrameDragging) {
    	dragFrameStartPosition = new Array();
   		dragFrameStartPosition.push({x:o.x,y:o.y});
    }
    
	dragFrameDragging=true;
	var pos=dragFrameGetEventPosition(e);
	dragFrameIframeMouseDownLeft[dragFrameIframeBeingDragged] = pos.x;
	dragFrameIframeMouseDownTop[dragFrameIframeBeingDragged] = pos.y;
	
	dragFramePageMouseDownLeft[dragFrameIframeBeingDragged] = o.x - 0 + pos.x;
	dragFramePageMouseDownTop[dragFrameIframeBeingDragged] = o.y -0 + pos.y;
    makeOpaque(dragFrameIframeBeingDragged);
}

// Called when mouse button is released after dragging an iframe
function dragFrameEndDrag(e) {
	var iframename = dragFrameGetIframeId(dragFrameIframeCurrent);
	if (iframename != null && dragFrameIframeBeingDragged != "" && checkForIntersectionWithApplets(iframename)) {
		dragFrameIframeObjects[dragFrameIframeBeingDragged].style.left = dragFrameStartPosition[0].x + "px";
        dragFrameIframeObjects[dragFrameIframeBeingDragged].style.top  = dragFrameStartPosition[0].y + "px";
	}
	dragFrameDragging=false;
	dragFrameIframeBeingDragged="";
    dragFrameIframeCurrent=null;
}

// Called when mouse moves in the main window
function dragFrameMouseMove(e) {
    if (typeof(moveWidgetDialog) != "undefined" && moveWidgetDialog) {
        moveWidgetDialog(e);
    }
}

// Called when mouse moves in the IFRAME window
function dragFrameIframeMove(e, win) {
	if (dragFrameDragging) {
        if (dragFrameIframeCurrent == win) {
            var pos = dragFrameGetEventPosition(e);
            dragFrameDrag(pos.x - dragFrameIframeMouseDownLeft[dragFrameIframeBeingDragged] , pos.y - dragFrameIframeMouseDownTop[dragFrameIframeBeingDragged]);
        }
        else {
            dragFrameEndDrag(null);
        }
    }
}

// Function which actually moves of the iframe object on the screen
function dragFrameDrag(x,y) {
    var frameObject = dragFrameIframeObjects[dragFrameIframeBeingDragged];
	var o = dragFrameGetObjectXY(frameObject);
	// Don't drag it off the top or left of the screen?
	var newPositionX = o.x-0+x;
	var newPositionY = o.y-0+y;
    var dragFlagX = true;
    var dragFlagY = true;
	if (!dragFrameAllowDragOffScreen) {
        if (newPositionX < 0 ||
            newPositionX > frameObject.offsetParent.clientWidth - frameObject.width) {
          dragFlagX = false;
        }
		if (newPositionY < 0 || 
            newPositionY > frameObject.offsetParent.clientHeight - frameObject.height) {
          dragFlagY = false;
        }
        
        if ((o.x <= 0 && newPositionX <= 0 && o.x < newPositionX) || 
            (o.x > 0 && newPositionX > 0 && o.x > newPositionX)) {
          dragFlagX = true;
        }
        if ((o.y <= 0 && newPositionY <= 0 && o.y < newPositionY) ||
            (o.y > 0 && newPositionY > 0 && o.y > newPositionY)) {
          dragFlagY = true;
        }
    }
    if (dragFlagX) {
        frameObject.style.left = newPositionX + "px";
        dragFramePageMouseDownLeft[dragFrameIframeBeingDragged] += x;
    }
    if (dragFlagY) {
        frameObject.style.top  = newPositionY + "px";
        dragFramePageMouseDownTop[dragFrameIframeBeingDragged] += y;
    }
}

function triggerPin(pin) {
    var imgDrag = document.getElementById("imgDrag");
    if(eval(imgDrag.dragBlocked)){
       return;
    }
    if (!pin.down) {
        pin.src = "/media/img/pt/dhtml/pin_down.gif";
        imgDrag.style.cursor = "default";
    } else {
        pin.src = "/media/img/pt/dhtml/pin.gif";
        imgDrag.style.cursor = "pointer";
    }
    imgDrag.dragDisabled = !pin.down;
    pin.down = !pin.down;
}
var browser = navigator.userAgent;

 
 function isFlashObjectOnLinux(id){
    var thisAgent = browser.toLowerCase();
    if(__isGecko()){
        if(thisAgent.indexOf("unix") != -1 || thisAgent.indexOf("linux") != -1){
            if(typeof(window.top.flashObjects) != "undefined"){
                for(var flashObject in window.top.flashObjects) {
                    if(document.getElementById(id).contentWindow.document.getElementById(flashObject) != null){
                        return true;
                    }
                }
            }
        }
    }
 	return false;
 }

function __isGecko() {
    return (__isBrowser() && navigator.appName == "Netscape" && __isDOM());
}

function __isBrowser() {
    return browser != null && browser != "undefined";
}

function __isDOM() {
    return document.getElementById ? true : false;
}

//ILRN-41029: added this duplicate definition of LayerManager (also defined
//in API.js). In the future this JS file will die and so will the duplication.
/*
 * Layer manager is meant to be a generic way to determine what mobile div or iframe is on top
 */
function LayerManager(){}

//old magic number of default layer level
LayerManager.currentTop = 1000;

/*
 * increment top and then return the new value
 */
LayerManager.getNextTop = function()
{
    return  LayerManager.currentTop++;
}
