//
// formTools.js
//
// Functions to manage and track form elements
//

// form element modification detection - 2 functions
// call the first function in the onload event handler
// the second function will return true if there is no modification,
// or the number (which represents the place in the form array) of the first modified element.
// NOTE: this will only work for text and textarea type objects.

var originalFormValues = [];
var selectedID;
function storeFormState( formName )
{
    var form = document.forms[formName];
    if (form == null)
        return;

    for ( var i = 0; i < form.length; i++ )
    {
        originalFormValues[i] = returnElementValue(form[i]);
    }
}

function trimWhitespacesAndCollapseNewlines (str)
{
    return ("" + str).replace (/\s+$/g, "").replace (/^\s+/g, "").replace (/\s\s+/gi, "\n");
}

function checkFormState( formName )
{
    if (typeof(readyAppletForFormCheck)!='undefined')
        eval(readyAppletForFormCheck);

    var form = document.forms[formName];
    if (form == null)
        return 'true';

    for ( var i = 0; i < form.length; i++ )
    {
          var str1 = filterBlank(filterMML(trimWhitespacesAndCollapseNewlines(originalFormValues[i])));
          var str2 = filterBlank(filterMML(trimWhitespacesAndCollapseNewlines(returnElementValue(form[i]))));
        if ( str1 != str2 )
            return i;
    }
    return 'true';
}

var BLANK_VALUES = ["'blank'", '"blank"', "blank"];

function resetFitbBlanks() {
  for (var i = 0; i < originalFormValues.length; i++) {
    for (var j = 0; j < BLANK_VALUES.length; j++) {
      if (originalFormValues[i] == BLANK_VALUES[j]) {
        originalFormValues[i] = "";
        break;
      }
    }
  }
}

function filterBlank(s) {
  for (var i = 0; i < BLANK_VALUES.length; i++) {
    if (BLANK_VALUES[i] == s) {
      return "";
    }
  }
  return s;
}

function filterMML(s) {
  if (s != null && s.replace(/\s+/g, '') == "<math><mrow><_empty/></mrow></math>") {
    return "";
  }
  else {
    return s;
  }
}

// This function will repopulate all the form elements on the page with the values stored in originalFormValues[].
// To be used if you need to post back to the server on a Cancel button click.
// This will reset the server's idea of what values to put in the XML, because it does not get the data
// from the database until you kill and restart the browser.  - Slip #9007  CarlosK

function repopulateForm(formName)
{
    var form = document.forms[formName];
    if (form == null)
        return;
    for ( var i = 0; i < form.length && i < originalFormValues.length; i++ ) {
        form.elements[i].value = originalFormValues[i];
    }
}

// Helper function for storeFormState and checkFormState. Returns the "value" of a form
// element.
function returnElementValue( formElement )
{
    var returnValue = "";

    // formState is used to remove the form element from consideration when detecting
    // if there is a change in the form, because the value is never changed. Thus, to
    // remove a form field from the check, just add a formState (expando) attribute to
    // the tag.

    var formState = formElement.getAttribute("formState");

    if (formState != null)
        returnValue = formState;
    else
    {
        // For check boxes and radio buttons use the checked state, and for drop-down
        // lists, use the selected index. For all other form fields, use the value.

        switch (formElement.tagName.toLowerCase())
        {
           case "input":
               var inputType = formElement.type;
               returnValue =  ((inputType == "checkbox") || (inputType == "radio")) ? formElement.checked : formElement.value;
               break;
           case "select":
               returnValue = formElement.selectedIndex;
               break;
           default:
               returnValue = formElement.value;
        }
    }

    return returnValue;
}

/**
 * Sets the action of the form to the given action and submits it.
 *
 * param formName the value of the name attribute of the form to submit.
 * param formAction [OPTIONAL] the action to submit the form to. If not
 * specified the form will be submitted to it's default action.
 */
function submitForm(formName, formAction)
{
	var form = jQuery(document.forms[formName]);
	if(formAction)
	{
		form.attr('action', formAction);
	}
	
	form.submit();
}

/**
 * Used to submit a form for a paginated page change.
 *
 * param pageNumber An int representing the new paginated page number to display
 * param formName The name of the form that should be submitted.
 * param ActionName [OPTIONAL] The action to submit the form to. Leave blank to
 * submit the form to its default action.
 */
