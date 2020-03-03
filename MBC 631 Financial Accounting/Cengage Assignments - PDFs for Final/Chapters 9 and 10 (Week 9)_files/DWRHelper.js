/* Copyright (c) 2005 Cengage Learning
 * 
 * This is a Cengage javascript class file that uses the HJOL,
 * which can be found in org/hypher at the root of this class structure. 
 */

//#import rjs:/ilrn/dwr/engine.js

/**
 * A set of utilities for catching DWR errors and logging them, for the most part.
 * DWRHelper is included as a pre-req of and DWR service in TNOW. It in turn ensures
 * that the DWR engine file is included and sets it up.
 */

function DWRHelper()
{
    
}

OOP.defineClass(DWRHelper);
DWRHelper.init = function()
{
    if (typeof(DWREngine) == "undefined")
        return;
    
    DWREngine.setErrorHandler(function (error)
    {
        if (error.name && error.message)
            DWRHelper.errors.push("DWR Error ("+error.name+") " + error.sourceURL + ":" + error.line + " : " + error.message);
        else
            DWRHelper.errors.push("DWR Error: " + error);
        
        DWRHelper.onerror(error);
        
        if (typeof(Debug)=="function")
            Debug.error("DWR: " + error);
    });
    
    DWREngine.setWarningHandler(function (warning)
    {
        DWRHelper.warnings.push("DWR Warning:" + warning);
        
        DWRHelper.onwarning(warning);
        
        if (typeof(Debug)=="function")
            Debug.warning("DWR: " + warning);
    });
    
    DWREngine.setVerb("POST");
}
DWRHelper.warnings = new Array;
DWRHelper.errors = new Array;

DWRHelper.enableAlerts = function()
{
    Callbacks.hookEvent(DWRHelper, "onerror", function (error)
            {
        if (error.name && error.message)
            alert("DWR Error ("+error.name+") " + 
                    error.sourceURL + ":" + error.line + " : " + error.message);
        else
            alert("DWR Error: " + error);
    });
            
    Callbacks.hookEvent(DWRHelper, "onwarning", function (warning)
            {
                alert("DWR Warning:" + warning);
            });
}

DWRHelper.onerror = new Function();
DWRHelper.onwarning = new Function();

DWRHelper.init();