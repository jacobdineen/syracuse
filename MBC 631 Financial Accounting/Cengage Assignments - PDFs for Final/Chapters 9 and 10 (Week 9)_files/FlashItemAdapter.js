if (typeof(__included_FlashItemAdapter_js) == "undefined") {
__included_FlashItemAdapter_js = true;
(function() {
    
/*
 * 
 * Covalent item general interface
 * 
 */

function FlashItemAdapter(options)
{
    this.options = options;
    this.pageLoaded = false;
    this.movieLoaded = false;
    this.NAV_BUTTON_LOCK_NAME = 'step-render';
}

FlashItemAdapter.prototype.getId = function() {
    return this.options.id;
}

FlashItemAdapter.prototype.setInteractive = function(interactive) {
    if( this.options.interactive == interactive)
        return;
        
    if( interactive )
        this.enableForm();
    else
        this.disableForm();
        
    this.options.interactive = interactive;
}

FlashItemAdapter.prototype.isInteractive = function() {
    return this.options.interactive;
}

FlashItemAdapter.prototype.enableForm = function() {
    this.getFlashMovie().enableForm();
}

FlashItemAdapter.prototype.disableForm = function() {
    this.getFlashMovie().disableForm();
}

FlashItemAdapter.prototype.getSubmitMap = function() {
    // wrap state in key/value pair
    return wrapState(this.options.id, this.getState());
}

FlashItemAdapter.prototype.renderItem = function(attemptNumber, showFeedback, interactive) {    

    // re-render item with new state and render options    
    try{
    
        var rendered = this.getFlashMovie().renderItem(this.getState(), interactive, showFeedback, attemptNumber);
        
        if( !rendered )
            return false;
            
        //just set the flag to show the new 'interactive' state.  the above
        //call to getFlashMovie().renderItem() should already have updated the movie.
        this.options.interactive = interactive;
        return true;
    }
    catch(err) {
        //if we have an error, retrun false so that we will do a full re-render.
        //if a flash movie does not support re-render, it will fall back to this functionality
        return false;
    }
}

FlashItemAdapter.prototype.clearItem = function() {
    // sending -1 for attemptNumber tells CFA to leave it unchanged
    return this.getFlashMovie().renderItem("", true, false, -1);
}

FlashItemAdapter.prototype.getState = function() {
    // get state as XML string
    
    // new CFA items implement getItemState instead of getState;
    // try both methods in case developers used the older version of CFA

    var state;
    try {
        state = this.getFlashMovie().getItemState();
    }
    catch(e) {
        try {
            // try to invoke deprecated CFA method
            state = this.getFlashMovie().getState();
        }
        catch(e) {
            // Flash movie hasn't loaded yet, or doesn't implement getItemState.
            // Either way, this is not fatal
        }
    }

    var funcName = 'validateFlashState' + this.getId();
    if(typeof(window[funcName]) != 'undefined') {
        window[funcName](state);
    }

    return state;
}


FlashItemAdapter.prototype.onPageLoad = function(item, renderer) {
    this.pageLoaded = true;

    if( !this.movieLoaded )
        return;

    this.onReadyActivities(item);
}

FlashItemAdapter.prototype.onItemUnload = function(item) {
    var actions = this.options.ptOnUnloadActions? this.options.ptOnUnloadActions : new Array();
    for(var i = 0; i < actions.length; i++) {
        var action = actions[i];
        if(typeof(action) == 'function') {
            action(item);
        }
    }
}

FlashItemAdapter.prototype.onItemLoading = function() {
    if (window['navButtons']) {
        navButtons.disable(this.NAV_BUTTON_LOCK_NAME);
    }
    if (window['ItemStateSubmissionManager']) {
        ItemStateSubmissionManager.cancelAutoSave();
    }                        
}
    
FlashItemAdapter.prototype.onItemLoaded = function() {
    if (window['navButtons']) {
        navButtons.enable(this.NAV_BUTTON_LOCK_NAME);
    }
    if (window['ItemStateSubmissionManager']) {
        ItemStateSubmissionManager.restartAutoSave();
    }                        
}

FlashItemAdapter.prototype.onMovieLoad = function(item) {
    if(this.movieLoaded) {
        // ignore duplicate notifications
        // this addresses a FF3 bug where plugins are loaded twice
        return;
    }
    
    this.movieLoaded = true;
    
    if( !this.pageLoaded )
        return;

    this.onReadyActivities(item);
}

FlashItemAdapter.prototype.resizeMovie = function(item, width, height) {
    var divId = "div_problemArea_" + item.getId();
    var divItem = document.getElementById(divId);
    divItem.style.height = height+"px";
    divItem.style.width = width+"px";
}

FlashItemAdapter.prototype.openUrl = function(item, url) {
    item.openUrl(url);
}

FlashItemAdapter.prototype.onReadyActivities = function(item) {
    item.markUnmodified();
    item.onItemLoad(false);
    CovalentItemManager.getInstance().renderCheckMyWork(item);
}

FlashItemAdapter.prototype.getInputs = function() {
    return [];
}

FlashItemAdapter.prototype.hideFeedback = function() {
    this.getFlashMovie().hideRejoinders();
}

//
//  convert state (XML string) to an associative array like: {
//  answer.0000000:<state> }
//
function wrapState(swfID, state) {
    var result = new Object();
    result["answer." + swfID] = state;
    result["go." + swfID] = 1;
    return result;
}


var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;


/*
 * 
 * js to communicate with Flash problem type embedded on the page
 * 
 */

FlashItemAdapter.prototype.getFlashMovie = function() {
    var swfID = ("problemArea_" + this.options.id);    
    return document.getElementById(swfID);
}

// need a FlashItemAdapter object to use the above functions


window.FlashItemAdapter = FlashItemAdapter;

})();
};
