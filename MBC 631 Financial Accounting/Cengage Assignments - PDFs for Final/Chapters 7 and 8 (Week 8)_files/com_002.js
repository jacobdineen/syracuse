// Consolidated JS file assembled at Fri May 19 01:40:24 PDT 2017
// includes the following resources (ILRN-30440):

// /home/bca/tomcat/webapps/media/js/classes/org/hypher/Core.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/ImageRolloverHelper.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/com/thomson/ui/util/ElemBuilder.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/util/ieEmbedFixer.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/com/thomson/OldEventsHelper.js (Thu May 18 11:55:54 PDT 2017)

var _PACKAGE="org.hypher";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/Core.js

/*
 * Hypher.net Javascript Object Library (HJOL)
 * Copyright (C) 2006  Yona Appletree
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * or visit http://www.gnu.org/copyleft/lesser.html
 */

/**
 * This is the core class file of the hypher.net OOP javascript framework.
 * This file is included by default in any page which uses the framework.
 * 
 * The primary use of the file is to define which classes are needed by /everything/.
 * Things like the OOP framework and the basic utility classes.
 * 
 * Also, the core class is defined here, giving access to version info and the
 * like.
 */

/**
 * Core JSOL Classes
 */

//#extends org.hypher.core.Callbacks
//#extends org.hypher.core.Globals
//#extends org.hypher.core.Class
//#extends org.hypher.core.JSObject
//#extends org.hypher.core.OOP
//#extends org.hypher.core.Exception
//#extends org.hypher.core.Reference
//#extends org.hypher.core.extensions.Object
//#extends org.hypher.core.extensions.Function
//#extends org.hypher.core.extensions.String
//#extends org.hypher.core.JSOL

/**
 * Core Utility Classes
 */
//#extends org.hypher.util.WindowUtil
//#extends org.hypher.core.Cookie
//#extends org.hypher.core.Session
//#extends org.hypher.util.CallbackList
//#extends org.hypher.debug.Debug

/**
 * Uh, yeah.
 */
///#import js:util/ieEmbedFixer.js

//#import dwr JSOLService

// The bug fix for the IE memory leak. MUST be called after core.Callbacks and core.extensions.Function
// are defined.
Callbacks.hookEvent(window, "onunload", new Function(""));

function Core() {}
OOP.defineClass(Core);

Core.VERSION = 0.1;
Core.getVersionInfo = function()
{
    return "Hypher.net Javascript Object Library (JSOL) Version: " + Core.VERSION;
}


// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/Core.js

var _PACKAGE="org.hypher.ui.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/ImageRolloverHelper.js

//#extends org.hypher.util.CustomTagger

function ImageRolloverHelper(tagNames)
{
    this.$super(tagNames);
}

OOP.defineClass(ImageRolloverHelper, CustomTagger);

ImageRolloverHelper.prototype.setupElement = function(element)
{
    ImageRolloverHelper.setupElement(element);
}

///////////////////////////////////////////////////////////////////////////////
// Static helper methods

ImageRolloverHelper.setupElements = function(elements)
{
    for (var i=0; i<elements.length; i++)
        ImageRolloverHelper.setupElement(elements[i]);
}

ImageRolloverHelper.setupElement = function(element)
{
    var oversrc = element.getAttribute("oversrc");
    
    if (oversrc && oversrc.length > 0)
        new ImageRolloverHelper.RolloverHandler(element);
}

///////////////////////////////////////////////////////////////////////////////
// RolloverHandler ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

ImageRolloverHelper.RolloverHandler = function RolloverHandler(img)
{
    this.oImage = img;
    
    this.overImage = null;
    this.normalImage = null;
    
    this.hook();
}
ImageRolloverHelper.RolloverHandler.NAME = "RolloverHandler";
ImageRolloverHelper.defineClass(ImageRolloverHelper.RolloverHandler);

/**
 * Registers this handler for the given image. 
 */
ImageRolloverHelper.RolloverHandler.prototype.hook = function()
{
    this.normalImage = new Image();
    
    this.normalImage.src = this.oImage.src + "";
    this.update();
    
    Callbacks.hookEvent(this.oImage, "onmouseover", this.callback("handleMouseOver"));
    Callbacks.hookEvent(this.oImage, "onmouseout", this.callback("handleMouseOut"));
}

/**
 * Updates the internal over image cache if it has changed, and creates it
 * if it was not setup previously.
 */
ImageRolloverHelper.RolloverHandler.prototype.update = function()
{
    var oversrc = this.oImage.getAttribute("oversrc");
    if (!oversrc || oversrc.length < 1)
    {
        this.overImage = null;
    }
    else
    {
        if (this.overImage == null)
            this.overImage = new Image();
            
        if (this.overImage.src != oversrc)
            this.overImage.src = oversrc;
    }
}

/**
 * Unhooks this handler from the image, disabling the rollover. It can be re-enabled
 * by calling RolloverHandler#hook.
 */
ImageRolloverHelper.RolloverHandler.prototype.unhook = function()
{
    Callbacks.unhookEvent(this.oImage, "onmouseover", this.callback("handleMouseOver"));
    Callbacks.unhookEvent(this.oImage, "onmouseout", this.callback("handleMouseOut"));
    
    if (this.normalImage.src)
        this.oImage.src = this.normalImage.src;
}

/**
 * Internal callback for mouseover.
 */
ImageRolloverHelper.RolloverHandler.prototype.handleMouseOver = function()
{
    this.update();
    
    if (this.overImage)
        this.oImage.src = this.overImage.src;
}

/**
 * Internal callback for mouseout.
 */
