//
// stringUtil.js
//
// String utility functions for use by BCA client code. Version 3.1
//

// reduceString returns a string of length no greater than a specified maximum length.
// inputStr - The input string to reduce. If its length is less than the maximum specified
//      length, it is retruned.
// maxLength - The maximum length of the returned string, including any embedded ellipsis.
// ellipsis - A string used to indicate characters that have been removed. It is optional
//      and if not specified, " ... " is used.
// position - The position to remove characters if necessary from the input string. The
//      possible values are "front", "end" or "center". The default is "center" and is 
//      if the parameter is not specified.
// Returns - The original input string if it is null or its length is less than maxLength.
//      The returned string contains the ellipsis string placed in the specified position
//      concatenated with the remaining characters from the input string.

function reduceString(inputStr, maxLength, ellipsis, position)
{
    // If the input string is null or its length is not great enough
    // to be reduced, then just return the original string.
    
    if ((inputStr == null) || (inputStr.length == 0))
        return inputStr;
    var inputStrLen = inputStr.length;
    if (inputStrLen <= maxLength)
        return inputStr;
        
    // Use the defaults for optional parameters.
        
    if (typeof(ellipsis) == 'undefined')
        ellipsis = " ... ";
    if (typeof(position) == 'undefined')
        position = "center";    

    var ellipsisLen = (ellipsis == null) ? 0 : ellipsis.length;   
    var outputStrLen = maxLength - ellipsisLen;
    var outputStr = ellipsis;   
    
    // If the maximum length is less than the length of the ellipsis, just return the
    // ellipsis.
    
    if (outputStrLen > 0)
    {                
        switch (position.toLowerCase())
        {
            case "front" :
                outputStr = ellipsis + inputStr.substr(inputStrLen - outputStrLen);
                break;
            case "end" :
                outputStr = inputStr.substr(0, outputStrLen) + ellipsis;
                break;
            case "center" :    
            default :
            {
                // Split the string in pieces, each one half of the total number of
                // characters to be output (for the odd case, use the extra character
                // at the beginning of the string). Place the ellipsis in the middle.
                
                var firstLen = outputStrLen / 2;
                if ((outputStrLen % 2) == 1)
                    firstLen++;
                var secondLen = outputStrLen - firstLen;
                var secondPos = inputStrLen - secondLen;
                outputStr = inputStr.substr(0, firstLen) + ellipsis + inputStr.substr(secondPos);
                break;
            }
        }
    }
    return outputStr;
}

/* function trimWhitespace() trims all tabs and newlines from a string.  It was originally written for comparing strings of HTML, where one of the items in
the comparison was double-spaced and one was not.  Even though the items were identical, the different spacing made them look unequal.
With all whitespace removed, they compared more favorably.

This function will only remove whitespace that is not part of HTML content.  That is why it does not affect spaces (20h).  Only tabs and newlines get removed. */
function trimWhitespace(myString)
{
    var newString = new String();
    var strTemp = new String();
  
    for (i = 0; i < myString.length; ++i)
    {
        strTemp = myString.substring(i, i + 1);
        switch (strTemp.charCodeAt(0))
        {
          case 13:
            strTemp = "";
            break;
          case 10:
            strTemp = "";
            break;
          case 9:
            strTemp = "";
            break;
          default:
            strTemp = myString.substring(i, i + 1);
            break;
        }
        newString += strTemp;
    }
    return newString;
}

/* This function will trim any given substring from a bigger string. */
function trimCharacter(myString, mySubstring)
{
    var newString = new String();
    var strTemp = new String();
  
    for (i = 0; i < myString.length; ++i)
    {
        strTemp = myString.substring(i, i + 1);
        if (strTemp == mySubstring)
            strTemp = "";
        newString += strTemp;
    }
    return newString;
}

/* For whatever reason, we cannot compare the applet's snapshot with its current value with string equality comparisons in Mozilla.
   Therefore, here's a scheme to produce a checksum of a string based on its string length, sum of character codes and positions of characters.
   We need to make sure that "cat" does not produce the same checksum as "act" or "bbt".
   Note the 2 different versions of this function - one for IE, one for Mozilla. */
function getChecksumIE(myString)
{
    var checksum = 0;
    var myStringLength = myString.length;
    for (i = 0; i < myStringLength; ++i)
    {
        checksum += myString.charCodeAt(i) * i;
    }
    checksum += myStringLength;
    return checksum;
}

