//this script uses addDisableQuestionFeedbackHandler() from ../takeAssignment/itemStateSubmission.js
//please load itemStateSubmission.js before this one

if( typeof(dialogsJsDefined) == 'undefined' )
{
    var dialogsJsDefined = true;

    var dialogs = new Object();
    var buttons = new Object();
    var buttonsInitialized = new Array();
    var opaquePopups = new Array();
    var boundsOfApplets = null;
    var currentDraggingDialog=null;
    var isDraggingDialog=false;
    var browser = navigator.userAgent;
    var shiftX = 0;
    var shiftY = 0;
    var scrollWidth = 0;
    var scrollHeight = 0;
    var hintDialogs = new Object();
    var hintOffs = 0;
    
    var problemTypesUIDArray = new Array();
    var currentAnswerFieldId = null;
    
    var enableRejoinderEvents = false;
    var forceDisableRejoinderEvents = false;
    
    var prevWindowSize;
    
    var dialogWindowSizeWatchDog = setInterval("dialogWindowSizeWatcher()", 500);
    
    try {
      var dialogsOnLoad = new OnLoadCallback();
      dialogsOnLoad.doOnloadEvent(onloadHandler);
    }
    catch(e)
    {
        //nothing
    }
}

function onloadHandler()
{
    dialogsOnLoad.stop();
    if (boundsOfApplets == null) {
        boundsOfApplets = getBoundsOfApplets();
        initDlgPositions();
        enableRejoinderEvents = false;
        for (var i = 0; i < opaquePopups.length; i++) {
            makeOpaque(opaquePopups[i]);
            if (__isSafari()) {
                _getElem(opaquePopups[i]).style.position = "absolute";
                _getElem(opaquePopups[i]).style.visibility = "hidden";
            } else {
                _getElem(opaquePopups[i]).style.display = "none";
            }
        }
    }
    enableRejoinderEvents = !forceDisableRejoinderEvents;
    setInterval("initDlgPositions()", 200);
}

function dialogFrameLoaded(dialogId)
{
	var dialog = dialogs[dialogId];
	
	if( !dialog.isManualLoad() )
		return;

    initSingleDialogPosition(dialogId, false);
}

function initDlgPositions() {
    for (var id in buttons) {
    
        var dialog = dialogs[id];
        
        if( dialog.isManualLoad() )
            continue;
    
        initSingleDialogPosition(id, true);
    }
    enableRejoinderEvents = !forceDisableRejoinderEvents;
}

function initSingleDialogPosition(id, moveElem)
{
    if( typeof(buttonsInitialized[id]) != 'undefined' )
        return;

    if( !isVisible(_getElem(id).parentNode) )
        return;

    enableRejoinderEvents = false;
    loadById(id);
    buttonsInitialized[id] = id;
    
    if( moveElem )
        moveDlgToItemWrapper(id);
        
    dialogs[id].onload();
}

function findProperDialogWrapper(id)
{
    return _getElem("task_div");
}

function moveDlgToItemWrapper(id)
{
    var itemWrapper = findProperDialogWrapper(id);
    if(itemWrapper)
        itemWrapper.appendChild(_getElem(id));
}

function moveDlgToItemWrapper(id)
{
    var itemWrapper = _getElem("task_div");
    if(itemWrapper)
        itemWrapper.appendChild(_getElem(id));
}

function loadById(id) {
    initDlg(id);
    if (!hintDialogs[id] && checkForIntersectionWithApplets(id)) {
        var iframe = _getElem(id);
        makeOpaque(id);
        __setVisible(id, false);
        var button = _getElem(buttons[id]);
        var top = getY(button) - iframe.height;
        if (top < 0) {
            top = getY(button) + button.height - 6;
        }
        var left = getX(button) + button.width + 4;
        iframe.style.top = top + "px";
        iframe.style.left = left + "px";
    }
    __setVisible(id, false);
}

function isVisible(e) {
  if (!e || typeof(e) == "undefined") {
    return true;
  }
  else if (e.style && (e.style.display == "none" || e.style.visibility== 'hidden')) {
    return false;
  }
  else return isVisible(e.parentNode);
}

