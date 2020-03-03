//
// sysCheck.js
//

// determine afterCheckURL

function getAfterCheckURL()
{
        var afterCheckURL, tmp2, tmp3;
        var tmp = '';
        tmp += window.location;
        if ( tmp.indexOf( 'afterCheckURL' ) == -1 )
            afterCheckURL = '/ilrn/accounts/frontPorch.do';
        else
        {
            tmp2 = tmp.split( 'afterCheckURL=' );
            if ( tmp2[1].indexOf( '&' ) != -1 )
            {
                tmp3 = tmp2[1].split( '&' );
                afterCheckURL = unescape( tmp3[0] );
            }
            else
                afterCheckURL = unescape( tmp2[1] );
        }
        return afterCheckURL;
}

function detectNS_(ClassID, name) 
{
    var returnName = "";
    var mimeTypes = navigator.mimeTypes;
    if ((mimeTypes != null) && (mimeTypes[ClassID] != null) && (mimeTypes[ClassID].enabledPlugin != null))
    {
        returnName = name;
    }                
    return returnName;
}

function detectIE_(ClassID, name)
{
    document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
    document.write('on error resume next \n');
    document.write('result = (IsObject(CreateObject("'+ ClassID +'")))\n');
    document.write('</SCR' + 'IPT\> \n');
    if ((typeof(result) != 'undefined') && (result))
        return name+',';
    else
        return '';
}

// Determines whether an object is a window object (or at least an object for which
// the document property is defined)
function isWindow(object)
{
    return object && (object != null) && (typeof(object.document) != 'undefined');
}   

