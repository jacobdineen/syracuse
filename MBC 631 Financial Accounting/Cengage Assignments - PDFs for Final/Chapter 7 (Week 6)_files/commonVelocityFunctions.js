function calculateNumericFieldWidth(numChars, letterWidth, rejoinderIconWidth, inputEdgeWidth)
{
    // allow for commas
    if (numChars > 3)
        numChars += Math.floor((numChars -1) / 3);
    // allow for parenthesis
    numChars += 2;
    // allow for dollar sign
    numChars += 1;
    // calculate # of pixels with pad for rejoinder icon and edge width
    return Math.floor((numChars * letterWidth) + rejoinderIconWidth + inputEdgeWidth);
}

function adjustAccountTitleIndentation(value, ID)
{
    var accountTitleCell = document.getElementById(ID);
    if(!accountTitleCell)
    {
        return;
    }

    //using JS auto convert here, any value of that is essentially '0' like '000' does not cause auto indent
    if(value == '' || value == 0)
    {
        jQuery(accountTitleCell).removeClass('acc_indent');
    }
    else
    {
        jQuery(accountTitleCell).addClass('acc_indent');
    }
}

function insertYMDToAnswer(d, id){
    d = d || "";
    var ignoreYear = d.split('/').length == 2 ? true : false;
    var a = d.split("/");
    var space = "&#160;";
    var s;
    var escapedId = id.replace(".", "\\.");
    if (a.length == 3){
        var fd = jQuery.datepicker.formatDate("d/M./yy", new Date(a[2], a[1]-1, a[0]));
        s = fd.split("/");
        if (jQuery("#" + escapedId + "_y").hasClass("withComma")) {
            s[2] = ", " + s[2];
        }
    } else if (a.length == 2){
        var fd = jQuery.datepicker.formatDate("d/M./yy", new Date(2012, a[1]-1, a[0]));
        s = fd.split("/");
        s[2] = space;
    } else {
        s = [space, space, space];
    }
    if (ignoreYear){
        s[2] = "";
    }

    jQuery("#" + escapedId + "_d").html(s[0]);
    jQuery("#" + escapedId + "_m").html(s[1]);
    jQuery("#" + escapedId + "_y").html(s[2]);
    jQuery("#" + escapedId).val(d).trigger("change");
}

function setDefaultDate(id, itemIndex) {
    var input = document.getElementById(id);
    jQuery(input).datepicker("setDate", extractDateFromQuestion(itemIndex));
}

/**
 * Performs currying to call the function with the pre specified list of parameters;
 * @param fn The function to be transformed;
 */
function schonfinkelize(fn) {
    var slice = Array.prototype.slice,
        storedArgs = slice.call (arguments, 1);

    return function() {
        var newArgs = slice.call (arguments),
            args = storedArgs.concat(newArgs);
        return fn.apply(null, args);
    }
}

/**
 * Looks for date in top question, then in question and finally in second question;
 * writes down the found date into cache to prevent performing search for the same step multiple times;
 *
 * @param formats {Array} Array of valid formats - its regular expression and string representation;
 * @param itemIndex Item index;
 * @return {Date} Current date if no dates were found in questions or the first found result;
 */
function extractDateFromQuestionOriginal(formats, itemIndex) {
    var f = arguments.callee,
        topQuestionSpan = document.getElementById("topquestion_" + itemIndex),
        topQuestionContent = topQuestionSpan ? topQuestionSpan.innerHTML : "",
        questionSpan,
        questionContent,
        secondQuestionSpan,
        secondQuestionContent,
        result;

    if (!f.cache[itemIndex]){

        result = extractDate(formats, topQuestionContent);
        if (!result){
            questionSpan = document.getElementById("question_" + itemIndex);
            questionContent = questionSpan ? questionSpan.innerHTML : "";
            result = extractDate(formats, questionContent);
            if (!result){
                secondQuestionSpan = document.getElementById("secondquestion_" + itemIndex);
                secondQuestionContent = secondQuestionSpan ? secondQuestionSpan.innerHTML : "";
                result = extractDate(formats, secondQuestionContent);
                if (!result){
                    result = new Date();
                }
            }
        }

        f.cache[itemIndex] = result;
    }

    return f.cache[itemIndex];
}
extractDateFromQuestionOriginal.cache = {};
var extractDateFromQuestion = null;