function updatePageNumberAndSubmit(pageNumber, formName, ActionName)
{
    var currentForm = document.forms[formName];

    if (pageNumber == null || pageNumber != currentForm.pageNumber.value)
    {
        currentForm.pageNumber.value = pageNumber;
        submitForm(formName, ActionName);
    }
    else
    {
        return false;
    }
}

/**
 * Checks to see if any of the items in the array with the name
 * passed in are selected.
 */
function isItemSelected(itemName)
{
    var items = document.getElementsByName(itemName);
    var foundSelectedItem = false;
    var currentIndex = 0;

    while (!foundSelectedItem && currentIndex < items.length)
    {
        if (items[currentIndex].checked) {
            foundSelectedItem = true;
            selectedID = items[currentIndex].value;
        }

        currentIndex++;
    }

    return foundSelectedItem;
}

/**
 * Checks whether any of the radio buttons are checked in the given radio button set
 */
function isRadioButtonSelected(radioButtonSetName)
{
    isItemSelected(radioButtonSetName);
}

/**
 *    Checks to see if a check box is selected, same logic as radio buttons
 */
function isACheckboxSelected(checkboxName)
{
    return isItemSelected(checkboxName);
}

/**
 *    Checks to see if multiple checkboxs are selected.
 */
function isMultipleCheckboxSelected(checkboxName)
{
    var checkboxes = document.getElementsByName(checkboxName);
    var foundCheckedCheckBox= false;
    var foundAnotherCheckedCheckBox = false;

    for (var i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
        {
            if (foundCheckedCheckBox)
            {
                foundAnotherCheckedCheckBox = true;
                break;
            }

            foundCheckedCheckBox = true;
        }
    }

    return foundAnotherCheckedCheckBox;
}

function getNumberOfCheckedCheckBoxes(checkboxName)
{
    var checkboxes = document.getElementsByName(checkboxName);
    var checkCount = 0;

    for (var i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
            checkCount++;
    }

    return checkCount;
}

/**
 *    Toggles all of the checkboxes based on the headers selection
 */
function toggleAllCBs(checkboxName, headerCBName)
{
    var checked = document.getElementById(headerCBName).checked;
    var checkboxes = document.getElementsByName(checkboxName);

    for (var i = 0; i < checkboxes.length; i++)
    {
        checkboxes[i].checked = checked;
    }
}

/**
 *    Updates the header checkbox based on if all other checkboxes
 *  are selected or not.
 */
function updateHeaderCheckbox(checkboxName, topCheckBoxName)
{
    var checkboxes = document.getElementsByName(checkboxName);
    var checked = true;

    for (var i = 0; i < checkboxes.length; i++)
    {
        if (!checkboxes[i].checked)
        {
            checked = false;
            break;
        }
    }

    document.getElementById(topCheckBoxName).checked = checked;
}
function isLinked(list)
{
    if (list[selectedID] == "false")
        return false;
    else
        return true;
}

/**
 * Added/Modified for Bug Slip : ILRN-27623, ILRN-27707
 * Returns the count of selected checkboxes.
 *
 * param formName the value of the name attribute of the form to submit.
 * param checkboxName the checkbox name.
 */
function getCheckCount(formName, checkboxName) {
    var checkboxes = document.getElementsByName(checkboxName);
    var chkCnt = 0;

    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked)
            chkCnt++;
    }

    return chkCnt;
}

/**
 * Extends the width of a form select element, to display long option values,
 * when it has focus or when the mouse pointer is over it.
 *
 * param oSelector form select element
 * param bHasFocus whether the object currently has focus
 * param bIsOver whether the mouse pointer is over the object
 *
 */
function setSelectWidth(oSelector, bHasFocus, bIsOver)
{
    if(oSelector.freezeState)
        return;

    if(bHasFocus == null && bIsOver == null) //Reset max width
    {
        oSelector.maxWidth = null;
    }
    else
    {
        if(bHasFocus != null)
            oSelector.hasFocus = bHasFocus;

        if(bIsOver != null)
            oSelector.isOver = bIsOver;
    }

    if(oSelector.hasFocus || oSelector.isOver) //Expand the selector object
    {
        if(oSelector.maxWidth == null)
        {
            oSelector.style.width = "auto";
            oSelector.maxWidth = oSelector.offsetWidth;
        }
        if(oSelector.maxWidth >= oSelector.offsetWidth + oSelector.parentNode.offsetLeft) //Only expand if we need to
        {
            oSelector.style.width = oSelector.maxWidth + "px";
        }
    }
    else
    {
        oSelector.style.width = "100%";
    }
}