function initDlg(id, show)
{
    var iframe = _getElem(id);

    if (!__isSafari()) {
        iframe.style.display = "inline";
        iframe.style.position = "absolute";
    }
    var button = _getElem(buttons[id]);
    var tr_top = _getElem("popup_tr_top_" + id);
    var tr_bottom = _getElem("popup_tr_bottom_" + id);
    if (!show && (tr_top == null || tr_bottom == null)) {
        if (hintDialogs[id]) {
            initHint(id);
        }
        return;
    }
    var doc = iframe.contentWindow.document;
    doc.body.innerHTML = _getElem("div" + id).innerHTML;
    
    var top = calculateTopPx(id);
    
    if( top < 0 )
        top = getY(button) + button.height;
    
    if (__isSafari()) {
        iframe.style.display = "inline";
        iframe.style.position = "absolute";
    }
    doc.body.innerHTML = "";
    var left = calculateLeftPx(id);

    iframe.style.top = top + "px";
    iframe.style.left = left + "px";
    iframe.allowTransparency = true;
}

function fixPosition(id)
{
    var iframe = _getElem(id);
    
    var dialog = dialogs[id];
    var button = _getElem(buttons[id]);
    var isHint = hintDialogs[id];
    var isRejoinder = button != null & !isHint;
    
    //don't do this for things that aren't rejoinders.
    if( !isRejoinder )
        return;
        
    if( dialog.getPinStatus() )
        return;

    var top = calculateTopPx(id);
    var left = calculateLeftPx(id);
    
    if( top < 0 )
    {
        top = getY(button) + button.height;
        
        var tr_bottom = iframe.contentWindow.document.getElementById("popup_tr_bottom_" + id);
        if(tr_bottom)
            tr_bottom.parentNode.removeChild(tr_bottom);
    }
    else
    {
        var tr_top = iframe.contentWindow.document.getElementById("popup_tr_top_" + id);
        if(tr_top)
            tr_top.parentNode.removeChild(tr_top);
    }
    
    iframe.style.top = top + "px";
    iframe.style.left = left + "px";
}

function calculateTopPx(id)
{
    var iframe = _getElem(id);

    var button = _getElem(buttons[id]);
    var tr_top = _getElem("popup_tr_top_" + id);
    var tr_bottom = _getElem("popup_tr_bottom_" + id);
    
    var doc = iframe.contentWindow.document;

    var addHeight = (tr_top == null || tr_bottom == null) ? 20 : 30;
    
    return getY(button) - (doc.getElementById('table_'+id).offsetHeight - addHeight);
}

function calculateLeftPx(id)
{
    var button = _getElem(buttons[id]);
    return getX(button) + button.width - 6;
}

function initHint(id) {
    var iframe = _getElem(id);
    var doc = iframe.contentWindow.document;
    doc.body.innerHTML = "";
    if (__isSafari()) {
        iframe.style.visibility = "hidden";
        iframe.style.position = "absolute";
    } else {
        iframe.style.display = "none";
    }
    iframe.allowTransparency = false;
}

function makeOpaque(id) {
    var iframe = _getElem(id);
    if (iframe.allowTransparency) {
        var tr_top = _getElem("popup_tr_top_" + id);
        var tr_bottom = _getElem("popup_tr_bottom_" + id);
        if (tr_top != null) {
            var deltaY = 20;
            dragFrameIframeMouseDownTop[id] -= deltaY;
            dragFramePageMouseDownTop[id] -= deltaY;
            tr_top.parentNode.removeChild(tr_top);
        }
        if (tr_bottom != null) {
            tr_bottom.parentNode.removeChild(tr_bottom);
        }
        if (typeof(dialogs[id]) != "undefined") {
            iframe.allowTransparency = !dialogs[id].opaqueFlag;
//        _openDialog(id, true);
            _openDialog(id);
        }
    }
}

function addDialog(id, manualLoad) {
	//If dialog is already defined, don't 
	if(!dialogs[id])
	{
	    dialogs[id] = new _Dialog(id, manualLoad);
	}
}

function addOpaquePopup(id) {
    opaquePopups.push(id);
}

function addButton(id, btnId) {
    buttons[id] = btnId;
}

function addDHTMLHint(id) {
    hintDialogs[id] = true;
}

