if (typeof(__included_FormBasedItemAdapter_js) == "undefined") {
__included_FormBasedItemAdapter_js = true;
(function() {

function FormBasedItemAdapter(options)
{
    this.options = options;
    this.submitScript = [];
    this.NAV_BUTTON_LOCK_NAME = 'step-render';
}

FormBasedItemAdapter.prototype.getSubmitMap = function() {
    for(var i = 0; i < this.submitScript.length; i++) {
        filteredSubmitScript = filterSubmitScript(this.submitScript[i]);
        try {
            eval(filteredSubmitScript);
        } 
        catch (e) {
            if ("console" in window && "error" in window.console) {
                console.error("ERROR evaluating script", e);
                console.error("submit script length is ", this.submitScript.length, " out of ", i);
                console.error(filteredSubmitScript);
            }
            return {};
        }  
    }

    var form = this.getInputContainer();
    
    if( !form )
        return {};
        
    // all the needed props are in submit form
    var state = {};
    
    this.encodeFormState(state);
    return state;
}

FormBasedItemAdapter.prototype.processInFocusElement = function(state) {
    if (typeof(this.options.inFocusElementProcessor) == 'function') {
        this.options.inFocusElementProcessor(this.getInputContainer());
    }
}

FormBasedItemAdapter.prototype.doOnloadElementProcessing = function(state) {
    
    if (typeof(this.options.onLoadElementProcessor) == 'function') {
        this.options.onLoadElementProcessor(this.getInputContainer());
    }
}

FormBasedItemAdapter.prototype.encodeFormState = function(state) {

    this.processInFocusElement();
    
    var processSingleElement = this.getFormElementProcessor();
    
    if( typeof(processSingleElement) != 'function' )
        throw "processSingleElement must be a function";

    var elements = this.getInputs();

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        var value = processSingleElement(element);
        if (element.name != "" && value != null) {
            if ("console" in window && "error" in window.console) {
                if (element.name in state && state[element.name] != value) {
                    console.error("The following element is being overwritten!", element.name, " with ", value);
                }
            }
            state[element.name] = value;
        }
    }
}

FormBasedItemAdapter.prototype.setInteractive = function(interactive) {
    if( this.options.interactive == interactive)
        return;
        
    if( interactive )
        this.enableForm();
    else
        this.disableForm();
        
    this.options.interactive = interactive;
}

FormBasedItemAdapter.prototype.isInteractive = function() {
    return this.options.interactive;
}

FormBasedItemAdapter.prototype.enableForm = function() {
    //Created ILRN-48433 to track implementation of this when/if we decide
    // that it is necessary.
    throw 'FormBasedItemAdapter does not support enableForm() method.';
}

FormBasedItemAdapter.prototype.disableForm = function() {
    var cancelEvent = function(ev) {
        ev = ev || event;
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        ev.cancelBubble = true;
        return false;
    }

    var kids = this.getInputs();
    for (var i=0; i<kids.length; i++) {
        if (kids[i].onclick) kids[i].onclick = cancelEvent;
        if (kids[i].ondblclick) kids[i].ondblclick = cancelEvent;
        if (kids[i].onmousedown) kids[i].onmousedown = cancelEvent;
        if (kids[i].onmouseup) kids[i].onmouseup = cancelEvent;

        if (kids[i].onkeyup) kids[i].onkeyup = cancelEvent;
        if (kids[i].onkeydown) kids[i].onkeydown = cancelEvent;
        if (kids[i].onkeypress) kids[i].onkeypress = cancelEvent;

        kids[i].disabled = true;
    }
    this.getJsInputs().each(function(){
        var f = $(this);
        if (f.hasClass('inputField') && typeof(f.data('disable')) == 'function'){
            f.data('disable')();
        }
    })
}

FormBasedItemAdapter.prototype.getInputContainer = function() {
    return document.getElementById('covalentContainer_' + this.getId());
}

FormBasedItemAdapter.prototype.getInputs = function() {

    var inputs = jQuery(this.getInputContainer()).find("select, input, button, textarea").filter(function (index) {
        return jQuery(this).parents('.feedBackWidgetOverallContainer, .prevItems, .postItems').length == 0;
    });
    if (typeof stateFilter == "function") {
        inputs = inputs.filter(stateFilter);
    }
    return inputs.get();
}

FormBasedItemAdapter.prototype.getJsInputs = function(){
    return jQuery(this.getInputContainer()).find(".inputField").filter(function(index){
        return jQuery(this).closest('.feedBackWidgetOverallContainer').length == 0;
    });
}

FormBasedItemAdapter.prototype.getFormElementProcessor = function() {
    if( !this.options )
        return this.defaultFormElementProcessor;
        
    if( typeof(this.options.formElementProcessor) != 'function' ) {
        return this.defaultFormElementProcessor;
    }
    
    return this.options.formElementProcessor;
}

FormBasedItemAdapter.prototype.defaultFormElementProcessor = function(element) {
    var value = element.value;
    if (value == "##null") {
        throw "applets not loaded";
    }
    return value;
}

FormBasedItemAdapter.prototype.getId = function() {
    return this.options.id;
}

FormBasedItemAdapter.prototype.onPageLoad = function(item, renderer) {
    var beforeActions = this.options.beforeLoadActions? this.options.beforeLoadActions : new Array();

    for(var i = 0; i < beforeActions.length; i++) {
        var beforeAction = beforeActions[i];
        if(typeof(beforeAction) == 'function') {
            beforeAction();
        }
    }
    
    this.doOnloadElementProcessing();
    
    item.markUnmodified();
    
    if (typeof(renderer) == 'object' && typeof(renderer.render) == 'function') {
        renderer.render(item);
    }
    
    item.onItemLoad();
    
    var afterActions = this.options.afterLoadActions ? this.options.afterLoadActions : new Array();
    
    for(var i = 0; i < afterActions.length; i++) {
        var afterAction = afterActions[i];
        if(typeof(afterAction) == 'function') {
            afterAction();
        }
    }
}

FormBasedItemAdapter.prototype.onItemUnload = function(item) {
    var actions = this.options.ptOnUnloadActions? this.options.ptOnUnloadActions : new Array();
    for(var i = 0; i < actions.length; i++) {
        var action = actions[i];
        if(typeof(action) == 'function') {
            action(item);
        }
    }
}

FormBasedItemAdapter.prototype.onItemLoading = function() {
    if (window['navButtons']) {
        navButtons.disable(this.NAV_BUTTON_LOCK_NAME);
    }
    if (window['ItemStateSubmissionManager']) {
        ItemStateSubmissionManager.cancelAutoSave();
    }                        
}
    
FormBasedItemAdapter.prototype.onItemLoaded = function() {
    if (window['navButtons']) {
        navButtons.enable(this.NAV_BUTTON_LOCK_NAME);
    }
    if (window['ItemStateSubmissionManager']) {
        ItemStateSubmissionManager.restartAutoSave();
    }                        
}

FormBasedItemAdapter.prototype.hideFeedback = function(){}

FormBasedItemAdapter.prototype.addSubmitScript = function(submitScript) {
    this.submitScript.push(submitScript);
}

/* 
 * IMPORTANT: Export the public objects that we want visible to the outside world. Anything not exported here
 * will not be accessible to consumer applications.
 */
window.FormBasedItemAdapter = FormBasedItemAdapter;

})();
};
