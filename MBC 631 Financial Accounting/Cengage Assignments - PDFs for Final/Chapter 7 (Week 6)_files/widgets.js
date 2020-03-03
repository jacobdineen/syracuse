var answers = new Object();
var answerParts = new Object();
var answerOk = 0;

var hintsArray = new Array();

var globalOffsetHeader = 17;

function widgetInit(offsetHeader) {
    globalOffsetHeader = offsetHeader;
}

function addHint(hint) {
    hintsArray[hintsArray.length] = hint; 
}

var isIE = navigator.userAgent.indexOf("MSIE") != -1;
var isInternetExplorer = navigator.appName.indexOf("Microsoft") != -1;

var shapeElements = new Array();

var ie = document.all;

var dragapproved = false;
var mx, my;
var mx0, my0;
var z,x,y;
var zIndex = 1;
var hintNum = -1;

//overlay elements which result in mouse position coordinates relative to themselfs.
var overlayElements = new Array("OPTION", "SELECT");

function prevHint() {
    hintNum--;
    if (hintNum < 0) {
        hintNum = 0;
    }
    document.getElementById("hints_").innerHTML = hintsArray[hintNum];
}

function nextHint() {
    hintNum++;
    if (hintNum >= hints.length ) {
        hintNum = hints.length - 1;
    }
    document.getElementById("hints_").innerHTML = hintsArray[hintNum];
}

function resize_flaee_widget(w, h) {
    resize_flaee("flaee_widget", w, h);
}

function resize_flaee(id, w, h) {
    var e = document.getElementById(id);
    w = Math.round((w < 0 ? 12 : w)*1.0 + 1);
    h = Math.round((h < 0 ? 12 : h)*1.0 + 1);
    if (e && e.width){
        e.width = w;
        e.height = h;
        e.style.width = w + "px";
        e.style.height = h + "px";
    }
}

function resizeTab(e,w,h) {
    e.style.height = (h - 48) + "px";
    e.style.width = (w - 36) + "px";

    e = e.parentNode;
    e.style.height = (h - 13 - globalOffsetHeader) + "px";
    e.style.width = (w - 4) + "px";
}

function moveWidgetDialog(e) {
    var evt = e || event;
    var target = evt.target || evt.srcElement;
    if (target && typeof target != 'undefined' && containsOverlayElements(target.nodeName)) {
        mx = mx0;
        my = my0;
    } else {
        mx = evt.clientX;
        my = evt.clientY;
        mx0 = mx;
        my0 = my;
    }
    if (dragapproved) {
        z.style.left = temp1 + evt.clientX - x + "px";
        z.style.top = temp2 + evt.clientY - y + "px";
        return false;
    }
}

var contNum = 0;
var clickFlag = false;
var firedobj = null;

function drags(e) {
    var evt = e || event;
    if (firedobj == null) {
        firedobj = evt.target || evt.srcElement;
    }
    if (firedobj && (firedobj.nodeName != "DIV" || firedobj.id == "hints_")) {
        resetDragInfo();
        return true;
    }

    //TODO: this method can spit javascript errors to console if mousedown or click has been registered in other js
    while (firedobj && firedobj.nodeName != "BODY" && firedobj.className != "drag") {
        firedobj = firedobj.parentNode || firedobj.parentElement;
    }
    if (firedobj && firedobj.className == "drag" ) {
        x = evt.clientX;
        y = evt.clientY;

        var shapeFound = false;
        var els = firedobj.getElementsByTagName("div");

        for (var i = 0; i < els.length; i++) {
            var cx = parseInt(firedobj.style.left + 0);
            var cy = parseInt(firedobj.style.top + 0);

            if (els[i].className == "gr") {
                var X = parseInt(els[i].style.left + 0) + cx;
                var Y = parseInt(els[i].style.top + 0) + cy;
                var W = parseInt(els[i].style.width + 0);
                var H = parseInt(els[i].style.height + 0);
                if (x >= X && y >= Y && x <= X + W && y <= Y + H) {
                    shapeFound = true;
                    break;
                }
            }
        }

        if (!shapeFound) {
            if (firedobj == shapeElements[contNum]) {
                contNum++;
            }

            if (contNum < shapeElements.length) {
                firedobj = shapeElements[contNum++];
                drags(e);
            }

            resetDragInfo();
            return false;
        }

        dragapproved = true;
        z = firedobj;
        resetDragInfo();
        temp1 = parseInt(z.style.left + 0);
        temp2 = parseInt(z.style.top + 0);
        return false;
    }
}

document.onmousemove = moveWidgetDialog;
document.onmousedown = drags;
document.onmouseup = new Function("dragapproved = false;");