/**
 * Looks for date in content string:
 * first of all, finds all strings in prespecified formats, given as parameter;
 * then, sorts them in the order of the appearing;
 * after that, tries to parse using datepicker.parseDate function;
 *
 * @param formats {Array} Array of valid formats - its regular expression and string representation;
 * @param content Content to be searched in;
 * @return Date extracted from the content string or undefined if no valid dates were found;
 */
function extractDate(formats, content){
    var matches = [],
        fLength = formats.length,
        mLength,
        i = 0,
        date, re;

    if (content != "") {
        for ( i ; i < fLength; i++){
            re = new RegExp(formats[i].tmpl, "gi");
            content.replace( re , function(date, index){
                matches.push({
                    date : date,
                    index : index,
                    format : formats[i].format
                });
            });
        }
        matches.sort(function(a, b){
            if (a.index < b.index)
                return -1;
            if (a.index > b.index)
                return 1;
            return 0;
        });

        mLength = matches.length;
        while (mLength--){
            try {
                date = jQuery.datepicker.parseDate(matches[0].format, matches[0].date, {});
                return date;
            } catch (e) {
                matches.shift();
            }
        }
    }

    return null;
}

(function($) {
    (function loadAccountingCalendar() {
        if (!jQuery.datepicker){
            setTimeout(function(){
                loadAccountingCalendar();
            }, 300);
            return;
        }
        if (!$.datepicker.accountingCalendarExtesionLoaded) {
            var innerGenerateHTML = $.datepicker._generateHTML;
            jQuery.extend(jQuery.datepicker, {
                // Overriding _generateHTML to add possibility of Custom setup.
                _generateHTML: function(inst){
                    var html = innerGenerateHTML.call(this, inst)
                    if (this._get(inst, 'showButtonPanel')){
                        var customChange = this._get(inst, 'performCustomHTMLChange');
                        if (this._get(inst, 'performCustomHTMLChange')) {
                            html = customChange.apply(this, [inst, html]);
                        }
                    }
                    return html;
                },
                // allow custom event functions
                _performCustomAction : function (id, actionName) {
                    var target = $(id);
                    var inst = this._getInst(target[0]);
                    var action = this._get(inst, actionName);
                    if (action) {
                        action.apply(inst, Array.prototype.slice.call(arguments, 2));
                    }
                },
                _selectDate : function(id, dateStr) {
                    var target = jQuery(id);
                    var inst = this._getInst(target[0]);
                    dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
                    if (inst.input)
                        inst.input.val(dateStr);
                    this._updateAlternate(inst);
                    if (inst.input)
                        inst.input.trigger('change'); // fire the change event
                    if (inst.inline || this._get(inst, 'notHideOnSelect'))
                        this._updateDatepicker(inst);
                    else {
                        this._hideDatepicker();
                        this._lastInput = inst.input[0];
                        if (typeof(inst.input[0]) != 'object')
                            inst.input.focus(); // restore focus
                        this._lastInput = null;
                    }
                },
                _onMonthChange: function (id, step) {
                    var target = jQuery(id);
                    var inst = this._getInst(target[0]);
                    var stepMonths = this._get(inst, "stepMonths");
                    jQuery.datepicker._adjustDate(id, step*stepMonths, "M");
                    inst.currentDay = inst.selectedDay;
                    inst.currentMonth = inst.selectedMonth;
                    inst.currentYear = inst.selectedYear;
                    if (inst.input) {
                        inst.input.val(this._formatDate(inst));
                        inst.input.trigger('change'); // fire the change event
                    }
                    this._updateDatepicker(inst);
                }
            });
            jQuery.datepicker.accountingCalendarExtesionLoaded = true;
        }
    }())
})(jQuery);