function _Dialog(id, manualLoad) {
  this.id = id;
  this.isDownFlag = false;
  this.forceFlag = false;
  this.isInit = false;
  this.opaqueFlag = true;
  this.rejoinderId = null;

  this.centering = true;
  this.attached = false;
  
  this.loaded = false;
  this.loadActions = new Array();
  this.manualLoad = manualLoad;
  
  this.isManualLoad = function()
  {
      return typeof(this.manualLoad) == 'boolean' && this.manualLoad;
  }
  
  this.onload = function()
  {
      if( this.loaded )
          return;
  
      this.loaded = true;	
      var loadActions = this.loadActions;
      this.loadActions = new Array();
  
      for(var i in loadActions)
      {
          loadActions[i].apply(this);
      }
  };

  this.tryToShow = function (){
  
            if( !this.loaded )
            {
                this.loadActions.push( this.tryToShow );
                return;
            }
  
            if (!this.forceFlag && currentDraggingDialog == null) {
                _openDialog(this.id, this.isInit);
                this.isInit = true;
                if(checkForIntersectionWithApplets(this.id)) {
                  makeOpaque(this.id);
                }
            }
        };
  this.show = function (){
  
            if( !this.loaded )
            {
                this.loadActions.push( this.show );
                return;
            }
             
            this.tryToShow();
            this.forceFlag = true;
            makeOpaque(this.id);
        };
  this.hide = function (){
    __setVisible(this.id, false);
    this.forceFlag = false;
  };
  this.tryToHide = function (){
  
            if( !this.loaded )
            {
                this.loadActions.push( this.tryToHide );
                return;
            }
  
            if (!this.forceFlag)
                this.hide();
        };
  this.mouseUp = function (){
            stopDragDialog();
        };
  this.mouseDown = function (event){
            startDragDialog(event,this.id);
        };
  this.ondrag = function (){
            return false;
        };
  this.setHTML = function (html){
            _getElem('div_' + this.id).innerHTML = html;
        };

    /**
     * Specifies if the dialog should be centered after appearance.
     * @param state True or false.
     */
    this.setCentering = function(state) {
      this.centering = !!state;
  }
  this.setDimensions = function (width, height){
            var maxWidth = 480;
            var maxHeight = 320;
            if (width > maxWidth) {
                _getElem('div_' + this.id).style.width = maxWidth + "px";
                _getElem('div_' + this.id).style.overflowX = "scroll";
                if(__isSafari()){
                    _getElem('div_' + this.id).style.overflow = "scroll";
                }
            }
            if (height > maxHeight) {
                _getElem('div_' + this.id).style.height = maxHeight + "px";
                _getElem('div_' + this.id).style.overflowY = "scroll";
                if(__isSafari()){
                    _getElem('div_' + this.id).style.overflow = "scroll";
                }
            }
        };
  this.isVisible = function() {
    if (this.isInit) {
        if (__isSafari()) {
            return _getElem(this.id).style.visibility == "visible";
        }
        else {
            return _getElem(this.id).style.display == "inline" || _getElem(this.id).style.display == "";
        }
    }
    else {
        return false;
    }
  };
  //==== flaee widget special functions
  this.firstShow = function (){
            this.isInit = true;
            _openDialog(this.id, this.isInit);
            _openDialog = function (id, isInit) {
                var iframe = _getElem(id);
                __setVisible(id, true);
                if(isFlashObjectOnLinux(id)){
                    iframe.style.zIndex=ZIndexForLinuxFlash;
                }else{
                    iframe.style.zIndex=LayerManager.getNextTop();
                 }
                var win = iframe.contentWindow;
                if (!isInit) {
                    var divid = _getElem("div" + id);
                    if (divid == null) {
                        divid = win.document.getElementById("div" + id);
                    }
                    if (divid != null) {
                        win.document.body.innerHTML = divid.innerHTML;
                    }
                }
                // ILRN-35331: copied from original _openDialog() method
                if (typeof(isInit) != "undefined" && !isInit) {
                    win.document.body.innerHTML = _getElem("div" + id).innerHTML;
                    if (hintDialogs[id]) {
                           var dimensions = getElementSize(win.document.getElementById('div_' + id));
                           dialogs[id].setDimensions(dimensions['width'], dimensions['height']);
                        win.document.body.innerHTML = _getElem("div" + id).innerHTML;
                    }
                }
                
                fixPosition(id);

                win.addDragFrameHandle(win.document.getElementById('imgDrag'), win);
                var wintab = win.document.getElementById('table_'+id);
                if (wintab == null) {
                    makeOpaque(id);
                }
                else {
                    iframe.width = wintab.offsetWidth;
                    iframe.height = wintab.offsetHeight;
                }
                if ( !isInit ) {
                    if ( hintDialogs[id] ) {
                        dialogs[id].setCenterPosition();
                    }
                }
            };
            this.w = _getElem(this.id).offsetWidth;
            this.h = _getElem(this.id).offsetHeight;
            this.visible(true);
        };
  this.focusFlaEE = function(){};
  this.visible = function (flag){
            var f = _getElem(this.id);
            var nullSize = 4;
            
            if (flag){
                f.width = this.w;
                f.height = this.h;
                try {
                    this.focusFlaEE();
                } catch (e) {
                    // fix for FF 'attempt to run compile-and-go script on a cleared scope'
                    // this happens when flaee is being reloaded
                }
                __setVisible(this.id, true);
                if (this.id == "widget_container" && !f.contentWindow.document.getElementById('imgDrag').dragDisabled) {
                  this.setCenterPosition();
                }
            }else{
                if (f.width != undefined && f.width != nullSize) this.w = f.width;
                else if (f.offsetWidth != nullSize) this.w = f.offsetWidth;
                if (f.height != undefined && f.height != nullSize) this.h = f.height;
                else if (f.offsetHeight != nullSize) this.w = f.offsetHeight;
                f.width = nullSize;
                f.height = nullSize;             
            }
            f.style.zIndex=LayerManager.getNextTop();
        };
  this.update = function() {
            _openDialog(this.id, true);
        };
  this.setOpaque = function(flag) {
            this.opaqueFlag = flag;
        };
  this.setPosition = function(top, left) {
            var iframe = _getElem(this.id);
            if (top != null && typeof(top) != "undefined") {
                iframe.style.top = top + "px";
            }
            if (left != null && typeof(left) != "undefined") {
                iframe.style.left = left + "px";
            }
        };
  this.getPosition = function() {
            var iframe = _getElem(this.id);
            var top = iframe.style.top.substring(0, iframe.style.top.indexOf("px"));
            var left = iframe.style.left.substring(0, iframe.style.left.indexOf("px"));
            var r_top = 0;
            var r_left = 0;
            if ( left != "" && top != "" ) {
                r_top = parseInt(top);
                r_left = parseInt(left);
            }
            return {"top":r_top, "left":r_left};
        };

   this.unAttachPosition = function(){
	   this.attached = false;
   }     
        
    /**
     * Positions a dialog to given element location and disables dialog centering.
     * @param elemId Specifies an element id.
     * @param bottomLine Specifies if the attachment should be performed relative to dialog bottom side.
     */
    this.attachPositionToElement = function(elemId, bottomLine, fprop, val)
    {
        if (!this.attached)
        {
            this.setCentering(false);
            var elem = _getElem(elemId);
            var ifrm = _getElem(this.id);
            var top = 0;
            var left = 0;
            var obj = elem;
            
            //We do this check(task_div) because task_div has "position:relative".
            //See in take.jsp.
            //Without this, it would go up to body and the result would be off from what we need.
            //TODO: This is totally a hack. But we are going to rework on dialogs using jQuery.
            while(obj.offsetParent && obj != document.getElementById('task_div'))
            {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                
                obj = obj.offsetParent;
            }

            if(bottomLine)
            {
                top -= ifrm.height;
            }
            else
            {
                top += elem.offsetHeight;
            }
            
            this.setPosition(top, left);
            this.attached = true;
        }
    }

    /**
     * Handler for window resize event. Adjusts dialog position based on centering status.
     */
    this.adjustPosition = function() {
        this.setCenterPosition();
    }

    this.setCenterPosition = function() {
      if (!this.centering) {
          return;
      }

      var iframe = _getElem(this.id);
            var height = getWindowSize()['height'];
            var h2 = 0;
            var width = getWindowSize()['width'];
            for (var i = 0; i < problemTypesUIDArray.length; i++) {
              var suffix = problemTypesUIDArray[i];
              var fid = this.id;
              if (fid == "widget_container" && currentAnswerFieldId != null) {
                fid = currentAnswerFieldId;
              }
              if (fid.indexOf(suffix) != -1) {
                if (i == 0) {
                  h2 = 0;
                }
                if (i == problemTypesUIDArray.length - 1) {
                  height = getWindowSize()['height'];
                }
                if (_isNullElem("table-top" + suffix)) {
                  if (i != 0 && !_isNullElem("table-bottom" + problemTypesUIDArray[i - 1])) {
                    h2 = ACGetLocation(_getElem("table-bottom" + problemTypesUIDArray[i - 1])).y;
                  }
                }
                else {
                  h2 = ACGetLocation(_getElem("table-top" + suffix)).y;
                }

                if (_isNullElem("table-bottom" + suffix)) {
                  if (i != problemTypesUIDArray.length - 1 && !_isNullElem("table-top" + problemTypesUIDArray[i + 1])) {
                    height = ACGetLocation(_getElem("table-top" + problemTypesUIDArray[i + 1])).y;
                  }
                }
                else {
                  height = ACGetLocation(_getElem("table-bottom" + suffix)).y;
                }
                break;
              }
            }

            var scrollLeft = getScrollPosition()['left'];
            var scrollTop = getScrollPosition()['top'];
            var top = (height + h2 - iframe.height) / 2 + hintOffs;
            if (top < 0) {
                top = 1;
            }
            if (h2 == 0) {
              top += scrollTop;
            }
            var left = (width - iframe.width) / 2 + hintOffs + scrollLeft;
            hintOffs += 15;
            if ( hintOffs >= 60 ) {
                hintOffs = 0;
            }
            this.setPosition(top, left);
        };
  this.correctSize = function() {
    if (hintDialogs[this.id]) {
      return;
    }
    
    if(_getElem('correctAnswerContainer' + this.id) != null)
        return;

    var minW = 320;
    var minH = 240;
    var maxW = 640;
    var maxH = 480;

    var iframe = _getElem(this.id);
    var width = getWindowSize()['width'];
    var height = getWindowSize()['height'];

    var e = _getElem('div_' + this.id);
    if (typeof(e) != "undefined") {
      if (iframe.width > minW || iframe.height > minH) {
        e.style.width = Math.max(minW, Math.min(maxW, Math.min(iframe.width, width * 0.5))) + "px";
        e.style.height = Math.max(minH, Math.min(maxH, Math.min(iframe.height, height * 0.5))) + "px";
        e.style.overflow = "auto";
        makeOpaque(this.id);
      }
    }
  };
  this.setPinStatus = function(pinFlag) {
    var iframe = _getElem(this.id);
    var win = iframe.contentWindow;
    var pin = win.document.getElementById('imgDragPin');
    var imgDrag = win.document.getElementById('imgDrag');
    if (pinFlag) {
        pin.src = "/media/img/pt/dhtml/pin_down.gif";
        imgDrag.style.cursor = "default";
    } else {
        pin.src = "/media/img/pt/dhtml/pin.gif";
        imgDrag.style.cursor = "pointer";
    }
    imgDrag.dragDisabled = pinFlag;
    pin.down = pinFlag;
  }
  this.getPinStatus = function() {
    var iframe = _getElem(this.id);
    var win = iframe.contentWindow;
    var imgDrag = win.document.getElementById('imgDrag');
    return imgDrag.dragDisabled;
  }
}