function resetDragInfo() {
    firedobj = null;
    contNum = 0;
}

var els = document.getElementsByTagName("div");
for (var i=0; i < els.length; i++) {
    if (els[i].className == "drag") {
        shapeElements[shapeElements.length] = els[i];
    }
}

function closeWidget() {
   dialogs["widget_container"].visible(false);
}

function getAnswerFromField(id) {
    var answer = answers[id];
    if (typeof(answer) == "undefined") {
        answer = null;
    }
    else {
      answer = replaceAll(answer, "&amp;", "&");
    }
    return answer;
}

function replaceAll(str, rgExp, rText) {
    while (str.search(rgExp) != -1)
        str = str.replace(rgExp, rText);
    return str;
}

function popUpWidget() {    
    var container = document.getElementById('widget_container');
    if (container) {
        var flaeeWidget;
        if (container.contentWindow
            && container.contentWindow.flaeeWidgetLoaded

            // todo: possible redundant checks
            && container.contentWindow.document
            && (flaeeWidget = container.contentWindow.document.getElementById('flaee_widget'))) {
            flaeeWidget.className = '';

            var dialog = dialogs["widget_container"];

            dialog.visible(true);
            dialog.update();

            document.getElementById("widget_container").style.display='';
        } else {
            !!window.console && console.log("Waiting for widget to load...");
            setTimeout(popUpWidget, 100);
        }
    }
}

// Handle all the FSCommand messages in a Flash movie.
function flaee_widget_DoFSCommand(command, args) {
    //console.log('flaee_widget_DoFSCommand: ' + command + ": " + args);
    if (typeof window[command] == 'function') {
        window[command].apply(this, (args || "").split('|||'));
    }
}

// this is needed 'cause flash plugin
// doesn't dispatch mouse events if something with
// overflow:scroll or auto is _under_ it (dunno why)
function fixOverflow(isOpen) {
    var els = openElement.getElementsByTagName("DIV");
    for (var i = 0; i < els.length; i++) {
        if (els[i].id == "hints_") {
            els[i].style.overflow = isOpen ? "auto" : "hidden";
        }
    }
}

function sendAnswerPart(id, ans_str, partNum, partsNum)
{
    if (typeof(answerParts[id]) == "undefined") {
      answerParts[id] = new Object();
    }
    answerParts[id][partNum] = ans_str;
    var isComplete = true;
    var answer = "";
    for (var i = 0; i < partsNum; i++) {
        if (answerParts[id][i] == null || answerParts[id][i] == "") {
            isComplete = false;
            break;
        }
        else {
          answer += answerParts[id][i];
        }
    }
    if (isComplete) {
        answers[id] = answer;
    }
}

function sendAnswer(swfID, answer)
{
    answers[swfID.replace(/(^\"|\"$)/g, "")] = answer.replace(/(^\"|\"$)/g, "");
}

//==== macromedia fscommand standard code
var command = null;
var args = null;

// Handle all the FSCommand messages in a Flash movie.
function DoFSCommand(command, args) {
    //==== sendAnswer
    //console.log('widgets.js.DoFSCommand: ' + command + ": " + args);
    var argsArr = (args || "").split('|||');
    for (var i = 0; i < argsArr.length; i++) {
        argsArr[i] = argsArr[i].replace(/(^\"|\"$)/g, "");
    }
    // ILRN-40289: some flash code is sending spurious call to showmenu on 1st call after clearing cache 
    if (typeof window[command] == 'function' && command != 'showmenu')
    {
        window[command].apply(this, argsArr);
    }
    
    //alert("done");
}

function addEntryForFSCommand(vsuffix) {
    if (isInternetExplorer &&
        navigator.userAgent.indexOf("Windows") != -1 &&
        navigator.userAgent.indexOf("Windows 3.1") == -1) {
        document.write('<scr'+'ipt language="VBScript">\n');
        document.write('On Error Resume Next\n');
        document.write('Sub entry' + vsuffix + '_FSCommand(ByVal command, ByVal args)\n');
        document.write('	Call DoFSCommand(command, args)\n');
        document.write('End Sub\n');
        document.write('</scr'+'ipt>\n');
    }
}

//utility  function to check whether  the element is defined.
function elementIsDefined(element) {
    return typeof element != 'undefined' && element != null;
}

//Contains element function.
function containsOverlayElements(nodeName) {
  var containsOverlayFlag = false;
  for (var i in overlayElements) {
    if (overlayElements[i] == nodeName) {
        containsOverlayFlag = true;
        break;
    }
  }
  return containsOverlayFlag;
}
