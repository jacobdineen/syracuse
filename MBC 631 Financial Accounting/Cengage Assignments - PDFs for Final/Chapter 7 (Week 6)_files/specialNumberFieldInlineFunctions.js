function blurFunction(field, passedID, accountTitleID)
{
    hideNField(passedID);

    if (accountTitleID != "")
    {
        adjustAccountTitleIndentation(field.value, accountTitleID);
    }
}

function onclickFunction(passedID, answersCount)
{
    if (answersCount > 1)
    {
        elem(passedID + '_multiAnswer_holder').style.display = 'none';
        elem(passedID + '_currency_wrapper').style.display = '';
    }
    var el = elem(passedID+'_currency_set');
    if( el ) el.style.display = "none";
    elem('inputParent.'+passedID).style.display = "inline";
    elem('answer.' + passedID).focus();
}

function onFocusFunctions(field, passedID)
{
    showNField(passedID);
}