function __isSafari() {
  return (__isBrowser() && browser.indexOf("Safari") != -1);
}

function __setVisible(id, visible) {
    if (__isSafari()) {
        _getElem(id).style.visibility = visible ? "visible" : "hidden";
    } else {
        _getElem(id).style.display = visible ? "inline" : "none";
    }
}

//Indicates if the navigator supports DOM.
function __isDOM() {
    return document.getElementById ? true : false;
}

//indicates if the navigator is IE.
function __isIE() {
  return (__isBrowser() && document.all && document.all.item && !(window.opera && __isDOM()));
}

//indicates if the navigator uses gecko engine.
function __isGecko() {
    return (__isBrowser() && navigator.appName == "Netscape" && __isDOM());
}

//indicates if the application is browser.
function __isBrowser() {
    return browser != null && browser != "undefined";
}

function __getScrollLeft() {
  return (__isSafari() || __isIE()) ? 0 : Math.min(document.documentElement.scrollLeft, document.body.scrollLeft);
}

function __getScrollTop() {
  return (__isSafari() || __isIE()) ? 0 : Math.min(document.documentElement.scrollTop, document.body.scrollTop);
}

//performs all operations for dialog drag start.
function startDragDialog(evt,obj_id) {
    currentDraggingDialog=document.getElementById(obj_id);
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (currentDraggingDialog && evt) {
        isDraggingDialog=true;
        shiftX = - currentDraggingDialog.offsetLeft + evt.clientX;
        shiftY = - currentDraggingDialog.offsetTop + evt.clientY;
        document.onmousemove=moveDialog;
        document.onmouseup=stopDrag;
        _initDragArea();
        if (__isGecko()) {
            evt.preventDefault( );
        } else if (__isIE()) {
            evt.returnValue = false;
        }
    }
}
function stopDrag(evt) {
    stopDragDialog();
}
//performs all operations for dialog drag stop.
function stopDragDialog() {
    currentDraggingDialog=null;
    isDraggingDialog=false;
    document.onmousemove = null;
    shiftX = 0;
    shiftY = 0;
}

