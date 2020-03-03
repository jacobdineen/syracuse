function appendSymbol(times, symbol, str, beforFirst){
    for (var i = 0; i < times; i++){
        if (beforFirst == true){
            str = symbol + str;
        } else {
            str += symbol;
        }
    }
    return str;
}


function Symbol(_symbol, _len){
    var symbol = _symbol;
    var len = _len;

    var defaultOutput = "";
    for (var i = 0; i < len; i++){
        defaultOutput += symbol;
    }

    this.getDefaultOutput = function() {
        return defaultOutput;
    }

    this.getFormattedDefaultOutput = function() {
        return defaultOutput;
    }

    this.getFormattedOutput = function(value) {
        if (value == -1){
            return defaultOutput;
        }
        return value;
    }

    this.getSymbol = function(){
        return symbol;
    }

    this.getLength = function(){
        return len;
    }
}

var ThousandSymbol = function(_symbol, _len){
    var baseClass = new Symbol(_symbol, _len);
    var MAX_PREFIX_LENGHT = 3;

    baseClass.getFormattedDefaultOutput = function(){
        return appendSymbol(MAX_PREFIX_LENGHT, baseClass.getSymbol(), baseClass.getDefaultOutput(), true);
    }

    baseClass.getFormattedOutput = function(value, prefix) {

        var count = MAX_PREFIX_LENGHT - prefix.length;
        var formattedPrefix = appendSymbol(count, baseClass.getSymbol(), prefix, true);

        if (value == -1){
            return baseClass.getDefaultOutput() + formattedPrefix;
        }

        var valueAsString = "" + value;

        if (valueAsString.length > baseClass.getLength()){
            valueAsString = valueAsString.substring(0, baseClass.getLength() - 2) + "..";
        }

        var count = baseClass.getLength() - valueAsString.length;
        valueAsString = formattedPrefix + valueAsString;
        valueAsString = appendSymbol(count, baseClass.getSymbol(), valueAsString, true);

        return valueAsString;
    }
    return baseClass;
}

var CentSymbol = function(_symbol, _len){
    var baseClass = new Symbol(_symbol, _len);

    baseClass.getFormattedDefaultOutput = function(){
        return baseClass.getDefaultOutput() + baseClass.getSymbol();
    }

    baseClass.getFormattedOutput = function(value, prefix, postfix) {

        if (postfix == "")
            postfix = baseClass.getSymbol();

        if (value == -1){
            return postfix + baseClass.getDefaultOutput();
        }

        var valueAsString = "" + value;

        return valueAsString + postfix;
    }

    return baseClass;
}


var hash = {
        "thousand": new ThousandSymbol("&nbsp;", 7),
        "hundred": new Symbol("&nbsp;", 1),
        "ten": new Symbol("&nbsp;", 1),
        "dollar": new Symbol("&nbsp;", 1),
        "dot": new Symbol("&nbsp;", 1),
        "cent": new CentSymbol("&nbsp;", 2)
    }

var suffixes = new Array("thousand", "hundred", "ten", "dollar", "dot", "cent");
var PREFIX_INDEX = 6;
var POSTFIX_INDEX = 7;

/**
 * param idPrefix: id of the
 * element containing the formatted currency data displayed to the user.
 * idPrefix
 */
function hideNField(idPrefix) {
    if (elem(idPrefix+'_currency_set')){
        elem(idPrefix+'_currency_set').style.display = "inline";
    }
    elem(idPrefix).style.display = "inline-block";
    var answer = elem('answer.' + idPrefix);
    answer.style.width = "";
    var inputParent = elem('inputParent.' + idPrefix);
    inputParent.style.overflow = "";
    inputParent.style.height = "";
    inputParent.style.display="none";
    var val = answer.value;
    var numbers = extractNumbers(val);
    if (numbers == "undefined") {
        for ( var i = 0; i < suffixes.length; i++) {
            elem(idPrefix + "_" + suffixes[i]).innerHTML = hash[suffixes[i]].getFormattedDefaultOutput();
        }
        answer.value = "";
    } else {
        for ( var i = 0; i < PREFIX_INDEX; i++) {
            elem(idPrefix + "_" + suffixes[i]).innerHTML = hash[suffixes[i]].getFormattedOutput(numbers[i], numbers[PREFIX_INDEX], numbers[POSTFIX_INDEX]);
        }
    }
}