ImageRolloverHelper.RolloverHandler.prototype.handleMouseOut = function()
{
    if (this.normalImage.src)
        this.oImage.src = this.normalImage.src;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/ImageRolloverHelper.js

var _PACKAGE="com.thomson.ui.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/com/thomson/ui/util/ElemBuilder.js

/* Copyright (c) 2005 Cengage Learning
 * 
 * This is a Cengage javascript class file that uses the HJOL,
 * which can be found in org/hypher at the root of this class structure. 
 */

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!! ATTENTION: Please do not use this class anymore! !!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!! Use org.hypher.ui.util.DOMBuilder instead !!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//#uses org.hypher.ui.util.DOMUtil
//#uses org.hypher.ui.util.ImageRolloverHelper

function ElemTemplate()
{
    this.__elemTemplate = true;
    this.rootNode = DOMUtil.newElement("div");
    this.insertionPoints = new Array;
    this.markPoints = new Array;
}

/**
 * Element Builder Helper Class:
 * This class wraps the process of creating DOM elements.
 * 
 * To use the ElemBuilder, you need to have a parent node where all the new
 * nodes should be appended to. The ElemBuilder can be created as such:
 * new ElemBuilder(parentNode);
 * 
 * Then, methods can be called on the elem builder to create elements or to
 * manipulate the "current" element. Once done with and element, end() should
 * be called on the builder, which will move its current element up one level.
 * 
 * When used in conjunection with javascript's with statement, this class can
 * be used to easily create complex DOM structures in javascript.
 * 
 * Please note that many HTML tags are coded into this helper, but not all of
 * them by any far strech of the imagination. Feel free to add more shortcut
 * methods or just use elem("tagname");
 * 
 * Example of creating a table with a header and some rows of "data":
 * with (new ElemBuilder(document.body))
 * {
 *      table();
 *          // Give this table a light-green background
 *          style("background", "#DDFFDD");
 *          tbody();
 *              tr();
 *                  th();
 *                      text("Header 1");
 *                  end();
 *                  th();
 *                      text("Header 2");
 *                  end();
 *                  th();
 *                      text("Header 3");
 *                  end();
 *              end();
 *              
 *              tr();
 *                  td();
 *                      text("Row 1, Column 1");
 *                  end();
 *                  td();
 *                      text("Row 1, Column 2");
 *                  end();
 *                  td();
 *                      text("Row 1, Column 3");
 *                  end();
 *              end();
 *              tr();
 *                  td();
 *                      text("Row 2, Column 1");
 *                  end();
 *                  td();
 *                      text("Row 2, Column 2");
 *                  end();
 *                  td();
 *                      text("Row 2, Column 3");
 *                  end();
 *              end();
 *              tr();
 *                  td();
 *                      attribute("colspan", "3");
 *                      text("Row 1, All columns");
 *                  end();
 *              end();
 *          end();
 *      end();
 * }
 */
function ElemBuilder(parent)
{
    if (typeof(parent) == "undefined")
        parent = document.body;
    
    this.parent = parent;
    this.curElem = parent;
    this.template = null;
    
    if (parent && parent.__elemTemplate && parent.__elemTemplate != window.undefined && parent.__elemTemplate==true)
    {
        this.template = parent;
        this.parent = this.template.rootNode;
        
        this.mark = ElemBuilder.mark;
        this.insertion = ElemBuilder.insertion;
    }
}

ElemBuilder.mark = function(name)
{
    this.template.markPoints[name] = curElem;
}
ElemBuilder.insertion = function(name)
{
    this.template.insertionPoints[name] = curElem;
}

/***************************************
 * Basic Handlers
 */

/**
 * Adds "px" to the end of a number or string if it is not already on the string.
 * Useful for passing to things like width and height in ElemBuilder.
 */
function px(val)
{
    if (typeof val == "string" && val.substring(val.length-2) == "px")
        return val;
    
    return val + "px";
}

/**
 * Creates an elem of the given type and sets the new elem
 * as the working element.
 * 
 * @param type The type name of the element to create
 */
ElemBuilder.prototype.elem = function(type)
{
    this.curElem = DOMUtil.newElement(type, this.curElem);
}

/**
 * Ends the current element. The current element is set to
 * the parent of the current element.
 */
ElemBuilder.prototype.end = function()
{
    // Skip past elements that have been marked for skipping
    // This allows for auto-generated elements.
    while (this.curElem != this.parent && this.curElem._ebSkip)
        this.curElem = this.curElem.parentNode;
    
    if (this.curElem != this.parent)
        this.curElem = this.curElem.parentNode;
}

/**
 * Sets a named attribute of the current element.
 * 
 * @param name The name of the attribute to set
 * @param value The value to set to the attribute
 */
ElemBuilder.prototype.attr = ElemBuilder.prototype.attribute = function(name, value)
{
    this.curElem.setAttribute(name, value);
}

/**
 * Sets a style attribute of the current element
 * 
 * @param name The name of the style to mutate
 * @param value The new value for the style
 */
ElemBuilder.prototype.style = function(name, value)
{
    // Ensure that the name is actually a string
    if (typeof(name) != "string")
        name = "" + name;
    
    // Translate the style name from xxx-xxx-xxx to xxxXxxXxx
    var i = name.indexOf('-');
    while (i > 0)
    {
        name = name.substring(0, i) + name.substring(i+1, i+2).toUpperCase() + name.substring(i+2, name.length);
        i = name.indexOf('-');
    }
    
    this.curElem.style[name] = value;
}

/**
 * Sets the content of the current element to an HTML string.
 * 
 * @param value The HTML to be set as the content of the current element
 */
ElemBuilder.prototype.text = ElemBuilder.prototype.content = function(value1, value2)
{
    if (this.curElem != null) {
        if (this.curElem.customButton) {
            this.curElem.customButton.setText(value1, value2);
        }
        else {
            this.curElem.innerHTML = value1;
        }
    }
}

var g_shortcutElems = ["table", "tbody", "td", "th", "strong", "em", "big", "small", "a", "div", "span", "hr", "img", "form",
         "select", "option", "textarea", "button", "iframe", "button"];
var g_shortcutAttributes = ["href", "value", "type", "name", "id", "src", "align", "valign", "alt"];
var g_shortcutStyles = ["border", "width", "height", "left", "right", "top", "bottom", "position", "display", "visibility", "zIndex", "margin", "borderLeft", "borderRight", "borderTop", "borderBottom"];
var g_shortcutEvents = ["onclick", "onmouseover", "onmouseout", "onkeyup", "onkeydown", "onkeypress", "onload", "onerror", "onchange"];

for (var i=0; i<g_shortcutElems.length; i++)
    ElemBuilder.prototype[g_shortcutElems[i]] = new Function("this.elem(\""+g_shortcutElems[i]+"\")");

for (var i=0; i<g_shortcutAttributes.length; i++)
    ElemBuilder.prototype[g_shortcutAttributes[i]] = new Function("value", "this.attr(\""+g_shortcutAttributes[i]+"\", value);");

for (var i=0; i<g_shortcutStyles.length; i++)
    ElemBuilder.prototype[g_shortcutStyles[i]] = new Function("value", "this.style(\""+g_shortcutStyles[i]+"\", value);");

for (var i=0; i<g_shortcutEvents.length; i++)
    ElemBuilder.prototype[g_shortcutEvents[i]] = new Function("handler", "hookEventUnattached(this.curElem, \""+g_shortcutEvents[i]+"\", handler);");

ElemBuilder.prototype.cursor = function(value)
{
    if (value == "default")
        this.style("cursor", value);
    else
    {
        this.style("cursor", "pointer");
        this.style("cursor", value);
    }
}
ElemBuilder.prototype.italic = function()
{
    this.elem("i");
}
ElemBuilder.prototype.bold = function()
{
    this.elem("b");
}
ElemBuilder.prototype.underline = function()
{
    this.elem("u");
}

ElemBuilder.prototype.tr = function()
{
    if (this.curElem.nodeName.toLowerCase() != "tbody")
    {
        this.elem("tbody");
        this.curElem._ebSkip = true;
    }
    
    this.elem("tr");
}

ElemBuilder.prototype.input = function(type)
{
    this.curElem = DOMUtil.newInput(type, this.curElem);
}

ElemBuilder.prototype.ilrnButton = function(style, text, overText, labelCssStyle)
{
    if (typeof style == "undefined")
        style = "white";
    
    var cb = new CustomButton(style, this.curElem, text, overText);
    if (labelCssStyle && typeof labelCssStyle != "undefined") {
        cb.labelCssStyle = labelCssStyle;
    }
    cb.render();
    cb.table.customButton = cb;
    
    this.curElem = cb.table;
    
    return cb;
}

ElemBuilder.prototype.colspan = function(val)
{
    this.attr("colspan", val);
    this.curElem.colSpan = val;
}

ElemBuilder.prototype.rowspan = function(val)
{
    this.attr("rowspan", val);
    this.curElem.rowSpan = val;
}

ElemBuilder.prototype.cellpadding = function(val)
{
    this.attr("cellpadding", val);
    this.curElem.cellPadding = val;
}

ElemBuilder.prototype.cellspacing = function(val)
{
    this.attr("cellspacing", val);
    this.curElem.cellSpacing = val;
}

ElemBuilder.prototype.pos = function(x, y)
{
    if (!isNaN(x))
        x = x + "px";
    
    if (!isNaN(y))
        y = y + "px";
    
    this.left(x);
    this.top(y);
}

ElemBuilder.prototype.size = function(width, height)
{
    this.width(width);
    this.height(height);
}

ElemBuilder.prototype.oversrc = function(value)
{
    this.attr("oversrc", value);
    
    ImageRolloverHelper.setupElement(this.curElem);
}

ElemBuilder.prototype.background = ElemBuilder.prototype.bg = function(value)
{
    this.style("background", value);
}

ElemBuilder.prototype.cssClass = ElemBuilder.prototype.className = ElemBuilder.prototype.css = function(value)
{
    this.attribute("class", value);
    this.curElem.className = value;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/com/thomson/ui/util/ElemBuilder.js

var _PACKAGE="util/ieEmbedFixer";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/util/ieEmbedFixer.js

function writeAppletCode(data, id)
{
	if(jQuery) {
		//We already have browser check in java, however, it doesn't work for Covalent Activity currently.
		//Let's just check here as well.
		if(!jQuery.browser.msie) {
			return;
		} 
	}
	
	var container = document.getElementById(id);
	//This shouldn't really be happening.
	//ILRN-53748: Spelling bee items have javascript that replace div that contains embed tag.
	//Execution of that removes embedded div for this code to work.
	//This is to avoid javascript error due to that situation.
	if(!container) {
		return;
	}
	
    var newdiv = document.createElement("div");
    newdiv.innerHTML = data;    
    container.replaceChild(newdiv, container.childNodes[0]); // replace placeholder text
}

function EmbedWriter(tag)
{
    this.tag = tag;
    this.attributeMap = new Object;
    this.paramMap = new Object();
    this.bodyHTML = "";
}

EmbedWriter.prototype.attribute = function(name, value)
{
    this.attributeMap[name] = value;
}

EmbedWriter.prototype.param = function(name, value)
{
    this.paramMap[name] = value;
}

EmbedWriter.prototype.attributes = function(map)
{
    for (var i in map)
        this.attributeMap[i] = map[i];
}

EmbedWriter.prototype.params = function(map)
{
    for (var i in map)
        this.paramMap[i] = map[i];
}

EmbedWriter.prototype.body = function(text)
{
    this.bodyHTML = text;
}

EmbedWriter.prototype.end = function()
{
    var out = "";
    
    out += "<" + this.tag;
    for (var i in this.attributeMap)
    {
        out += " " + i + "=\"";
        var value = this.attributeMap[i]+"";
        value = value.split('"').join("&quot;");
        value = value.split('>').join("&gt;");
        value = value.split('<').join("&lt;");
        out += value + '"';
    }
    out += ">";
    
    out += this.bodyHTML;
    
    for (var i in this.paramMap)
    {
        out += "<param name=\"" + i + "\" value=\"";
        var value = this.paramMap[i]+"";
        value = value.split('"').join("&quot;");
        value = value.split('>').join("&gt;");
        value = value.split('<').join("&lt;");
        out += value + '" \>';
    }
    
    out += "</" + this.tag + ">";
    
    document.write(out);
}

function AppletWriter()
{
    this.$super("applet");
}
AppletWriter.prototype = new EmbedWriter();
AppletWriter.prototype.$super = EmbedWriter;

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/util/ieEmbedFixer.js

var _PACKAGE="com.thomson";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/com/thomson/OldEventsHelper.js

/* Copyright (c) 2005 Cengage Learning
 * 
 * This is a Cengage javascript class file that uses the HJOL,
 * which can be found in org/hypher at the root of this class structure. 
 */

/**
 * This file serves as a bridge between the events.js style of iLrn code
 * and the HJOL. This file includes every function in events.js that was
 * actually being used in iLrn or did not have a JSOL version. Most of
 * the functions have been replaced with aliases to static JSOL methods.
 * 
 * Eventually, this file should be removed and all calls to it's functions
 * should be phased out of iLrn. Any functions that exist here that do not
 * have JSOL equilivents should be added to the approiate JSOL libraries.
 */

/* Copyright (c) 2005 Cengage Learning
 * 
 * This is a Cengage javascript class file that uses the HJOL,
 * which can be found in org/hypher at the root of this class structure. 
 */

//#uses org.hypher.util.StringUtil
//#uses org.hypher.ui.util.DOMUtil
//#uses org.hypher.util.MouseUtil
//#uses com.thomson.ui.util.ElemBuilder
//#uses org.hypher.util.WindowUtil
//#uses org.hypher.ui.util.ImageRolloverHelper
//#uses com.thomson.DWRHelper
//#import js:util/ieEmbedFixer.js

// Tell other files that events.js is actually here, even though its not =P
var g_jsFile_events_js = true;

// Fake the stupid and pointless "Stack" class, as its just an array =P
var Stack = Array;

// Fake the now gone debugMessage
function debugMessage() {}
// Allow old define/extendClass calls
var extendClass = OOP.defineClass;
var defineClass = OOP.defineClass;

// Setup auto rollovers on this page
new ImageRolloverHelper(["img", "input"]);

/**
 * INTERNAL TO EVENTS.JS ONLY.
 * DO NOT CALL FROM ANYWHERE ELSE.
 * 
 * Runs the given function only once.
 * This should be used around all global code in events.js so that it is not executed twice.
 */
function runOnce(code)
{
    code();
}

/*
 * This method checks whether the user is allowed to leave the current page
 * A dialog box will be displayed with the message set in allowExitMessage. 
 * The options in the dialog box are 'ok' and 'cancel' where choosing 'ok' will allow
 * the user to leave the page while choosing 'cancel' will prevent it.
 *
 * Use this JavaScript in a link to trigger this functionality:
 * onclick="callOnExitOk();"
 *
 * @return True if the user is allowed to leave the page, false otherwise.
 */
function callOnExitOk(onOkCallback, excludeForm)
{
    if (jQuery && jQuery.cengage && jQuery.cengage.editSession && jQuery.cengage.editSession.isPageDirty(excludeForm)) 
    {
        okCancelDialog('Warning', callOnExitOk.exitMessage, function(result){
            if(result == 'ok')
            {
                onOkCallback();
            }                        
        });            
    }
    else
    {
        onOkCallback();
    }
}

/*
 * This overrides the default exit message with whatever custom value is
 * passed in.
 *
 * @param message The custom error message to display in the exit
 * confirmation dialog box.
 */
function setAllowExitMessage(message)
{
    callOnExitOk.exitMessage = message;
}

setAllowExitMessage('You are about to leave this page. If you continue, your current changes will not be saved. Would you like to continue and lose your changes?');


/************************************************************************************************************************************
 * UTILITY METHODS ******************************************************************************************************************
 ************************************************************************************************************************************/
/**
 * Checks if the browser is safari.
 * 
 * @return true if this is the safari browser, false otherwise
 */
function isSafari()
{
    return isSafari.checkValue;
}
isSafari.checkValue = navigator.userAgent.match(/Safari/i);

/**
 * Checks if the browser is IE
 * 
 * @return true if this is the evil IE browser, false otherwise
 */
function isIE()
{
    return (navigator.userAgent.indexOf('MSIE')!=-1);
}

/**
 * Checks if the page is loaded.
 * 
 * @return true if the page is loaded, false if the page is still loading or errored
 */
function isPageLoaded()
{
    return WindowUtil.isLoaded();
}

/**
 * Checks if this page is in debug mode.
 * 
 * @return true if the page is in debug mode, false otherwise
 */
function isDebugMode()
{
    return typeof(DEBUG) != "undefined" && DEBUG;
}

/**
 * Gets the current time in miliseconds.
 * 
 * @return The current time in miliseconds.
 */
function getTime()
{
    return (new Date).getTime();
}

/**
 * Trims characters from a string on both ends and returns the result.
 * 
 * @param str The string to trim
 * @parem chars [optional] The characters to trim, defaults to " \t\r\n"
 */
function trim(str, chars)
{
    return str.trim(chars);
}

/**
 * Translates the result of Date.getYear() into the actual year value.
 * The way years are mucked with differs between browers... insane.
 */
function translateDateYear(year)
{
    return TimeUtil.translateDateYear(year);
}


/**
 * Trims characters from the left of a string and returns the result.
 * 
 * @param str The string to trim
 * @parem chars [optional] The characters to trim, defaults to " \t\r\n"
 */
function trimLeft(str, chars)
{
    return str.trimLeft(chars);
}

/**
 * Trims characters from the right of a string and returns the result.
 * 
 * @param str The string to trim
 * @parem chars [optional] The characters to trim, defaults to " \t\r\n"
 */
function trimRight(str, chars)
{
    return str.trimRight(chars);
}

/**
 * Gets all elements on the page whose name in in the given list.
 * Essentially, a wrapper around document.getElementsByTagName that
 * allows for multiple tag names. All elements are returned in one array.
 * 
 * @param names The array of tag namese
 * @return An array of matching elements from the document
 */
var getElementsByTagNames = DOMUtil.getElementsByTagNames;

/**
 * Strips HTML/XML tags from a string.
 * By default, all "good" tags (XML valid tags) are removed, and all invalid tags are included.
 * Such that if you have a string "<i>if (x < 20) { ... } </i>" the returned string will be "if (x < 20) { ... } "
 * rather then "if ( x ". 
 * 
 * 
 * @param html The HTML to strip
 * @param includeGoodTags If true, valid tags will be included.
 * @param includeBadTags If true, invalid tags will be included.
 */
var stripHTML = StringUtil.stripHTML;

/**
 * Sets the selection range of a text box on all browsers which support
 * it.
 */
var setSelectionRange = DOMUtil.setSelectionRange;

/**
 * This is a utility method to get the event object from an event handler
 * in javascript. In IE, the event object is stored in a global variable
 * "event". In mozilla and other sane browsers, it is passed as the first
 * parameter to the event handler.
 * 
 * To use this method, declare your event handler taking one argument. Then,
 * pass the argument to this method, and use what it returns as your event
 * object.
 * 
 * The method will determine if the global event object exists, and, if it does
 * it will use it. Otherwise, it will use the object passed into the function.
 * 
 * Note: The event handling framework declared in this file automactially finds the
 *       event object. Therefore, you should not need this method often.
 * 
 * @param ev An event object, can be null or undefined. Should be the first parameter
 *           passed to an event handler.
 * @return
 *           The event object for the current event. In mozilla this will be <code>ev</code>
 *           in IE, it will be the global event object.
 */
function getEvent(ev)
{
    var e = ev;
    try
    {
        if (event && typeof(ev) == "undefined")
        {
            e = event;
            e.target = e.srcElement;
        }
    }
    catch (x)
    {
    }
    
    return e;
}

/**
 * Checks if one element in the DOM is the parent of another objecct.
 * 
 * @param parentItem The possible parent element
 * @param elem       The possible child element
 * @return true if elem is a child of parentItem, false if not
 */
var isChildElem = DOMUtil.isChildElem;

/**
 * Utility method for working with tables. When working with the DOM in javascript
 * you must add TRs to the tbody tag, not to table.
 * 
 * This method, given a table or a tbody element, will return the tbody element for
 * the given table.
 * 
 * If the given element is a table, it will search for a tbody in the table. If found
 * it will be returned. If not found, a tbody will be created for the element. If the
 * given element is a tbody, it will be returned.
 * 
 * @param oTableElem A table or tbody element.
 * @return a tbody element for the given table.
 */
var getTBody = DOMUtil.getTBody;

/**
 * Creates a DOM element as a child of the given element.
 * Allows initial attributes, as well.
 * 
 * Note: If parent is a DOM element from another frame, this method
 *       will do its best to create the new element using the same document
 *       that the parent was created with.
 * 
 * @param name The name of the element to creates
 * @param attributes A 2-dimension array containing the initial attributes and their values.
 *                   The first dimension should be an array of 2-element arrays. The 1st element
 *                   of the inner array is the name of the attribute, and the second element is
 *                   the value.
 * @param parent     The parent element of the element to create.
 *                  
 */
function createElem(name, attributes, parent)
{
    var attrMap = new Object;
    
    // Convert the dual array type of attributes into a map
    if (attributes && attributes.length)
    {
        for (var i=0; i<attributes.length; i++)
        {
            var attr = attributes[i];
            attrMap[attr[0]] = attr[1];
        }
    }
    else
        attrMap = attributes;
    
    return DOMUtil.newElement(name, parent, attrMap);
}

/**
 * Creates an input with the given type and name.
 * 
 * @param type The type of the input, can be checkbox, radio, text, password, etc...
 * @param name The name of the input
 * @param parent The parent element of the input
 * @return The new input object
 */
function createInput(type, name, parent)
{
    return createElem("input", [["type", type], ["name", name]], parent);
}

/**
 * Creates a TD element  given a parent element (if desired).
 * 
 * @param parent The parent element to append the new element as a child to
 * @return The new TD element
 */
function createTd(parent)
{
    return createElem("td", null, parent);
}

/**
 * Inserts a node after another node in the DOM.
 * 
 * @param nodeToInsert The node to insert
 * @param afterNode The node to insert after
 * @return void
 */
function insertAfter(nodeToInsert, afterNode)
{
    afterNode.insertAfter(nodeToInsert);
}

/**
 * Gets the text entered in a text input box.
 * However, if there is a selection that ends at the end of the content of the box,
 * only the text before the start of the selection will be returned.
 * 
 * This method is used mostly in autocomplete code, see autocomplete.js.
 * 
 * @param inputBox
 * @return The value of the input box before the selection, if any.
 *         If no selection, then the value of the box. 
 */
var getInputTextBeforeSelection = DOMUtil.getInputTextBeforeSelection;

/**
 * Gets the selection information for a text box in IE and Gecko based browsers.
 * In Gecko browsers, the attributes selectionStart and selectionEnd can be used
 * to find the selection range in the text box. In IE, no such values exist.
 * 
 * This method uses a rather hacky method of obtaining the selection start and end
 * on IE. However, it *should* always work (yes, Ed, I know).
 * 
 * This method will return a Range, with a start and end. Also, it will correctly
 * set the selectionStart and selectionEnd attributes for the element.
 * 
 * Note that this WILL NOT WORK ON SAFARI. The KHTML engine does not support getting
 * the selection information from text boxes and areas.
 * 
 * @param box The input box to get selection info from
 * @return A range object with a start and end properties.
 */
var getInputSelectionInfo = DOMUtil.getInputSelectionInfo;

/**
 * Replaces the selected contents of an input or textarea with new contents.
 * This will work on Gecko and IE based browsers. Will not work on Safari and
 * other KHTML deritives.
 * 
 * Note that this function uses some crazy IE hacks to get it to work on IE, and
 * I can't gaurentee that it will work in _all_ cases. Be sure to test well in
 * IE 5.5 and 6.0
 * 
 * @param box The input box element
 * @param newValue The value to replace the selection with
 */
var replaceInputSelection = DOMUtil.replaceInputSelection;

/**
 * Adds a css class to an element if the element does not already have the css class.
 */
var addCSSClass = DOMUtil.addCSSClass;

/**
 * Removes a css class from an element's className.
 */
var removeCSSClass = DOMUtil.removeCSSClass;

/**
 * Gets the absolute position of the given element.
 * 
 * @param obj The object whose position should be calculated
 * @return a Point containing the position of the element
 */
var getElementPosition = Point.fromElementPosition;

/**
 * Creates a TH element given a parent element (if desired).
 * 
 * @param parent The parent element to append the new element as a child to
 * @return the new TH element
 */
function createTh(parent)
{
    return createElem("th", null, parent);
}

/**
 * Creates a Div element given a parent element (if desired).
 * 
 * @param parent The parent element to append the new element as a child to
 * @return the new DIV element
 */
function createDiv(parent)
{
    return createElem("div", null, parent);
}

/**
 * Creates a span element given a parent element (if desired).
 * 
 * @param parent The parent element to append the new element as a child to
 * @return the new SPAN element
 */
function createSpan(parent)
{
    return createElem("span", null, parent);
}

/**
 * Creates a TABLE element given a parent element (if desired).
 * Note: A TBODY must be created in this table before anything can
 * be added to the table. Once the tbody is created, use it to add
 * TRs to the table.
 * 
 * @param parent The parent element to append the new element as a child to
 * @return the new TABLE element
 */
function createTable(parent)
{
    return createElem("table", null, parent);
}

/**
 * Creates a TBODY element given a parent element (if desired).
 * Note: A tbody must be created to add TRs to a table
 * 
 * @param parent The parent element to append the new element as a child to
 * @return the new TBODY element
 */
function createTBody(parent)
{
    return createElem("tbody", null, parent);
}

/**
 * Creates a TR element given a parent. The parent element should be a 
 * TBODY. If no parent is given the TR will not be added to the DOM.
 * 
 * @param parent The parent TBODY to add this TR to.
 * @return The newly created TR
 */
function createTr(parent)
{
    return createElem("tr", null, parent);
}

/**
 * Creates an image element with a given source and parent element.
 * If no parent is given the Image Element will not be added to the DOM.
 * 
 * @param src The URL of the image to display 
 * @param parent The parent element to append the new element to
 * @return The newly created Image Element
 */
function createImg(src, parent)
{
    return createElem("img", [["src", src], ["border", 0]], parent);
}

/**
 * A shortcut to document.getElementById.
 * 
 * @param name The ID of the element to get
 * @return The result of calling document.getElementById(name).
 */
var elem = function(id){return document.getElementById(id);};


/**
 * Debugging utility method to look at the properties of a javascript object.
 * The method, if given an object, will print a list of all properties in the
 * object and their assoiated values and display the list in an alert box.
 * 
 * Additionaly, a search query may be passed as well. If provided, only properties
 * of the object whose names contain the query will be display. The searching
 * is case insensitive.
 * 
 * @param o The object to examine
 * @param substr The property name search string
 * @return void
 */
function alertObj(o, substr)
{
    alert(StringUtil.dumpObject(o, null, null, substr));
}

/**
 * Stores an object for later access.
 * 
 * @param obj The object to store
 * @return An ID that can be used with <code>retriveObject</code> to get the object back.
 */
var storeObject = Callbacks.storeObject;

/**
 * Retrives a stored object given its ID.
 * 
 * @param id The ID of the object to restore
 * @return The stored object, or null if non-existant
 */
var retriveObject = Callbacks.getObject;

/**
 * Removes an object from the global store.
 * 
 * @param id The ID of the object to remove
 * @return void
 */
var unstoreObject = Callbacks.unstoreObject;


/**
 * Parses a "px" number that are often returned by style attributes.
 * 
 * @param value
 *          The px value to parse
 * @return
 *          The numerical value of the given string
 */
var parsePx = StringUtil.parsePx;


/**
 * Given the id of an iframe, this will retrive the document object of the
 * window inside the iframe.
 */
function getIframeDocument(ID)
{
    var iFrame = document.getElementById(ID);
    var data = null;
    
    if (iFrame.contentDocument)
    {
        data = iFrame.contentDocument;
    }
    else if (iFrame.contentWindow)
    {
        // IE 5.5 and 6.x and Firefox/Mozilla/Gecko
        data = iFrame.contentWindow.document;
    }
    else if (document.all)
    {
        // This is a last resort, and may well not work
        // In most cases, if we are here, the iframe does not
        // exist or is not loaded.

        if (document.frames[ID])
            data = document.frames[ID].document;
    }
    return data;
}

/**
 * Given the id of an iframe, this will retrive the window object of the iframe.
 * This method should be used for proper cross-browser compatibility.
 */
function getIframeWindow(ID)
{
    // Handle the case where we get the actual iframe element
    if (typeof(ID) != "string" && ID)
    {
        var id2 = "__tmpIframe_" + (Math.random() * 10000);
        ID.id = id2;
        ID = id2;
    }
    else
    {
        return null;
    }

    var iFrame = document.getElementById(ID);
    var data = null;
    
    if (iFrame.contentWindow)
    {
        // IE 5.5 and 6.x and Firefox/Mozilla/Gecko
        data = iFrame.contentWindow;
    }
    if (document.all)
    {
        // This is a last resort, and may well not work
        // In most cases, if we are here, the iframe does not
        // exist or is not loaded.
        data = document.frames[ID];
    }
    return data;
}

/**
 * Cross-browser method to show or hide an iframe on a page.
 * This method should be used if safari support is desired.
 * 
 * @param iframe The iframe object to hide or show
 * @param show true if the iframe should be shown, false to hide it
 */
function showIFrame(iframe, show)
{
    if (!iframe)
        return;
    
    if (isSafari())
    {
        iframe.style.visibility = show ? "visible" : "hidden";
    }
    else
    {
        iframe.style.display = show ? "" : "none";
        iframe.style.visibility = "visible";
    }
}

/**
 * Checks if an iframe is shown or not, this should be used to make show checking
 * compatiable with Safari.
 * 
 * @param iframe The iframe object to check the shown status of
 * @return true if the frame is shown, false otherwise
 */
function isIFrameShown(iframe)
{
    /*
     * The logic cases for the checked properties of the given iframe:
     * IF Safari THEN
     *  IF shown THEN
     *      style.display should be ""
     *      style.visibility should be "visible"
     *  ELSE
     *      style.display should be ""
     *      style.visibility should be "hidden"
     *  END IF
     * ELSE
     *  IF shown THEN
     *      style.display should be ""
     *      style.visibility should be ""
     *  ELSE
     *      style.display should be "none"
     *      style.visibility should be ""
     * END IF
     * 
     * The following logic works in all cases above.
     */
    return iframe.style.display != "none" && iframe.style.visibility != "hidden";
}

/************************************************************************************************************************************
 * EVENT HANDLING FRAMEWORK *********************************************************************************************************
 ************************************************************************************************************************************/

/**
 * Hooks a method of an object instance to the return of a specific event for an element.
 * 
 * @param oElem
 *          The element to hook the event handler to
 * @param strEventName
 *          The name of the event
 * @param objTarget
 *          The object instance to use to call the callback method
 * @param strCallbackName
 *          The name of the callback method in the object instance
 * 
 * @return
 *          false if the hook failed, true otherwise
 */
var hookEventReturn = Callbacks.hookEvent;

/**
 * Proved a dynamic system for hooking and unhooking multiple event handlers
 * to events of objects in the DOM.
 * 
 * Note that the event handlers are not stand-alone functions, but rather
 * named methods attached to object instances.
 * 
 * When an event handler is called, it is called from the given object instance
 * so that it can use 'this' to access its data.
 * 
 * @param oElem
 *          The element whose event to hook
 * @param strEventName
 *          The name of the event in the element to hook
 * @param objTarget
 *          The object instance containing the event handler
 * @param strCallbackname
 *          The name of the event handling method in the given object instance
 * @return
 *          true if the event hander was hooked, false if there was an error.
 */
var hookEvent = Callbacks.hookEvent;

// Safari HACK: To get safari to recognize window.onload, we MUST define its handler in the HEAD of the page.
// By calling hookEventUnattached on the window.onload, it will declare it.
// Note that while this is not needed on other browsers, it will not cause any harm.
// We also use this now to set the global page load flag correctly
hookEvent(window, "onload", new Function());

/**
 * Like hookEvent, this function hooks an event handler to an event of
 * a DOM object. However, this version hooks a standalone function to
 * the event, rather then a method of an object instance.
 * 
 * @param oElem
 *          The element whose event to hook
 * @param strEventName
 *          The name of the event in the element to hook
 * @param funcHandler
 *          The standalone function to hook to the event
 * @return
 *          true if the event hander was hooked, false if there was an error.
 */
var hookEventUnattached = Callbacks.hookEvent;;

/**
 * Unhooks an event that was hooked to an event by hookEvent
 * Note that unattached events cannot be unhooked at this time.
 * 
 * @param oElem
 *          The element whose event to unhook
 * @param strEventName
 *          The name of the event in the element to unhook
 * @param objTarget
 *          The object instance containing the event handler
 * @param strCallbackname
 *          The name of the event handling method in the given object instance
 * @return
 *          true if the event hander was unhooked, false if there was an error.
 */
var unhookEvent = Callbacks.unhookEvent;

/**
 * Hooks a function to be called when enter is pressed on the given
 * object. This should only be used for valid DOM objects which
 * can accept an onkeypress event.
 * 
 * @param target The event to listen on
 * @param handlerFunction The function to be called when the user presses enter on the element
 * @param allowReturn Defaults to true; if false, values returned from the handler will be ignored. If true, the values will be returned from the event.
 */
function hookEnterPressEvent(target, handlerFunction, allowReturn)
{
    if (!handlerFunction)
        return;
    
    // This crazy if statement tests if the parameter allowReturn is not passed
    // to the function. Trust me.
    if (!allowReturn && (allowReturn != false))
        allowReturn = true;
    
    
    Callbacks.hookEvent(target, "onkeypress", function(ev, t)
            {
                if (ev.keyCode == 13)
                {
                    var ret = handlerFunction(ev, t);
                    if (allowReturn)
                        return ret;
                }
            });
}

/************************************************************************************************************************************
 * EVENT SCHEDULING SYSTEM **********************************************************************************************************
 ************************************************************************************************************************************/


// In case this gets included more then once (which it often does)
var g_futureEvents = [null];

function _dumpFutureEvents()
{
    var report = "<b>" + g_futureEvents.length + " Future Events</b><br/><ul>";
    for (var i=0; i<g_futureEvents.length; i++)
    {
        var fe = g_futureEvents[i];
        if (fe == null)
            continue;
        
        report += "<li><b>"+i+"</b>: " + fe.action + "</li>";
    }
    
    report += "</ul>";
    
    dm(report);
}

/**
 * FutureEvent class -- used for scheduling events that will take place
 * in the future. Provides functionality very similar to setTimeout
 * execpt allows more control over the events.
 */
function FutureEvent(action)
{
    this.action = action;
    this.id = g_futureEvents.length;
    
    this.scheduled = false;
    this.timeoutId = null;
    
    // dm("New future event: " + this.id + ": " + this.action);
    
    g_futureEvents[this.id] = this;
}

/**
 * Executes this event. After calling the action for the event
 * it is removed from the event queue unless rescheduleEvent is called
 * while it is executing.
 */
FutureEvent.prototype.execute = function()
{
    this.scheduled = false;
    this.action();
    
    if (!this.scheduled)
        this.cancel();
}

FutureEvent.prototype.toString = function()
{
    return this.id ? this.id.toString() : "&lt;unscheduled&gt;";
}

/**
 * Schedules this event for execution in timeout miliseconds.
 */
FutureEvent.prototype.schedule = function(timeout)
{
    if (this.scheduled)
        clearTimeout(this.timeoutId);
    else
        this.scheduled = true;
    
    this.timeoutId = setTimeout(callback(this, "execute"), timeout);
}

/**
 * Cancels execution of this event.
 */
FutureEvent.prototype.cancel = function()
{
    if (this.scheduled)
        clearTimeout(this.timeoutId);
    
    g_futureEvents[this.id] = null;

    this.scheduled = false;
    this.action = null;
    this.id = null;
}

/**
 * Gets a future event from it's id number.
 * If obj is a FutureEvent, it is returned
 */
FutureEvent.fromId = function(obj)
{
    if (obj && obj.prototype == FutureEvent.prototype)
        return obj;
    
    return obj ? g_futureEvents[obj.toString()] : null;
}

/**
 * Schedules an event in a given number of milisecons.
 * The event handler should be passed as a function.
 * 
 * @param action The function object to invoke in <code>timeout</code> miliseconds.
 * @param timeout The number of miliseconds to wait before invoking the handler.
 * @return void
 */
function scheduleEventUnattached(action, timeout)
{
    return scheduleEvent(action, timeout);
}

/**
 * Schedules an event in a given number of milisecons.
 * The event handler should be an object and a handler name.
 * 
 * This method has two overloads:
 * @param func The fuction to execute after the timeout
 * @param timeout The timeout
 * 
 * and
 * @param obj The object handle to call a method on
 * @param methodName The name of the method to call after the timeout on the given object
 * @param timeout The timeout
 * 
 * @return A FutureEvent that can be used to control the scheduled event
 */
function scheduleEvent()
{
    var timeout, func;
    
    if (arguments.length == 3)
    {
        func = callback(arguments[0], arguments[1]);
        timeout = arguments[2];
    }
    else if (arguments.length == 2)
    {
        func = arguments[0];
        timeout = arguments[1];
    }
    
    var futureEvent = new FutureEvent(func);
    futureEvent.schedule(timeout);
    
    return futureEvent;
}

/**
 * Reschedules the given event to execute in a given number of miliseconds.
 * This may be called on an event that has either not executed or is currently
 * executing. After execution completes, if rescheduleEvent has not been
 * called on the event, it will be deleted.
 */
function rescheduleEvent(id, timeout)
{
    var futureEvent = FutureEvent.fromId(id);
    
    if (futureEvent != null)
    {
        futureEvent.schedule(timeout);
        return futureEvent.id;
    }
    
    return null;
}

/**
 * Unschedules the given event.
 */
function unscheduleEvent(id)
{
    var futureEvent = FutureEvent.fromId(id);
    
    if (futureEvent != null)
        futureEvent.cancel();
}

/************************************************************************************************************************************
 * EVENT HANDLING SHORTCUTS *********************************************************************************************************
 ************************************************************************************************************************************/

/**
 * Shortcut to hookEventUnattached(window, "onload", ...)
 */
function hookOnloadUnattached(action)
{
    doOnload(action);
}
// Setup aliases
function doOnload(action)
{
    if (isPageLoaded())
    {
        action();
    }
    else
    {
        Callbacks.hookEvent(window, "onload", action);
    }
}
function doOnunload(action)
{
    hookEventUnattached(window, "onunload", action);
}

/**
 * Gets the current scroll position of the docuemnt
 */
function getDocumentScroll()
{
    var pos = new Point();
        pos.x = document.body.scrollLeft;
        pos.y = document.body.scrollTop;
    
    return pos;
}

/**
 * Sets the current scroll position of the docuemnt
 */
function setDocumentScroll(pos)
{
    if (document.documentElement)
    {
        document.documentElement.scrollLeft = pos.x;
        document.documentElement.scrollTop = pos.y;
    }
    
    document.body.scrollLeft = pos.x;
    document.body.scrollTop = pos.y;
    
    
    return pos;
}

/**
 * Escapes a string for use in a URL. Unlike window.escape, this method correctly escapes the '+' character.
 * 
 * @param string The string to escape
 * @return The escaped string
 */
function realEscape(string)
{
    return escape(string).split("+").join("%2B");
}

/**
 * Escapes a string for use in a URL. Unlike window.escape, this method correctly escapes the '+' character.
 * 
 * @param string The string to escape
 * @return The escaped string
 */
function realUnescape(string)
{
    return unescape(string.split("+").join(" "));
}

/**
 * Converts a javascript object into a URL query string (after the ?)
 * 
 * @param args The object to convert
 * @return A string with the translated query string
 */
function convertObjectToQueryString(args)
{
    var argString = "";
    if (typeof(args) == "string" || typeof(args) == "number")
    {
        argString = args;
    }
    else
    {
        for (var i in args)
        {
            var arg = args[i];
            
            if (typeof(arg) == "array" || typeof(arg) == "object")
            {
                for (var j in arg)
                    argString += realEscape(i) + "=" + realEscape(arg[j]) + "&";
            }
            else
                argString += realEscape(i) + "=" + realEscape(arg) + "&";
        }
    }
    
    if (argString.substring(argString.length-1, argString.length) == "&")
        argString = argString.substring(0, argString.length-1);
    
    return argString;
}

/**
 * Appends a query string to a url.
 * 
 * @param url The URL to append to
 * @param queryString The query string to append
 * @return The resultant url.
 */
function appendQueryStringToURL(url, queryString)
{
    if (url.indexOf('?') > 0)
        url += "&" + queryString;
    else
        url += "?" + queryString;
    
    return url;
}



/**
 * TODO: Create a max pool size? More preformence code?
 */
function newHTTPXMLRequestHandler()
{
    var handler = null;
    
    if (window.XMLHttpRequest)
        handler = new XMLHttpRequest();
    else if (window.ActiveXObject)
        handler = new ActiveXObject("Microsoft.XMLHTTP");
    
    return handler;
}

/**
 * Takes an XMLHttpRequest that is done being used and places it back
 * in the connection pool.
 */
function deleteHTTPXMLRequestHandler(handler)
{
}

/**
 * A wrapper for the XMLHttpRequest class.
 * This class provides convience methods for procecssing the request.
 * 
 * Once created, use the send method to actually execute the request.
 * 
 * To be notified when the request has been sent, you should hook onto the
 * events onload and onerror of this object. The callbacks will be send a handle
 * to the instance of HTTPRequest that made the call.
 * 
 * From there, you can access the contentText and/or contentDocument properties
 * of this object.
 * 
 * NOTE: Please use CAUTION when passing false to the async flag. This will cause
 * the send method to BLOCK (i.e. your user cannot interact with the page). Until
 * the request is complete.
 * 
 * @param url The URL to request
 * @param async The asynchronous flag; if true, the request will be preformed in the background.
 *              If false, the request will be blocking.
 */
function HTTPRequest(url, async)
{
    url = "" + url;
    
    this.url = url;
    this.params = null;
    
    var paramIndex = url.indexOf('?');
    if (paramIndex >= 0)
    {
        this.params = url.substring(paramIndex + 1);
        this.url = url.substring(0, paramIndex);
    }
    
    this.async = async;
    this.request = null;
    this.onerror = null;
    this.onload = null;
    this.objId = -1;
    
    this.contentText = null;
    this.contentDocument = null;
    
    this.status = 0;
    this.message = "";
}

/**
 * Called when the state of the internal request object changes.
 */
HTTPRequest.prototype.onStateChange = function()
{
    // Check if the page is loaded
    // The value 4 means that this has happened, isn't that great?
    if (this.request.readyState == 4)
    {
        delete this.request.onreadystatechange;
        this.handleLoad();
    }
}

/**
 * Called when the internal request has completed.
 * Sets up the content properties and calls the completion
 * callback. 
 */
HTTPRequest.prototype.handleLoad = function()
{
    if (this.request == null)
        return;
    
    this.status = this.request.status;
    this.message = this.request.statusText;
    
    this.contentDocument = this.request.responseXML;
    this.contentText = this.request.responseText;
    
    // Check the HTTP Status Code to see if we are loaded.
    // The numerical value of the HTTP_OK code is 200.
    if (this.status == 200)
    {
        if (this.onload)
            this.onload(this);
    }
    else
    {
        if (this.onerror)
            this.onerror(this);
    }
    
    delete this.request;
    this.request = null;
}
/**
 * Actually sends the request.
 * 
 * If this request is blocking then this method will block until it receives
 * a response from the given URI. The return value will be the content of the
 * loaded URI.
 * 
 * If the request is non-block, it will return true if the request
 * was sent or false if the browser does not support XMLHttpRequest.
 * 
 * @return If non-blocking: true if the request was sent, false if the browser does not support XMLHttpRequest.
 *         If blocking:     The content of the response.
 */
HTTPRequest.prototype.send = function()
{
    this.request = newHTTPXMLRequestHandler();
    
    if (this.request == null)
        return false;

    this.objId = storeObject(this);
    
    /*
     * Create a string based handler for the ready change event with our global object id so that
     * the handler can tell us when things happen.
     */
    var requestRef = this;
    this.request.onreadystatechange = function()
    {
        requestRef.onStateChange();
    }
        
    this.request.open("POST", this.url, this.async);
    this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    if (typeof this.request.overrideMimeType == "function")
        this.request.overrideMimeType('text/xml');

    /**
     * Send the request!
     */
    this.request.send(this.params);
    
    // If the request has been completed (i.e. the request was in async mode)
    // return the content text. If it has not been completed, return true to indicate
    // that we are proceeding.
    if (!this.async)
    {
        this.handleLoad();
        return this.request.responseText;
    }
    else
        return true;
}

/**
 * Sends an HTTP request to the given URL. The url must be in the same domain
 * as what <code>getLocation()</code> would return.
 * 
 * @param url The URL to load
 * @param onload The callback to call when the request is completed
 * @param onerror The callaback to call if the request fails
 */
function sendHTTPRequest(url, onload, onerror)
{
    // Create the request to the server, in asynchronous mode
    var request = new HTTPRequest(url, true);
    
    // If we have an onload callback, hook it
    if (typeof(onload) != "undefined")
    {
        hookEventUnattached(request, "onload", onload);
        
        // If we have an onerror callback, hook it
        if (typeof(onerror) != "undefined")
        {
            hookEventUnattached(request, "onerror", onerror);
        }
    }
    
    request.send();
}

/**
 * Sets the location of document, checking if the page has changed and alerting the user accordingly
 */
function setLocationConfirm(location)
{
     callOnExitOk(function(){
        self.location = location;
    });
}

/**
 * Gets the current browser location.
 */
function getLocation()
{
    return window.location;
}

/**
 * Scrolls the given document to a specific element.
 * This function will do its best to scroll the window so that the given element is either in the center
 * of the window or the top of the window. However, it will only scroll on the y axis, not the x axis.
 * 
 * @param element The element to scroll to
 * @param position The position to scroll the element to -- must be either "top" or "middle"
 * @param doc The document to scroll. Uses "document" by default.
 * @return void
 */
var scrollToElement = DOMUtil.scrollToElement;

function _doCall(func, args)
{
    func.apply(null, args);
}

function _doCallback(obj, method, args)
{
    obj[method].apply(obj, args);
}

var callback = Callbacks.instanceCallback;

/**
 * Gets the size of the browser's viewport as a Point object.
 * 
 * @return
 *      The size of the usable client area in the browser window as a Point object.
 *      x contains the width
 *      y contains the height
 */
var getViewportSize = DOMUtil.getViewportSize;

var removeElem = DOMUtil.deleteElement;

function formatPercent(value, dots)
{
    if (dots == window.undefined)
        dots = 2;
    
    return formatFloat(value, 2) + "%";
}

/**
 * Escapes a string to be displayed as HTML by converting carets and anpercands
 * to the HTML escaped values. Also converts linebreaks to <br> tags for proper
 * display.
 * 
 * @param html The HTML to escape
 * @return The escaped HTML
 */
function escapeHTML(html, convertLineBreaks)
{
    return StringUtil.escapeHTML(html, convertLineBreaks);
}

function formatFloat(number, places)
{
    return StringUtil.formatFloat(number, 0, places);
}

function padNumber(number, len)
{
    number = number + "";
    while (number.length < len)
        number = "0" + number;
    
    return number;
}

/**
 * Format a number of bytes into a number between 1 and 1024, followed by
 * units.
 * @param size The size, in bytes, to be formatted.
 * @return A string containing the formatted size, followed by a space,
 * followed by a one or two letter abbreviation indicating the units in 
 * which the size is expressed: 
 * "B" for bytes, 
 * "KB" for kilobytes, 
 * "MB" for megabytes, 
 * "GB" for gigabytes, or
 * "TB" for terabytes.
 */
function formatFileSize(size)
{
    var unitsList = ["B", "KB", "MB", "GB", "TB"];

    var unitsIndex = 0;
    while (size >= 1024 && unitsIndex < unitsList.length)
    {
        size /= 1024;
        unitsIndex++;
    }
    
    return formatFloat(size, 2) + " " + unitsList[unitsIndex];
}

/**
 * Parses a boolean value from a string.
 * 
 * @param string The string to parse.
 * @return true If the string is "yes", "1" or "true". false otherwise.
 */
var parseBool = StringUtil.parseBool;

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/com/thomson/OldEventsHelper.js