//moves the dialog.
function moveDialog(evt) {
    if(!isDraggingDialog) return false;
    if(currentDraggingDialog==null) return false;
    enableRejoinderEvents = false;
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        pos_x = evt.clientX - shiftX + __getScrollLeft();
        pos_y = evt.clientY - shiftY + __getScrollTop();

        if(pos_x<0) pos_x=0;
        if(pos_y<0) pos_y=0;
        if (pos_x + currentDraggingDialog.clientWidth > scrollWidth) {
            pos_x = scrollWidth - currentDraggingDialog.clientWidth;
        }
        if (pos_y + currentDraggingDialog.clientHeight > scrollHeight) {
            pos_y = scrollHeight - currentDraggingDialog.clientHeight;
        }
        currentDraggingDialog.style.left=pos_x + 'px';
         currentDraggingDialog.style.top=pos_y + 'px';
    }
    enableRejoinderEvents = !forceDisableRejoinderEvents;
    return false;
}

function _initDragArea() {
    if (__isIE()) {
        scrollWidth = document.body.scrollWidth;
        scrollHeight = document.body.scrollHeight;
    }
    else {
        scrollWidth = document.body.offsetWidth;
        scrollHeight = document.body.offsetHeight;
    }
}

function _initPosition(id) {
    _initDragArea();
    var d = _getElem(id);
    d.style.left = "";
    d.style.top = "";
    d.style.display = 'inline';
    var posX = 0;
    var posY = 0;

    if (d.offsetLeft + d.clientWidth >= scrollWidth ||
            d.offsetTop + d.clientHeight >= scrollHeight) {
        posX = (scrollWidth - d.clientWidth) / 2;
        posY = (scrollHeight - d.clientHeight) / 2;
        d.style.left = posX + 'px';
        d.style.top = posY + 'px';
    }
}