/**
 * Returns whether value is number or not
 * Returns "true" if value is empty
 */
function isNumber (val) {
    return /<alg[^>]*>/.test(val) || extractNumbers(val) != "undefined" || val == "" || val == null;
}

function showNField(idPrefix)
{
    var inputParent = elem('inputParent.' + idPrefix);
    elem(idPrefix+'_currency_set').style.display = "none"; // Hide formatted output
    inputParent.style.display = "inline";
}


function stripCommas(val){
  var res = "";
  var length = val.length;
  var prev = length;
  var start = 0;
  if (val.indexOf('.')!=-1){
    start = val.length - val.indexOf('.');
  }

  for(var i= start + 3; i< length; i+=3 ){//look at every third symbol in string starting from it's end
      if (val.charAt(length -1 - i) == ','){
         res = val.substring(length - i, prev) + res;
         i++; //skip comma
         prev = length - i;
      }else {
         return val;
      }
  }
  res = val.substring(0, prev) + res;
  return  res;
}

function extractNumbers(val){
    val = ("" + val).replace(/\s/g, "");
    var prefix = "";
    var postfix = "";

    if (val.indexOf("-") != -1) {
      prefix = "-";
    }
    if (val.charAt(0) == '(' && val.charAt(val.length -1) == ')'){
       val =  val.substring(1,val.length -1);
       prefix = "(";
       postfix = ")"
    }
    if (val.indexOf("$") != -1) {
      val = val.substring(val.indexOf("$") + 1);
      prefix += "$ ";
    }
    if (val.charAt(0) == '(' && val.charAt(val.length -1) == ')'){
       val =  val.substring(1,val.length -1);
       prefix = "(" + prefix;
       postfix = ")"
    }
    var showCents = (val.indexOf('.') != -1 && val.indexOf('.') != (val.length - 1));
    val = stripCommas(val);
    if (isNaN(val) || val == '') {
      return "undefined";
    }

    var cen = "";
    var indexOfDot = val.indexOf('.');
    if (indexOfDot != -1) {
        cen = val.substring(indexOfDot + 1);
    }
    if (cen.length == 1) {
        cen = cen + "0";
    }

    val = Math.abs(val);
    var tho = Math.floor(val/1000);

    var hun = Math.floor((val-tho*1000)/100);
    var ten = Math.floor((val-tho*1000-hun*100)/10);
    var dol = Math.floor(val-tho*1000-hun*100 - ten*10);
    var dot = ".";

    if (val<1000) tho = -1;
    if (val<100) hun = -1;
    if (val<10) ten = -1;
    if (val <1) dol = 0;

    r = sn_correct(dol, 10, ten);
    dol = r[0];
    ten = r[1];

    r = sn_correct(ten, 10, hun);
    ten = r[0];
    hun = r[1];

    r = sn_correct(hun, 10, tho);
    hun = r[0];
    tho = r[1];

    if (!showCents || (cen == 0 && tho == hun == ten == dol == -1)) {
        cen = -1;
        dot = -1;
    }
    return new Array(tho, hun, ten, dol, dot, cen, prefix, postfix);
}

function sn_correct(val, max, val2) {
   var result = new Array();
   result[0] = val;
   result[1] = val2;
   if (val == max) {
      result[0] = 0;
      if (val2 == -1) {
        result[1] = 1;
      }
      else {
        result[1] = val2 + 1;
      }
    }
    return result;
}

function elem(id) {
    return document.getElementById(id);
}
