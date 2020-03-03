// Consolidated JS file assembled at Fri May 19 01:22:57 PDT 2017
// includes the following resources (ILRN-30440):

// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Callbacks.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Globals.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Class.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSObject.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/OOP.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Exception.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Reference.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Object.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Function.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/String.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSOL.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/WindowUtil.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Cookie.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/ObjectWriter.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/JSSyntaxObjectWriter.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Session.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CallbackList.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/DataUpdateManager.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/StringUtil.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Point.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Rect.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CustomTagger.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/JSWTInjector.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/Canvas.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMUtil.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/MouseUtil.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DragHelper.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMBuilder.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/PositionWatchDog.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/system/SystemInfo.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/IE6Layers.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingCanvas.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/BitSet.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/controls/ImageButton.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/message/UIMessage.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingWindow.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/DebugWindow.js (Thu May 18 11:55:54 PDT 2017)
// /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/Debug.js (Thu May 18 11:55:54 PDT 2017)

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Callbacks.js

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
 * Core Callback Utilities:
 * 
 * Callbacks is the lowest level of the javascript library, providing methods
 * for createing instance callback functions, storing objects in the window's object
 * store, hooking events, etc...
 *
 * The code here should be very careful not to create any closures with incomming
 * objects as the majority of the uses of this code involve DOM objects.
 */

