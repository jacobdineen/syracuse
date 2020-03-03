if (typeof(__included_API_js) == "undefined") {
__included_API_js = true;
(function() {

/*
 * Note: Since this script executes within a function, no variables or functions defined here will be available
 * outside this script unless explicitly exported into the Window object. See the end of this file for the exporting logic.
 */

/*
 * Firebug support. This script uses firebug for debugging information. If it is present, use it, otherwise create a
 * fake console object that does nothing.
 */
if (typeof(console) == "undefined")
    console = {error : new Function(), log : new Function(), trace : new Function()};

/*
 * Uncomment to test if we are breaking systems that alter array prototype.
 */
//Array.prototype.foo  = function(){ return "I break for in loops."; }

/**
 * CovalentItem represents a rendered CNow item and provides a client-side API to interact with the item. All the
 * covalent items on a page are managed by the CovalentItemManager, see below.
 *
 * Available options for CovalentItem:
 *
 * name: the item's name
 * id: the item's UID
 * formElementProcessor: function that knows how to serialize a form element value (previously called processSingleElement)
 * renderingContent : contextual information needed to re-render the item using AJAX
 * parentUid : The UID of the parent item, if any
 *
 * adapter: ...
 */

function CovalentItem(options)
{
    var itemAddOns = {};

    var itemHelpers = [ new DefaultCovalentItemHelper() ];

    var origFormData = null;

    var lastStateChangeData = null;
    var stateChangeListeners = [];
    var itemLoadedListeners = [];

    var onloadDependencies = [];
    var remainingDependencyTries = 300;

    var beforeItemRemovedListeners = [];

    // Reference to the public side of this object, gets set at the end of constructor when building the public object.
    var _this = null;

    function openUrl(url)
    {
        window.open(url);
    }

    /**
     * Should not be called directly. See CovalentItemManager.pageLoaded().
     */
    function onPageLoad(renderer)
    {
        if(!isOnloadDependencyReady())
        {
            setTimeout(function(){onPageLoad(renderer)}, 1000);
            return;
        }

        CovalentScriptManager.markScriptChildrenAsLoaded(getItemContainer());

        options.adapter.onPageLoad(_this, renderer);
    }
    
    function onItemLoad(rerender)
    {
        CovalentItemManager.getInstance().itemLoadedCallback(_this, rerender);
        for(var i = 0; i < itemLoadedListeners.length; i++)
        {
            itemLoadedListeners[i](_this);
        }
        
    }

    function onItemUnload()
    {
        clearInfoAndHint();
        clearRejoinders();
        options.adapter.onItemUnload(_this);
    }

    function renderItem(attemptNumber, showFeedback, interactive)
    {
        if(options.adapter.renderItem && typeof(options.adapter.renderItem) == 'function'){            
            return options.adapter.renderItem(attemptNumber, showFeedback, interactive);
        }

        return false;
    }

    function clearItem()
    {
        if(options.adapter.clearItem && typeof(options.adapter.clearItem) == 'function'){
            return options.adapter.clearItem();
        }

        return false;

    }
    
    function setInteractive(interactive)
    {
        options.adapter.setInteractive(interactive);
        
        trigger('interactivityChanged');
    }

    function isInteractive()
    {
        return options.adapter.isInteractive();
    }
    
    /**
     * Gets the rendered ID of the item. This corresponds to AbstractProblem#getUID() and should not be mistaken for
     * the item's internal ID, AbstractProblem#getID().
     */
    function getId()
    {
        return options.adapter.getId();
    }

    /**
     * Gets the container that wraps the entire item that is rendered by CNow.
     */
    function getItemContainer()
    {
        var container = document.getElementById(getItemContainerId());
        if (! container)
            throw "Unable to find covalent container for '" + getId() + "'";

        return container;
    }

    /**
     * Gets the id of the container that wraps the entire item that is rendered by CNow.
     */
    function getItemContainerId(){
        return "covalentContainer_" + getId();
    }
    
    /**
     * Get AJAX rendering context information.
     */
    function getRenderingContext()
    {
        return options.renderingContext;
    }

    function addLoadedScripts(newScripts)
    {
    	CovalentScriptManager.markScriptElementsAsLoaded(newScripts);
    }
    /**
     * Re-renders the item using the Covalent AJAX item rendering service.
     *
     * @param extraArgs (optional) specifies extra parameters which should be passed to the item rendering logic.
     */
    function rerender(extraArgs)
    {
        var submitString = getSubmitString();
        var renderingContext = options.renderingContext;

        var submitMap = getSubmitMap();

        if (extraArgs)
            for (var i in extraArgs)
                submitMap[i] = extraArgs[i];

        var submitString = "";

        for (var i in submitMap)
            submitString += encodeURIComponent(i+"") + "=" + encodeURIComponent(submitMap[i]+"") + "&";

        // Mark ourselves as unmodified now so modifications won't be picked up during re-rendering.
        markUnmodified();

        restServiceRender(submitString);
    }

    function restServiceRender(submitString)
    {
        var restData =
        {
            renderingContext: getRenderingContext(),
            submitStr: submitString
        };

        jQuery.ajax({
            type : "POST",
            url : createResourcePath('/ilrn/service/covalentRenderer/render'),
            data : restData,
            dataType : "json",
            success : function(ajaxData){
                handleAJAXUpdate(ajaxData);
            },
            error: function(err){ throw "Unable to re-render item " + getId() + ": " + err.statusText; }
        });
    }

    /**
     * Callback function that handles incoming AJAX data and re-renders the HTML on the page, loads scripts and calls
     * re-render callbacks.
     */
    function handleAJAXUpdate(ajaxData)
    {
        if (ajaxData.error)
        {
            setTimeout(function(){ throw "Unable to re-render item " + getId() + ": " + ajaxData.error; }, 0);
            return;
        }

        options.renderingContext = ajaxData.renderingContext;
        options.itemState = ajaxData.itemState;

        // Remove any child items that we may have

        removeChildItems();
        CovalentItemManager.getInstance().removeItems([_this]);
        
        var container = getItemContainer();
        var content = ajaxData.content;
        // Remove <!-- --> comments from code. Because IE8 throws error when trying add script node with comments.
        content = content.replace(/<script([^>]*?)>([\s\S]*?)<\/script>/g, function (str, p1, p2){
            if (p1.indexOf('src') != -1) {
                return str;
            } else {
                p2 = p2.replace(/^([\n\s\t]*?)<!--/, '$1');
                p2 = p2.replace(/-->([\n\s\t]*?)$/, '$1');
                return '<scri'+'pt' + p1 + '>' + p2 + '</scr'+'ipt>';
            }
        });
        jQuery(container).html(content);
        // Clear the itemAddOns list so it can be re-created by the scripts embedded in the content
        itemAddOns = {};

        // Load any script imports that haven't been imported yet
        CovalentScriptManager.loadScriptChildrenOfElement(function() {
            // Load any pending items (sub items that have added themselves)
            CovalentItemManager.getInstance().loadPendingItems();

            // Ask our Covalent Consumer to re-render its portions of this item (rejoinders, hints, etc...)
            CovalentItemManager.getInstance().consumerRenderItem(_this);

            // Check for state changes, which are likely since itemState may have been updated by AJAX.
            checkStateChange();

            // Tell the world that we rendered
            CovalentItemManager.getInstance().notifyItemRerendered(_this);

            // Trigger MathJax rendering
            typesetMathML(getItemContainerId());
        },
        getItemContainer());
    }

    /**
     * Disables the item and returns the submit string.
     */
    function submitItem()
    {
        disableForm();
        return getSubmitString();
    }
    
    /**
     * Disables input on the item.
     */
    function disableForm()
    {
        options.adapter.disableForm();
    }

    /**
     * Gets the map of answer data that should be sent back to the server so the item can be processed.
     */
    function getSubmitMap()
    {
        var state = options.adapter.getSubmitMap();

        // Append the item state information, if it is present
        if (options.itemState)
            state["covalentItemState"] = options.itemState;

        return state;
    }

    /**
     * Gets a URL-encoded version of the submit map.
     */
    function getSubmitString()
    {
        var data = '';
        var state = getSubmitMap();

        for (var key in state)
        {
            // Append "" to each value to coerce it to a string in case either of them is a number.
            // This is done because in Safari, encodeURIComponent doesn't work correctly for numeric data.
            data += encodeUtf8String("" + key) + "=" + encodeUtf8String("" + state[key]) + "&";
        }

        if (data.length)
            data = data.substring(0, data.length - 1);

        formData = data;

        return data;
    }

    function encodeUtf8String(s)
    {
        var r = '';

        for( var i = 0; i < s.length; i++ )
        {
            var hexChar = s.charCodeAt(i).toString(16);

            if( hexChar.length == 1 )
                hexChar = '0' + hexChar;
            else if (hexChar.length > 2)
            {
                if (hexChar.length == 3)
                    hexChar = '0' + hexChar;

                hexChar = 'u' + hexChar;
            }
            r += '%' + hexChar;
        }

        return r;
    }
    
    function clearRejoinders()
    {
        var oldRejoinders = clearItemAddOns(CovalentItem.TYPE_REJOINDER);

        jQuery.each(oldRejoinders, function(i, rejoinder) {
            rejoinder.remove();
        });

        if (typeof(MultipleCorrectsPopupHandler) != 'undefined'){
            MultipleCorrectsPopupHandler.removePopups();
        }
    }
    
    function trigger(event, data)
    {
        jQuery(_this).trigger(event, data);
    }
    
    function bind(event, fn)
    {
        jQuery(_this).bind(event, fn);
    }

    /**
     * Adds a rejoinder to this item.
     */
    function addRejoinder(rejoinder)
    {
        rejoinder.setItem(this);
        getRejoinders().push(rejoinder);
        
        trigger('rejoinderAdded', rejoinder);
    }


    /**
     * Get all rejoinder objects associated with this item.
     */
    function getRejoinders()
    {
        return getItemAddOns(CovalentItem.TYPE_REJOINDER);
    }

    /**
     * Sets current state of the item to be the base state from which to decide if modified or not.
     */
    function markUnmodified()
    {
        origFormData = lastStateChangeData = getSubmitString();
    }

    /**
     * Returns true if modified, false otherwise.
     */
    function isModified()
    {
        if (typeof(options.adapter.isModified) == 'function')
        {
            return options.adapter.isModified(); 
        }
        return isStatesDifferent (origFormData, getSubmitString());
    }

    /**
     * Returns true if different, false otherwise.
     */
    function isStatesDifferent (state1, state2)
    {
        if (state1 === undefined) state1 = null;
        if (state2 === undefined) state2 = null;

        return state1 != null && state2 == null
            ? true
            : state1 == null && state2 != null
                ? true
                : state1 == state2
                    ? false
                    : !compareEncoded(state1, state2, "|><|");
    }

    /**
     * Returns true if values with removed delimiters are equal, false otherwise;
     * @param val1 The first value to be compared
     * @param val2 The second value to be compared
     * @param delimiter Delimiter to be removed
     */
    function compareEncoded(val1, val2, delimiter)
    {
        var regExp = new RegExp(encodeUtf8String(delimiter));
        return val1.replace(regExp,"") == val2.replace(regExp,"");
    }
    
    /**
     * Check if sub items are modified by asking the adapter. If no sub items 
     * exist, check if the item itself is modified.
     * @returns boolean for if sub items have been modified
     */
    function hasModifiedItem()
    {
        if (typeof(options.adapter.hasModifiedItem) == 'function')
        {
            return options.adapter.hasModifiedItem(); 
        }
        return isModified();
    }

    /**
     * Adds an item helper.  Item helpers should implement all the same methods as DefaultCovalentItemHelper.
     *
     */
    function addItemHelper(helper)
    {
        itemHelpers.push(helper);
    }

    /**
     * Tells this item to hide all feedback (rejoinders and any other feedback elements).
     */
    function hideFeedback()
    {
        for(var i = 0; i < itemHelpers.length; i++)
            itemHelpers[i].hideFeedback();

        options.adapter.hideFeedback();
    }

    /**
     * Adds a listener to be notified when item state changes. Functions
     * should accept a CovalentItem as argument.
     */
    function addStateChangeListener(listener)
    {
        stateChangeListeners.push(listener);
    }
    
    function checkStateChange(stateChangeMessage)
    {
        if( stateChangeListeners.length == 0 )
            return;

        var currentState = getSubmitString();
        if(lastStateChangeData == currentState)
            return;

        lastStateChangeData = currentState;

        notifyStateChangeListeners(stateChangeMessage);
    }
    
    function notifyStateChangeListeners(stateChangeMessage)
    {
        jQuery.each(stateChangeListeners, function(i, callback) {
           callback(_this, stateChangeMessage); 
        });
    }

    /**
     * Adds a listener to be notified when item is loaded. Functions
     * should accept a CovalentItem as argument.
     */
    function addItemLoadedListener(listener)
    {
        itemLoadedListeners.push(listener);
    }
    
    /**
     * Gets all input elements associated with this item.
     */
    function getInputs() {
        return options.adapter.getInputs()
    }

    /**
     * Gets all child items of this item
     */
    function getChildItems() {
        var items = CovalentItemManager.getInstance().getAllItems();
        var children = [];
        for (var i = 0; i < items.length; i++)
            if (items[i].getParentUid() == getId())
                children.push(items[i]);

        return children;
    }

    function addBeforeItemRemovedListener(listener){
        beforeItemRemovedListeners.push(listener);
    }

    /*
     *  If the item supports its own save operation, call it. Otherwise, just call the passed in callback. 
     */
    function save(callback)
    {
        if ((typeof(options.adapter.isSaveable) == 'function') && options.adapter.isSaveable() && isModified())
        {
            options.adapter.save(callback);
        }
        else
        {
            callback();
        }
    }

    /**
     * Removes this item, and all children, from both the DOM and the CovalentItemManager.
     */
    function remove() {
        jQuery.each(beforeItemRemovedListeners, (function(item){
            return function(i, listener){
                listener(item);
            }

        })(this) );

        CovalentItemManager.getInstance().removeItems(getChildItems());
        CovalentItemManager.getInstance().removeItems([this]);

        try {
            var container = getItemContainer();
            container.parentNode.removeChild(container);
        } catch (e) {
            // If the item container has already been removed, we don't need to do anything here.
        }
    }

    /**
     * Removes all child items from the page, including the CovalentItemManager
     */
    function removeChildItems() {
        CovalentItemManager.getInstance().removeItems(getChildItems());
    }

    /**
     * Gets the parent item UID
     */
    function getParentUid() {
        return options.parentUid;
    }

    /**
     * Add onload dependency
     */
    function addOnLoadDependency(dependency) {
        onloadDependencies.push(dependency);
    }

    /**
     * Check if we have any dependencies on item load
     * Dependencies mean that they need to be ready before item is loaded,
     * eg. before mark status of form data
     */
    function isOnloadDependencyReady(renderer)
    {
        if(onloadDependencies.length == 0)
            return true;

        if(remainingDependencyTries-- <= 0)
            console.log('Load dependencies hasn\'t completed yet after 300 tries for item: ' + getId());

        for(var i = 0; i < onloadDependencies.length; i++)
        {
            var dependency = onloadDependencies.pop();

            if(typeof(dependency) != 'function')
                continue;

            var isReady = dependency();
            if(!isReady)
            {
               onloadDependencies.push(dependency);
               return false;
            }
        }
        return true;
    }

    function clearItemAddOns(type)
    {
        var removed = getItemAddOns(type);
        itemAddOns[type] = [];
        return removed;
    }

    function addItemAddOn(type, o)
    {
        getItemAddOns(type).push(o);
    }

    function getItemAddOns(type)
    {
        if (! itemAddOns[type]) {
            itemAddOns[type] = [];
        }
        return itemAddOns[type];
    }

    function findItemAddOn( type, filter )
    {
        var objects = getItemAddOns(type);

        for (var i = 0; i < objects.length; i++)
        {
            if ( filter(objects[i]) )
            {
                return objects[i];
            }
        }

        return null;
    }

    function findItemAddOnByTypeAndId(type, id)
    {
        var filter = (function(id){
            return function(currentElement) {
                return currentElement.getId() == id;
            }
        })(id);

        return findItemAddOn(type, filter);
    }

    function showControlIndices(show)
    {
        var defaultWidth = 40;
        var itemForm = jQuery('#covalentContainer_' + getId());
        var showIndicesLink = itemForm.find('.show-control-indices-link');
        var hideIndicesLink = itemForm.find('.hide-control-indices-link');
        var checkMyWorkLink = itemForm.find('.check-my-work-link');
        var checkMyWorkInactiveLink = itemForm.find('.check-my-work-inactive-link');

        if (show)
        {
            //keep original field sizes
            var indexElements = itemForm.find('.control-index');
            var inputElements = itemForm.find('.control-value');
            for ( var i = 0; i < inputElements.length; i++) {
                var dimensionElement = jQuery(inputElements[i]);
                var indexElement = jQuery(indexElements[i]);
                if (indexElement[0].nodeName === "SELECT") {
                    continue;
                }
                if (dimensionElement.find('.control-dimension-element').length != 0) {
                    dimensionElement = dimensionElement.find('.control-dimension-element');
                }

                if (indexElement.hasClass('accounting') || indexElement.hasClass('combination')) {
                    defaultWidth = 110;
                } else {
                    defaultWidth = 52;
                }

                if (dimensionElement.width() < defaultWidth || (inputElements[i].nodeName !== "INPUT" && inputElements[i].nodeName !== "TEXTAREA")) {
					/*
                     ILRN-51564 - Yellow Editor/In new window>FITB/Accounting FITB>Collapse the CFW and click on 'show control indices' link> System does not display 'Control Indices' value and field properly on expanding the CFW.
					 Since parent element (feedback container) is hidden, element is hidden too,
					 and that's why element's height, calculated via jQuery height() method call, is 0;

					 So, a bit hack is used : 'Visibility' style is set to 'hidden', but 'display' is changed to 'block';
					 It solves the problem, because the element is visible for the browser to correctly calculate its size but the is not visible to a web user.
					*/
                    var feedBackWidgetBody = dimensionElement.parents(".feedBackWidgetBody:first"),
                        storedVisibility = feedBackWidgetBody.css("visibility"),
                        storedDisplay = feedBackWidgetBody.css("display"),
                        storedPosition = feedBackWidgetBody.css("position");

                    feedBackWidgetBody.css({
                        position:   'absolute',
                        visibility: 'hidden',
                        display:    'block'
                    });

                    var width = dimensionElement.width(),
                        height = jQuery.browser.msie? dimensionElement.outerHeight(): dimensionElement[0].offsetHeight;

                    // fix height for cloze fields
                    if (height < 20) {
                        height = 20;
                    }
                    //Hack for ie; sizes are not read;
                    if (jQuery.browser.msie && (!width || !height)){
                        var prevDisplayStyle = dimensionElement.css("display");
                        dimensionElement.css("display","inline-block");
                        width = dimensionElement.width();
                        height = dimensionElement.height();
                        dimensionElement.css("display",prevDisplayStyle);
                    }
                    if (width < defaultWidth && !indexElement.hasClass('accounting-ci')) {
                        width = defaultWidth;
                    }
                    if (!indexElement.hasClass('accounting-ci')){
                        indexElement.width(width);
                        indexElement.height(height);
                    }

                    //restoring initial style
                    feedBackWidgetBody.css({
                        position:   storedPosition,
                        visibility: storedVisibility,
                        display:    storedDisplay
                    });
				}
			}
            itemForm.addClass('show-control-indices').removeClass('hide-control-indices');
            itemForm.find('.control-index').show();
            // Hack to set style="display: inline-block" as needed after
            // the value is clobbered by show() and hide()
            itemForm.find('.needs-display-inline-block').css({ display: 'inline-block' });

            showIndicesLink.hide();
            hideIndicesLink.show();

            checkMyWorkLink.hide();
            checkMyWorkInactiveLink.show();
        }
        else
        {
            itemForm.addClass('hide-control-indices').removeClass('show-control-indices');

            showIndicesLink.show();
            hideIndicesLink.hide();

            checkMyWorkLink.show();
            checkMyWorkInactiveLink.hide();
        }
    }

    function createResourcePath(path){

        if( typeof(options.resourcePathStrategy) != 'function' )
            return path;

        return options.resourcePathStrategy(path);
    }
    
    function toggleAddOn(type, showOrHide)
    {
        var addOns = getItemAddOns(type);
        
        for(var i = 0; i < addOns.length; i++)
        {
            addOns[i].toggle(showOrHide);
        }
    }    
    
    /**
     * This class functions as the interface for all item helpers and the default
     * implementation.  See CovalentItem.addItemHelper().
     */
    function DefaultCovalentItemHelper()
    {
        function hideFeedback()
        {
            var rejoinders = getRejoinders();

            for(var j = 0; j < rejoinders.length; j++)
            {
                rejoinders[j].hide();
            }
        }

        return {
            "hideFeedback" : hideFeedback
        };
    }
    
    function clearInfoAndHint()
    {
        var hints = getItemAddOns(CovalentItem.TYPE_HINT);
        
        jQuery.each(hints, function(i, hint){
           hint.remove(); 
        });
        
        var infos = getItemAddOns(CovalentItem.TYPE_ADDITIONAL_INFO);
        
        jQuery.each(infos, function(i, info){
           info.remove(); 
        });
    }
    
    function addHint(hint)
    {
    	addItemAddOn(CovalentItem.TYPE_HINT, hint);
    	trigger("hintAdded", hint);
    }

    function getAdditionalInfos() {
        return getItemAddOns(CovalentItem.TYPE_ADDITIONAL_INFO);
    }
    
    function getHints() {
        return getItemAddOns(CovalentItem.TYPE_HINT);
    }
    
    /* Export class members that need to be public */
    return _this = {
        // Public
        "getId" : getId,
        "getItemContainer" : getItemContainer,
        "getRenderingContext" : getRenderingContext,

        "getRejoinders" : getRejoinders,

        "hideFeedback" : hideFeedback,
        "showControlIndices" : showControlIndices,
        "addStateChangeListener" : addStateChangeListener,
        "addItemLoadedListener" : addItemLoadedListener,

        "rerender" : rerender,
        "addLoadedScripts" : addLoadedScripts,
        "getSubmitString" : getSubmitString,
        "submitItem" : submitItem,
        "disableForm" : disableForm,

        "markUnmodified" : markUnmodified,
        "isModified" : isModified,
        "isStatesDifferent" : isStatesDifferent,
        "hasModifiedItem" : hasModifiedItem,

        "setInteractive" : setInteractive,
        "isInteractive" : isInteractive,

        "addOnLoadDependency" : addOnLoadDependency,

        "addItemAddOn" : addItemAddOn,
        "getItemAddOns" : getItemAddOns,
        "findItemAddOn" : findItemAddOn,

        "addBeforeItemRemovedListener" : addBeforeItemRemovedListener,
        "remove" : remove,

        "findItemAddOnByTypeAndId": findItemAddOnByTypeAndId,

        "openUrl": openUrl,

        // Protected
        "onPageLoad" : onPageLoad,
        "onItemLoad" : onItemLoad,
        "onItemUnload" : onItemUnload,
        "addItemHelper" : addItemHelper,
        "checkStateChange" : checkStateChange,
        "notifyStateChangeListeners" : notifyStateChangeListeners,
        "getSubmitMap" : getSubmitMap,

        "bind" : bind,
        "clearRejoinders" : clearRejoinders,
        "addRejoinder" : addRejoinder,

        "getParentUid" : getParentUid,
        "getChildItems" : getChildItems,
        "renderItem" : renderItem,
        "clearItem" : clearItem,
        "createResourcePath" : createResourcePath,
        
        "save" : save,
                
        "toggleAddOn" : toggleAddOn,
        
        "clearInfoAndHint" : clearInfoAndHint,
        
        "getAdditionalInfos": getAdditionalInfos,
        "getHints": getHints,
        "addHint": addHint,
        "getInputs" : getInputs
    };
}
CovalentItem.TYPE_REJOINDER = 'rejoinder';
CovalentItem.TYPE_HINT = 'hint';
CovalentItem.TYPE_ADDITIONAL_INFO = 'addInfo';
CovalentItem.TYPE_POST_SUBMISSION_FEEDBACK = 'postFeedback';
CovalentItem.TYPE_CHECK_MY_WORK_BUTTON = 'checkMyWork';
CovalentItem.TYPE_CLEAR_ALL = 'clearAll';

//=============
function CovalentItemManager()
{
    this.itemList = [];
    this.pendingItems = {};

    this.itemConsumer = null;
    this.itemStateChangePollInterval = 0;
    this.itemStateChangeIntervalHandle = null;

    this.loadedItems = {};
    this.itemsLoadedCount = 0;

    this.pageLoadedCalled = false;

    var thisRef = this;
    this.allItemsLoadedActions = [
        function(){
            if( thisRef.itemStateChangePollInterval > 0 && ! thisRef.itemStateChangeIntervalHandle)
            {
                console.log("Starting Covalent Change Polling Thread with interval " + thisRef.itemStateChangePollInterval);
                thisRef.itemStateChangeIntervalHandle = setInterval( "CovalentItemManager.getInstance().checkItemStateChange()", thisRef.itemStateChangePollInterval );
            }
        }
    ];

    this.itemRerenderActions = [];
}

CovalentItemManager.getInstance = function()
{
    if( typeof(CovalentItemManager_instance) != 'object' )
    {
        CovalentItemManager_instance = new CovalentItemManager();
    }

    return CovalentItemManager_instance;
}

CovalentItemManager.prototype.registerItem = function(item)
{
    if( this.findItem(item.getId()) )
        throw "An item with id " + item.getId() + " is already registered";

    this.itemList.push(item);
    this.pendingItems[item.getId()] = item;
}

CovalentItemManager.prototype.getAllItems = function()
{
    return this.itemList;
}

CovalentItemManager.prototype.findItem = function(id)
{
    var allItems = this.getAllItems();
    for(var i = 0; i < allItems.length; i++)
    {
        if(allItems[i].getId() == id) {
            return allItems[i];
        }
    }

    return null;
}

/**
 * Removes all items from the page and from this manager.
 */
CovalentItemManager.prototype.removeAllItems = function()
{
    var allItems = this.getAllItems();
    for(var i = 0; i < allItems.length; i++)
    {
        allItems[i].remove();
    }
    
    // Also clear pending item map
    this.pendingItems = {};
}

/**
 * Pages containing Covalent items must call this method on page load.
 *
 * @param consumer An object providing an interface to the consumer. It should implement the following methods:
 *  render(item) : Required, called when an item is on the page and needs to be rendered.
 *  itemRemoved: (optional) Called when an item is un-registered with the manager. This normally happens when its parent
 *      item is re-rendered by AJAX.
 *  itemLoaded : (optional) Called when the item is first loaded -- will only be called once per item. However, if an
 *      item is removed from the page and re-added, it will be called again.
 */
CovalentItemManager.prototype.pageLoaded = function(consumer)
{
    this.pageLoadedCalled = true;
    // Support legacy implementations nicely.
    if (!consumer)
    {
        setTimeout(function(){
            throw "Consumer not registered with CovalentItemManager#pageLoaded. Items using AJAX will not render correctly.";
        }, 0);

        consumer = {};
    }

    this.itemConsumer = consumer;

    this.loadPendingItems();
}

/**
 * Protected Method.
 *
 * Loads all items that are not yet loaded.
 */
CovalentItemManager.prototype.loadPendingItems = function()
{
    for (var id in this.pendingItems)
    {
        var item = this.pendingItems[id];
        item.onPageLoad();
        delete this.pendingItems[id];
    }
}

/**
 * Protected Method.
 *
 * Asks the consumer application to re-render its portion of an item, such as rejoinders. This should be called when
 * the content of an item is replaced through AJAX.
 */
CovalentItemManager.prototype.consumerRenderItem = function(item)
{
    if (this.itemConsumer.render)
    {
        this.itemConsumer.render(item);
    }
}

/**
 * Protected Method.
 *
 * Called by CovalentItem or its adapter when it is finished loading. Triggers rendering of the item and starts
 * the change listener polling thread when all items are done loading.
 *
 * if rerender is omitted, it defaults to true to fall back on legacy behavior.
 * some adapters (e.g. FlashItemAdapter) render their own rejoinders, so rerender can be set to false
 */
CovalentItemManager.prototype.itemLoadedCallback = function(item, rerender)
{
    this.itemsLoadedCount++;

    // Remove the item from the pending list
    delete this.pendingItems[item.getId()];

    // Notify the item consumer application that an item is fully loaded
    if (this.itemConsumer.itemLoaded)
        this.itemConsumer.itemLoaded(item);

    if(rerender==undefined || rerender==true)
    this.consumerRenderItem(item);

    if( this.itemsLoadedCount < this.itemList.length )
        return;

    jQuery(window).trigger("allItemsLoaded");

    for( var i = 0; i < this.allItemsLoadedActions.length; i++ )
    {
        this.allItemsLoadedActions[i]();
    }
}

CovalentItemManager.prototype.renderCheckMyWork = function(item)
{
    if (this.itemConsumer.renderCheckMyWork)
    {
        this.itemConsumer.renderCheckMyWork(item.getItemAddOns(CovalentItem.TYPE_CHECK_MY_WORK_BUTTON));
    }
}

CovalentItemManager.prototype.itemUnloadedCallback = function(item)
{
    if(!this.loadedItems[item.getId()])
    {
        return;
    }

    delete this.loadedItems[item.getId()];
    this.itemsLoadedCount--;
}

/**
 * Sets how frequently we're going to check for item state changes.
 * Pass number of milliseconds. If you want polling, this needs to
 * to be called before CovalentItemManager.pageLoaded(). If you don't
 * set the interval before pageLoaded, no polling occurs.
 */
CovalentItemManager.prototype.setItemStateChangePollInterval = function(millis)
{
    if( this.pageLoadedCalled )
        throw "CovalentItemManager.setItemStateChangePollInterval() must be called before pageLoad";

    this.itemStateChangePollInterval = millis;
}

/**
 * Protected Method.
 *
 * Notifies items that they should check to see if their state has changed and fire any callbacks if
 * nessecary. This is the "run" method of the polling thread.
 */
CovalentItemManager.prototype.checkItemStateChange = function()
{
    var allItems = this.getAllItems();
    for(var i = 0; i < allItems.length; i++)
        allItems[i].checkStateChange();
}

/**
 * Protected Method.
 *
 * Removes items from the manager. This should only be called by an item.
 */
CovalentItemManager.prototype.removeItems = function(items)
{
    var ids = {};
    jQuery.each(items, function(i, item) {
        ids[item.getId()] = true;
    });

    var aliveItemList = [];
    var deadItemList = [];
    var thisRef = this;

    jQuery.each(this.itemList, function(i,item) {
        if (ids[item.getId()]) {
            deadItemList.push(item);
        } else {
            aliveItemList.push(item);
        }

        if (ids[item.getId()]) {
            item.onItemUnload();
            thisRef.itemUnloadedCallback(item);
        }
    });

    this.itemList = aliveItemList;

    // Notify the consumer application that items have been removed
    if (this.itemConsumer && this.itemConsumer.itemRemoved)
        for (var i = 0; i < deadItemList.length; i++)
            this.itemConsumer.itemRemoved(deadItemList[i]);
}

CovalentItemManager.prototype.addAllItemsLoadedAction = function(action)
{
    if( typeof(action) != 'function' )
        throw 'action must be a function';

    this.allItemsLoadedActions.push(action);
}

/**
 * This function is used to register listeners for when the ajax renderer
 * has finished rendering.
 */
CovalentItemManager.prototype.addItemRerenderAction = function(action)
{
    if( typeof(action) != 'function' )
        throw 'action must be a function';

    this.itemRerenderActions.push(action);
}

/**
 * Called at the end of handleAJAXUpdate(), to notify the listeners when
 * the rerendering is complete.
 */
CovalentItemManager.prototype.notifyItemRerendered = function(item)
{
    for( var i = 0; i < this.itemRerenderActions.length; i++ )
    {
        this.itemRerenderActions[i](item);
    }
}

CovalentItemManager.prototype.createResourcePath = function(path, uid){

    //do we need to check for empty uid?
    var item = this.findItem(uid);

    if( !item )
        item = this.getAllItems()[0]; 
    
    if(!item)
    {
        throw 'No item is found.';
    }
    
    return item.createResourcePath(path);
}

//===================
/**
 * Available options:
 *  index: the 'index' string of the rejoinder.
 *  type: one of CovalentRejoinder.Type
 *  text: the text of the rejoinder
 *  placeholderId: id of the element which holds place of rejoinder.
 *  score: the grade as a double
 *  correctAnswer: the rendered correct answer
 *
 */
function CovalentRejoinder(options)
{
    this.options = options
    this.rejoinderHelper = null;
}
CovalentRejoinder.Type = function() {}
CovalentRejoinder.Type.ACCEPTED = 1;
CovalentRejoinder.Type.CORRECT = 2;
CovalentRejoinder.Type.INCORRECT = 3;
CovalentRejoinder.Type.PARTIAL = 4;

CovalentRejoinder.prototype.getIndex = function()
{
    return this.options.index;
}

CovalentRejoinder.prototype.getPlaceholderElem = function()
{
    return document.getElementById( this.options.placeholderId );
}

CovalentRejoinder.prototype.getText = function()
{
    return this.options.text;
}

CovalentRejoinder.prototype.setItem = function(item)
{
    this.item = item;
}

CovalentRejoinder.prototype.getItem = function()
{
    return this.item;
}

CovalentRejoinder.prototype.getType = function()
{
    return this.options.type;
}

CovalentRejoinder.prototype.getFullMode = function()
{
    return this.options.fullMode;
}

CovalentRejoinder.prototype.getScore = function()
{
    return this.options.score;
}

CovalentRejoinder.prototype.isOverall = function()
{
    if( typeof(this.options.overall) == 'boolean' )
        return this.options.overall;

    return false;
}

CovalentRejoinder.prototype.getCorrectAnswer = function()
{
    return this.options.correctAnswer;
}

CovalentRejoinder.prototype.setRejoinderHelper = function(rejoinderHelper)
{
    this.rejoinderHelper = rejoinderHelper;
}

CovalentRejoinder.prototype.getRejoinderHelper = function()
{
    return this.rejoinderHelper;
}

CovalentRejoinder.prototype.hide = function()
{
    if(this.rejoinderHelper != null && typeof(this.rejoinderHelper.hide) == 'function')
        this.rejoinderHelper.hide();
}

CovalentRejoinder.prototype.bind = function(event, fn)
{
    jQuery(this).bind(event, fn);
}

CovalentRejoinder.prototype.trigger = function(event)
{
    jQuery(this).trigger(event);
}

CovalentRejoinder.prototype.remove = function()
{
    this.trigger('removed');
}

//===================
/**
 *
 */
function CovalentAdditionalInfo(options)
{
    this.options = options;
    this.placeholderIds = [];
}

CovalentAdditionalInfo.prototype.getId = function()
{
    return this.options.id;
}

CovalentAdditionalInfo.prototype.getPlaceholderIds = function()
{
    return this.placeholderIds;
}

CovalentAdditionalInfo.prototype.addPlaceholderId = function(id)
{
    this.placeholderIds.push(id);
}

CovalentAdditionalInfo.prototype.getText = function()
{
    return this.options.text;
}

CovalentAdditionalInfo.prototype.getPlaceholderElements = function()
{
    var placeholderElements = [];
    for (var i = 0; i < this.placeholderIds.length; i++)
    {
        placeholderElements.push(document.getElementById(this.placeholderIds[i]));
    }
    return placeholderElements;
}

CovalentAdditionalInfo.prototype.setHelper = function(helper)
{
    this.helper = helper;
}

CovalentAdditionalInfo.prototype.getHelper = function()
{
    return this.helper;
}

CovalentAdditionalInfo.prototype.bind = function(event, fn)
{
    jQuery(this).bind(event, fn);
}

CovalentAdditionalInfo.prototype.trigger = function(event)
{
    jQuery(this).trigger(event);
}

CovalentAdditionalInfo.prototype.remove = function()
{
    this.trigger('removed');
}

//===================
/**
 *
 */
function CovalentPostSubmissionFeedback(options)
{
    this.options = options;
    this.placeholderIds = [];
}

CovalentPostSubmissionFeedback.prototype.getId = function()
{
    return this.options.id;
}

CovalentPostSubmissionFeedback.prototype.getPlaceholderIds = function()
{
    return this.placeholderIds;
}

CovalentPostSubmissionFeedback.prototype.addPlaceholderId = function(id)
{
    this.placeholderIds.push(id);
}

CovalentPostSubmissionFeedback.prototype.getText = function()
{
    return this.options.text;
}

CovalentPostSubmissionFeedback.prototype.getPlaceholderElements = function()
{
    var placeholderElements = [];
    for (var i = 0; i < this.placeholderIds.length; i++)
    {
        placeholderElements.push(document.getElementById(this.placeholderIds[i]));
    }
    return placeholderElements;
}

CovalentPostSubmissionFeedback.prototype.setHelper = function(helper)
{
    this.helper = helper;
}

CovalentPostSubmissionFeedback.prototype.getHelper = function()
{
    return this.helper;
}

//===================
/**
 *
 */
function CovalentHint(options)
{
    this.options = options;
}

CovalentHint.prototype.getId = function()
{
    return this.options.id;
}

CovalentHint.prototype.getPlaceholderElements = function()
{
    return jQuery('[id ^= "' + this.options.placeholderIdPrefixes + '"]');    
}

CovalentHint.prototype.getText = function()
{
    return this.options.text;
}

CovalentHint.prototype.setHelper = function(helper)
{
    this.helper = helper;
}

CovalentHint.prototype.getHelper = function()
{
    return this.helper;
}

CovalentHint.prototype.bind = function(event, fn)
{
    jQuery(this).bind(event, fn);
}

CovalentHint.prototype.trigger = function(event)
{
    jQuery(this).trigger(event);
}

CovalentHint.prototype.remove = function()
{
    this.trigger('removed');
}

//---------------------
/**
 * Clear All
 */
function CovalentClearAll(options)
{
    this.options = options;
}

CovalentClearAll.prototype.toggle = function(showOrHide)
{
    jQuery('#' + this.options.placeholderElementId).toggle(showOrHide);
    jQuery('#' + this.options.inactivePlaceholderElementId).toggle(!showOrHide); 
}

/*
 * IMPORTANT: Export the public objects that we want visible to the outside world. Anything not exported here
 * will not be accessible to consumer applications.
 */
window.CovalentItem = CovalentItem;
window.CovalentItemManager = CovalentItemManager;
window.CovalentRejoinder = CovalentRejoinder;
window.CovalentAdditionalInfo = CovalentAdditionalInfo;
window.CovalentPostSubmissionFeedback = CovalentPostSubmissionFeedback;
window.CovalentHint = CovalentHint;
window.CovalentClearAll = CovalentClearAll;

})();}