function _getElem(id) {
  return document.getElementById(id);
}

/**
 * Returns cumulative element offset. Taken from prototypejs framework.
 * @param elem Specifies an element.
 */
function _getCumulativeOffset(elem, fprop, val)
{
    var valueT = 0, valueL = 0;
    do {
        valueT += elem.offsetTop || 0;
        valueL += elem.offsetLeft || 0;
        elem = elem.offsetParent;
        
        if (fprop)
        	if (getElementComputedStyle(elem, fprop)==val){
        		break;
        	};
        
    } while (elem);
    return {top: valueT, left: valueL};
}
 
function getElementComputedStyle(elem, prop)
 {
  if (typeof elem!="object") elem = document.getElementById(elem);
  
  // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
  try {
  if (document.defaultView && document.defaultView.getComputedStyle)
  {
    if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  } catch(e){};
  // external stylesheet for Explorer and Opera 9
  try {
  if (elem.currentStyle)
  {
    var i;
    while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
    return elem.currentStyle[prop];
  }
  }catch(e){};
  return "";
 } 

function _isNullElem(id) {
  return _getElem(id) == null || typeof(_getElem(id)) == "undefined";
}

//opens dialog in new window. Necessary when using applets.
function _openDialog(id, isInit) {
    var iframe = _getElem(id);
    
    if (__isSafari()) {
        iframe.style.visibility = "visible";
        iframe.style.display="block";
    } else {
//        iframe.style.display = "inline";
        iframe.style.display = "";
    }
    iframe.style.zIndex=LayerManager.getNextTop();
    var win = iframe.contentWindow;
    if (!isInit) {
        win.document.body.innerHTML = _getElem("div" + id).innerHTML;
        executeScripts(id);
        if (__isSafari()) {
        	win.document.body.innerHTML = _getElem("div" + id).innerHTML;
        }
        if (hintDialogs[id]) {
               var dimensions = getElementSize(win.document.getElementById('div_' + id));
               dialogs[id].setDimensions(dimensions['width'], dimensions['height']);
            win.document.body.innerHTML = _getElem("div" + id).innerHTML;
        }
    }
    
    fixPosition(id);
    
    win.addDragFrameHandle(win.document.getElementById('imgDrag'), win);
    var wintab = win.document.getElementById('table_'+id);
    if (wintab != null) {
        iframe.width = wintab.offsetWidth;
        iframe.height = wintab.offsetHeight;
    }

    if (typeof(isInit) != 'undefined' && !isInit) {
        dialogs[id].correctSize();
        if ( hintDialogs[id] ) {
            dialogs[id].setCenterPosition();
        }
    }  
}

function getX(obj)
{
    if (!obj)
    	return 0;
	
    var result = 0;
    
    if (obj.offsetParent)
    {
         while (obj.offsetParent)
         {
              result += obj.offsetLeft;
              obj = obj.offsetParent;
         }
    }
    else if (obj.x) //for NN
    {
        result = parseInt(obj.x);
    }
    return result;
}

function getY(obj)
{
    if (!obj)
    	return 0;
	
    var result = 0;

    if (obj.offsetParent)
    {
         while (obj.offsetParent)
         {
              result += obj.offsetTop;
              obj = obj.offsetParent;
         }
    }
    else if (obj.y) //for NN
    {
        result = parseInt(obj.y);
    }
    return result;
}

function dump(o, substr)
{
    var st = "";
    for (var n in o) {
        if (substr == null || n.indexOf(substr) != - 1) {
            st += n + " = " + o[n] + "; ";
        }
    }
    alert(st);
}

function dumpNames(o)
{
    var st = "";
    for (var n in o) {
        st += n + "; ";
    }
    alert(st);
}

function getBoundsOfApplets()
{
    var result = new Array();
    var applets = new Array();
    addToArray(applets, document.getElementsByTagName("APPLET"));
//    addToArray(applets, document.getElementsByTagName("INPUT"));
    addToArray(applets, document.getElementsByTagName("OBJECT"));
    addToArray(applets, document.getElementsByTagName("EMBED"));
    addToArray(applets, document.getElementsByTagName("SELECT"));
    for (var i = 0; i < applets.length; i++)
    {
        var a = applets[i];
        result.push({x:getX(a), y:getY(a), w:a.clientWidth, h:a.clientHeight});
    }
    return result;
}

function addToArray(array, items)
{
    for (var i = 0; i < items.length; i++) {
        array.push(items[i]);
    }
}

function checkForIntersectionWithApplets(id)
{
    var obj = _getElem(id);
    var a = {x: getX(obj), y: getY(obj), w: obj.clientWidth, h: obj.clientHeight};
    var intersects = false;
    if (boundsOfApplets != null)
    {
	    for (var i = 0; i < boundsOfApplets.length && !intersects; i++)
	    {
	        var b = boundsOfApplets[i];
	        intersects = hasIntersection(a, b) || hasIntersection(b, a);
	    }
    }
    return intersects;
}

//Checks whether two rectangles has intersection.
function hasIntersection(a, b) {
    var objX2 = a.x + a.w;
    var objY2 = a.y + a.h;
    return pointIn(a.x, a.y, b) || pointIn(objX2, objY2, b) ||
                pointIn(a.x, objY2, b) || pointIn(objX2, a.y, b)
}

function pointIn(x, y, b)
{
    return x >= b.x && y >= b.y && x <= b.x + b.w && y <= b.y + b.h;
}

function getElementSize(element) {
    var myWidth, myHeight;
    if(typeof(element) == 'undefined' || element == null) {
        myWidth = 0;
        myHeight = 0;
    }
    else if(typeof(window.innerWidth) == 'number') {
        //Non-IE
        myWidth = element.offsetWidth;
        myHeight = element.offsetHeight;
    }
    else {
        myWidth = element.clientWidth;
        myHeight = element.clientHeight;
    }
    return {"height":myHeight, "width":myWidth};
}

function getWindowSize() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return {"height":myHeight, "width":myWidth};
}