function attachDatePicker(id, uid, stepIndex, fieldIndex, postfix, cfg){
    if (!jQuery.datepicker || !jQuery.datepicker.accountingCalendarExtesionLoaded){
        setTimeout(function(){
            attachDatePicker(id, uid, stepIndex, fieldIndex, postfix, cfg);
        }, 300);
        return;
    }

    if (extractDateFromQuestion == null){
        extractDateFromQuestion = schonfinkelize(extractDateFromQuestionOriginal, getSupportedDateFormats(jQuery.datepicker.regional[""].monthNames, jQuery.datepicker.regional[""].monthNamesShort));
    }
    var cID = "answer." + uid + "_" + stepIndex + "_" + fieldIndex + postfix,
        defaultDate = extractDateFromQuestion(stepIndex);

    var transparentOverlap = jQuery("<div style='height:100%;width:100%;position:absolute;top:0;left:0;background:white;opacity:0;filter:alpha(opacity=1);'></div>");

    var calendarSettings = {
        dateFormat: "d/m/yy",
        showClearButton: true,
        notHideOnSelect: true,
        buttonImage:'',
        buttonImageOnly: false,
        beforeShow: function(){
            transparentOverlap.appendTo(document.body);
            widget.datepicker("setDate", widget.data("last_stored_date"));
        },
        onClose: function(){
            transparentOverlap.detach();
        },
        showOn:'focus',
        performCustomHTMLChange : function (inst, html) {
            //replace today button with close button
            html = html.replace(/<button type='button' class='ui-datepicker-current (.*?)>/i, function(){
                return "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' onclick='" +
                        "jQuery.datepicker._performCustomAction(\"#" + inst.id + "\", \"onClear\");'>";
            });
            //change visualy selected date on click
//            html = html.replace(/(<table\s+)(class="ui-datepicker-calendar")/i, function(s, part1, part2){
//                return part1 + 'onclick="' + dpuuid + '._performCustomAction(\'#' + inst.id + '\', \'onDateChange\', this, event);" ' + part2;
//            });
            html = html.replace(/<button type='button' class='ui-datepicker-close (.*?)>/i, function(){
                return "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover' onclick='" +
                        "jQuery.datepicker._performCustomAction(\"#" + inst.id + "\", \"onDone\");'>";
            });
            html = html.replace(/<a class='ui-datepicker-prev (.*?)>/i, function(){
                return "<a class='ui-datepicker-prev ui-corner-all' onclick='" +
                        "jQuery.datepicker._onMonthChange(\"#" + inst.id + "\", -1);' title='Prev'>";
            });
            html = html.replace(/<a class='ui-datepicker-next (.*?)>/i, function(){
                return "<a class='ui-datepicker-next ui-corner-all' onclick='" +
                        "jQuery.datepicker._onMonthChange(\"#" + inst.id + "\", 1);' title='Next'>";
            });
            if (cfg.interactive) {
                var commentChecked =  widget.data("is_comment");
                var ignoreYearChecked =  widget.data("is_ignore_year") || widget.data('datepicker').settings.dateFormat == "d/m";

                html = html.replace(/<div[^>]*?ui-datepicker-buttonpane/i, function (part) {
                    var interactivePage = '<div class="acc-custom-pane ui-datepicker-buttonpane ui-widget-content"><label style="padding: 7px 0px 0px 7px"><input type="checkbox" style="margin:0;" onchange="' +
                    'jQuery.datepicker._performCustomAction(\'#' + inst.id + '\', \'onInogereYearCheckbox\', this);"' + (ignoreYearChecked ? 'checked="true"': '') +'><nobr> Ignore Year</nobr></label><label style="padding: 7px 0px 0px 7px"><input type="checkbox" style="margin:0" onchange="' +
                    'jQuery.datepicker._performCustomAction(\'#' + inst.id + '\', \'onCommentCheckBox\', this);"' + (commentChecked ? 'checked="true"': '') +'><nobr> Comment</nobr></label></div>';
                    return interactivePage + part
                })

            }
            //ILRN-58716: APT>Calender field>Current date does not get highlighted
            setTimeout(function(){
                var day = jQuery(".ui-datepicker-calendar .ui-datepicker-current-day a");
                day.css("backgroundColor", day.css("backgroundColor")).css("color", day.css("color")).mouseover();
                day = jQuery(".ui-datepicker-calendar .ui-datepicker-today a");
                day.css("backgroundColor", day.css("backgroundColor")).css("color", day.css("color")).mouseover();
            },0);
            return html;

        },
        onClear: function(){
            widget.data("last_stored_date", "");
            hideCalendar ("");
        },
        onDone: function(){
            var value = jQuery.datepicker.formatDate (widget.data("is_ignore_year") ? "d/m" : "d/m/yy", widget.datepicker("getDate"));
            widget.data("last_stored_date", widget.datepicker("getDate"));
            hideCalendar (value);
        },
        showButtonPanel: true,
        //replace Toady button With Clear button
        currentText: 'Clear'
    };

    function hideCalendar (value) {
        if (cfg.interactive) {
            value = value || "blank";
            if (widget.data("onCloseAction")){
                if (!checkAnswerExistance(value)){
                    widget.data("onCloseAction")(value);
                } else {
                    alert("Multiple corrects with the same date are not allowed. Please change the dates.");
                    return;
                }
            }
        }
        else {
            insertYMDToAnswer(value, cID);
        }
        //move to time out as IE show widget again while processing current event
        setTimeout(function() {
            widget.datepicker("hide");
        });
    }

    if(cfg.interactive){
        calendarSettings.onInogereYearCheckbox = function(checkBox){
            widget.data("is_ignore_year", checkBox.checked);
        };
        calendarSettings.onCommentCheckBox = function (checkBox) {
            widget.data("is_comment", checkBox.checked);            
        };
    }

    var widget = jQuery(document.getElementById("widget_" + cID)).datepicker(calendarSettings);
    widget.data("is_ignore_year", ((cfg.value == "" || cfg.value == "blank") ? (cfg.dateFormat == "d/m") : /^\d{1,2}\/\d{1,2}$/.test(cfg.value)));
    widget.data("defaultDate", defaultDate);

    /**
     * Slip [ILRN-55218] Accounting PT > Open Calender widget > Select any date except defined date >
     * Click outside the widget>System displays selected date in focus instead of defined date on reopening the widget
     *
     * Added last_stored_date property to store last opened value;
     * This value is overridden only on 'close' and 'done' button clicks, not on 'select' event;
     */
    widget.data("last_stored_date", cfg.value == "" || cfg.value == "blank"
        ? defaultDate
        : jQuery.datepicker.parseDate (widget.data("is_ignore_year") ? "d/m" : "d/m/yy", cfg.value));

    jQuery(document.getElementById(cID + "_wrapper")).bind("click", function(e){
        if(cfg.interactive){
            accOnFieldClickCalendar(widget, id, uid, stepIndex, fieldIndex, e);
        }
        else
            widget.datepicker("show");
    });

    if(cfg.value == "" || cfg.value == "blank"){
        widget.datepicker("setDate", defaultDate);
    } else {
        widget.datepicker("setDate", jQuery.datepicker.parseDate (widget.data("is_ignore_year") ? "d/m" : "d/m/yy", cfg.value));
    }

    widget.keydown(function(event) {
        if (event.which === jQuery.ui.keyCode.ENTER) {
            event.preventDefault();
            calendarSettings.onDone();
        }
    });

}

