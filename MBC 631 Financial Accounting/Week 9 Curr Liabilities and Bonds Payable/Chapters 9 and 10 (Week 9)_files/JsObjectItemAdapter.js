if (typeof(__included_JsObjectItemAdapter_js) == "undefined") {

    __included_JsObjectItemAdapter_js = true;
    
    (function() {
        
        function JsObjectItemAdapter(options) {
            this.pageLoaded = false;
            this.jsObject = null;
            this.NAV_BUTTON_LOCK_NAME = 'step-render';
            
            this.options = options;
            
            this.jsObjectLoadDeferred = jQuery.Deferred();
        }
        
        JsObjectItemAdapter.prototype.getId = function() {
            return this.options.id;
        }
        
        JsObjectItemAdapter.prototype.setInteractive = function(interactive) {
            if( this.options.interactive == interactive)
                return;
                
            if( interactive )
                this.enableForm();
            else
                this.disableForm();
                
            this.options.interactive = interactive;
        }
        
        JsObjectItemAdapter.prototype.isInteractive = function() {
            return this.options.interactive;
        }
        
        JsObjectItemAdapter.prototype.enableForm = function() {
        	jQuery.when(this.jsObjectLoadDeferred).then(jQuery.proxy(function(){
        		this.getJsObject().enableForm();
        	}, this));            
        }
        
        JsObjectItemAdapter.prototype.disableForm = function() {
        	jQuery.when(this.jsObjectLoadDeferred).then(jQuery.proxy(function(){
        		this.getJsObject().disableForm();
        	}, this));         	
        }
        
        JsObjectItemAdapter.prototype.getSubmitMap = function() {
            // wrap state in key/value pair
            var result = {};
            
            result["answer." + this.getId()] = JSON.stringify( this.getJsObject() != null ? this.getJsObject().getState() : null );
            //need to add this to invoke submission logic in grading.
            result["go." + this.getId()] = 1;
            
            return result;
        }
        
        JsObjectItemAdapter.prototype.onPageLoad = function(item, renderer) {
            this.pageLoaded = true;
        
            if( !this.isLoaded() )
                return;
        
            this.onReadyActivities(item);
        }
        
        JsObjectItemAdapter.prototype.onItemUnload = function(item) {
            var actions = this.options.ptOnUnloadActions? this.options.ptOnUnloadActions : new Array();
            for(var i = 0; i < actions.length; i++) {
                var action = actions[i];
                if(typeof(action) == 'function') {
                    action(item);
                }
            }
        }
        
        JsObjectItemAdapter.prototype.onItemLoading = function() {
            if (window['navButtons']) {
                navButtons.disable(this.NAV_BUTTON_LOCK_NAME);
            }
            if (window['ItemStateSubmissionManager']) {
                ItemStateSubmissionManager.cancelAutoSave();
            }                        
        }
            
        JsObjectItemAdapter.prototype.onItemLoaded = function() {
            if (window['navButtons']) {
                navButtons.enable(this.NAV_BUTTON_LOCK_NAME);
            }
            if (window['ItemStateSubmissionManager']) {
                ItemStateSubmissionManager.restartAutoSave();
            }                        
        }
        
        JsObjectItemAdapter.prototype.jsObjectLoaded = function(itemUid, obj) {
            if( !obj )
                throw 'JsObjectItemAdapter.jsObjectLoaded arg cannot be null.';
                
            this.jsObject = obj;
            
            if( !this.isLoaded() )
                return;
                
            this.onReadyActivities(CovalentItemManager.getInstance().findItem(itemUid));
        }
        
        JsObjectItemAdapter.prototype.notifyStateChangeListeners = function(itemUid, stateChangeMessage) {
            CovalentItemManager.getInstance().findItem(itemUid).notifyStateChangeListeners(stateChangeMessage);        
        }
        
        /*
         * Delegate save operation to the item.
         * 
         * See https://pipeline.cengage.com/confluence/display/COVALENT/Covalent+Activity+Module+Consumer+Guide
         * for documentation on the following embedded Covalent Activity interaction.
         */
        JsObjectItemAdapter.prototype.save = function(afterSaveCallback) {
            var self = this;
            return this.jsObjectLoadDeferred.then(function(){
                self.getJsObject().save(afterSaveCallback);
            });
        }
        
        /*
         * Delegate isModified operation to the item.
         * 
         * See https://pipeline.cengage.com/confluence/display/COVALENT/Covalent+Activity+Module+Consumer+Guide
         * for documentation on the following embedded Covalent Activity interaction.
         */
        JsObjectItemAdapter.prototype.isModified = function() {
            return this.isLoaded() ? this.getJsObject().isModified() : false;
        }

        /*
         * Delegate hasModifiedItem operation to the item.
         * 
         * See https://pipeline.cengage.com/confluence/display/COVALENT/Covalent+Activity+Module+Consumer+Guide
         * for documentation on the following embedded Covalent Activity interaction.
         */
        JsObjectItemAdapter.prototype.hasModifiedItem = function() {
            return this.isLoaded() ? this.getJsObject().hasModifiedItem() : false;
        }
        
        /*
         * Always returns true
         */
        JsObjectItemAdapter.prototype.isSaveable = function() {
            return true;
        }
        
        JsObjectItemAdapter.prototype.isLoaded = function() {
            if( !this.pageLoaded )
                return false;
                
            if( !this.jsObject )
                return false;
                
            return true;
        }
        
        JsObjectItemAdapter.prototype.onReadyActivities = function(item) {
        	this.jsObjectLoadDeferred.resolve();
        	
            item.markUnmodified();
            item.onItemLoad();
        }
        
        JsObjectItemAdapter.prototype.getInputs = function() {
            return [];
        }
        
        JsObjectItemAdapter.prototype.hideFeedback = function() {
        	jQuery.when(this.jsObjectLoadDeferred).then(jQuery.proxy(function(){
        		this.getJsObject().hideRejoinders();
        	}, this));        	            
        }
        
        JsObjectItemAdapter.prototype.getJsObject = function() {
            return this.jsObject;
        }
                
        window.JsObjectItemAdapter = JsObjectItemAdapter;
    
    })();
    
};
