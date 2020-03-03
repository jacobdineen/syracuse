if (typeof(__included_AggregateItemAdapter_js) == "undefined") {
__included_AggregateItemAdapter_js = true;
(function() {

/**
 * Item adapter for simple Aggregate problems that delegates to the client sub-items.
 * 
 * options:
 *  supressGo - Removes the auto-generated "go" values created by the form-based adapters.
 */
function AggregateItemAdapter(options)
{
    var formAdapter = new FormBasedItemAdapter(options);
    
    function onPageLoad() {
        formAdapter.onPageLoad.apply(formAdapter, arguments);
    }
    
    function onItemUnload(item) {
        formAdapter.onItemUnload(item);
    }
    
    function onItemLoading() {
        formAdapter.onItemLoading();
    }
    
    function onItemLoaded() {
        formAdapter.onItemLoaded();
    }
    
    function getSubmitMap() {
        var map = formAdapter.getSubmitMap.apply(formAdapter, arguments);
        
        var children = getItem().getChildItems();
        
        for (var i = 0; i < children.length; i++) {
            var childMap = children[i].getSubmitMap();
            for (var j in childMap) {
                map[j] = childMap[j];
            }
        }
    
        return map;
    }
    
    function setInteractive(interactive) {
        formAdapter.setInteractive(interactive);
    }
    
    function isInteractive() {
        return formAdapter.isInteractive();
    }
    
    function disableForm() {
        formAdapter.disableForm.apply(formAdapter, arguments);
    }
    
    function enableForm() {
        formAdapter.enableForm.apply(formAdapter, arguments);
    }
    
    function getId() {
        return options.id;
    }
    
    function getItem() { 
        return CovalentItemManager.getInstance().findItem(getId());
    }
    
    function hideFeedback() {
        var children = getItem().getChildItems();
        
        for (var i = 0; i < children.length; i++) {
            children[i].hideFeedback();
        }        
    }
    
    return {
        "getSubmitMap" : getSubmitMap,
        "getId" : getId,
        "disableForm" : disableForm,
        "enableForm" : enableForm,
        "setInteractive" : setInteractive,
        "isInteractive" : isInteractive,
        "getInputs" : function(){ return []; },
        "onPageLoad" : onPageLoad,
        "onItemUnload" : onItemUnload,
        "hideFeedback" : hideFeedback
    };
}

/* 
 * IMPORTANT: Export the public objects that we want visible to the outside world. Anything not exported here
 * will not be accessible to consumer applications.
 */
window.AggregateItemAdapter = AggregateItemAdapter;

})();
};