function dialogWindowSizeProcess(widthOrHeight, leftOrTop, clientWidthOrHeight) {
    var windowSize = getWindowSize()[widthOrHeight];
    var scrollPosition = getScrollPosition()[leftOrTop];
    var toBeRemoved = [];

    for (v in dialogs) {
      var dialog = dialogs[v];
      var elemOnPage = _getElem(v);
      
      /* This can happen when a part of a page is replaced by an ajax call.
       * TODO: Fix SingleAnswer when used via covalent and combination to
       * unregister it's dialogs before being replaced.
       */
       
      if (elemOnPage == null)
      {
          toBeRemoved.push(v);
          continue;
      }
          var elementSize = elemOnPage[clientWidthOrHeight];
          var maxVisiblePosition = windowSize + scrollPosition - elementSize;
          if (dialog.isInit) {
            var dialogPosition = dialog.getPosition();
    
            // if dialog _is not_ fully shown on page
            if (dialogPosition[leftOrTop] > maxVisiblePosition) {
              // if dialog _can_ be fully shown on page (e.g. by moving it)
              if (windowSize + scrollPosition > elementSize) {
                if (widthOrHeight == "width") {
                  dialog.setPosition(dialogPosition["top"], maxVisiblePosition);
                }
                else {
                  dialog.setPosition(maxVisiblePosition, dialogPosition["left"]);
                }
              }
              if(typeof(dialog.id) == "undefined" || dialog.id !="widget_container"){
                makeOpaque(v);
              }
            }
          }
      }
    
    for (var i = 0; i < toBeRemoved.length; i++)
    {
        delete dialogs[toBeRemoved[i]];
    }
}