if (typeof(__included_Callbacks_js) == "undefined") {
__included_Callbacks_js = true;
(function() {

function Callbacks() {}
Callbacks.objStore = [null];
Callbacks.nullFunction = new Function("");

/**
 * Helper method to have a function or method fire when the page loads.
 * 
 * Arguments can be either a function or an object and a method name or
 * function to call on the object.
 */
Callbacks.doOnload = function(a1, a2)
{
    if (typeof WindowUtil != "undefined" && WindowUtil.isLoaded())
    {
        if (a2)
            Callbacks.instanceCallback(a1, a2)();
        else
            a1();
    }
    else
        Callbacks.hookEvent(window, "onload", a1, a2);
}

/**
 * Hooks a function or method to an event in a given object.
 * If the object defines the event name as a callback list (the standard
 * method for defined events), the given callback will be added to the list.
 * 
 * If the event is not defined, it will be added as an "ad-hoc" event handler,
 * creating a function for the given event name, which, when called, will fire
 * all the callbacks registered.
 * 
 * Note that if a function is given, it will be executed within the context
 * of the <code>target</code> object.
 * 
 * @param target
 *                  The target object whose event to hook
 * @param eventName
 *                  The name of the event to hook
 * @param cb1,cb2
 *                  Either a single function or an object and a method name or method function.          
 */
Callbacks.hookEvent = function(target, eventName, cb1, cb2)
{
    var callback;
    
    if (!target || !eventName)
        return;
    
    if (!cb2)
    {
        if (typeof(cb1) == "function")
            callback = cb1.closure();
        else if (typeof(cb1) == "object")
            callback = Callbacks.instanceCallback(cb1, eventName);
        else
            throw "Callbacks.hookEvent: Must pass either a function or an object as third parameter.";
    }
    else
    {
        callback = Callbacks.instanceCallback(cb1, cb2);
    }
    
    if (typeof(target[eventName]) != "undefined" && OOP.isInstanceOf(target[eventName], "CallbackList"))
        target[eventName].add(callback);
    else
    {
        var list = target["_callbacks_" + eventName];
        if (!list)
        {
            list = target["_callbacks_" + eventName] = new Array;
            if (target[eventName])
                list.push(target[eventName]);
            
            target[eventName] = new Function("return window['Callbacks']?Callbacks.hookEvent.runEvent(this._callbacks_"+eventName+", arguments, this, \""+eventName+"\"):null;");
        }
        
        var found = false;
        for (var i in list)
        {
            if (list[i] == callback || (callback.equals && callback.equals(list[i])))
            {
                found = true;
                break;
            }
        }
        
        if (!found)
            list.push(callback);
    }
}

/**
 * Unhooks an event attached to an event with <code>Callbacks.hookEvent</code>
 * 
 * @param target
 *                  The target object whose event to unhook
 * @param eventName
 *                  The name of the event to unhook
 * @param cb1,cb2
 *                  Either a single function or an object and a method name or method function.          
 */
Callbacks.unhookEvent = function(target, eventName, cb1, cb2)
{
    var callback = cb2 ? Callbacks.instanceCallback(cb1, cb2) : cb1;
    
    if (OOP.isInstanceOf(target[eventName], "CallbackList"))
        target[eventName].remove(callback);
    else
    {
        var list = target["_callbacks_" + eventName];
        if (list)
        {
            for (var i in list)
            {
                if (list[i] && list[i].equals(callback))
                    list[i] = null;
            }
        }
    }
}

/**
 * PRIVATE:
 * 
 * Runs an event callback list for an object.
 */
Callbacks.hookEvent.runEvent = function(callbackList, args, obj, eventName)
{
    if (!args || args.length < 1)
    {
		// If we have no arguments, provide defaults. This usually happens only in IE
		// and we want it to emulate mozilla so we pass the event and the object being
		// invoked.
        args = [window.event, obj];
        
		// If we have a window.event, then we need to set some properties to make it consistent
		// with mozilla.
        if (args[0])
        {
            try
            {
                args[0].target = window.event.srcElement;                
                if (window.event.which)
                    args[0].keyCode = window.event.which;
            }
            catch (X)
            {
                /* Sometimes, IE is not too happy about us chanign the keyCode of the event. Damn IE. Nothing we can do about it. */
            }
        }
    }
    else
    {
        var nargs = [];
        for (var i=0; i<args.length; i++)
            nargs[i] = args[i];
        nargs.push(obj);
        args = nargs;
    }
    
    var result;
    
    for (var i in callbackList)
    {
        var runner = callbackList[i];
        if (!runner)
            continue;
        
        var res = runner.apply(obj, args);
        if (typeof(res) != "undefined")
            result = res;
    }
       
    return result;
}


/**
 * Creates a "callback" function for a method of a given instance
 * of an object. When called, the function will call the method
 * in the context of the given object with arguments passed to the function.
 * The function will return the result of calling the method.
 * 
 * @param object
 *              The object instance whose context the method should run in
 * @param method
 *              Either a function to run in the object's context or a name of
 *              a method in the object to run.
 */
Callbacks.instanceCallback = function(object, method)
{
    var func = null;
    
    if (typeof(method) == "function")
    {
        var objectId = Callbacks.storeObject(object);
        var methodId = Callbacks.storeObject(method);
        
        object = null;
        method = null;
        
        func = function()
        {
            return Callbacks.objStore[methodId].apply(Callbacks.objStore[objectId], arguments);
        }
        
        func.object = objectId;
        func.method = methodId;
    }
    else
    {
        var objectId = Callbacks.storeObject(object);
        object = null;
        
        func = function()
        {
            var obj = Callbacks.objStore[objectId];
            if (obj && obj[method])
                return obj[method].apply(obj, arguments);
            else
            {
                var type = obj.getClass ? obj.getClass().getFullName() : typeof(obj);
                throw new Exception("Callbacks.instanceCallback: Unable to call " + method + " on " + obj + " of type " + type + "!");
            }
        }
        
        func.object = objectId;
        func.method = method;
    }
    
    func.equals = Callbacks.instanceCallback.equals;
    
    return func;
}

/**
 * PRIVATE
 */
Callbacks.instanceCallback.equals = function equals(o)
{
    return (o && o.object && o.object == this.object && o.method == this.method);
}

/**
 * Stores an object in the global object store and returns an id
 * that can be used to reference the object using <code>Callbacks.getObject</code>
 * 
 * @param obj
 *              The object to store
 * @return The ID of the object stored
 */
Callbacks.storeObject = function(obj)
{
    if (obj._osid)
        return obj._osid;
    
    obj._osid = Callbacks.objStore.length;
    Callbacks.objStore[obj._osid] = obj;
    return obj._osid;
}

/**
 * Gets an object stored with <code>Callbacks.storeObject</code>.
 * 
 * @param id
 *          The ID of the object to retrive.
 * @return The object or null if it does not exist
 */
Callbacks.getObject = function(id)
{
    return Callbacks.objStore[id];
}

/**
 * Unstores an object stored with <code>Callbacks.storeObject</code>.
 * 
 * @param obj
 *              The object or the ID of the object to unstore 
 */
Callbacks.unstoreObject = function(obj)
{
    if (typeof(obj) == "object" && obj._osid)
        Callbacks.objStore[obj._osid] = null;
    
    else if (typeof(obj) == "number" && Callbacks.objStore[obj])
        Callbacks.objStore[obj] = null;
}

/**
 * Creates a call back fucntion for capturing the enter (or return)
 * key.  
 */
Callbacks.hookEnterKeyEvent = function (target, callback)
{
	this.hookEvent(window, "onkeypress", 
	
		function(ev, input)
        {
        	//13 is the return key
        	if (ev.keyCode == 13 )
            {
                callback.apply(target, arguments);
            }
           
        });
}

/**
* Fire the event corresponding to the given eventName for the given element.
* @param element The DOM element on which to fire the event.
* @param eventName The name of the event to fire, without the preceding "on" (e.g. use "click" to fire the onclick event).
* @return The return value of the last event handler to handle the event.  
*/
Callbacks.fireEvent = function(element, eventName)
{
    if (document.createEventObject)
    {
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+eventName,evt)
    }
    else
    {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(eventName, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}

window.Callbacks = Callbacks;

})();
};

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Callbacks.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Globals.js

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
 * This sets the location of the page, similar to setting self.location.
 * However, this function is aware of the global edit session, if one exists. 
 */
function setLocationConfirm(loc)
{
    self.location = loc;
}

/**
 * This array holds all localized messages available to the current page.
 * Each message is defined as a function wich accepts arguments to the
 * message and performes the normal {X} subsutution.
 */
var $$ = new Object();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Globals.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Class.js

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

function Class(name, pname, constructor, superClass, innerClass)
{
    this.name = name;
    this.packageName = pname;
    this.classObject = constructor;
    this.superClass = superClass;
    this.innerClass = innerClass;
    this.constructor = null;
}

Class.prototype.newInstance = function()
{
    if (!this.constructor)
    {
        this.constructor = new Function();
        
		// Copy each property of the prototype in safari because in sfari you can't define
		// the prototype of an object to another object. It simply won't work. So this is a
		// workaround.
        if (OOP.safari)
            for (var i in this.classObject.prototype)
                this.constructor.prototype[i] = this.classObject.prototype[i];
        else
            this.constructor.prototype = this.classObject.prototype;
    }
    
    var object = new this.constructor();
    this.classObject.apply(object, arguments);
    
    return object;
}

Class.prototype.deserialize = function(data, object)
{
    if (object == null || object == window.undefined)
        object = this.newInstance();
    
    if (object.deserialize)
        object.deserialize(data);
    else
        for (var i in data)
            object[i] = data[i];
    
    return object;
}

Class.prototype.getPrototype = function()
{
    return this.classObject.prototype;
}

Class.prototype.getName = function()
{
    return this.name;
}

Class.prototype.getFullName = function()
{
    if (this.packageName && this.packageName.length)
        return this.packageName + "." + this.name;
    return this.name;
}

Class.prototype.getMethod = function(name)
{
    if (this.classObject[name])
        return this.classObject[name];
    
    return null;
}

Class.prototype.isInnerClass = function()
{
    return this.innerClass;
}

Class.prototype.toString = function(name)
{
    return "JSOL Class (" + this.getFullName() + ")";
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Class.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSObject.js

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
 * JSObject is the root of the JSOL object tree. All JSOL objects derive
 * JSObject at some point in their miserable little lives. It contains
 * the code needed for calling super methods, callbacks and class information. 
 */

function JSObject()
{
    
}

JSObject.classInfo = new Class("JSObject", _PACKAGE, JSObject, null);

JSObject.prototype.callSuper = function callSuper(callerFunc)
{
    if (typeof(callerFunc) != "function")
    {
        alert("WARNING:\ncallSuper called without a caller function passed in.\n" +
                "Safari and Opera do not support getting the calling function from " +
                "arguments.callee.caller, therefore, it must be passed in as the first " +
                "argument to callSuper. Sorry.\n\n" +
                "Example: this.callSuper(arguments.callee, args....)");
        
        return null;
    }
    
    // Get the name of the method of our class which is the given function.
	// This will exist if callSuper has already been called for this class
	// and method.
    var name = null;
    if (callerFunc._methodNames)
        name = callerFunc._methodNames[this.getClass().getFullName()];
    else
        callerFunc._methodNames = new Object;
    
    var ok = false;

	// Starting at the top level class, look up through the hierarchy
	// of parent classes searching for the class which callerFunc is
	// a method of.
    for (var i = this.classes.length-1; i >= 0; i--)
    {
        // If we don't have the name of the function, try to find it
        var ptype = this.classes[i].prototype;
        if (!name)
        {
            for (var j in ptype)
            {
                if (ptype[j] == callerFunc)
                {
                    name = callerFunc._methodNames[this.getClass().getFullName()] = j.toString();
                    break;
                }
            }
            
            // If we have not found the name of the function, continue since
            // we won't have a method anyways!
            if (!name)
                continue;
        }
        
        var method = ptype[name];
        if (ok)
        {
            if (method && method != callerFunc)
            {
                var args = [];
                for (var j=1; j<arguments.length; j++)
                    args[j-1] = arguments[j];
                
                if (method._abstract)
                    return;
                
                return method.apply(this, args);
            }
        }
        else if (method == callerFunc)
            ok = true;
    }
    
    if (!name)
    {
        var guess = arguments.callee.caller;
        if (!guess)
            guess = "<<unkown>>";
        
        throw new Exception("Unable to determine method name of method " + guess + " for " + this._class.name);
    }
        
    throw new Exception("No super implemention of " + name + " exists for " + this._class.name);
}

JSObject.prototype.defineClass = function(clazz, parent)
{
    var name = null;
    
    if (clazz.NAME)
        name = clazz.NAME;
    else
        name = OOP.getFunctionName(clazz);
    if (name == "anonymous" || !name || !name.length)
        throw new Exception("Class function declaration MUST have a defined name!\nParent Class: " + (parent ? parent._class.getFullName() : "Unknown") + "\nClass Definition: " + clazz);
    
    if (!clazz.NAME)
        clazz.NAME = this._class.getName() + "." + name;
    
    OOP.defineClass(clazz, parent, true);
}

JSObject.prototype.abstractMethod = function(name)
{
    var errorMethodName = this._class.getFullName() + "#" + name;
    this[name] = function() { throw new Exception(errorMethodName + " is an an abstract method and has not been overloaded in " + this._class.getFullName()); }
    this[name]._abstract = true;
}

JSObject.prototype.callback = function(name)
{
    if (!name)
        return null;
    
    return Callbacks.instanceCallback(this, name);
}

JSObject.prototype._super = JSObject.prototype.$super = function _super()
{
    if (typeof(this._curConstructor) == "undefined")
        this._curConstructor = this.classes.length - 1;
    
    if (this._curConstructor > 0)
        this.classes[--this._curConstructor].apply(this, arguments);
}

JSObject.prototype.equals = function(other)
{
    return (this == other);
}

JSObject.prototype.instanceOf = function(clazz)
{
    return OOP.isInstanceOf(this, clazz);
}

JSObject.prototype.getClass = function()
{
    return this._class;
}

JSObject.prototype.getPrefName = function(name)
{
    var clazz = this._class || this.classInfo || this.getClass();
    return clazz.getFullName() + "$" + name;
}

JSObject.prototype.getPref = function(name)
{
    return Session.global.get(this.getPrefName(name));
}

JSObject.prototype.setPref = function(name, value)
{
    return Session.global.set(this.getPrefName(name), value);
}

JSObject.prototype.clearPref = function(name)
{
    return Session.global.remove(this.getPrefName(name));
}

JSObject.prototype.suspendEventCapture = function(eventName)
{
    if (this[eventName])
    {
        if (this[eventName].eventHandler)
            return;
        
        var handler = new Function();
        handler.eventHandler = this[eventName];
        this[eventName] = handler;
    }
}

JSObject.prototype.resumeEventCapture = function(eventName)
{
    if (this[eventName] && this[eventName].eventHandler)
        this[eventName] = this[eventName].eventHandler;
}

///////////////////////////////////////////////////////////////////////////////
// JSOL Class Helper Internal Methods

JSObject.prototype._beginMethod = function(index, mname)
{
    var old = this._curSuperMethod;
    if (index >= 0)
        this._curSuperMethod = this.classes[index].prototype[mname];
    else
        this._curSuperMethod = function() {throw new Exception("No super implemention of " + mname + " exists for " + this._class.name);}
    
    return old;
}

JSObject.prototype._endMethod = function(old)
{
    this._curSuperMethod = old;
}

JSObject.prototype.superMethod = function()
{
    if (!this._curSuperMethod)
    {
        alert("superMethod called on non-JSOL created class: " + this.getClass().getFullName() + "." +
                "superMethod call ONLY be called from methods defined with JSOL.Method.");
        return null;
    }
    
    if (this._curSuperMethod._abstract)
        return null;
    
    return this._curSuperMethod.apply(this, arguments);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSObject.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/OOP.js

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

function OOP() {}
OOP.fullClasses = new Object;
OOP.shortClasses = new Object;
OOP.clonerClass = new Function();

var fff = 0;

OOP.safari = navigator.userAgent.match(/Safari/i);

/**
 * Defines a class in the JSOL runtime. All special JSOL methods
 * and inheritance are added to the class at this time.
 */
OOP.defineClass = function(classObject, parentClass, innerClass)
{
    var name = OOP.getFunctionName(classObject);
    
    if (!name)
        throw "Unable to get class name for class function in OOP.defineClass:\n"+classObject;
    
    // Put the class object in the window scope so it can be accessed in case it was
    // defined in another scope or with a softcoded name.
    window[name] = classObject;
    
    var classes = classObject.prototype.classes;
    var ptype = classObject.prototype;
    
    // All JSOL Classes extend from JSObject if nothing else is specified.
    if (!parentClass)
        parentClass = JSObject;
        
    if (OOP.safari)
    {
        // Workaround for nasty annoyance in safari. Safari does not allow
        // the prototype of an object to be set to a predefined object. You
        // must set each property in the prototype directly. This is quite
        // a bit slower then what we use for the other browsers, but will
        // function.
        for (var i in parentClass.prototype)
            classObject.prototype[i] = parentClass.prototype[i];
    }
    else
    {
        // This is a very efficent way of copying an object in javascript:
        // Create a new function, set the prototype of that function to the
        // source object, then make a new instance of the function. The
        // cloner function can be reused.
        OOP.clonerClass.prototype = parentClass.prototype;
        ptype = classObject.prototype = new OOP.clonerClass();
        OOP.clonerClass.prototype = null;
    }
    
    // Just in case the constructor for the parent class sets an _osid (by calling callback)
    // for the object, null it so that the subclasses won't all reference the super class.
    ptype._osid = null;
    
    // Copy the list of ancestors from the parent class into the new class
    if (ptype.classes)
    {
        var old = ptype.classes;
        classes = ptype.classes = new Array();
        for (var i in old)
            classes[i] = old[i];
    }
    
    if (!classes)
        classes = ptype.classes = new Array();
    
    // The new class sits at the top of its ancestor array
    ptype.classes.push(classObject);
    
    // Create the Class object contaning information about the class
    ptype._class = classObject._class = new Class(name, _PACKAGE, classObject, parentClass ? (parentClass._class || parentClass.classInfo) : null, innerClass ? true : false);
    
    // The one exception to the JSObject rule, we allow people
    // to define subclasses using ClassName.defineClass
    classObject.defineClass = ptype.defineClass;
    
    // Preferences for specific classes can also be called directly on the
    // class object, staticly, that is.
    classObject.getPrefName = ptype.getPrefName;
    classObject.setPref = ptype.setPref;
    classObject.getPref = ptype.getPref;
    classObject.clearPref = ptype.clearPref;
    
    // Register the class in the global array
    OOP.fullClasses[ptype._class.getFullName()] = ptype._class;
    OOP.shortClasses[ptype._class.getName()] = ptype._class;
    
    // Return the class object
    return ptype._class;
}

/**
 * Gets the class info object for a class of a given name. The name can either be the fully
 * qualified package.class name or just the class name. It is reccomended that the fully qualified
 * name be used whenever possible.
 */
OOP.getClass = function(name)
{
    if (OOP.fullClasses[name])
        return OOP.fullClasses[name];
        
    if (OOP.shortClasses[name])
        return OOP.shortClasses[name];
    
    return null;
}

/**
 * Equilvent to the java instanceof operation. Checks if a given object
 * is an instance of a given class name or object.
 */
OOP.isInstanceOf = function(obj, classObject)
{
    // Handle the passing in of a string for the class name
    if (typeof(classObject) == "string")
    {
        if (! (classObject = OOP.getClass(classObject)))
            return false;
    }
    
    // Handle the passing of a constructor as a class object
    if (classObject.classObject)
        classObject = classObject.classObject;
    
    // Search the classes array of the object for the class and
    // return true if it exists.
    if (obj && classObject && obj.classes)
    {
        for (var i in obj.classes)
            if (obj.classes[i] == classObject)
                return true;
    }
    
    // Fall through -- the class was not found in the target object.
    return false;
}

/**
 * Gets the name of a function from the function object. Uses
 * the string version of the function or a predefined NAME attribute.
 */
OOP.getFunctionName = function (func)
{
    if (!func)
        return null;
    
    // Allow for a custom defined name for the function
    if (func.NAME)
        return func.NAME;
    
    var code = func.toString();
    if (!code)
        return null;
    
    var name = code.match(/function ([a-zA-z_0-9]+)/);
    
    if (!name || name.length < 2)
        return "anonymous";
    
    name = name[1];
    
    return name ? name : null;
}

/**
 * Requests that a set of resources be loaded into the current jsol runtime space
 * remotly. The resources can either be fully qualified JSOL resource names
 * (e.g. namespace:path) or javascript class names where the js namespace is implied.
 * 
 * As an example, you could load a JSOL class and a CSS file like so:
 * OOP.requestClasses(null, ["css:jsoltree.css", "com.thomson.ui.controls.tree.TreeControl"]);
 */
OOP.requestClasses = function (callback, classList)
{
    var ok = true;
    
    // Ensure that all the resources have a namespace
    for (var i in classList)
    {    
        var requestedClass = classList[i];
        if (classList[i].indexOf(":") < 0)
            classList[i] = "js:" + classList[i];
    }
    
    // Search through the list of loaded classes and ensure that we don't already
    // have everything loaded.
    for (var i in classList)
    {
        var namespace = classList[i].substring(0, classList[i].indexOf(":"));
        
        if (namespace == "js")
        {
            var name = classList[i].substring(namespace.length + 1);
            
            if (! OOP.fullClasses[name])
            {
                ok = false;
                break;
            }
        }
        else
        {
            ok = false;
            break;
        }
    }
    
    // If everything is already here, do nothing.
    if (ok)
    {
        if (callback)
            callback(true);
        
        return;
    }
    
    // Compile a list of all loaded classes for the remote dep resolver
    // so that it does not tell us we need to load anything we already have.
    var loadedResourceList = new Array;

    for (var j in OOP.fullClasses)
    {
        if (!OOP.fullClasses[j].isInnerClass())
        {
            // Debug.info("Adding " + OOP.fullClasses[j].getFullName() + " to the class list.");
            loadedResourceList.push("js:" + OOP.fullClasses[j].getFullName());
        }
    }
    
    // Actually ask the server for the list of needed resources.
    JSOLService.getResourceDeps(function(jsData)
    {
        // The response from the server comes back as an array of
        // javascript sniplets -- each one capable of loading the resource
        // we need.
        
        var loadCounter = -1;
        var resourceCount = jsData.length;
        
        if (jsData.length == 0)
        {
            if (callback)
                callback(true);
            
            return;
        }
        
        var loadNext = function()
        {
            loadCounter ++;
            
            if (loadCounter == resourceCount)
            {
                if (callback)
                    callback(true);
                
                return;
            }
            
            var js = jsData[loadCounter];
            
            try
            {
                eval(js);
                loader(loadNext);
            }
            catch (x)
            {
                callback(false, x);
                Debug.error("Unable to load class code: " + js + "<br/>Got error: " + x);
            }
        };
        
        loadNext();
        
    }, loadedResourceList, classList);
}

OOP.requestClass = function (callback, className)
{
    OOP.requestClasses(callback, [className]);
}

OOP.loadJSFile = function (callback, url, prescript, postscript)
{
    var request = null;
    
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    
    else if (window.ActiveXObject)
        request = new ActiveXObject("Microsoft.XMLHTTP");
    
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            try
            {
                eval (prescript || "");
                eval (request.responseText);
                eval (postscript || "");
            }
            catch (x)
            {
                Debug.error("Unable to load JS file " + url + ": " + x);
            }
            
            if (callback)
                callback();
        }
    }
    
    Debug.info("Loading JS file: " + url);
    
    request.open("GET", url, true);
    request.send(null);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/OOP.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Exception.js

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

function Exception(message)
{
    this.callStack = new Array();
    this.message = message;
    
//    var caller = Exception.caller;
//    while (caller)
//    {
//        this.callStack.push(caller);
//        caller = caller.caller;
//    }
}

OOP.defineClass(Exception);

Exception.prototype.getMessage = function()
{
    return messasge;
}

Exception.prototype.getStackTrace = function()
{
    return this.callStack;
}

Exception.prototype.printStackTrace = function()
{
    var s = "";
    for (var i=0; i<this.callStack.length; i++)
            s += OOP.getFunctionName(this.callStack[i]) + "\n";
    
    return s;
}

Exception.prototype.toString = function()
{
    return this.message;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Exception.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Reference.js

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
 * The JSOL reference is similar to a Java WeakReference. Kind of. It references
 * an object, but not directly. It actually holds an ID which is a key to a map
 * of objects.
 * 
 * The purpose of this class is for creating links between the DOM and JS Object space.
 * Because of the IE memory leak, you must NEVER create a reference from the DOM to the
 * JS Space and back again.
 * 
 * For example, lets say you wanted to store a reference to a controler class in a DOM
 * object for use by other methods so they could figure out what the controller was for
 * a specific object.
 * 
 * function hookIt(element)
 * {
 *  var object = new Object;
 *  object.id = parseInt(Math.random() * 1000);
 *  object.element = element;
 *  
 *  // This will create a memory leak in IE because element.object points to object wh
 *  // element.object = object;
 *  
 *  // This won't
 *  element.object = new Reference(object);
 * }
 */

function Reference(object)
{
    this.id = Callbacks.storeObject(object);
}

OOP.defineClass(Reference);

Reference.prototype.toString = function()
{
    return "{ref: " + this.id + "}";
}

Reference.prototype.get = function()
{
    return Callbacks.getObject(this.id);
}

Reference.prototype.set = function(object)
{
    this.id = Callbacks.storeObject(object);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Reference.js

var _PACKAGE="org.hypher.core.extensions";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Object.js

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

///////////////////////////////////////////////////////////////
// Don't do this anymore because it totally destroys for     //
// each loops when working with arrays and hash maps.        //
///////////////////////////////////////////////////////////////

//Object.prototype.getReference = function()
//{
//    return new Reference(this);
//}
//
//Object.prototype.reference = Object.prototype.getReference;

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Object.js

var _PACKAGE="org.hypher.core.extensions";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Function.js

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

Function.prototype.closure = function()
{
    if (this.storedClosure)
        return this.storedClosure;
    
    var func = this.storedClosure = Callbacks.instanceCallback(this, this);
    func.storedClosure = func;
    return func;
}

Function.prototype.equals = function(func)
{
    return this == func;
}

Function.prototype.getName = function(func)
{
    return OOP.getFunctionName(this);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/Function.js

var _PACKAGE="org.hypher.core.extensions";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/String.js

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

(function() {
    var DEFAULT_LEFT_REGEX = /^\s+/;
    var DEFAULT_RIGHT_REGEX = /\s+$/;

    if (! String.prototype.trim) {
        String.prototype.trim = function() {
            return this.trimLeft().trimRight();
        };
    }

    if (! String.prototype.trimLeft) {
        String.prototype.trimLeft = function() {
            return this.replace(DEFAULT_LEFT_REGEX,"");
        };
    }

    if (! String.prototype.trimRight) {
        String.prototype.trimRight = function() {
            return this.replace(DEFAULT_RIGHT_REGEX,"");
        };
    }

    if (! String.prototype.contains) {
        String.prototype.contains = function(value) {
            return this.indexOf(value) >= 0;
        };
    }

    if (! String.prototype.startsWith) {
        String.prototype.startsWith = function(value) {
            return this.length >= value.length && this.substring(0, value.length) == value;
        };
    }

    if (! String.prototype.endsWith) {
        String.prototype.endsWith = function(value) {
            return this.length >= value.length && this.substring(this.length-value.length) == value;
        };
    }
})();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/extensions/String.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSOL.js

/**
 * The JSOL class is a static system for creating JSOL classes without
 * all the hassle of using OOP.defineClass and this.callSuper and the headache
 * of creating inner classes and all that stuff.
 * 
 * The JSOL is a tree builder of sorts. It has a current class which it operates
 * on and a series of methods which change the current class.
 * 
 * Creating A Class:
 *  JSOL.Class("NAME", ParentClassName);
 *  // Constructor and methods
 *  JSOL.End();
 *  
 * The Constructor:
 *  To setup the constructor for a class, call JSOL.Constructor(function(){ ... }).
 *  If a constructor is not defined, one will be created as soon as any other method
 *  is called. That "default constructor" will automatically call the super class's
 *  constructor if it has one with the same arguments as it was called with.
 *  
 * Methods:
 *  Methods can be created with JSOL.Method("name", function() { ... });
 *  From inside a method, the super implementation can be called as 
 *  this.superMethod(args).
 *  
 * Constants/Static:
 *  Use JSOL.Static("NAME", value/function) to create static entries in the class.
 *  
 * Inner Classes:
 *  You can create inner classes simply by calling JSOL.Class from within another
 *  class. All the function naming and defining will be taken care of for you.
 *  
 * Using With
 *  If you use the with block to create a class, it can make the syntax easier to
 *  read but is a little slower:
 *  with (JSOL)
 *  {
 *      Class("YonaFoo", Canvas);
 *          Method("render", function()
 *          {
 *              new DOMBuilder(this.createContainer("div")).text("Hi!");
 *          });
 *      End();
 *  }
 */

function JSOL() {}


JSOL.classStack = new Array;
JSOL.curClass = null;

// Methods

/**
 * Creates a class with the given name and given parent class.
 */
JSOL.Class = function(name, parent)
{
    if (this.curClass && !this.curClass.constructor)
        JSOL.Constructor();
        
    this.classStack.push(JSOL.curClass = new JSOL.ClassInfo(name, parent));
}

/**
 * Sets the constructor of the current class to the given function.
 * This must be called before any methods or Statics.
 */
JSOL.Constructor = function(func)
{
    if (!func)
    {
        func = function()
        {
            this.$super.apply(this, arguments);
        }
    }
    
    
    this.curClass.constructor = func;
    func.NAME = this.curClass.name;
    
    var creator = OOP;
    if (this.classStack.length > 1)
    {
        var outerClass = this.classStack[this.classStack.length - 2];
        outerClass.constructor[this.curClass.name] = func;
        creator = outerClass.constructor;
        
        for (var i = this.classStack.length - 2; i>=0; i --)
            func.NAME = this.classStack[i].name + "_" + func.NAME;
    }
    
    window[func.NAME] = func;
    
    creator.defineClass(func, this.curClass.parent);
    
    this.curClass.fullName = func._class.getFullName();
    this.curClass.index = func.prototype.classes.length - 1;
}

/**
 * Creates a method in the current class with the given name. 
 */
JSOL.Method = function(name, func)
{
    if (!this.curClass.constructor)
        JSOL.Constructor();
    
    var index = this.curClass.index - 1;
    
    // Rather then setting the function straight into the class prototype
    // we wrap it here so that we can have actual sane super method calling.
    this.curClass.constructor.prototype[name] = function()
    {
        this._beginMethod(index, name);
        var res = func.apply(this, arguments);
        this._endMethod();
        return res;
    }
    
    // Let the function know its method name for this class
    if (!func._methodNames)
        func._methodNames = new Object;
    
    func._methodNames[this.curClass.fullName] = name;
}

/**
 * Aliases a property of the prototype to as many other names as requested.
 * The first argument is the name of the source and all following arguments
 * are the alias names.
 */
JSOL.Alias = function(name)
{
    var value = this.curClass.constructor.prototype[name];
    for (var i=1; i<arguments.length; i++)
        this.curClass.constructor.prototype[arguments[i]] = value;
}

/**
 * Defines a static value in the class constructor/object.
 */
JSOL.Static = function(name, value)
{
    if (!this.curClass.constructor)
        JSOL.Constructor();
    
    this.curClass.constructor[name] = value;
}

/**
 * Creates an abstract method in this class. If called without being overridden,
 * it will throw an exception.
 */
JSOL.AbstractMethod = function(name)
{
    if (!this.curClass.constructor)
        JSOL.Constructor();
    
    this.curClass.ptype.abstractMethod(name);
}

/**
 * Ends the current class and returns to the containing class, if any.
 */
JSOL.End = function(func)
{
    if (!this.curClass.constructor)
        JSOL.Constructor();
    
    this.curClass.verify();
    JSOL.classStack.pop();
}

/**
 * Defines a function which will act as an exposed event. Calling it from within the
 * class will call anyone who has hooked onto it with all the same parameters.
 */
JSOL.Event = function(name)
{
    if (!this.curClass.constructor)
        JSOL.Constructor();
    
    this.curClass.constructor.prototype[name] = new Function();
}

// Data Classes
JSOL.ClassInfo = function(name, parent)
{
    this.name = name;
    this.parent = parent;
    this.constructor = null;
    this.ptype = null;
    this.fullName = null;
    this.index = 0;
}

JSOL.ClassInfo.prototype.verify = function()
{
    
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/JSOL.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/WindowUtil.js

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

function WindowUtil()
{
    
}
OOP.defineClass(WindowUtil);
WindowUtil.frames = new Object;
WindowUtil.loaded = false;
WindowUtil.framesLoaded = false;

WindowUtil.onFullyLoaded = new Function();

WindowUtil.setName = function(name)
{
    window.name = name;
}

WindowUtil.init = function()
{
    // Do we have any frames?
    if (window.frames && window.frames.length)
    {
        for (var i=0; i<window.frames.length; i++)
        {
            this.registerFrame(window.frames[i], false);
        }
    }
    else
    {
        var iframes = document.getElementsByTagName("iframe");
        for (var i=0; i<iframes.length; i++)
        {
            this.registerFrame(iframes[i]);
        }
    }
    
    WindowUtil.loaded = true;
    WindowUtil.checkFrameLoaded();
}

WindowUtil.isLoaded = function()
{
    return WindowUtil.loaded;
}
WindowUtil.isFullyLoaded = function()
{
    return WindowUtil.framesLoaded && WindowUtil.loaded;
}

WindowUtil.checkFrameLoaded = function()
{
    if (!WindowUtil.loaded)
        return;
    
    for (var i in this.frames)
    {
        if (!this.frames[i].loaded)
        {
            this.framesLoaded = false;
            return;
        }
    }
    
    this.framesLoaded = true;
    
    WindowUtil.onFullyLoaded();
}

WindowUtil.registerFrame = function(win, loaded)
{
    try
    {
        var frame = WindowUtil.frames[win.name];
        if (!frame)
            frame = WindowUtil.frames[win.name] = new WindowUtil.FrameInfo;
        
        frame.name = win.name;
        frame.window = win;
        frame.document = win.document;
        frame.loaded = loaded ? true : false;
        
        // If its not loaded, hook an onload for it
        if (!frame.loaded)
        {
            Callbacks.hookEvent(win, "onload", function()
                    {
                        WindowUtil.registerFrame(win, true);
                    });
        }
    }
    catch (x)
    {
        // If the frame is not owned by us, we'll get errors trying to access it.
        // So we catch those errors, as there is nothing we can do about it.
        // Besides, if its not ours, we won't be able to talk to it anyways,
        // so why do we care if its loaded? ^^
    }
    
    WindowUtil.checkFrameLoaded();
}

WindowUtil.registerIFrame = function(iframe, loaded)
{
    try
    {
        var info = WindowUtil.frames[iframe.name];
        if (!info)
            info = WindowUtil.frames[iframe.name] = new WindowUtil.FrameInfo;
        
        info.name = iframe.name;
        info.loaded = loaded ? true : false;
        
        if (iframe.contentWindow)
        {
            info.window = iframe.contentWindow;
            info.window = info.window.document;
            
            if (!info.loaded)
            {
                // If its not loaded, hook an onload for it
                Callbacks.hookEvent(info.window, "onload", function()
                    {
                        WindowUtil.registerFrame(win, true);
                    });
            }
        }
        
        else if (!info.loaded)
        {
            // If its not loaded, hook an onload for it
            Callbacks.hookEvent(iframe, "onload", function()
                {
                    WindowUtil.registerFrame(win, true);
                });
        }
    }
    catch (x)
    {
        // If the frame is not owned by us, we'll get errors trying to access it.
        // So we catch those errors, as there is nothing we can do about it.
        // Besides, if its not ours, we won't be able to talk to it anyways,
        // so why do we care if its loaded? ^^
    }

    WindowUtil.checkFrameLoaded();
}


WindowUtil.FrameInfo = function WindowUtil_FrameInfo()
{
    this.name = null;
    this.window = null;
    this.document = null;
    this.loaded = false;
}
WindowUtil.FrameInfo.NAME = "WindowUtil_FrameInfo";
WindowUtil.defineClass(WindowUtil.FrameInfo);


// Our main window init
Callbacks.doOnload(Callbacks.instanceCallback(WindowUtil, "init"));

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/WindowUtil.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Cookie.js

/**
 * All cookie access in the JSOL are handled by this class. It provides a simple
 * clean interface for creating, retriving, changing and removing cookies for the
 * current domain.
 *
 * A cookie is created by creating a new instance of this class with the name
 * of the cookie. If it exists, getData will return its value. setData will
 * change the data and create the cookie if needed.
 *
 * All methods that change the cookie take effect at the time of calling.
 *
 * It should be noted that the path and expiration date of cookies is NOT loaded
 * with the cookie. So, any time anything about a cookie is saved, all information
 * not set to that instance of the cookie object WILL BE LOST. So practice safe cookie use:
 * Always set everything when you change anything =)
 */
JSOL.Class("Cookie");
    JSOL.Constructor(function(name, expires)
    {
        this.name = name;
        this.data = null;
        this.expires = expires || null;
        this.path = "/";
    });

    JSOL.Method("getData", function()
    {
        if (this.data)
            return this.data;

        var cookie = document.cookie.toString();

        var loc = cookie.indexOf(this.name + "=");
        if (loc < 0)
            return;

        var end = cookie.indexOf(";", loc);
        if (end < 0)
            end = cookie.length;

        return this.data = decodeURIComponent(cookie.substring(loc + this.name.length + 1, end));
    });

    JSOL.Method("setData", function(data)
    {
        this.data = data;
        this.save();
    });

    JSOL.Method("setExpires", function(expires)
    {
        this.expires = expires;
        this.save();
    });

    JSOL.Method("setPath", function(path)
    {
        this.path = path;
        this.save();
    });

    JSOL.Method("getName", function()
    {
        return this.name;
    });

    JSOL.Method("clear", function()
    {
        this.setExpires(new Date);
    });

    /**
     * PRIVATE:
     *
     * Actually saves the current cookie object to the document's cookie.
     */
    JSOL.Method("save", function()
    {
        var data = this.getData();
        var encodedData = this.name + "=";
        if (data)
        {
            encodedData += encodeURIComponent(data);
        }

        if (this.path)
            encodedData += "; Path=" + this.path;

        if (this.expires)
            encodedData += "; expires=" + this.expires.toGMTString();

        document.cookie = encodedData;
    });
JSOL.End();

Cookie.NEXT_MONTH = new Date();
Cookie.NEXT_MONTH.setMonth(Cookie.NEXT_MONTH.getMonth() + 1);

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Cookie.js

var _PACKAGE="org.hypher.io.serialization";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/ObjectWriter.js

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


function ObjectWriter()
{
    this.refList = [null];
    this.identList = new Object;
    this.objects = new Object;
}
OOP.defineClass(ObjectWriter);

ObjectWriter.INTERNAL_PROPERTIES = {"classes": 1, "_class": 1, "_super": 1, "prototype": 1, "_owrID": 1, "_osid": 1};

ObjectWriter.prototype.addObject = function(name, object)
{
    this.objects[name] = object;
}

ObjectWriter.prototype.getRef = function(obj)
{
    if (obj._owrID)
        return this.refList[obj._owrID];
    
    obj._owrID = this.refList.length;
    var ref = new ObjectWriter.ObjRef(obj, obj._owrID);
    this.refList.push(ref);
    ref.code = obj.owDescribe.call(this, obj);
    
    return this.refList[obj._owrID];
}

ObjectWriter.prototype.serialize = function()
{
    Number.prototype.owWrite = this.writeNumber;
    Boolean.prototype.owWrite = this.writeNumber;
    Date.prototype.owWrite = this.writeDate;
    String.prototype.owWrite = this.writeString;
    
    //Element.prototype.owWrite = this.writeElement;
    Array.prototype.owWrite = this.writeObject;
    Object.prototype.owWrite = this.writeObject;
    
    Array.prototype.owDescribe = this.describeArray;
    Object.prototype.owDescribe = this.describeObject;
    
    var data = this.run();
    
    Number.prototype.owWrite = window.undefined;
    Boolean.prototype.owWrite = window.undefined;
    Date.prototype.owWrite = window.undefined;
    String.prototype.owWrite = window.undefined;
    
    //Element.prototype.owWrite = window.undefined;
    Array.prototype.owWrite = window.undefined;
    Object.prototype.owWrite = window.undefined;
    
    Array.prototype.owDescribe = window.undefined;
    Object.prototype.owDescribe = window.undefined;
    
    return data;
}

ObjectWriter.prototype.run = function()
{
    var data = "";
    var defData = "";
    for (var i in this.objects)
    {
        if (typeof(this.objects[i]) != "function")
            data += "%" + i + "=" + this.writeGeneric(this.objects[i]) + ";";
    }
    
    for (var i=1; i<this.refList.length; i++)
    {
        var ref = this.refList[i];
        defData += "@" + ref.id + "=" + ref.code + ";"; 
    }
    
    for (var i=1; i<this.refList.length; i++)
        this.refList[i].remove();
    
    return defData + data;
}

ObjectWriter.prototype.writeGeneric = function(val)
{
    if (val == null || val == window.undefined)
        return "!";
    
    if (val.owWrite)
        return val.owWrite.call(this, val);
    
    throw new Exception("Unable to serialze unkown type " + typeof(val));
}

ObjectWriter.prototype.describeArray = function(array)
{
    var s = "[";
    for (var i=0; i<array.length; i++)
        s += this.writeGeneric(array[i]) + (i < array.length-1 ? "," : "");
    return s + "]";
}

ObjectWriter.prototype.describeObject = function(obj)
{
    var s = "";
    if (obj._class)
    {
        s = ":" + obj._class.getFullName();
    }
    
    s += "{";
    for (var i in obj)
    {
        var e = obj[i];
        if (typeof(e) == "function" || ObjectWriter.INTERNAL_PROPERTIES[i])
            continue;
        
        s += i + ":" + this.writeGeneric(e) + ",";
    }
    s = s.substring(0, s.length-1);
    return s + "}";
}

ObjectWriter.prototype.writeBasic = function(val)
{
    return this.writeString(val.toString());
}

ObjectWriter.prototype.writeNumber = function(val)
{
    return val.toString();
}

ObjectWriter.prototype.writeString = function(val)
{
    val = val.replace(/\\/g, "\\\\");
    val = val.replace(/\n/g, "\\n");
    val = val.replace(/\r/g, "\\r");
    val = val.replace(/\"/g, "\\\"");
    val = val.replace(/\t/g, "\\t");
    
    return '"' + val + '"';
}

ObjectWriter.prototype.writeObject = function(val)
{
    if (val._owrID)
        return "@" + val._owrID;
    return "@" + this.getRef(val).id;
}

ObjectWriter.prototype.writeDate = function(val)
{
    return val.getTime().toString();
}

ObjectWriter.prototype.writeElement = function(val)
{
    var data = "<" + val.nodeName;
    var attrs = data.attributes;
    for (var i=0; i<attrs.length; i++)
    {
        var a = attrs[i];
        data += " " + a.name + "=\"" + a.value + "\""; 
    }
    
    if (val.childNodes.length)
    {
        
    }
    else
    {
        return data + " />";
    }
    
    return data + "</" + val.nodeName + ">";
}

ObjectWriter.ObjRef = function(obj, id)
{
    this.value = obj;
    this.count = 0;
    this.id = id;
}

ObjectWriter.ObjRef.prototype.remove = function()
{
    this.value._owrID = window.undefined;
    this.value = null;
    this.count = 0;
    this.code = null;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/ObjectWriter.js

var _PACKAGE="org.hypher.io.serialization";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/JSSyntaxObjectWriter.js

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

//#extends org.hypher.io.serialization.ObjectWriter

function JSSyntaxObjectWriter()
{
    this._super();
}

OOP.defineClass(JSSyntaxObjectWriter, ObjectWriter);

JSSyntaxObjectWriter.prototype.writeObject = function(val)
{
    if (val._owrID)
        return "_R[" + val._owrID + "]";
    return "_R[" + this.getRef(val).id + "]";;
}

JSSyntaxObjectWriter.prototype.describeObject = function(obj)
{
    var info = new Object();
    
    if (obj._class)
    {
        info.declaration = "OOP.getClass(\"" + obj._class.getFullName() + "\").newInstance()";
        info.definition = "o._class.deserialize({";
    }
    else
    {
        info.declaration = "new Object";
        info.definition = "Reference._class.deserialize({";
    }
    
    for (var i in obj)
    {
        var e = obj[i];
        if (typeof(e) == "function" || ObjectWriter.INTERNAL_PROPERTIES[i])
            continue;
        
        info.definition += i + ":" + this.writeGeneric(e) + ",";
    }
    info.definition = info.definition.substring(0, info.definition.length-1);
    
    info.definition += "}, o)";
    
    return info;
}

JSSyntaxObjectWriter.prototype.describeArray = function(obj)
{
    var info = new Object();
    
    info.declaration = "new Array";
    info.definition = "";
    
    for (var i=0; i<obj.length; i++)
        info.definition += "o[" + i + "]=" + this.writeGeneric(obj[i]) + ";";
    
    return info;
}

JSSyntaxObjectWriter.prototype.run = function()
{
    var data = "var data = new Object;";
    var defData = "var _R = new Array;";
    for (var i in this.objects)
    {
        if (typeof(this.objects[i]) != "function")
            data += "data[\"" + i + "\"]=" + this.writeGeneric(this.objects[i]) + ";";
    }
    
    for (var i=1; i<this.refList.length; i++)
    {
        var ref = this.refList[i];
        defData += "_R[" + ref.id + "]=" + ref.code.declaration + ";"; 
    }
    
    defData += "var o;";
    for (var i=1; i<this.refList.length; i++)
    {
        var ref = this.refList[i];
        defData += "o=_R[" + ref.id + "];" + ref.code.definition + ";"; 
    }
    
    for (var i=1; i<this.refList.length; i++)
        this.refList[i].remove();
    
    return "function () { " + defData + data + "; return data; }";
}

JSSyntaxObjectWriter.prototype.writeGeneric = function(val)
{
    if (val == null || val == window.undefined)
        return "null";
    
    return this.callSuper(arguments.callee, val);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/io/serialization/JSSyntaxObjectWriter.js

var _PACKAGE="org.hypher.core";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Session.js

//#uses org.hypher.io.serialization.JSSyntaxObjectWriter

/**
 * Session is the JSOL's runtime persistance system. It allows for javascript objects to
 * be stored for use later in the same application without having to use a server for
 * persistance. By default, Session uses cookies for object storage and uses the 
 * org.hypher.io.serialization.JSSyntaxObjectWriter for serializing objects.
 * 
 * The objects are lazy loaded from the cookie. If no objects are requested for a page,
 * the cookie is never loaded. It should be noted however, that the debug system uses
 * the global session, so it is always loaded.
 * 
 * Sessions:
 *  An application can (and argubally should) have multiple sessions. The JSOL itself keeps
 *  a "global" session which can be accessed as a static property of Session: Session.global;
 *  For small application or JSOL-level preferences, this session can be used. For application
 *  specific data, an application specific session should be created and used.
 *  
 * Overhead:
 *  Javascript serialization, while optimized, is not all that fast. It takes quite a bit of
 *  time to walk entire object trees, espcially if they are large. It is recommended that the
 *  objects in the Session be kept rather small. Deserialization, on the other hand, is quite
 *  quick as it is simply executing the restoration code.
 *  
 *  To help with unload speed, only objects that have been altered are reserialized before
 *  saving the cookie.
 * 
 * Non-loaded classes:
 *  Right now, the object serialization system is not built to load classes upon deserialization
 *  if they are not already loaded. Because of this, be sure that all classes needed for a stored
 *  object are loaded when loading a property.
 */
function Session(name)
{
    this.name = name;
    this.cookie = new Cookie(Session.MAGIC + name, Cookie.NEXT_MONTH);
    
    // ILRN-30733:  prevent empty cookie
    this.cookie.setData("placeholder=held");    
    
    this.objects = null;
    this.objectData = null;
    
    this.onsave = new Function();
    
    Callbacks.hookEvent(window, "onunload", this.callback("save"));
}
OOP.defineClass(Session);

/**
 * Gets an object from the session by name.
 */
Session.prototype.get = function(name)
{
    if (!this.objects || this.objects[name] == window.undefined)
        this.loadProperty(name);
    
    return this.objects[name];
}

/**
 * Sets an object in the session by name.
 */
Session.prototype.set = function(name, value)
{
    if (this.objects == null)
        this.objects = new Object;
    
    this.objects[name] = value;
}

/**
 * Removes a named object from the session.
 */
Session.prototype.remove = function(name)
{
    if (!this.objectData)
        this.load();
    
    this.objects[name] = window.undefined;
    this.objectData[name] = "";
}

/**
 * Deletes and resets the entire session.
 */
Session.prototype.clear = function()
{
    this.objects = new Object;
    this.objectData = new Object;
    this.cookie.setData(null);
    this.cookie.clear();
    
    // ILRN-30733:  prevent empty cookie
    this.cookie.setData("placeholder=held");
}

/**
 * Hooks a function to be called just before the final saving of the
 * session to the cookie. This can be used to ensure that data gets
 * into the session before the page unloads.
 */
Session.prototype.hookSave = function(callback)
{
    Callbacks.hookEvent(this, "onsave", callback);
}

/**
 * PRIVATE:
 * 
 * Reads the session cookie and splits the serialized property strings into the
 * property data cache.
 */
Session.prototype.load = function()
{
    if (!this.objects)
        this.objects = new Object;
    
    this.objectData = new Object;
    
    // Get the data from the cookie. The data is in the form of name1=value1&name2=value2....
    var data = this.cookie.getData();
    if (data)
    {
        data = data.split("&");
        for (var i = 0; i < data.length; i++)
        {
            var entry = data[i].split("=");
            
            // ILRN-30733:  prevent empty cookie
            if (entry[0] != "placeholder")
            {
            	this.objectData[entry[0]] = entry[1];
            }
        }
    }    
}

/**
 * PRIVATE:
 * 
 * Loads a specific property from the data cache (and loads that if needed).
 */
Session.prototype.loadProperty = function(name)
{
    if (this.objectData == null)
        this.load();
    
    if (this.objects[name] != window.undefined)
        return;
    
    // Decode the string back to the orginal javascript
    var data = this.decodeString(this.objectData[name]);
    
    if (data && data != "undefined" && data != "")
    {
        var getter = null;
        
        try
        {
            // Evaling the data should give a function that can be called to retrive the data.
            eval("getter = " + data);
            
            // Put the retrived data in the object cache
            this.objects[name] = getter()[1];
            return;
        }
        catch (x)
        {
            Debug.error("Unable to restore session object " + name + " from data ("+data+"): " + x);
        }
    }
    
    this.objects[name] = null;
}

/**
 * PRIVATE:
 * 
 * Saves the contents of the session to the cookie.
 */
Session.prototype.save = function()
{
    // ILRN-30733:  prevent empty cookie
    var data = "placeholder=held";
    
    try
    {
        this.onsave(this);
    } catch (x) {}
    
    for (var i in this.objects)
        this.saveProperty(i);
    
    for (var i in this.objectData)
        data += "&" + i + "=" + this.encodeString(this.objectData[i]);
    
    this.cookie.setData(data);
}

/**
 * Serializes a specific property and updates the property data cache with
 * the serialized version.
 */
Session.prototype.saveProperty = function(name)
{
    if (this.objects[name] == window.undefined)
        return;
    
    var writer = new JSSyntaxObjectWriter();
    writer.addObject("1", this.objects[name]);
    this.objectData[name] = writer.serialize();
}

/**
 * Strips a string of all = and & characters.
 */
Session.prototype.encodeString = function(value)
{
    return (value + "").replace(/1/g, "1o").replace(/=/g, "1e").replace(/\&/g, "1a");
}

/**
 * Revives the = and & characters from a string encoded with Session::encodeString.
 */
Session.prototype.decodeString = function(value)
{
    return (value + "").toString().replace(/1e/g, "=").replace(/1a/g, "&").replace(/1o/g, "1");
}

/**
 * The cookie prefix for jsol sessions.
 */
Session.MAGIC = "jsolsession_";

/**
 * The global session. Used by the JSOL internally.
 */
Session.global = new Session("global");

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/core/Session.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CallbackList.js

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

function CallbackList()
{
	this.callbacks = new Array();
}
OOP.defineClass(CallbackList);

CallbackList.prototype.add = function(arg1, arg2)
{
    var callback = arg2 ? Callbacks.instanceCallback(arg1, arg2) : arg1;
    
    for (var i in this.callbacks)
        if (this.callbacks[i].equals(callback))
            return;
    
    this.callbacks.push(callback);
}

CallbackList.prototype.remove = function(callback)
{
    for (var i in this.callbacks)
        if (this.callbacks[i].equals(callback))
            this.callbacks[i] = null;
}

CallbackList.prototype.fire = function()
{
    for (var i in this.callbacks)
    {
        var callback = this.callbacks[i];
        if (callback)
            callback.apply(null, arguments);
    }
}

CallbackList.prototype.clear = function()
{
    for (var i in this.callbacks)
        this.callbacks[i] = null;
    
    delete this.callbacks;
    this.callbacks = new Array();
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CallbackList.js

var _PACKAGE="org.hypher.ui.jswt";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/DataUpdateManager.js

function DataUpdateManager(handler)
{
    this.handler = handler;
    this.fields = new Object;
}

OOP.defineClass(DataUpdateManager);

DataUpdateManager.prototype.field = function(name)
{
    var f = this.fields[name];
    if (f)
        return f;
    
    return (this.fields[name] = new DataUpdateManager.FieldInfo(this, name));
}

DataUpdateManager.prototype.handleChange = function(value, name)
{
    if (this.handler && this.handler["dispatchUpdate"])
        this.handler.dispatchUpdate(value, name);
}

DataUpdateManager.prototype.register = function(name, action)
{
    Callbacks.hookEvent(this.field(name), "onchange", action);
}

DataUpdateManager.FieldInfo = function DataUpdateManager_FieldInfo(manager, name)
{
    this.manager = manager;
    this.name = name;
    this.value = null;
    this.onchange = null;
}
DataUpdateManager.FieldInfo.NAME = "DataUpdateManager_FieldInfo";
DataUpdateManager.defineClass(DataUpdateManager.FieldInfo);

DataUpdateManager.FieldInfo.prototype.update = function(value)
{
    if (this.value != value)
    {
        this.value = value;
        
        if (this.onchange)
            this.onchange(value, this.name);
        else
            this.manager.handleChange(value, this.name);
    }
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/DataUpdateManager.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/StringUtil.js

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

function StringUtil() {}
OOP.defineClass(StringUtil);

StringUtil.padNumber = function(number, len)
{
    number = number + "";
    while (number.length < len)
        number = "0" + number;
    
    return number;
}

StringUtil.px = function(number)
{
    return number + "px";
}

StringUtil.bigString = function()
{
    return new Array(500).join(new Array(100).join("123123"));
}

/**
 * Parses a "px" number that are often returned by style attributes.
 * 
 * @param value
 *          The px value to parse
 * @return
 *          The numerical value of the given string
 */
StringUtil.parsePx = function(value)
{
    value += "";
    if (value.substring(value.length-2, value.length) == "px")
        value = parseInt(value.substring(0, value.length-2));
    else
        value = parseInt(value);
    return value;
}

/**
 * Parses a boolean value from a string.
 * 
 * @param string The string to parse.
 * @return true If the string is "yes", "1" or "true". false otherwise.
 */
StringUtil.parseBool = function (string)
{
    string = ("" + string).toLowerCase();
    return string == "1" || string == "yes" || string == "true" || string == "on";
}

StringUtil.parseIntLoose = function(value)
{
    var goodChars = "";
    for (var i=0; i<value.length; i++)
    {
        var c = value.charAt(i);
        if (c == '.' || (c >= '0' && c <= '9'))
            goodChars += value;
    }
    
    return parseInt(value, 10);
}

StringUtil.escapeString = function(s)
{
    var s2 = "";
    
    for (var i=0; i<s.length; i++)
    {
        var c = s.charAt(i);
        
        switch (c)
        {
        case '\\':
            s2 += "\\\\";
            break;
        case '"':
            s2 += "\\\"";
            break;
        case '\'':
            s2 += "\\'";
            break;
        case '\n':
            s2 += "\\n";
            break;
        case '\r':
            s2 += "\\r";
            break;
        case '\t':
            s2 += "\\t";
            break;
        default:
            s2 += c;
        }
    }
    
    return s2;
}

StringUtil.formatFloat = function(num, zeroPad, maxPlaces, minPlaces)
{
    num += "";
    if (zeroPad > 0)
    {
        var dot = num.indexOf(".");
        if (dot < 0)
            dot = num.length;
        
        for (var i=0; i<(zeroPad-dot); i++)
            num = "0" + num;
    }
    
    if (maxPlaces == 0)
    {
        var dot = num.indexOf(".");
        if (dot < 0)
            dot = num.length;
        
        num = num.substring(0, dot);
    }
    else if (maxPlaces)
    {
        var dot = num.indexOf(".");
        if (dot < 0)
            dot = num.length;
        
        num = num.substring(0, dot + maxPlaces + 1);
    }
    
    if( minPlaces )
    {
        var dot = num.indexOf(".");
        
        if(dot < 0)
            num = num + ".";

        var dot = num.indexOf(".");

        while(num.length - dot <= minPlaces)
            num = num + "0";
    }
    
    return num;
}

StringUtil.stripHTML = function(html, includeGoodTags, includeBadTags)
{
    var text = "";
    var tagText = "";
    
    var inTag = false;
    var quoteChar = null;
    
    if (typeof(includeGoodTags) == "undefined")
        includeGoodTags = false;
    
    if (typeof(includeBadTags) == "undefined")
        includeBadTags = true;
    
    for (var i=0; i<html.length; i++)
    {
        var c = html.charAt(i);
        
        if (inTag)
        {
            if (quoteChar != null)
            {
                if (c == quoteChar)
                {
                    quoteChar = null;
                }
            }
            else
            {
                if (c == "'" || c == '"')
                {
                    quoteChar = c;
                    tagText += c;
                    continue;
                }
                
                if (c == ">")
                {
                    inTag = false;
                    tagText += c;
                    
                    if (includeGoodTags)
                        text += tagText;
                    
                    tagText = "";
                    continue;
                }
                
                // Only allow valid characters in HTML
                if (!c.match(/[A-Za-z0-9_\r\n\t\- \=\/\:]/) || i == html.length - 1)
                {
                    if (c != "<")
                        tagText += c;
                    
                    if (includeBadTags)
                        text += tagText;
                    
                    tagText = "";
                    
                    inTag = false;
                    if (c == "<") i--;
                    continue;
                }
            }
            
            tagText += c;
        }
        else
        {
            if (c == "<")
            {
                tagText = "" + c;
                inTag = true;
                continue;
            }
            
            text += c;
        }
    }
    
    return text;
}

StringUtil.dumpObject = function(target, maxStackLevel, data)
{
    if (!data)
    {
        data = new Object;
        
        data.stack = new Array;
        data.map = new Array;
        data.maxLevel = maxStackLevel || 5;
        data.level = 1;
        data.space = "";
    }
    
    var out = "";
    
    for (var i in target)
    {
        // Skip uppercase stuff
        if (i.toString().match(/^[A-Z0-9\_]+$/))
            continue;
        
        var obj = target[i];
        var objOut = null; 
            
        switch (obj)
        {
        case null:
            objOut = "null";
            break;
            
        case true:
            objOut = "true";
            break;
            
        case false:
            objOut = "false";
            break;
        }
        
        switch (typeof(obj))
        {
        case "boolean":
        case "number":
            objOut = obj + "";
            break;
            
        case "string":
            objOut = "\"" + StringUtil.escapeString(obj) + "\"";
            break;
        
        case "function":
            continue;
//            objOut = "function " + OOP.getFunctionName(obj);
//            break;
            
        case "undefined":
            objOut = "undefined";
            break;
            
        case "object":
            
            for (var j in data.map)
                if (data.map[j] == obj)
                {
                    objOut = "Ref("+j+")";
                    break;
                }
            
            if (!objOut)
            {
                var id = data.map.length;
                data.map[id] = obj;
                
                try
                {
                    var clazz = obj.getClass();
                    objOut = clazz.getFullName() + "("+ id +")";
                }
                catch (x)
                {
                    objOut = "object(" + id + ")";
                }
                
                if (data.level < data.maxLevel)
                {
                    objOut += "\n" + data.space + "{\n";
                    
                    data.level ++;
                    data.space += "  ";
                    
                    objOut += StringUtil.dumpObject(obj, null, data);
                    
                    data.level --;
                    data.space = data.space.substring(0, data.space.length - 2);
                    
                    objOut += data.space + "}";
                }
                else
                {
                    objOut += ";";
                }
            }
            break;
            
        default:
            objOut = "[Unkown Type: " + typeof(obj) + "]";
            break;
        }
        
        out += data.space + i + ": " + objOut + "\n";
    }
    
    return out;
}

StringUtil.strictParseInt = function(theString, dflt)
{
    theString += '';
    theString = theString.trim();
    
    var indexOfMatch = theString.search(/^[+-]?[0-9]+$/);
    
    if(indexOfMatch == 0)
        return parseInt(theString, 10);
    
    if(typeof(dflt) == 'undefined')
        return null;
    
    return dflt;
}

StringUtil.strictParseFloat = function(theString, dflt)
{
    var result = StringUtil.strictParseInt(theString, null);
    
    if(result != null)
        return result;

    theString += '';
    theString = theString.trim();
    
    var indexOfMatch = theString.search(/^[+-]?[0-9]*\.[0-9]+$/);
    
    if(indexOfMatch == 0)
        return parseFloat(theString);
    
    if(typeof(dflt) == 'undefined')
        return null;
    
    return dflt;
}

/**
 * Escapes a string to be displayed as HTML by converting carets and anpercands
 * to the HTML escaped values. Also converts linebreaks to <br> tags for proper
 * display.
 * 
 * @param html The HTML to escape
 * @return The escaped HTML
 */
StringUtil.escapeHTML = function(html, convertLineBreaks)
{
    html = html.split("&").join("&amp;");
    html = html.split("<").join("&lt;");
    html = html.split(">").join("&gt;");
    html = html.split("\n").join("<br/>");
    
    return html;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/StringUtil.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Point.js

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

//#uses org.hypher.util.StringUtil

/**
 * A simple Point datastruture
 */
function Point(x, y)
{
    this.x = (arguments.length > 0 ? x : 0);
    this.y = (arguments.length > 1 ? y : 0);
}
OOP.defineClass(Point);

/**
 * Convert this Point to a string in the format {X,Y}
 */
Point.prototype.toString = function()
{
    return "{"+this.x+","+this.y+"}";
}

/**
 * Subtract a given point from this point and return the result
 */
Point.prototype.minus = function(otherPoint)
{
    return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
}

/**
 * Add a given point to this point and return the result
 */
Point.prototype.plus = function(otherPoint)
{
    return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
}

/**
 * Returns a copy of the current point
 */
Point.prototype.clone = function()
{
    return new Point(this.x, this.y);
}

/**
 * Checks if two points contain the same value
 */
Point.prototype.equals = function(p)
{
    return (this.x == p.x && this.y == p.y);
}

/**
 * Creates a point object from the coord's attached to an event.
 * In the case of mouse events, this will be the X,Y of the cursor
 * at the time of the event.
 */
Point.fromEvent = function(ev)
{
    return new Point(ev.clientX, ev.clientY);
}

/**
 * Returns a point containing the location of an element, as defined
 * in the element's style -- NOT its absolute page location.
 * 
 * Use getElementPosition for getting the absolute poisition of an
 * element.
 */
Point.fromElement = function(elem)
{
   if (elem == window.undefined || !elem)
       return new Point(0, 0);
   
   return new Point(StringUtil.parsePx(elem.style.left), StringUtil.parsePx(elem.style.top));
}

/**
 * Returns a point containing the dimensions of an element as defined
 * by its runtime attribute (that is, this will return the actual rendered
 * size of the element, not its defined size)
 */
Point.fromElementSize = function(obj)
{
    var size = null;
    
    var props = [["clientWidth", "clientHeight"], ["width", "height"], ["scrollWidth", "scrollHeight"]];
    for (var i in props)
        if (!isNaN(obj[props[i][0]]) && obj[props[i][0]] && obj[props[i][1]])
            {
                size = new Point(obj[props[i][0]], obj[props[i][1]]);
                break;
            }
    
    if (size == null && obj.style.width)
        size = new Point(StringUtil.parsePx(obj.style.width), StringUtil.parsePx(obj.style.height));
    
    if (size == null)
        return new Point(0, 0);
    
    size.x = isNaN(size.x = parseInt(size.x)) ? 0 : size.x;
    size.y = isNaN(size.y = parseInt(size.y)) ? 0 : size.y;
    
    // IE hack: sometimes, IE reports impossibly large sizes for elements before they are fully rendered.
    // this fixes that. The size that IE reports is 135,913,020.
    size.x = size.x > 135000000 ? 0 : size.x;
    size.y = size.y > 135000000 ? 0 : size.y;
    
    return size;
}

Point.fromElementPosition = function(obj)
{
    var pos = new Point(0, 0);
    var parent = obj.parentNode;

    if (obj.offsetParent)
    {
         while (obj.offsetParent)
         {
              pos.x += obj.offsetLeft;
              pos.y += obj.offsetTop;
              
              obj = obj.offsetParent;
         }
    }
    else if (obj.x) //for NN
    {
        pos.x = parseInt(obj.x);
        pos.y = parseInt(obj.y);
    }

    while (parent && parent.nodeName.toUpperCase() != 'BODY') // hard checking <body> in case of inner <iframe>
    {
        if (parent.scrollLeft && parent.scrollLeft != 0)
        {
            pos.x -= parent.scrollLeft;
        }
        if (parent.scrollTop && parent.scrollTop != 0)
        {
            pos.y -= parent.scrollTop;
        }

        parent = parent.parentNode;
    }

    return pos;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Point.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Rect.js

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

//#uses org.hypher.util.Point
//#uses org.hypher.util.CustomTagger

function Rect(x, y, width, height)
{
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
}
OOP.defineClass(Rect);

Rect.prototype.getX = function()
{
    return this.x;
}

Rect.prototype.getY = function()
{
    return this.y;
}

Rect.prototype.getWidth = function()
{
    return this.width;
}

Rect.prototype.getHeight = function()
{
    return this.height;
}

///////////////////////////////////////////////////////////////////////////////
Rect.prototype.getX2 = function()
{
    return this.x + this.width;
}

Rect.prototype.getY2 = function()
{
    return this.y + this.height;
}

///////////////////////////////////////////////////////////////////////////////
Rect.prototype.getTopLeft = function()
{
    return new Point(this.x, this.y);
}

Rect.prototype.getTopRight = function()
{
    return new Point(this.x + this.width, this.y);
}

Rect.prototype.getBottomLeft = function()
{
    return new Point(this.x, this.y + this.height);
}

Rect.prototype.getBottomRight = function()
{
    return new Point(this.x + this.width, this.y + this.height);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/Rect.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CustomTagger.js

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

//#uses org.hypher.util.Rect

function CustomTagger(tagNames)
{
    if (!tagNames)
        return;
    
    this.tagNames = tagNames;
    
    this.id = ++CustomTagger.idSeed;
    this.setup();
}
OOP.defineClass(CustomTagger);

CustomTagger.idSeed = 0;

CustomTagger.prototype.acceptElement = function() { return true; }
CustomTagger.prototype.setupElement = function() { }

CustomTagger.prototype.checkCustomTagStatus = function(tag)
{
    if (tag._tagIds)
    {
        var v = tag._tagIds[this.id];
        return v ? v : false;
    }
    
    return false;
}

CustomTagger.prototype.setCustomTagStatus = function(tag, value)
{
    if (typeof(tag._tagIds) == "undefined")
        tag._tagIds = [];
    
    tag._tagIds[this.id] = value;
}

CustomTagger.prototype.processTags = function(tags)
{
    for (var i=0; i<tags.length; i++)
    {
        var tag = tags[i];
        if ((this.acceptElement && !this.acceptElement(tag)) || this.checkCustomTagStatus(tag))
            continue;
        this.setupElement(tag);
        this.setCustomTagStatus(tag, true);
    }
}

CustomTagger.prototype.processTag = function(tag)
{
    this.processTags([tag]);
}

CustomTagger.prototype.processChildren = function(target)
{
    if (target.getElementsByTagName)
    {
        var elems = [];
        for (var i in this.tagNames)
        {
            var tags = target.getElementsByTagName(this.tagNames[i]);
            if (tags.length < 1)
                continue;
            
            for (var i=0; i<tags.length; i++)
                elems.push(tags[i]);
        }
        
        this.processTags(elems);
    }
}

CustomTagger.prototype.processDocument = function()
{
    this.processChildren(document.body);
}

CustomTagger.prototype.setup = function()
{
    Callbacks.doOnload(this.callback("processDocument"));
}

/**
 * Parses a set of flags for use with custom tags.
 * The input is generally the content of an attribute of an element in the format
 * name[=value][,...]
 * 
 * If a value is not given for a flag, it defaults to true.
 * Note: This is a simple parser: it cannot handle quotes, commas, spaces, tabs or newlines in
 * the values or names.
 * 
 * @param flags:String The string to parse
 * @return A map of the flags
 */
CustomTagger.parseFlags = function(flags)
{
    if (flags)
    {
        var flagMap = new Object;
        
        flags = flags.split(/[, \t\n]+/);
        for (var j=0; j<flags.length; j++)
        {
            var flag = flags[j];
            var eq = flag.indexOf('=');
            
            var name = "";
            var value = true;
            
            if (eq < 0)
            {
                name = flag;
            }
            else
            {
                name = flag.substring(0, eq);
                value = flag.substring(eq+1);
            }
            
            flagMap[name] = value;
        }
        
        return flagMap;
    }
    else
        return new Object();
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/CustomTagger.js

var _PACKAGE="org.hypher.ui.jswt";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/JSWTInjector.js

//#extends org.hypher.util.CustomTagger
//#uses org.hypher.ui.jswt.Canvas

JSOL.Class("JSWTInjector", CustomTagger);
    JSOL.Constructor(function()
    {
        this.$super(["div", "span", "input", "img", "select", "textarea", "td"]);
    });

    JSOL.Method("acceptElement", function(element)
    {
        return (element.getAttribute("jswt") ? true : false);
    });
    
    JSOL.Method("setupElement", function(element)
    {
        var rawInfo = element.getAttribute("jswt") + "";
        rawInfo = rawInfo.trim().split(",");
        
        var info = new Object;
        for (var i in rawInfo)
        {
            var part = rawInfo[i].split('=');
            if (part.length != 2)
                continue;
            
            info[part[0].trim()] = part[1].trim();
        }
        
        // Ensure that we have a class and that it is loaded
        OOP.requestClass(function(success, error)
        {
            if (success)
            {
                // If the canvas is to be appened as a child of the container element,
                // just render it into the container. Otherwise, we need to create a 
                // container and append that first.
                
                var container = null;
                switch (info["append"])
                {
                case "before":
                    container = DOMUtil.newElement("span");
                    DOMUtil.insertBefore(container, element);
                    break;
                
                case "after":
                    container = DOMUtil.newElement("span");
                    DOMUtil.insertAfter(container, element);
                    break;
                
                case "child":
                default:
                    container = element;
                    break;
                }
                
                // Get the class and ensure that it exists and all that
                var canvasClass = OOP.getClass(info["class"]);
                if (!canvasClass)
                {
                    Debug.error("Failed to inject JSWT control ("+info["class"]+") because the class does not exist.");
                    return;
                }
                
                // Create the new canvas
                var canvas = null;
                
                try
                {
                    canvas = canvasClass.newInstance()
                }
                catch (x)
                {
                    Debug.error("Failed to inject JSWT control ("+canvasClass+") because of an error during class creation: " + x);
                    return;
                }
                
                if (!OOP.isInstanceOf(canvas, Canvas))
                {
                    Debug.error("Failed to inject JSWT control ("+canvasClass+") because the class does not extend org.hypher.ui.jswt.Canvas");
                    return;
                }
                
                // The current form, if there is one
                var form = false;
                
                // Clear out the built-in options
                info["class"] = window.undefined;
                info["append"] = window.undefined;
                
                // Setup the new canvas with any additional arguments
                for (var i in info)
                {
                    var data = info[i];
                    if (data == window.undefined)
                        continue;
                    
                    var name = i.toString();
                    name = "set" + name.substring(0, 1).toUpperCase() + name.substring(1);
                    
                    if (typeof(canvas[name]) == "function")
                    {
                        // Parse the datatype
                        if (data.charAt(0) == '$')
                        {
                            // This is an element reference
                            data = document.getElementById(data.substring(1));
                        }
                        else if (data.charAt(0) == '@')
                        {
                            // This is a form element reference
                            if (form == false)
                            {
                                var node = element;
                                while (node && node != document.body && node.tagName != "FORM")
                                    node = node.parentNode;
                                
                                if (node.tagName == "FORM")
                                    form = node;
                                else
                                    form = null;
                            }
                            
                            var dataName = data;
                            
                            if (form != null)
                            {
                                data = form.elements[data.substring(1)];
                                if (!data)
                                    Debug.warning("While inserting JSWT control ("+canvasClass+"), form element " + dataName + " was requested, but that element was not found in form " + form.getAttribute("name") + ".");
                            }
                            else
                            {
                                data = null;
                                Debug.warning("While inserting JSWT control ("+canvasClass+"), form element " + dataName + " was requested, but the control is not inside a form.");
                            }
                        }
                        
                        // Call the setter with the correct data
                        try
                        {
                            canvas[name].apply(canvas, [data]);
                        }
                        catch (x)
                        {
                            Debug.warning("While inserting JSWT control ("+canvasClass+"), an error occured while trying call setter " + name + ": " + x);
                        }
                    }
                    else
                        Debug.warning("While inserting JSWT control ("+canvasClass+") the setter " + name + " is not a function. It is a " + typeof(canvas[name]));
                }
                
                // Now actually insert the new control
                canvas.setup(container)
            }
            else
            {
                Debug.error("Failed to inject JSWT control ("+info["class"]+") because of class loading error " + error);
            }
        }, info["class"]);
    });
JSOL.End();

// Run this on the entire page at load time
new JSWTInjector();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/JSWTInjector.js

var _PACKAGE="org.hypher.ui.jswt";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/Canvas.js

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

//#uses org.hypher.ui.jswt.DataUpdateManager
//#uses org.hypher.ui.jswt.JSWTInjector
//#uses org.hypher.util.WindowUtil

function Canvas()
{
    this.oRoot = null;
    this.dataManager = null;
    this.parentCanvas = null;
}

OOP.defineClass(Canvas);

Canvas.prototype.setup = function(oContainer)
{
    this.oRoot = oContainer;
    this.oContainer = null;
    
    this.init();
    
    // Only render the widget if the page is loaded. If it is not loaded, IE will bomb here
    // and display a totally wacked out error message that makes no sense whatsoever. Its an
    // IE thing, and it sucks.
    if (WindowUtil.isLoaded())
    {
        this.render();
        this.updateDisplay();
    }
    else
    {
        var Canvas_this = this;
        Callbacks.doOnload(function(){
            Canvas_this.render();
            Canvas_this.updateDisplay();
        });
    }
}

Canvas.prototype.dispatchUpdate = function(value, name)
{
    var method = this["handle" + name + "Change"];
    if (method)
        method.apply(this, [value, name]);
}

Canvas.prototype.init = function()
{
    
}

Canvas.prototype.createContainer = function(type)
{
    if (this.oContainer)
        return this.oContainer;
    
    return (this.oContainer = DOMUtil.newElement(type || "div", this.oRoot));
}

Canvas.prototype.getContainer = function()
{
    return this.oContainer;
}

Canvas.prototype.setVisible = function(visible)
{
    if (this.oContainer)
        this.oContainer.style.display = visible ? "" : "none";
}

Canvas.prototype.enableDataManager = function()
{
    this.dataManager = new DataUpdateManager(this);
}

Canvas.prototype.updateDisplay = function()
{
    
}

Canvas.prototype.bubbleMessage = function(message)
{
    this.handleMessage(message);
    this.dispatchMessage(message);
}

Canvas.prototype.dispatchMessage = function(message)
{
    
}

Canvas.prototype.handleMessage = function(message)
{
    var name = message.getType();
    name = name.substring(0, 1).toUpperCase() + name.substring(1);
    
    var method = this["handle" + name + "Message"];
    if (method)
        method.apply(this, arguments);
}

Canvas.prototype.abstractMethod("render");

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/Canvas.js

var _PACKAGE="org.hypher.ui.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMUtil.js

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

function DOMUtil() {}
OOP.defineClass(DOMUtil);

/**
 * Checks if one element in the DOM is the parent of another objecct.
 * 
 * @param parentItem The possible parent element
 * @param elem       The possible child element
 * @return true if elem is a child of parentItem, false if not
 */
DOMUtil.isChildElem = function (parentItem, elem)
{
    while (elem && elem != document.body)
    {
        if (elem == parentItem)
            return true;
        else
            elem = elem.parentNode;
    }
    return false;
}

DOMUtil.getGlobalEventElement = function()
{
    return document.all ? document : window;
}

DOMUtil.getDocument = function(elem)
{
    if (elem)
    {
        if (elem.ownerDocument)
            return elem.ownerDocument;
        
        if (elem.document)
            return elem.document;
    }
    
    return window.document;
}

DOMUtil.newElement = function (nodeName, parent, attributes, styles)
{
    var element = DOMUtil.getDocument(parent).createElement(nodeName);
    
    if (attributes)
        for (var i in attributes)
            element.setAttribute(i.toString(), attributes[i]);
    
    if (styles)
        for (var i in styles)
            element.style[i.toString()] = styles[i];

    try
    {
        if (parent)
            parent.appendChild(element);
    }
    catch (x)
    {
        throw new Exception("DOMUtil.newElement: Unable to add element to parent node. Perhaps a document conflict?");
    }
    
    return element;
}

DOMUtil.deleteElement = function(element)
{
    if (element.parentNode)
        element.parentNode.removeChild(element);
}

DOMUtil.newInput = function (type, parent, attributes, styles)
{
    var element = DOMUtil.newElement("input", null, attributes, styles);
    element.type = type;
    
    if (parent)
        parent.appendChild(element);
    
    return element;
}

DOMUtil.newTextElement = function (content, parent)
{
    var element = DOMUtil.getDocument(parent).createTextNode(content);
    if (parent)
        parent.appendChild(element);
    
    return element;
}

DOMUtil.getContainer = function()
{
    var id = "_tmp" + Math.random();
    
    document.write("<span id='" + id + "'/><span>");
    var tempElement = document.getElementById(id);
    var curElement = tempElement.parentNode;
    
    DOMUtil.deleteElement(tempElement);
    
    return curElement;
}

DOMUtil.setElementPosition = function(element, pos)
{
    if (pos.x != null)
        element.style.left = (pos.x > 0 ? pos.x : 0) + "px";

    if (pos.y != null)
        element.style.top = (pos.y > 0 ? pos.y : 0) + "px";
}

DOMUtil.setElementSize = function(element, pos)
{
    if (pos.x != null)
        element.style.width = (pos.x > 0 ? pos.x : 0) + "px";
    
    if (pos.y != null)
        element.style.height = (pos.y > 0 ? pos.y : 0) + "px";
}

/**
 * Adds a css class to an element if the element does not already have the css class.
 */
DOMUtil.addCSSClass = function (elem, newClass)
{
    if (!elem || !newClass)
        return;
    
    var className = elem.className;
    
    if (className.match("([ \\t\\n]+|^)"+newClass+"([ \\t\\n]+|$)"))
        return;
    
    elem.className = className + " " + newClass;
}

/**
 * Removes a css class from an element's className.
 */
DOMUtil.removeCSSClass = function (elem, newClass)
{
    if (!elem || !newClass)
        return;
    
    elem.className = elem.className.toString().replace(new RegExp("(([ \\t\\n]+|^)"+newClass+"([ \\t\\n]+|$))"), " ");
}

/**
 * Sets whether an element has the given css class
 */
DOMUtil.toggleCSSClass = function (elem, className, toggle)
{
    if (toggle)
        DOMUtil.addCSSClass(elem, className);
    else
        DOMUtil.removeCSSClass(elem, className);
}

/**
 * Return the value of the computed (cascaded) style for the specified element and style property.
 * Return an empty string if not found.
 *
 * Note, checking an element's style property isn't sufficient as it only contains the inline style,
 * not the cascaded style.
 * 
 * @param elem  Can either be the id of an element or an element.
 * @param style  Case-insensitive name of style property.
 */
DOMUtil.getComputedStyle = function (elem, style)
{
    if (typeof elem != "object")
    {
    	elem = document.getElementById(elem);
    	if (!elem)
    		return "";
    }
    style = style.toLowerCase();
    try
    {
	    // For non-IE browsers
	    if (document.defaultView && document.defaultView.getComputedStyle)
	    {
	        return document.defaultView.getComputedStyle(elem, "").getPropertyValue(style);
	    }
	    // For IE
	    if (elem.currentStyle)
	    {
	    	// Convert dashes within style names to mixed-case style, e.g., border-top becomes borderTop
	    	style = style.replace(/\-(\w)/g, function (strMatch, p1)
	    	    {
	                return p1.toUpperCase();
	    	    });
	        return elem.currentStyle[style];
	    }
    }
    catch(e)
    {
    } 
    return "";
}            

DOMUtil.getViewportSize = function()
{
    var size = new Point(0, 0);
    if (window.innerHeight != window.undefined)
    {
        size.x = window.innerWidth;
        size.y = window.innerHeight;
    }
    else if (document.compatMode == "CSS1Compat")
    {
        size.x = document.documentElement.clientWidth;
        size.y = document.documentElement.clientHeight;
    }
    else if (document.body)
    {
        size.x = document.body.clientWidth;
        size.y = document.body.clientHeight;
    }
    
    return size;
}

DOMUtil.getElementsByTagNames = function(names)
{
    var elems = [];
    for (var i in names)
    {
        var es = document.getElementsByTagName(names[i]);
        for (var j=0; j<es.length; j++)
            elems[elems.length] = es[j];
    }
    
    return elems;
}

DOMUtil.getElementsByClassName = function(className)
{
    var all = document.all ? document.all : document.getElementsByTagName('*');

    var elements = new Array();
    for (var i = 0; i < all.length; i++)
    {
    	var currentElement = all[i];
    	
    	if(!currentElement.className)
    	{
    		continue;
    	}
    
    	if ( typeof(className) == 'string')
    	{
    	    if( currentElement.className == className )
	            elements.push( currentElement );
        }
        else
        {
			//then className must be array.
			var searchStyles = className;
			var currentElementStyles = currentElement.className.split(' ');
			
			if( DOMUtil.getElementsByClassName.arraysIntersect(searchStyles, currentElementStyles) )
				elements.push( currentElement );
        }
    }
    
    return elements;
}
DOMUtil.getElementsByClassName.arrayContainsItem = function(list, item)
{
	for(var i = 0; i < list.length; i++)
	{
		if( item == list[i] )
			return true;
	}
	
	return false;
}
DOMUtil.getElementsByClassName.arraysIntersect = function(a, b)
{
	for(var i = 0; i < a.length; i++)
	{
		if( DOMUtil.getElementsByClassName.arrayContainsItem(b, a[i]) )
			return true;
	}
	
	return false;
}

DOMUtil.setSelectionRange = function(input, selectionStart, selectionEnd)
{
    // debugMessage("setSelectionRange("+selectionStart+","+selectionEnd+") Called");
    if (input.setSelectionRange) 
    {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange)
    {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

DOMUtil.getTBody = function(oTableElem)
{
    if (oTableElem.tagName == "TBODY")
        return oTableElem;
    
    var elems = oTableElem.getElementsByTagName("TBODY");
    for (var i=0; i<elems.length; i++)
    {
        if (elems[i].parentNode == oTableElem)
        {
            return elems[i];
        }
    }

    return DOMUtil.newElement("tbody", oTableElem);
}

DOMUtil.getInputTextBeforeSelection = function(inputBox)
{
    var curVal = inputBox.value;
    var doc = DOMUtil.getDocument(inputBox);
    
    if (doc.selection)
    {
        var range = doc.selection.createRange();
        var text = range.text + "";
        
        var curSelPart = curVal.substring(curVal.length - text.length, curVal.length);
        var beforeSelPart = curVal.substring(0, curVal.length - text.length);
        
        // debugMessage("seltext: " + text + " curval: " + curVal.substring(curVal.length - text.length, curVal.length));
        
        if (text == curSelPart && beforeSelPart + curSelPart == curVal)
            curVal = beforeSelPart;
        
        //debugMessage("Before selection: " + curVal);
        
        return curVal;
    }
    
    if (inputBox.selectionStart != inputBox.selectionEnd && inputBox.selectionEnd == curVal.length)
        curVal = curVal.substring(0, inputBox.selectionStart);
    return curVal;
}

DOMUtil.getInputSelectionInfo = function(box)
{
    var doc = DOMUtil.getDocument(box);
    
    if (doc.selection)
    {
        try
        {
            var selRange = doc.selection.createRange();
            var tmpRange = box.createTextRange();
            
            tmpRange.setEndPoint( 'EndToEnd', selRange);
            
            box.selectionStart = tmpRange.text.length - selRange.text.length;
            box.selectionEnd = box.selectionStart + selRange.text.length;
        }
        catch (x) {
            box.selectionStart = 0;
            box.selectionEnd = 0;
        }
     }
    
    if (typeof(box.selectionStart) == "undefined")
        return null;
    
    var range = new Object;
    range.start = box.selectionStart;
    range.end = box.selectionEnd;
    range.toString = function()
    {
        return "{" + this.start + ":" + this.end + "}";
    };
    
    return range;
}

DOMUtil.replaceInputSelection = function(box, newValue)
{
    var doc = DOMUtil.getDocument(box);
    
    if (doc.selection)
    {
        var range = getInputSelectionInfo(box);
        
        var value = box.value + "";
        
        box.value = value.substring(0, range.start) + newValue + value.substring(range.end, value.length);
        
        scheduleEventUnattached(function ()
        {
            var trange = box.createTextRange();
            trange.moveStart('character', range.start + newValue.length);
            trange.collapse(true);
            trange.select();
        }, 10);
    }
    else if (typeof(box.selectionStart) != "undefined")
    {
        var range = getInputSelectionInfo(box);
        
        var val = box.value + "";
        box.value = val.substring(0, range.start) + newValue + val.substring(range.end, val.length);

        setTimeout(function ()
        {
            box.focus();
            box.selectionStart = box.selectionEnd = range.start + newValue.length;
        }, 10);
    }
}

DOMUtil.scrollToElement = function(element, position, doc)
{
    if (position != "middle")
        position = "top";

    /*
       By setting the position of the label to absolute, we can grab the element's
       offsetTop property, which will tell us the Y position of the node.
    */
    
    // Keep the old position around so we can undo our changes
    var oldPosition = element.style.position;
    
    // Without setting the position to absolute, offsetTop will always be 0
    // This is because offsetTop is the value from the element's "container"
    // and normally, its snug in its table, but by making it absolute, its
    // container becomes the document's body.
    element.style.position = "absolute";
    
    // Store the offsetTop
    var offsetTop = element.offsetTop;
    
    // Reset the position to the stored orginal value to place it back
    // in its container. If this is not done, the label of the selected
    // node will behave very oddly.
    element.style.position = oldPosition;
    
    if (typeof(doc) == 'undefined')
    {
        doc = DOMUtil.getDocument(element);
    }
    
    if (position == "middle")
    {
        if (offsetTop != doc.body.scrollTop + doc.body.clientHeight/2)
        {
           // The node was not visible enough, display it in more-or-less the middle of
           // the box.
           doc.body.scrollTop = offsetTop - doc.body.clientHeight/2 + element.offsetHeight/2;
        }
    }
    else if (position == "top")
    {
        // Calculate if we need to move the scroll position of the document to the element.
        if (offsetTop != doc.body.scrollTop)
        {
            // Record the current value of scrollTop
            var oldScrollTop = doc.body.scrollTop;
            
           // Move the scroll position of the document to the element.
           doc.body.scrollTop = offsetTop;
           
           // If scrollTop hasn't changed, try to change the scrollTop in the parent node.
           // Firefox uses document.body.parentNode.scrollTop, where as other browsers user
           // document.body.scrollTop.
           if (oldScrollTop == doc.body.scrollTop)
                doc.body.parentNode.scrollTop = offsetTop;
        }
    }
    
    // Ensure that the tree drop box is not scrolled horizontally
    doc.body.scrollLeft = 0;
}

/**
 * Inserts a node after another node in the DOM.
 * 
 * @param nodeToInsert The node to insert
 * @param afterNode The node to insert after
 * @return void
 */
DOMUtil.insertAfter = function (nodeToInsert, afterNode)
{
    var parent = afterNode.parentNode;
    if (afterNode.nextSibling == null)
        parent.appendChild(nodeToInsert);
    else
        parent.insertBefore(nodeToInsert, afterNode.nextSibling)
}

/**
 * Inserts a node before another node in the DOM.
 * 
 * @param nodeToInsert The node to insert
 * @param beforeNode The node to insert before
 * @return void
 */
DOMUtil.insertBefore = function (nodeToInsert, beforeNode)
{
    beforeNode.parentNode.insertBefore(nodeToInsert, beforeNode);
}

DOMUtil.topLevelElements = new Array;
DOMUtil.topLevelTagNames = ["applet", "object", "iframe", "embed", "plugin", "select"];
DOMUtil.hideTopLevelElements = function(hide, exclusions)
{
    if (hide)
    {
        // Hide all "top-level" elements on the page. iframes, applets, objects, etc...
        var hideObjects = DOMUtil.getElementsByTagNames(DOMUtil.topLevelTagNames);

        // Create the global array of objects that we are hiding
        DOMUtil.topLevelElements = new Array;

        // Check for ie for the embed object checks.
        var ie = document.all ? true : false;

        hideLoop:
        for (var i in hideObjects)
        {
            var curObj = hideObjects[i];

            for (var j in exclusions)
                if (exclusions[j] == curObj)
                    continue hideLoop;

            // Skip embeds because if we try to show them after hiding them, bad things happen.
            // Note that we check for the gecko-specific object string type to see if it is an embed.
            // IE will simply say that curObj.toString() is "Object object", while mozilla will preserve
            // the native classname. This way we avoid doing unnessecary work on IE.

            // In perticual, on windows in Gecko, we get a "Bad NPObject as private data" error.
            // There is no known fix to this, although in theroy its fixed in Firefox 1.5 ( but as far
            // as I can tell, it's not).
            // The mozilla slip number for this is https://bugzilla.mozilla.org/show_bug.cgi?id=309044
            // although I would not trust that slip since they say its fixed (which it is very much not)
            while (!ie && curObj.toString() == "[object HTMLEmbedElement]")
                curObj = curObj.parentNode;

            // Special hack for safari and java applets in general:
            // The APPLET tag object serves as both an interface to the DOM element: APPLET and to
            // the java class running in the applet. If you try to call a method on the applet
            // object, it trys to execute that method in the applet, same for properties.
            // This causes problems when trying to hide the damn things. So, like embeds, we're just
            // going to hide the thing above the applet.
            while (curObj.tagName == "APPLET")
                curObj = curObj.parentNode;
            
            try
            {
                // Continuation of above hack: We now put the old visibility information in
                // an object rather then putting the information in the tag itself.
                var hiddenInfo = new Object;
                hiddenInfo.element = curObj;
                hiddenInfo.orginalVisibility = curObj.style.visibility + "";

                // Add this object to the global hidden object array
                // Doing it here will keep elements that are already hidden on the list in case a previous call
                // to hideBlocks hid the element.
                DOMUtil.topLevelElements.push(hiddenInfo);
                
                if (curObj.style.visibility == "hidden")
                    continue;

                curObj.style.visibility = "hidden";
            }
            catch (x)
            {
                /*
                 * IE bombs randomly here sometimes while trying to get the visibility from the style.
                 * Nothing we can do about it.
                 */
            }
        }
    }
    else
    {
        // Show all "top-level" elements on the page. iframes, applets, objects, etc...
        var hideObjects = DOMUtil.topLevelElements;

        for (var i=hideObjects.length - 1; i>=0; i--)
        {
            var curObj = hideObjects[i];

            if (curObj)
            {
                try
                {
                    if (curObj.orginalVisibility != null)
                    {
                        curObj.element.style.visibility = curObj.orginalVisibility;
                        curObj.orginalVisibility = null;
                    }
                }
                catch (x)
                {
                    /*
                     * IE bombs randomly here sometimes while trying to get the visibility from the style.
                     * Nothing we can do about it.
                     */
                }
            }
        }
    }
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMUtil.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/MouseUtil.js

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

//#uses org.hypher.ui.util.DOMUtil
//#uses org.hypher.util.Point

function MouseUtil() {}
OOP.defineClass(MouseUtil);

MouseUtil.init = function()
{
    MouseUtil.mousePosition = new Point(0, 0);
    Callbacks.hookEvent(DOMUtil.getGlobalEventElement(), "onmousemove", MouseUtil.updateMousePosition);
}

MouseUtil.updateMousePosition = function(ev)
{
    MouseUtil.mousePosition.x = ev.clientX;
    MouseUtil.mousePosition.y = ev.clientY;
}

MouseUtil.getMousePosition = function()
{
	return MouseUtil.mousePosition;
}

MouseUtil.init();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/MouseUtil.js

var _PACKAGE="org.hypher.ui.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DragHelper.js

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

//#uses org.hypher.ui.util.DOMUtil
//#uses org.hypher.util.MouseUtil
//#uses org.hypher.util.Point

function DragHelper()
{
    this.onDragStart = Callbacks.nullFunction;
    this.onDragUpdate = Callbacks.nullFunction;
    this.onDragEnd = Callbacks.nullFunction;
    
    this.dragging = false;
    this.startPoint = null;

    Callbacks.hookEvent(DOMUtil.getGlobalEventElement(), "onmousemove", this.callback("handleMouseMove"));
    Callbacks.hookEvent(DOMUtil.getGlobalEventElement(), "onmouseup", this.callback("handleMouseUp"));
}

OOP.defineClass(DragHelper);

DragHelper.prototype.handleMouseDown = function()
{
    if (this.dragging)
        this.onDragEnd();
        
    this.dragging = true;
    this.startPoint = MouseUtil.getMousePosition().clone();
    this.onDragStart();
    
    return false;
}

DragHelper.prototype.handleMouseMove = function()
{
    if (this.dragging)
        this.onDragUpdate(this);
    
    return false;
}

DragHelper.prototype.handleMouseUp = function()
{
    this.dragging = false;
    this.onDragEnd();
    
    this.startPoint = null;
}

DragHelper.prototype.getOffset = function()
{
    if (this.startPoint)
        return MouseUtil.getMousePosition().minus(this.startPoint);
    else
        return new Point(0, 0);
}

DragHelper.prototype.getStart = function()
{
    return this.startPoint;
}

DragHelper.prototype.isDragging = function()
{
    return this.dragging;
}

DragHelper.prototype.hookElement = function(element)
{
    Callbacks.hookEvent(element, "onmousedown", this.callback("handleMouseDown"));
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DragHelper.js

var _PACKAGE="org.hypher.ui.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMBuilder.js

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

//#uses org.hypher.ui.util.DOMUtil

function DOMBuilder(root)
{
    this.oRoot = root;
    this.oCurrent = root;
}

OOP.defineClass(DOMBuilder);

DOMBuilder.inlineBuilder = function()
{
    return new DOMBuilder(DOMUtil.getContainer());
}

DOMBuilder.prototype.element = function(name, attributes, styles)
{
    return (this.oCurrent = DOMUtil.newElement(name, this.oCurrent, attributes, styles));
}
DOMBuilder.prototype.canvas = function(canvas)
{
    canvas.setup(this.oCurrent);
    canvas.updateDisplay();
    return canvas;
}
DOMBuilder.prototype.leafElement = function(name, attributes, styles)
{
    return DOMUtil.newElement(name, this.oCurrent, attributes, styles);
}

DOMBuilder.prototype.inputElement = function(type, attributes, styles)
{
    return (this.oCurrent = DOMUtil.newInput(type, this.oCurrent, attributes, styles));
}

DOMBuilder.prototype.inputLeafElement = function(type, attributes, styles)
{
    return DOMUtil.newInput(type, this.oCurrent, attributes, styles);
}

DOMBuilder.prototype.text = function(text)
{
    return DOMUtil.newTextElement(text, this.oCurrent);
}

DOMBuilder.prototype.end = function()
{
    if (this.oCurrent != this.oRoot)
        this.oCurrent = this.oCurrent.parentNode;
}

DOMBuilder.prototype.getNode = function()
{
    return this.oCurrent;
}

DOMBuilder.prototype.setClass = function(className)
{
    this.oCurrent.setAttribute("class", className);
    this.oCurrent.className = className;
}

DOMBuilder.prototype.addClass = function(className)
{
    DOMUtil.addCSSClass(this.oCurrent, className);
}
DOMBuilder.prototype.removeClass = function(className)
{
    DOMUtil.removeCSSClass(this.oCurrent, className);
}

DOMBuilder.prototype.hookEvent = function(a, b, c)
{
    return Callbacks.hookEvent(this.oCurrent, a, b, c);
}

DOMBuilder.prototype.setAttribute = function(name, value)
{
    this.oCurrent[name] = value;
    this.oCurrent.setAttribute(name, value);
}

DOMBuilder.prototype.setStyle = function(name, value)
{
    this.oCurrent.style[name] = value;
}

DOMBuilder.prototype.setPosition = function(pos1, pos2)
{
    if (pos2)
    {
        this.setStyle("left", pos1 + "px");
        this.setStyle("top", pos2 + "px");
    }
    else
    {
        this.setStyle("left", pos1.x + "px");
        this.setStyle("top", pos1.y + "px");
    }
}

DOMBuilder.prototype.setSize = function(pos1, pos2)
{
    if (pos2)
    {
        this.setStyle("width", pos1 + "px");
        this.setStyle("height", pos2 + "px");
    }
    else
    {
        this.setStyle("width", pos1.x + "px");
        this.setStyle("height", pos1.y + "px");
    }
}

DOMBuilder.prototype.setHTML = function(html)
{
    this.oCurrent.innerHTML = html;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/util/DOMBuilder.js

var _PACKAGE="org.hypher.watchdog";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/PositionWatchDog.js

/**
 * Class PositionWatchDog well watches for elements and corrects their position.
 *
 * It's purpose is controlling position of the different floating elements which are tied to specific (static) input controls,
 * when those elements change their position due to scrolling (which is kinda unexpected).
 *
 * Note: This class heavily assumes that it will be used in conjunction with
 * Hypher.net Javascript Object Library (HJOL) widgets.
 */
function PositionWatchDog() {};
OOP.defineClass(PositionWatchDog);

/**
 * PUBLIC STATIC
 * Static initializer
 */
PositionWatchDog.init = function() {
    if (typeof(positionWatchdogHandler) != 'undefined') {
        return positionWatchdogHandler;
    }
    else {
        var instance = new PositionWatchDog();
        instance.elements = [];
        instance.watchDog = setInterval(function() { instance.update(); }, 200); // increase interval time to lessen lags
        return instance;
    }
};

/**
 * PUBLIC
 * Function to be called inside setInterval()
 */
PositionWatchDog.prototype.update = function()
{
    for (var i = 0, ilen = this.elements.length; i < ilen; i++)
    {
        this.elements[i].updatePosition();
    }
};

/**
 * PUBLIC
 * Removes element from being watched
 * @param element
 */
PositionWatchDog.prototype.remove = function(element)
{
    for (var i = 0, ilen = this.elements.length; i < ilen; i++)
    {
        if (element == this.elements[i])
        {
            this.elements.splice(i, 1);
            return element;
        }
    }
    return null;
};

/**
 * PUBLIC
 * Adds element to being watched
 * Note: doesn't add element if one already in the array!
 * @param element an instance of any
 */
PositionWatchDog.prototype.add = function(element)
{
    for (var i = 0, ilen = this.elements.length; i < ilen; i++)
    {
        if (element == this.elements[i]) {
            return;
        }
    }
    this.elements.push(element);
};

// watchdog handler - to be used where its functionality is desired
var positionWatchdogHandler = PositionWatchDog.init();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/PositionWatchDog.js

var _PACKAGE="org.hypher.system";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/system/SystemInfo.js

function SystemInfo()
{
    this.os = null;
    this.browser = null;
}
OOP.defineClass(SystemInfo);

SystemInfo.getCurrent = function()
{
    var sysInfo = new SystemInfo();
    sysInfo.os = OSInfo.getCurrent();
    sysInfo.browser = BrowserInfo.getCurrent();
    
    return sysInfo;
}

SystemInfo.prototype.getOS = function()
{
    return this.os;
}
SystemInfo.prototype.getBrowser = function()
{
    return this.browser;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function OSInfo()
{
    this.type = null;
    this.subType = null;
    this.version = null;
}
OOP.defineClass(OSInfo);


//Basic Types
OSInfo.POSIX   = 1;
OSInfo.WINDOWS = 2;
OSInfo.MACOS   = 3;

//POSIX: subtypes
OSInfo.LINUX   = 1;
OSInfo.FREEBSD = 2;
OSInfo.OPENBSD = 3;
OSInfo.NETBSD  = 4;
OSInfo.OSX     = 5;

//WINDOWS: subtypes
OSInfo.WIN32   = 1;
OSInfo.NT      = 2;
OSInfo.VISTA   = 3;

OSInfo.getCurrent = function()
{
    return new OSInfo();
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function BrowserInfo()
{
    this.engine = null;
    this.version = null;
    this.userAgent = null;
}
OOP.defineClass(BrowserInfo);

BrowserInfo.GECKO   = 1;
BrowserInfo.IE      = 2;
BrowserInfo.SAFARI  = 3;
BrowserInfo.OPERA   = 4;
BrowserInfo.MOZILLA = 5;

BrowserInfo.getCurrent = function()
{
    // Parsing based on info from http://en.wikipedia.org/wiki/User_agent
    
    var info = new BrowserInfo();
    info.setUserAgent(navigator.userAgent);

    return info;
}

BrowserInfo.prototype.isIE = function()
{
    return document.all && this.engine == BrowserInfo.IE;
}

BrowserInfo.prototype.isIE6 = function()
{
    return this.isIE() && this.version == 6;
}

BrowserInfo.prototype.isSafari = function()
{
    return this.engine == BrowserInfo.SAFARI;
}

BrowserInfo.prototype.isMozilla = function()
{
    return this.engine == BrowserInfo.GECKO;
}

BrowserInfo.prototype.supportsDOM = function()
{
    return typeof(document.getElementById) == "function";
}

BrowserInfo.prototype.supportsDOM2 = function()
{
    return typeof(document.getElementById) == "function" && typeof(document.createElement) == "function";
}

BrowserInfo.prototype.setUserAgent = function(userAgent)
{
    this.userAgent = userAgent = userAgent.toLowerCase();
    var regex = null;
    
    // Looking for Opera browsers
    // Matches Opera/8.02 (Windows NT 5.1; U; en)
    // Uses Opera/X.YY
    if (userAgent.contains("opera"))
    {
        this.engine = BrowserInfo.OPERA;
        if (regex=userAgent.match(/opera\/([0-9]+\.[0-9]+)/))
        {
            this.version = regex[1];
        }
    }
    
    // Looking for IE browsers, and of coruse, cloaked opera, fooy.
    // matches Mozilla/4.0 (compatible; MSIE 6.0; MSN 2.5; Windows 98)
    // Uses MSIE X.YY
    else if (regex = userAgent.match(/msie (\d+(?:\.\d+)?)/))
    {
        this.engine = BrowserInfo.IE;
        this.version = StringUtil.parseIntLoose(regex[1]);
    }
    
    // Looking for new mozilla-based browsers which should specify a version of the gecko engine.
    // Matches Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.0.1) Gecko/20020920 Netscape/7.0
    // Uses for Gecko/YYYYMMDD
    else if (regex=userAgent.match(/gecko\/([0-9]+)/))
    {
        this.engine = BrowserInfo.GECKO;
        this.version = regex[1];
    }
    
    // Looking for old netscape version (pre open source mozilla) 
    // Matching Mozilla/3.0 (OS/2; U)
    // Uses the Mozilla/X.Y where X < 5
    else if (regex=userAgent.match(/mozilla\/([0-4]\.[0-9]+)/))
    {
        this.engine = BrowserInfo.MOZILLA;
        this.version = regex[1];
    }
    
    // Looking for Safari
    // Matching Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125
    // Uses the Safari/XXX version
    else if (regex=userAgent.match(/safari\/([0-9]+)/))
    {
        this.engine = BrowserInfo.SAFARI;
        this.version = regex[1];
    }
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/system/SystemInfo.js

var _PACKAGE="org.hypher.watchdog";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/IE6Layers.js

/*
 * Class IE6Layers is used to control appearances of the elements.
 * It's functionality is intended mainly (as the name implies) for IE6 browser.
 * It acts as a watch dog, hiding and showing elements which MUST be below specified elements,
 * but due to some buggy implementation in IE6 appear above these elements.
 * Common examples are select elements above div.
 * Sometimes it is possible to solve it by adding empty (but visible) iframe objects above div, but sometimes it's not.
 *
 * Note 1: all class names beginning with underscore should be considered private and not to be used outside this class
 * even if they look convenient. These methods are _tightly_ coupled with the rest of the functionality.
 *
 * Note 2: This class heavily assumes that it will be used in conjunction with
 * Hypher.net Javascript Object Library (HJOL) widgets.
 */
//#uses org.hypher.system.SystemInfo

function IE6Layers() {};
OOP.defineClass(IE6Layers);

/*
 * Adds element and tag names to be watched.
 * Element's oContainer attribute is used to determine size, position and visibility of the given widget.
 * @param element to watch
 * @param elementsToHide array of tag names to suppress
 */
IE6Layers.prototype.addToTop = function(element, elementsToHide) {
    if (element == null) {
        return;
    }
    
    this.elements.push(element);
    this.hideElements.push(IE6Layers.toArray(elementsToHide));
};

/*
 * Removes element from watcher's list.
 *
 * @param element to delete from watcher's list
 * @param element deleted element (the one you passed actually if element was removed) or null
 */
IE6Layers.prototype.remove = function(element) {
    for (var i = 0, ilen = this.elements.length; i < ilen; i++) {
        if (element == this.elements[i]) {
            this.elements.splice(i, 1);
            this.hideElements.splice(i, 1);
            return element;
        }
    }

    return null;
};

/*
 * Checks if the specified element is visible.
 * @param elem
 * @return true if element is visible and false otherwise
 */
IE6Layers.isVisible = function(elem) {
    if (elem == null || elem.oContainer == null) {
        return false;
    }

    return elem.oContainer.style.visibility != 'hidden' && elem.oContainer.style.display != 'none';
};

/* PRIVATE
 * Returns a list of elements to hide.
 */
IE6Layers.prototype._getElementsToHide = function() {
    var toHide = [];
    for (var i = 0, ilen = this.elements.length; i < ilen; ++i) {
        var element = this.elements[i];
        if (!IE6Layers.isVisible(element)) {
            continue;
        }
        var elementType = this.hideElements[i];

        var possibleElements = IE6Layers.toArray(document.getElementsByTagName(elementType));
        for (var j = 0, jlen = possibleElements.length; j < jlen; ++j) {
            var possibleElement = possibleElements[j];
            if (IE6Layers.areIntersecting(possibleElement, element.oContainer)) {
                toHide.push(possibleElement);
            }
        }
    }
    return toHide;
};

/* PRIVATE
 * Checks if specified array contains specified element. Checks ids of the elements.
 * @param array
 * @param element
 * @returns true if array contains specified element
 */
IE6Layers.arrayContains = function(array, element) {
    if (array == null) {
        return false;
    }

    for (var i = 0, ilen = array.length; i < ilen; ++i) {
        if (array[i].id == element.id) {
            return true;
        }
    }

    return false;
};

/* PRIVATE
 * Checks if two objects are intersecting on screen.
 * @param object
 * @param object
 * @return true if any object overlaps another, false otherwise
 */
IE6Layers.areIntersecting = function(a, b) {
    var containerSize = Point.fromElementSize(a);
    var containerPosition = Point.fromElementPosition(a);

    var widgetSize = Point.fromElementSize(b);
    var widgetPosition = Point.fromElementPosition(b);

    //
    var dx = widgetPosition.x - containerPosition.x;
    var dy = widgetPosition.y - containerPosition.y;

    /*
     * Elements intersect on x axis if:
     * Ax + Awidth > Bx and Bx + Bwidth > Ax
     * Same goes for the y axis:
     * Ay + Aheight > By and By + Bheight > Ay
     *
     * -Bwidth  < (Bx - Ax) < Awidth
     * -Bheight < (By - Ay) < Aheight
     */
    return (-widgetSize.x < dx && dx < containerSize.x
        &&  -widgetSize.y < dy && dy < containerSize.y);
};

/* PRIVATE
 * Returns elements that no longer needed to be hidden
 * @param elements that _need_ to be hidden
 * @return elements that could be shown
 */
IE6Layers.prototype._getElementsToShow = function(toHide) {
    var toShow = [];
    for (var i = 0, ilen = this.hidden.length; i < ilen; ++i) {
        var element = this.hidden[i];
        if (!IE6Layers.arrayContains(toHide, element)) {
            toShow.push(element);
        }
    }
    return toShow;
};

/*
 * Sets visibility of the given elements
 * @param elements
 * @param visibility
 */
IE6Layers.setVisibility = function(elements, visibility) {
    for (var i = 0, ilen = elements.length; i < ilen; i++) {
        elements[i].style.visibility = visibility;
    }
};

/*
 * Appends elements to 'hidden' array.
 * @param elements to add
 */
IE6Layers.prototype._mergeHidden = function(hidden) {
    for (var i = 0, ilen = hidden.length; i < ilen; i++) {
        var element = hidden[i];
        if (!IE6Layers.arrayContains(this.hidden, element)) {
            this.hidden.push(element);
        }
    }
};

/*
 * Updates visibility of the elements.
 */
IE6Layers.prototype.update = function() {
    var toHide = this._getElementsToHide();
    IE6Layers.setVisibility(toHide, 'hidden');

    this._mergeHidden(toHide);

    var toShow = this._getElementsToShow(toHide);
    IE6Layers.setVisibility(toShow, '');
};

/*
 * Returns null-safe array.
 * @param iterable
 * @return empty array if iterable is null and iterable otherwise.
 */
IE6Layers.toArray = function (iterable) {
    if (iterable == null) {
        return [];
    }

    return iterable;
};

IE6Layers.init = function() {
    if (typeof(ie6LayersWatchDogHandler) != 'undefined') {
        return ie6LayersWatchDogHandler;
    }
    else {
        var instance = new IE6Layers();
        instance.hidden = [];
        instance.elements = [];
        instance.hideElements = [];

        // IE6Layers watch dog
        instance.watchDog = (BrowserInfo.getCurrent().isIE6())
                ? setInterval(function() { instance.update(); }, 500)
                : 0;

        return instance;
    }
};

// watchdog handler - to be used where its functionality is desired
var ie6LayersWatchDogHandler = IE6Layers.init();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/watchdog/IE6Layers.js

var _PACKAGE="org.hypher.ui.jswt";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingCanvas.js

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

//#extends org.hypher.ui.jswt.Canvas
//#uses org.hypher.ui.util.DragHelper
//#uses org.hypher.ui.util.DOMBuilder
//#uses org.hypher.util.Point
//#uses org.hypher.util.MouseUtil 
//#uses org.hypher.watchdog.PositionWatchDog
//#uses org.hypher.watchdog.IE6Layers

function FloatingCanvas()
{
    this.oContainer = null;
    this.attachment = null;
    
    this.onWindowClick = null;
}

OOP.defineClass(FloatingCanvas, Canvas);

FloatingCanvas.prototype.setup = function()
{
    this.callSuper(arguments.callee, document.body);
}

FloatingCanvas.prototype.render = function()
{
    this.oContainer = DOMUtil.newElement("div", this.oRoot);
    
    this.oContainer.style.position = "absolute";
    this.oContainer.style.display = "none";
}

FloatingCanvas.prototype.hookWindowClick = function(cb1, cb2)
{
    if (!this.onWindowClick)
    {
        var FloatingCanvas_this = this;
        Callbacks.hookEvent(DOMUtil.getGlobalEventElement(), "onclick", function(ev)
        {
            if (!DOMUtil.isChildElem(this.oContainer, ev.target) && FloatingCanvas_this.isVisible())
                FloatingCanvas_this.onWindowClick(ev, window);
        });
        
        this.onWindowClick = new Function();
    }
    
    Callbacks.hookEvent(this, "onWindowClick", cb1, cb2);
}

FloatingCanvas.prototype.setVisible = function(visible)
{
    if (this.attachment)
    {
        if (visible)
        {
            this.attachment.bind(this);
            positionWatchdogHandler.add(this.attachment);
            ie6LayersWatchDogHandler.addToTop(this, ['select']);
        }
        else
        {
            this.attachment.release();
            positionWatchdogHandler.remove(this.attachment);
            ie6LayersWatchDogHandler.remove(this);
        }
    }
    
    this.oContainer.style.display = visible ? "" : "none";
    
    if (visible && this.attachment)
        this.attachment.updatePosition();
}

FloatingCanvas.prototype.isVisible = function()
{
    return (this.oContainer.style.display != "none");
}

FloatingCanvas.prototype.setPosition = function(pos)
{
    this.oContainer.style.left = pos.x + "px";
    this.oContainer.style.top = pos.y + "px";
}

FloatingCanvas.prototype.getPosition = function()
{
    return Point.fromElementPosition(this.oContainer);
}

FloatingCanvas.prototype.getSize = function()
{
    return Point.fromElementSize(this.oContainer);
}

FloatingCanvas.prototype.attach = function(attachment)
{
    if (this.attachment)
        this.attachment.release();
    
    this.attachment = attachment;
    this.attachment.bind(this);
}

FloatingCanvas.prototype.unattach = function(attachment)
{
    if (this.attachment)
        this.attachment.release();
    
    this.attachment = null;
}

FloatingCanvas.prototype.attachToElement = function(element, xAlign, yAlign)
{
    this.attach(new FloatingCanvas.ElementAttachment(element, xAlign, yAlign));
}

FloatingCanvas.prototype.attachToMouse = function(offset)
{
    this.attach(new FloatingCanvas.MouseAttachment(offset));
}

///////////////////////////////////////////////////////////////////////////////
// Attachment                                                                //
///////////////////////////////////////////////////////////////////////////////
FloatingCanvas.Attachment = function Attachment()
{
    this.floatingCanvas = null;
}
FloatingCanvas.Attachment.NAME = "Attachment";
FloatingCanvas.defineClass(FloatingCanvas.Attachment);

FloatingCanvas.Attachment.prototype.abstractMethod("updatePosition");
FloatingCanvas.Attachment.prototype.abstractMethod("register");
FloatingCanvas.Attachment.prototype.abstractMethod("unregister");


FloatingCanvas.Attachment.prototype.bind = function(floatingCanvas)
{
    if (this.floatingCanvas)
        this.release();
    
    this.floatingCanvas = floatingCanvas;
    this.register();
}

FloatingCanvas.Attachment.prototype.release = function()
{
    this.unregister();
    this.floatingCanvas = null;
}


///////////////////////////////////////////////////////////////////////////////
// MouseAttachment                                                           //
///////////////////////////////////////////////////////////////////////////////
FloatingCanvas.MouseAttachment = function MouseAttachment(offset)
{
    this.$super();
    this.offset = offset ? offset : new Point(0, 0);
}
FloatingCanvas.MouseAttachment.NAME = "MouseAttachment";
FloatingCanvas.defineClass(FloatingCanvas.MouseAttachment, FloatingCanvas.Attachment);

FloatingCanvas.MouseAttachment.prototype.updatePosition = function()
{
    var pos = MouseUtil.getMousePosition();
    this.floatingCanvas.setPosition(pos.plus(this.offset));
}

FloatingCanvas.MouseAttachment.prototype.register = function()
{
    Callbacks.hookEvent(window, "onmousemove", this.callback("updatePosition"));
}
FloatingCanvas.MouseAttachment.prototype.unregister = function()
{
    Callbacks.unhookEvent(window, "onmousemove", this.callback("updatePosition"));
}

///////////////////////////////////////////////////////////////////////////////
// ElementAttachment                                                         //
///////////////////////////////////////////////////////////////////////////////
FloatingCanvas.ElementAttachment = function ElementAttachment(oAttached, xAlign, yAlign)
{
    this.$super();
    this.oAttached = oAttached;
    
    this.xAlign = xAlign;
    this.yAlign = yAlign;
}
FloatingCanvas.ElementAttachment.NAME = "ElementAttachment";
FloatingCanvas.defineClass(FloatingCanvas.ElementAttachment, FloatingCanvas.Attachment);

FloatingCanvas.ElementAttachment.LEFT   = 1;
FloatingCanvas.ElementAttachment.RIGHT  = 2;
FloatingCanvas.ElementAttachment.TOP    = 3;
FloatingCanvas.ElementAttachment.BOTTOM = 4;

FloatingCanvas.ElementAttachment.prototype.register = function() {}
FloatingCanvas.ElementAttachment.prototype.unregister = function() {}

FloatingCanvas.ElementAttachment.prototype.updatePosition = function()
{
    var aPos = Point.fromElementPosition(this.oAttached);
    var aSize = Point.fromElementSize(this.oAttached);
    var ePos = new Point();

    switch (this.xAlign)
    {
    case FloatingCanvas.ElementAttachment.LEFT:
        ePos.x = aPos.x;
        break;
    case FloatingCanvas.ElementAttachment.RIGHT:
        ePos.x = aPos.x + aSize.x;
        break;
    }
    
    switch (this.yAlign)
    {
    case FloatingCanvas.ElementAttachment.TOP:
        ePos.y = aPos.y;
        break;
    case FloatingCanvas.ElementAttachment.BOTTOM:
        ePos.y = aPos.y + aSize.y;
        break;
    }
    
    //Debug.info("aPos: " + aPos);
    //Debug.info("aSize: " + aSize);
    //Debug.info("ePos: " + ePos);
    
    this.floatingCanvas.setPosition(ePos);
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingCanvas.js

var _PACKAGE="org.hypher.util";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/BitSet.js

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

//#uses org.hypher.util.Point

function BitSet(initial)
{   
    this.value = 0;
    this.init(initial);
    this.callbacks = new Array;
    this.onChange = new Function();
    
    this.autoCallback = true;
}
OOP.defineClass(BitSet);

BitSet.forArg = function (defaultValue, value)
{
    if (typeof(value) != "undefined")
        return new BitSet(value);
        
    return new BitSet(defaultValue);
}

BitSet.prototype.hookChange = function (bits, callback)
{
    var entry = new BitSet.Watcher(bits, callback);
    
    this.callbacks.push(entry);
    return entry;
}

BitSet.prototype.changeValue = function (value)
{
    /**
     * Examples of how this works:
     * 
     * bits:    0010
     * old:     0100
     * new:     0110
     * 
     * bits & old = 0000
     * bits & new = 0010
     * Event fired.
     * 
     * 
     * bits:    0010
     * old:     0100
     * new:     0001
     * 
     * bits & old = 0000
     * bits & new = 0000
     * Event not fired.
     */ 
    
    if (value == this.value)
        return;
    
    var oldValue = this.value;
    this.value = value;
    
    if (this.autoCallback)
        this.doCallbacks(oldValue);
}

BitSet.prototype.doCallbacks = function(oldValue)
{
    if (oldValue == this.value)
        return;
    
    for (var i=0; i<this.callbacks.length; i++)
    {
        var entry = this.callbacks[i];
        if ((entry.bits & oldValue) != (entry.bits & this.value))
            entry.invoke(this.value, oldValue);
    }
    
    this.onChange(this.value);
}

BitSet.prototype.init = function(initial)
{
    if (OOP.isInstanceOf(initial, BitSet))
        this.value = initial.value;
        
    else if (initial)
        this.value = initial;
        
    else
        this.value = 0;
}

BitSet.prototype.has = function(value)
{
    return (this.value & value) != 0;
}
BitSet.prototype.excludes = function(value)
{
    return (this.value & value) == 0;
}
BitSet.prototype.add = function(value)
{
    this.changeValue(this.value | value);
    return this.value;
}
BitSet.prototype.remove = function(value)
{
    this.changeValue(this.value & (~value));
    return this.value;
}
BitSet.prototype.set = function(flag, value)
{
    if (value)
        this.add(flag);
    else
        this.remove(flag);
}
BitSet.prototype.getValue = function()
{
    return this.value;
}

BitSet.prototype.toString = function()
{
    return "Bitset{"+this.value+"}";
}

BitSet.Watcher = function Watcher(bits, callback)
{
    this.bits = bits;
    this.callback = callback;
    this.enabled = true;
}
BitSet.Watcher.NAME = "Watcher";
BitSet.defineClass(BitSet.Watcher);

BitSet.Watcher.prototype.invoke = function(a, b)
{
    if (this.enabled)
        this.callback(a, b);
}

BitSet.Watcher.prototype.setEnabled = function(value)
{
    this.enabled = value;
}

BitSet.Watcher.prototype.isEnabled = function()
{
    return this.enabled;
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/util/BitSet.js

var _PACKAGE="org.hypher.ui.controls";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/controls/ImageButton.js

//#extends org.hypher.ui.jswt.Canvas

JSOL.Class("ImageButton", Canvas);
    JSOL.Constructor(function(src, overSrc, title)
    {
        this.image = new Image;
        this.overImage = new Image;
        
        this.image.src = src;
        this.overImage.src = overSrc;
        this.title = title;
    });
    
    JSOL.Method("render", function()
    {
        with (new DOMBuilder(this.createContainer("img")))
        {
            setAttribute("src", this.image.src);
            setAttribute("oversrc", this.overImage.src);
            setStyle("cursor", "pointer");
            setStyle("cursor", "hand");
            
            ImageRolloverHelper.setupElement(getNode());
            
            setAttribute("title", this.title);
            hookEvent("onclick", this.callback("onclick"));
        }
    });
    
    JSOL.Event("onclick");
JSOL.End();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/controls/ImageButton.js

var _PACKAGE="org.hypher.ui.jswt.message";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/message/UIMessage.js

JSOL.Class("UIMessage");
    JSOL.Constructor(function (source, type, args)
    {
        this.source = source;
        this.type = type;
        this.args = args || new Object;
    });
    
    JSOL.Method("getSource", function()
    {
        return this.source;
    });
    
    JSOL.Method("getType", function()
    {
        return this.type;
    });
    
    JSOL.Method("getArg", function(name)
    {
        return this.args[name];
    });
    
    JSOL.Static("RESIZE", "resize");

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    JSOL.Class("ResizeMessage", UIMessage);
        JSOL.Constructor(function (source, size)
        {
            this.$super(source, UIMessage.RESIZE, {"size": size});
        });
        
        JSOL.Method("getSize", function(name)
        {
            return this.getArg("size");
        });
    JSOL.End();
JSOL.End();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/message/UIMessage.js

var _PACKAGE="org.hypher.ui.jswt";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingWindow.js

//#extends org.hypher.ui.jswt.FloatingCanvas
//#uses org.hypher.util.BitSet
//#uses org.hypher.util.Point
//#uses org.hypher.ui.util.DragHelper
//#uses org.hypher.ui.controls.ImageButton
//#uses org.hypher.ui.jswt.message.UIMessage

function FloatingWindow(title, options)
{
    this.title = title;
    this.options = new BitSet(options ? options : FloatingWindow.DEFAULT_OPTIONS);
    
    this.content = null;
    this.moveHelper = new DragHelper();
    this.resizeHelper = new DragHelper();
    
    // Elements
    this.oIcon = null;
    this.oTitle = null;
    
    this.oButtonContainer = null;
    
    this.oMinButton = null;
    this.oWindowButton = null;
    this.oCloseButton = null;
    this.oStatusBar = null;
    this.oResizeGrip = null;
    
    this.oContentPane = null;
    
    this.position = new Point(0, 0);
    this.oldPosition = null;
    
    this.size = new Point(640, 480);
    this.oldSize = null;

    Callbacks.hookEvent(this.moveHelper, "onDragUpdate", this.callback("handleDragging"));
    Callbacks.hookEvent(this.moveHelper, "onDragEnd", this.callback("handleDragEnd"));
    Callbacks.hookEvent(this.moveHelper, "onDragStart", this.callback("handleDragStart"));

    Callbacks.hookEvent(this.resizeHelper, "onDragUpdate", this.callback("handleResizing"));
    Callbacks.hookEvent(this.resizeHelper, "onDragEnd", this.callback("handleResizeEnd"));
    Callbacks.hookEvent(this.resizeHelper, "onDragStart", this.callback("handleResizeStart"));
}

FloatingWindow.BUTTON_CLOSE         = 0x0001;
FloatingWindow.BUTTON_WINDOWIFY     = 0x0002;
FloatingWindow.BUTTON_MINIMIZE      = 0x0004;
FloatingWindow.BUTTON_MAXIMIZE      = 0x0008;
FloatingWindow.SHOW_ICON            = 0x0010;
FloatingWindow.RESIZEABLE           = 0x0020;
FloatingWindow.MOVABLE              = 0x0040;
FloatingWindow.SCROLLING            = 0x0080;
FloatingWindow.STATUSBAR            = 0x0100;

FloatingWindow.DEFAULT_OPTIONS      = FloatingWindow.MOVABLE | FloatingWindow.SHOW_ICON |
                                      FloatingWindow.BUTTON_CLOSE | FloatingWindow.RESIZEABLE;

OOP.defineClass(FloatingWindow, FloatingCanvas);

FloatingWindow.prototype.render = function()
{
    this.callSuper(arguments.callee);
    
    with (new DOMBuilder(this.oContainer))
    {
        setStyle("border", "2px outset black");
        
        element("div");
            setStyle("position", "relative");
            
            element("div");
                this.oTitle = element("div");
                    setStyle("backgroundColor", "#77a2d7");
                    setStyle("color", "white");
                    setStyle("textAlign", "center");
                    setStyle("fontSize", "16px");
                    setStyle("fontWeight", "bold");
                    setStyle("verticalAlign", "middle");
                    setStyle("cursor", "default");
                    
                    setStyle("position", "absolute");
                    setStyle("top", "0px");
                    setStyle("left", "0px");
                end();
                
                this.oIcon = element("img");
                    setStyle("position", "absolute");
                    setStyle("top", "0px");
                    setStyle("left", "0px");
                    setAttribute("src", "/media/img/hypher/window/default.gif");
                end();
                
                this.oButtonContainer = element("div");
                    setStyle("position", "absolute");
                    setStyle("top", "0px");
                    
                    //this.oMinButton = canvas(new ImageButton("/media/img/hypher/window/minimize.gif", "/media/img/hypher/window/minimize_over.gif"));
                    this.oCloseButton = canvas(new ImageButton("/media/img/hypher/window/close.gif", "/media/img/hypher/window/close_over.gif"));
                    Callbacks.hookEvent(this.oCloseButton, "onclick", this.callback("handleCloseClick"));
                end();
            end();
        
            element("div");
                this.oContentPane = getNode();

                setStyle("position", "absolute");
                setStyle("backgroundColor", "white");
                setStyle("border", "2px inset gray");
                setStyle("top", "24px");
                
                if (this.content)
                    canvas(this.content);
            end();
        
            element("div");
                this.oStatusBar = leafElement("span");
                this.oResizeGrip = element("img");
                    setStyle("position", "absolute");
                    setStyle("cursor", "se-resize");
                    setAttribute("src", "/media/img/hypher/window/resize.gif");
                end();
            end();
        end();
    }

    this.moveHelper.hookElement(this.oTitle);
    this.resizeHelper.hookElement(this.oResizeGrip);
}

FloatingWindow.prototype.handleCloseClick = function()
{
    this.setVisible(false);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
FloatingWindow.prototype.handleResizing = function()
{
    if (!this.oldSize)
        return;
    
    this.size = this.oldSize.plus(this.resizeHelper.getOffset());
    if (this.size.x < 150)
        this.size.x = 150;
    if (this.size.y < 100)
        this.size.y = 100;
    
    this.updateDisplay();
}

FloatingWindow.prototype.handleResizeEnd = function()
{
    this.oldSize = null;
}

FloatingWindow.prototype.handleResizeStart = function()
{
    this.oldSize = this.size;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

FloatingWindow.prototype.handleDragging = function()
{
    if (!this.oldPosition)
        return;
    
    this.setPosition(this.oldPosition.plus(this.moveHelper.getOffset()));
}

FloatingWindow.prototype.handleDragEnd = function()
{
    if (!this.oldPosition)
        return;
    
    this.position = this.oldPosition.plus(this.moveHelper.getOffset());
    this.oldPosition = null;
}

FloatingWindow.prototype.handleDragStart = function()
{
    this.oldPosition = this.position;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

FloatingWindow.prototype.setPosition = function(pos)
{
    this.callSuper(arguments.callee, pos);
    this.position = pos;
}

FloatingWindow.prototype.enablePersistance = function(name)
{
    if (!this.persistanceName)
    {
        this.persistanceName = name;
        
        var FloatingWindow_this = this;
        
        Session.global.hookSave(function()
        {
            FloatingWindow.setPref("settings-" + name + "-size", FloatingWindow_this.size);
            FloatingWindow.setPref("settings-" + name + "-pos", FloatingWindow_this.position);
        });
        
        var size = FloatingWindow.getPref("settings-" + name + "-size");
        var pos = FloatingWindow.getPref("settings-" + name + "-pos");
        
        if (size)
            this.size = size;
        
        if (pos)
            this.position = pos;
        
        if (this.oContainer)
            this.updateDisplay();
    }
}

FloatingWindow.prototype.updateDisplay = function()
{
    this.setPosition(this.position);
    this.oContainer.style.width = this.size.x + "px";
    this.oContainer.style.height = this.size.y + "px";
    
    this.oContentPane.style.width = (this.size.x - 4) + "px";
    this.oContentPane.style.height = (this.size.y - 28) + "px";
    
    this.oResizeGrip.style.left = (this.size.x - 9) + "px";
    this.oResizeGrip.style.top = (this.size.y - 9) + "px";
    
    this.oContentPane.style.overflow = this.options.has(FloatingWindow.SCROLLING) ? "auto" : "hidden";
    this.oTitle.innerHTML = this.title;
    
    this.oButtonContainer.style.left = (this.size.x - Point.fromElementSize(this.oButtonContainer).x) + "px";

    this.oTitle.style.width = this.size.x + "px";
    this.oTitle.style.height = "24px";
    
    this.dispatchMessage(new UIMessage.ResizeMessage(this, Point.fromElementSize(this.oContentPane)));
    
    this.oResizeGrip.style.display = this.options.has(FloatingWindow.RESIZEABLE) ? "" : "none";
}

FloatingWindow.prototype.dispatchMessage = function(message)
{
    if (this.content)
        this.content.bubbleMessage(message);
}

FloatingWindow.prototype.setContent = function(content)
{
    this.content = content;
    
    if (this.oContentPane)
    {
        this.oContentPane.innerHTML = "";
        content.setup(this.oContentPane);
        
        this.updateContent();
    }
}

FloatingWindow.prototype.updateContent = function()
{
    this.updateDisplay();
    
    // Do this again in 500ms so that the window has had a chance to render
    // and therefor have correct client sizes for things.
    setTimeout(this.callback("updateDisplay"), 100);
}

FloatingWindow.prototype.setSize = function(size)
{
    this.size = size;
    this.updateDisplay();
}

FloatingWindow.prototype.setVisible = function(visible)
{
    this.callSuper(arguments.callee, visible);
    if (visible)
        this.updateContent();
}

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/ui/jswt/FloatingWindow.js

var _PACKAGE="org.hypher.debug";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/DebugWindow.js

//#extends org.hypher.ui.jswt.FloatingWindow

with (JSOL)
{
Class("DebugWindow", FloatingWindow);
    Constructor(function()
    {
        this.$super("Debug Window");
        var FloatingWindow_this = this;
        
        Callbacks.doOnload(function (){
            FloatingWindow_this.setup();
            FloatingWindow_this.debugCanvas = new DebugWindow.DebugCanvas();
            FloatingWindow_this.setContent(FloatingWindow_this.debugCanvas);
            FloatingWindow_this.setVisible(false);
            FloatingWindow_this.setPosition(new Point(100, 100));
            
            FloatingWindow_this.enablePersistance("jsolInternalDebugWindow");
            
            var button = new DebugWindow.DebugButton(FloatingWindow_this);
            button.setup();
        });
    });
    
    Static("MAX_HISTORY", 20);
    
    Class("DebugButton", FloatingCanvas);
        Constructor(function (window)
        {
            this.window = window;
        });
        
        Method("render", function()
        {
            this.superMethod();
            
            with (new DOMBuilder(this.getContainer()))
            {
                setStyle("border", "2px solid red");
                setStyle("padding", "4px");
                setStyle("backgroundColor", "#800000");
                setStyle("color", "white");
                setStyle("cursor", "hand");
                setStyle("cursor", "pointer");
                
                hookEvent("onclick", this.callback("handleClick"));
                
                text("Debug");
                this.setVisible(true);
                this.setPosition(new Point(0, 0));
            }
        });
        
        Method("handleClick", function()
        {
            this.window.setVisible(true);
        });
    End();
    
    
    Class("DebugCanvas", Canvas);
        Constructor(function()
        {
            this.historyIndex = 0;
            
            this.history = this.getPref("history");
            
            if (! this.history || ! this.history.length)
                this.history = new Array;
            
            this.historyIndex = this.history.length;

            var DebugCanvas_this = this;
            Session.global.hookSave(function()
            {
                var storedHistory = new Array;
                for (var i = Math.max(0, DebugCanvas_this.history.length - DebugWindow.MAX_HISTORY); i<DebugCanvas_this.history.length; i++)
                    storedHistory.push(DebugCanvas_this.history[i]);
                
                DebugCanvas_this.setPref("history", storedHistory);
            });
        });
    
        Method("render", function()
        {
            with (new DOMBuilder(this.createContainer()))
            {
                setStyle("border", "2px inset gray");
                setStyle("position", "relative");
                this.oDisplay = element("div");
                    setStyle("overflow", "scroll");
                    setStyle("position", "absolute");
                    setStyle("left", "0px");
                    setStyle("top", "2px");
                    this.oConsole = element("div");
                    end();
                end();
                
                this.oInput = element("textarea");
                    setStyle("position", "absolute");
                    setStyle("left", "0px");
                    setStyle("top", "0px");
                    setStyle("height", "80px");
                    
                    setStyle("color", "gray");
                    text("Enter javascript here, or /help for a list of commands. Press Ctrl+Enter to execute.")
                    
                    hookEvent("onkeydown", this.callback("handleKeyPress"));
                    hookEvent("onfocus", function(ev, input)
                    {
                        if (input.style.color == "gray")
                        {
                            input.style.color = "";
                            input.value = "";
                        }
                    });
                    
                    hookEvent("onblur", function(ev, input)
                    {
                        if (input.value == "")
                        {
                            input.style.color = "gray";
                            input.value = "Enter javascript here, or /help for a list of commands. Press Ctrl+Enter to execute.";
                        }
                    });
                end();
            }
        });
        
        Method("handleResizeMessage", function(message)
        {
            var size = message.getSize();
            var inputSize = Point.fromElementSize(this.oInput);
            
            DOMUtil.setElementSize(this.oDisplay, new Point(size.x, size.y - inputSize.y - 16));
            DOMUtil.setElementPosition(this.oInput, new Point(null, size.y - inputSize.y - 8));
            DOMUtil.setElementSize(this.oInput, new Point(size.x, null));
        });
        
        Method("showMessage", function(result)
        {
            var msg = DOMUtil.newElement("span");
            msg.style.color = "navy";
            msg.innerHTML = result;
            this.showElement(msg);
        });
        
        Method("showElement", function(elem)
        {
            this.oConsole.appendChild(elem);
            DOMUtil.newElement("hr", this.oConsole);
            this.oDisplay.scrollTop = this.oDisplay.innerHTML.toString().length * 200;
        });
        
        Method("addHistory", function(msg)
        {
            if (msg && msg != "" && msg != this.history[this.history.length - 1])
                this.history.push(msg);
        });
        
        Method("handleKeyPress", function(ev, input)
        {
            var ctrl = ev.ctrlKey || ev.ctrlLeft || ev.ctrlRight;
            //Debug.info(ev.keyCode + " " + ctrl);
            
            if (ev.keyCode == 38 /* UP */ && ctrl)
            {
                if (this.historyIndex)
                {
                    if (this.historyIndex == this.history.length)
                        this.addHistory(input.value.toString());
                    
                    this.historyIndex --;
                    input.value = this.history[this.historyIndex];
                    input.focus();
                }
            }
            else if (ev.keyCode == 40 /* DOWN */ && ctrl)
            {
                if (this.historyIndex < this.history.length)
                {
                    this.historyIndex ++;
                    input.value = this.history[this.historyIndex] || "";
                    input.focus();
                }
            }
            
            else if (ev.keyCode == 13 && ctrl)
            {
                var code = input.value.toString();
                var result = "";
                
                this.history.push(code);
                this.historyIndex = this.history.length - 1;
                
                try
                {
                    if (code.substring(0, 1) == "/")
                    {
                        var cmd = code.split(/[ \t\n]/)[0].substring(1);
                        code = code.substring(cmd.length+2);
                        
                        switch (cmd)
                        {
                        case "d":
                        case "dump":
                            result = "<pre><b>Dump of <span style='color: green;'>"+code+"</span></b>:\n" + eval("StringUtil.dumpObject(" + code + ")") + "</pre>";
                            break;
    
                        case "l":
                        case "load":
                            {
                                result = "Loading " + code + "...";
                                OOP.requestClass(function() { Debug.info("Loading of " + code + " complete."); }, code);
                            }
                            break;
                            
                        case "classes":
                        {
                            var container = DOMUtil.newElement("ul");
                            this.dumpClassTree(JSObject.classInfo, container);
                            this.showElement(container);
                            return;
                        }
                            
                        case "c":
                        case "clear":
                        {
                            this.oConsole.innerHTML = "";
                            return;
                        }

                        case "h":
                        case "?":
                        case "help":
                        {
                            result = "<div style=\"border: 1px solid gray; background-color: #FAFAFA; font-weight: 100; color: black;\"><b>JSOL Debug Console Commands:<hr/>" +
                                    "<b>/dump (/d)</b> Prints an object dump of the given expression." +
                                    "<blockquote>" +
                                    "<b>/dump 12 + 2</b> will print <b>14</b>" +
                                    "</blockquote>" +
                                    "" +
                                    "<b>/load (/l)</b> Loads the given class into the current runtime space." +
                                    "<blockquote>" +
                                    "<b>/load org.hypher.ui.controls.DropdownSelector</b> will load the given class and print status messages." +
                                    "</blockquote>" +
                                    "" +
                                    "<b>/classes</b> Prints a list of all currently loaded classes" +
                                    "<br/>" +
                                    "<b>/clear (/c)</b> Clears the debug console" +
                                    "<br/>" +
                                    "<b>/help (/h or /?)</b> Prints this message" +
                                    "</div>";
                        }
                        break;
                        }
                    }
                    else
                    {
                        result = "<b>" + code + " = </b>" + eval(code);
                    }
                }
                catch (x)
                {
                    result = "<span style=\"color: red;\">ERROR: " + x + "</span>";
                }
                
                this.showMessage(result);
                
                input.select();
                input.focus();
            }
        });
        
        Method("dumpClassTree", function(clazz, container)
        {
            if (!clazz)
                return;
            
            var li = DOMUtil.newElement("li", container);
            DOMUtil.newTextElement(clazz.getFullName(), li);
            
            var ul = DOMUtil.newElement("ul");
            var parent = false;
            for (var i in OOP.fullClasses)
            {
                var subClass = OOP.fullClasses[i];
                if (subClass.superClass == clazz)
                {
                    parent = true;
                    this.dumpClassTree(subClass, ul);
                }
            }
            
            if (parent)
                li.appendChild(ul);
        })
    End();
End();
}

Callbacks.doOnload(function()
{
    if (Session.global.get("debug") == true)
        DebugWindow.instance = new DebugWindow();
});

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/DebugWindow.js

var _PACKAGE="org.hypher.debug";

// ----- Start Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/Debug.js

//#uses org.hypher.debug.DebugWindow

JSOL.Class("Debug");
    JSOL.Static("messages", null);
    
    JSOL.Static("message", function(msg)
            {
                if (DebugWindow.instance && DebugWindow.instance.debugCanvas)
                    DebugWindow.instance.debugCanvas.showMessage(msg);
                else
                {
                    if (Debug.messages == null)
                    {
                        Debug.messages = new Array;
                        Callbacks.doOnload(function()
                        {
                            setTimeout(function()
                            {
                                if (DebugWindow.instance)
                                {
                                    for (var i in Debug.messages)
                                        DebugWindow.instance.debugCanvas.showMessage(Debug.messages[i]);
                                }
                                Debug.messages = null;
                            }, 10);
                        });
                    }
                    
                    Debug.messages.push(msg);
                }
            });
    
    JSOL.Static("info", function(msg)
            {
                this.message("<span style='color: green'><b>Info:</b> " + msg + "</span>");
            });
    
    JSOL.Static("warning", function(msg)
            {
                this.message("<span style='color: orange'><b>Warning:</b> " + msg + "</span>");
            });
    
    JSOL.Static("error", function(msg)
            {
                this.message("<span style='color: red'><b>Error:</b> " + msg + "</span>");
            });
    
    JSOL.Static("dumpObj", function(obj, name)
            {
                this.message("<pre><b>Dump of " + (name || "object") + "</b>:\n" + StringUtil.dumpObject(obj) + "</pre>");
            });
    
    JSOL.Static("alertObj", function(obj, name)
            {
                alert("Dump of " + (name || "object") + ":\n" + StringUtil.dumpObject(obj));
            });
    
    JSOL.Static("enable", function(flag)
            {
                if (arguments.length == 0)
                    flag = true;
        
                if (flag)
                {
                    if (!DebugWindow.instance)
                        DebugWindow.instance = new DebugWindow();
                    
                    Session.global.set("debug", true);
                }
                else
                {
                    Session.global.set("debug", false);
                }
            });
JSOL.End();

// ----- End Consolidation: /home/bca/tomcat/webapps/media/js/classes/org/hypher/debug/Debug.js