function getChecksumMozilla(myString)
{
    var checksum = 0;
    /* Go to ridiculous lengths to get the length of the string - workaround for Mozilla.
       First, break the string into an array of characters. */
    var myStringLength = 0;
    var arrMyString = myString.split("");
    /* Iterate this array, counting the steps.  This gives the length.  Dumb, huh?
       If this looks like it will return one less than the length of the string, that is intentional.
       Mozilla always adds an extra empty element to the 0th position of this array.
       This plus the fact that Mozilla returns {native code} rather than a number for string.length
       provides the reason for having a Mozilla-specific version of this function. */
    for (i = 0; i < arrMyString.length; ++i)
        myStringLength = i;
    
    for (i = 0; i < myStringLength; ++i)
    {
        checksum += myString.charCodeAt(i) * i;
    }
    checksum += myStringLength;
    return checksum;
}

// Here are two complimentary functions that will change a string from unescaped or javascript-escaped form to HTML and vise versa.
function text2HTML(text)
{
    if (text == null)
        text = "";
    // **** Do not remove entries 00h - 19h, 22h, 27h or 60h (or their character-doubles).  These are the most important ones! ****
    text = text.replace(/%00/g, "");
    text = text.replace(/%01/g, "");
    text = text.replace(/%02/g, "");
    text = text.replace(/%03/g, "");
    text = text.replace(/%04/g, "");
    text = text.replace(/%05/g, "");
    text = text.replace(/%06/g, "");
    text = text.replace(/%07/g, "");
    text = text.replace(/%08/g, "");
    text = text.replace(/%09/g, "");
    text = text.replace(/\n/g, "<br/>");
    text = text.replace(/%0A/g, "<br/>");
    text = text.replace(/%0B/g, "");
    text = text.replace(/%0C/g, "");
    text = text.replace(/%0D/g, "");
    text = text.replace(/%0E/g, "");
    text = text.replace(/%0F/g, "");
    text = text.replace(/%10/g, "");
    text = text.replace(/%11/g, "");
    text = text.replace(/%12/g, "");
    text = text.replace(/%13/g, "");
    text = text.replace(/%14/g, "");
    text = text.replace(/%15/g, "");
    text = text.replace(/%16/g, "");
    text = text.replace(/%17/g, "");
    text = text.replace(/%18/g, "");
    text = text.replace(/%19/g, "");
    text = text.replace(/%1A/g, "");
    text = text.replace(/%1B/g, "");
    text = text.replace(/%1C/g, "");
    text = text.replace(/%1D/g, "");
    text = text.replace(/%1E/g, "");
    text = text.replace(/%1F/g, "");
    text = text.replace(/%20/g, " ");
    text = text.replace(/%21/g, "!");
    text = text.replace(/\"/g, "&#34;");
    text = text.replace(/%22/g, "&#34;");
    text = text.replace(/%23/g, "#");
    text = text.replace(/%24/g, "$");
    text = text.replace(/%25/g, "%");
    text = text.replace(/%26/g, "&#38;");
    text = text.replace(/\'/g, "&#39;");
    text = text.replace(/%27/g, "&#39;");
    text = text.replace(/%28/g, "(");
    text = text.replace(/%29/g, ")");
    text = text.replace(/%2A/g, "*");
    text = text.replace(/%2B/g, "+");
    text = text.replace(/%2C/g, ",");
    text = text.replace(/%2D/g, "&%45;");
    text = text.replace(/%2E/g, ".");
    text = text.replace(/%2F/g, "/");
    text = text.replace(/%30/g, "0");
    text = text.replace(/%31/g, "1");
    text = text.replace(/%32/g, "2");
    text = text.replace(/%33/g, "3");
    text = text.replace(/%34/g, "4");
    text = text.replace(/%35/g, "5");
    text = text.replace(/%36/g, "6");
    text = text.replace(/%37/g, "7");
    text = text.replace(/%38/g, "8");
    text = text.replace(/%39/g, "9");
    text = text.replace(/%3A/g, ":");
    text = text.replace(/%3B/g, ";");
    text = text.replace(/%3C/g, "&lt;");
    text = text.replace(/%3D/g, "=");
    text = text.replace(/%3E/g, "&gt;");
    text = text.replace(/%3F/g, "?");
    text = text.replace(/%40/g, "@");
    text = text.replace(/%41/g, "A");
    text = text.replace(/%42/g, "B");
    text = text.replace(/%43/g, "C");
    text = text.replace(/%44/g, "D");
    text = text.replace(/%45/g, "E");
    text = text.replace(/%46/g, "F");
    text = text.replace(/%47/g, "G");
    text = text.replace(/%48/g, "H");
    text = text.replace(/%49/g, "I");
    text = text.replace(/%4A/g, "J");
    text = text.replace(/%4B/g, "K");
    text = text.replace(/%4C/g, "L");
    text = text.replace(/%4D/g, "M");
    text = text.replace(/%4E/g, "N");
    text = text.replace(/%4F/g, "O");
    text = text.replace(/%50/g, "P");
    text = text.replace(/%51/g, "Q");
    text = text.replace(/%52/g, "R");
    text = text.replace(/%53/g, "S");
    text = text.replace(/%54/g, "T");
    text = text.replace(/%55/g, "U");
    text = text.replace(/%56/g, "V");
    text = text.replace(/%57/g, "W");
    text = text.replace(/%58/g, "X");
    text = text.replace(/%59/g, "Y");
    text = text.replace(/%5A/g, "Z");
    text = text.replace(/%5B/g, "[");
    text = text.replace(/%5C/g, "\\");
    text = text.replace(/%5D/g, "]");
    text = text.replace(/%5E/g, "^");
    text = text.replace(/%5F/g, "_");
    text = text.replace(/`/g, "&#96;");
    text = text.replace(/%60/g, "&#96;");
    text = text.replace(/%61/g, "a");
    text = text.replace(/%62/g, "b");
    text = text.replace(/%63/g, "c");
    text = text.replace(/%64/g, "d");
    text = text.replace(/%65/g, "e");
    text = text.replace(/%66/g, "f");
    text = text.replace(/%67/g, "g");
    text = text.replace(/%68/g, "h");
    text = text.replace(/%69/g, "i");
    text = text.replace(/%6A/g, "j");
    text = text.replace(/%6B/g, "k");
    text = text.replace(/%6C/g, "l");
    text = text.replace(/%6D/g, "m");
    text = text.replace(/%6E/g, "n");
    text = text.replace(/%6F/g, "o");
    text = text.replace(/%70/g, "p");
    text = text.replace(/%71/g, "q");
    text = text.replace(/%72/g, "r");
    text = text.replace(/%73/g, "s");
    text = text.replace(/%74/g, "t");
    text = text.replace(/%75/g, "u");
    text = text.replace(/%76/g, "v");
    text = text.replace(/%77/g, "w");
    text = text.replace(/%78/g, "x");
    text = text.replace(/%79/g, "y");
    text = text.replace(/%7A/g, "z");
    text = text.replace(/%7B/g, "{");
    text = text.replace(/%7C/g, "|");
    text = text.replace(/%7D/g, "}");
    text = text.replace(/%7E/g, "~");
    text = text.replace(/%A0/g, " ");
    return text;
}

function HTML2text(text)
{
    if (text == null)
        text = "";
    text = text.replace("<br>", Chr(13));
    text = text.replace("&#34;", "\"");
    text = text.replace("&#38;", "&");
    text = text.replace("&#39;", "\'");
    text = text.replace("&lt;", "<");
    text = text.replace("&gt;", ">");
    HTML2text = text;
}

unescapeHTML = function(html)
{
    html = html.split("&lt;").join("<");
    html = html.split("&gt;").join(">");
    html = html.split("&amp;").join("&");
    
    return html;
}

//Split string into pair array by using delimeter only in first occurence.
function splitStringToPair(param, delimeter) {
    var index = param.indexOf(delimeter);
    var name = index == -1 ? param : param.substring(0, index);
    var value = index == -1 || index == param.length ? '' : param.substring(index + 1);
    return new Array(name, value);
}

/*
 *  Locale-sensitive function to parse a String to a Number. Returns NaN if the number can't be parsed.
 *
 *  This function is more forgiving than parseDouble(sz) or new Number(sz)
 *  because it strips out grouping characters (spaces, and "," or ".", depending on the current locale).
 *
 *  So the string  "1,234,567.89" is correctly parsed as 1234567.89 in US, UK, etc.,
 *  and the string "1.234.567,89" is correctly parsed in Germany, Italy, Belgium, Costa Rica, etc.
 *
 *  @param sz The string to parse.
 *  @return Number if the string was parsed. NaN otherwise.
 */
function parseNumberLoose(sz)
{
   // determine the locale's decimal separator (usually "." or ",")
   var dsep=(1.5).toString().charAt(1);
   
   // infer the locale's grouping separator as "," or "." (whichever the decimal separator is not)
   
   // remove grouping separator ("," or ".") chars, and all whitespace chars
   var regex = (dsep==".") ? /[\s,]/g : /[\s\.]/g ;
   var sz2 = sz.replace(regex, "");
   
   // use default locale behavior to parse stripped string as a number. 
   // NaN will be returned if unable to parse.
   return new Number(sz2);
}