/**
 * ILRN-53509: Accounting PT>Calender Widget> Author view in new window>
 * System allows the user to save multiple corrects with the same date
 *
 * Checks whether the specified value is present in a current answers array;
 * First of all, checks whether 'global_accdata' is available;
 * If yes, maps it to the array of values;
 * After that, looks for the specified value in the array;
 *
 * @param value The value to be looked for in the current answers array;
 * @return True if the specified value exists in the current answers array and false otherwise;
 */
function checkAnswerExistance(value){
    if (global_correctEditing == value) {
        return false;
    }
    var answers = [],
        answerExists = false;

    if (typeof window["global_accdata"] !== "undefined") {
        answers = jQuery.map(global_accdata, function(item){
            return item.value;
        }) || answers;
        answerExists = (jQuery.inArray(value, answers) != -1);
    }

    return answerExists;
}

RegExp.quote = function(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

function attachAutocomplete(element, reservedWords){
    if (!element.autocomplete){
        setTimeout(function(){
            attachAutocomplete(element, reservedWords);
        }, 300);
        return;
    }
    function hasMatchWord (val, isStart) {
        var re = isStart?
                RegExp.quote(val) + ".*":
                "^" + RegExp.quote(val) + "$";
        for (var i = 0; i < reservedWords.length; i++) {
            var item = reservedWords[i];

            var patt = new RegExp(re, item.caseSensitive? "m" :"im");
            if (patt.test(item.word)) {
                return true;
            }
        }
        return false;
    }
    var disable = false;
    element.autocomplete({
        appendTo: element.parent(),
        minLength: 2,
        source: createFilterFunction(reservedWords),
        open: function() {
            disable = true;
        },
        close: function() {
            disable = false;
            jQuery(this).focus();
        }
    }).bind( "blur", function(e) {
        if (!disable) {
            if (!hasMatchWord (e.target.value)) {
                jQuery(e.target).removeClass("invalidText").val("");
            }
            jQuery(e.target).change();
        }
    }).autocomplete( "widget" ).addClass('accounting_autocomplete');
    element.keyup(function(){
        var _val = jQuery(this).val();
        if (!hasMatchWord (_val, true) && _val.length > 1) {
            jQuery(this).addClass("invalidText");
        } else {
            jQuery(this).removeClass("invalidText");
        }
    });
    checkIE10();
}

function attachDropDown(element, source) {
    if (!element.dropdown){
        setTimeout(function(){
            attachDropDown(element, source);
        }, 300);
        return;
    }
    jQuery(source).show();
    element.dropdown({
        autowidth: true,
        maxwidth: 150,
        showArrow: true,
        sourceElement: source
    }).dropdown("widget").addClass('accounting_dropdown');
    element.parent().attr('title','');
    checkIE10();
}

function checkIE10() {
    if (navigator.userAgent.indexOf("MSIE 10") > -1) {
        document.body.classList.add("ie10");
    }
}

function createFilterFunction(reservedWords){
    return function(request, response) {
       var cache = {};
       if (request.term in cache) {
           response(cache[request.term]);
           return;
       }
       var filteredArray = jQuery.map(reservedWords, function(item) {
           var patt = new RegExp(RegExp.quote(request.term) + ".*", item.caseSensitive? "m" :"im");
           return (item.word.match(patt) ? item.word : null);
       });
       cache[request.term] = filteredArray;
       response(filteredArray);
   }
}

/**
 * Returns an array of objects, representing proper,
 * datepicker widget acceptable, format and regular expression,
 * corresponding to the specified format;
 *
 * @param monthNames {Array}  Array of valid month names;
 * @param monthNamesShort {Array} Array of valid short month names;
 */
function getSupportedDateFormats(monthNames, monthNamesShort){
    var monthNamesRe = monthNames.join("|"),
        monthNamesShortRe = monthNamesShort.join("|");

    return [
        {
            tmpl : "\\b\\d{1,2}\\/\\d{1,2}\\/\\d{4}\\b",
            format : 'mm/dd/yy'      //'mm/dd/yyyy'
        },
        {
            tmpl : "\\b\\d{1,2}\\/\\d{1,2}\\/\\d{2}\\b",
            format : 'mm/dd/y'       //'mm/dd/yy'
        },
        {
            tmpl : "\\b\\d{1,2}\\/\\d{1,2}\\b",
            format : 'mm/dd'
        },
        {
            tmpl : "\\b\\d{1,2}\\-\\d{1,2}\\-\\d{4}\\b",
            format : 'mm-dd-yy'      //'mm-dd-yyyy'
        },
        {
            tmpl : "\\b\\d{1,2}\\-\\d{1,2}\\-\\d{2}\\b",
            format : 'mm-dd-y'       //'mm-dd-yy'
        },
        {
            tmpl : "\\b\\d{1,2}\\-\\d{1,2}\\b",
            format : 'mm-dd'
        },
        {
            tmpl : "\\b\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\b",
            format : 'mm.dd.yy'      //'mm.dd.yyyy'
        },
        {
            tmpl : "\\b\\d{1,2}\\.\\d{1,2}\\.\\d{2}\\b",
            format : 'mm.dd.y'       //'mm.dd.yy'
        },
        {
            tmpl : "\\b\\d{1,2}\\.\\d{1,2}\\b",
            format : 'mm.dd'
        },
        {
            tmpl : "\\b(?:" + monthNamesRe + ")\\s+\\d{1,2},\\s+\\d{4}\\b",
            format : 'MM dd, yy'    //'MM dd, yyyy'
        },
        {
            tmpl : "\\b(?:" + monthNamesRe + ")\\s+\\d{1,2},\\s+\\d{2}\\b",
            format : 'MM dd, y'     //'MM dd, yy'
        },
        {
            tmpl : "\\b(?:" + monthNamesRe + ")\\s+\\d{1,2}\\b",
            format : 'MM dd'        //'MM dd'
        },
        {
            tmpl : "\\b(?:" + monthNamesShortRe + ")\\.\\s+\\d{1,2},\\s+\\d{4}\\b",
            format : 'M. dd, yy'     //'MMM. dd, yyyy'
        },
        {
            tmpl : "\\b(?:" + monthNamesShortRe + ")\\.\\s+\\d{1,2},\\s+\\d{2}\\b",
            format : 'M. dd, y'      //'MMM. dd, yy'
        },
        {
            tmpl : "\\b(?:" + monthNamesShortRe + ")\\.\\s+\\d{1,2}\\b",
            format : 'M. dd'         //'MMM. dd'
        }
    ];
}

jQuery(function(){
    //ILRN-53637 move title to top div in smart field in accounting PT
    jQuery('div > div[title="Incorrect"]').parent().attr('title','Incorrect');
    jQuery('div > div[title="Correct"]').parent().attr('title','Correct');
});