function dialogWindowSizeWatcher() {
  if (!enableRejoinderEvents) {
    return;
  }
  if (typeof(prevWindowSize) == "undefined") {
    prevWindowSize = dialogGetScrollChanges();
    return;
  }
  var newWindowSize = dialogGetScrollChanges();
  if (prevWindowSize["width"] != newWindowSize["width"]) {
    dialogWindowSizeProcess("width", "left", "clientWidth");
  }
  if (prevWindowSize["height"] != newWindowSize["height"]) {
    dialogWindowSizeProcess("height", "top", "clientHeight");
  }
  prevWindowSize = newWindowSize;
}

function dialogGetScrollChanges() {
    var scrOfX = 0, scrOfY = 0;
    if( document.body && ( document.body.scrollWidth || document.body.scrollHeight ) ) {
        //DOM compliant
        scrOfX = document.body.scrollWidth;
        scrOfY = document.body.scrollHeight;
    } else if( document.documentElement && ( document.documentElement.scrollWidth || document.documentElement.scrollHeight ) ) {
        //IE6 standards compliant mode
        scrOfX = document.documentElement.scrollWidth;
        scrOfY = document.documentElement.scrollHeight;
    }
    return {"width":scrOfX, "height":scrOfY};
}


function getDocumentSize() {
    return {"height":document.body.offsetHeight, "width":document.body.offsetWidth};
}

function getScrollPosition() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return {"top":scrOfY, "left":scrOfX};
}

function executeScripts(id)
{	
	var win = _getElem(id).contentWindow;
    var correctAnswerContainer = win.document.getElementById('correctAnswerContainer' + id);
    
    var needToEvalScripts = correctAnswerContainer != null;
    if(needToEvalScripts)
    {   	
        var scripts = correctAnswerContainer.getElementsByTagName('script');
        for(var i = 0; i < scripts.length; i++)
        {
        	var script = scripts[i];
        	if(script.src)
        	{
        		//TODO: This is for IE. We are appending duplicate script tag at the end.
        		//We should come back to re-work on this.
        		var scriptTag = script.cloneNode(true);
        		win.document.body.appendChild(scriptTag);
        	}
        	else
        	{
        		win.eval(JSUtil.removeWrappingComments(script.innerHTML));
        	}
        }
    }
}