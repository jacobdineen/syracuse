/*
 * General object to add new functions to any named document event handler.
 * Use:
 *   var e = new EventHandlerAdder('onload');
 *   e.addFunction('setFoo()');
 *   e.addFunction('setBar()');
 *   e.resetHandler();
 *   ... pile of html ...
 *   e.addFunciton('setSomeOtherFoo()');
 *   e.resetHandler();
 */
function EventHandlerAdder(eventHandler)
{
    this.eventHandler = eventHandler;
    this.functionsToAdd = new Array();
    this.addFunction = AddFunction;
    this.resetHandler = ResetHandler;
}

function AddFunction(f)
{
    this.functionsToAdd[this.functionsToAdd.length] = f;
}

function ResetHandler()
{
	var tmp;
    var tmp2;
    var oldHandlerValue;
    var newHandlerValue;
    var functionsToAddString;

    // capture current event handler
    tmp = '' + eval('window.' +  this.eventHandler );


    // prepare event handler for new function
    if ( tmp == 'undefined' || tmp == 'null' )
        oldHandlerValue = '';
    else
    {
        tmp = tmp.split("{");
        tmp2 = tmp[1].split("}");
        oldHandlerValue = tmp2[0];
        // add semi-colon if not at the end of old function
        tmp = ( oldHandlerValue.charAt( oldHandlerValue.length -2 ) != ';' ) ? ';' : '';
        oldHandlerValue += tmp;
        // get rid of newlines.
        var tmp3 = '';
        for ( var i = 0; i < oldHandlerValue.length; i++ )
        {
            if ( oldHandlerValue.charAt(i) != '\n' )
                tmp3 += oldHandlerValue.charAt(i);
        }
        oldHandlerValue = tmp3;
    }

    // make a string of the functions to add and deleting them from the array.
    functionsToAddString = '';
    while ( this.functionsToAdd.length > 0 )
    {
        functionsToAddString += ' ' + this.functionsToAdd.pop() + ';';
    }

    newHandlerValue = oldHandlerValue + functionsToAddString;
    // rewrite event handler
    
    //slip 18301 replace " with ' preventing issue in eval below
    var searchStr = '\"';
    var replaceStr = "\'";
    var re = new RegExp(searchStr, "g");
    newHandlerValue = newHandlerValue.replace(re, replaceStr);
    
    eval('window.' + this.eventHandler + ' = new Function (\"' + newHandlerValue + '\")');
}
