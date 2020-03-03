/*
 * Copyright (c) 2012 Cengage Learning Inc.
 */
var MindTapReader = (function($) {
    
    return {
        openMindTapEBook: function(elem) 
        {
            var details = jQuery.parseJSON(jQuery(elem).attr('ebook'));
            this.openMindTapByJSON(details); 
        },
                
        openMindTapByJSON: function(details) 
        {
            switch (details.strategy) {
                case 'FULLBOOK':
                    this._openFullbook(details.docId, details.mindTapRootUrl);
                    break;
                case 'EXTERNAL':
                    this._openExternal(details.docId, details.isbn);
                    break;
            }
        },
        
        _openExternal: function(docId, isbn) 
        {
            popupWindow('/ilrn/covalent/ebookRedirect.do?eISBN=' + isbn + '&contentId=' + docId, 'ebookWindow');
        },
                
        _openFullbook: function(docId, mindTapRootUrl) 
        {
            //check to see if mindtap app is available
            if(window.self === window.top){
                okDialog('Warning', 'eBook links cannot be opened from an assignment preview. To use these links, link the assignment to the learning path or to a reading assignment.');
                return;
            }
            this._ensureStealIsLoaded(mindTapRootUrl).done(function() {
                steal('clui/app', 'clui/attempt', 'clui/nav').then(function(vals) {
                    Clui.nav.navigate(docId);
                });
            });
            
        },

        _ensureStealIsLoaded: function(mindTapRootUrl) 
        {
            var def = jQuery.Deferred();
            if (typeof(steal) == "undefined") {
                // steal is not loaded, so go get it!
                jQuery.ajax({
                    url: mindTapRootUrl +  "/static/steal/steal.js",
                    dataType: "script",
                    cache: true
                }).done(function() { 
                    // The browser may still be loading the script from cache
                    setTimeout(function() {
                        // Still not loaded? What to do?
                        if (typeof(steal) == "undefined") {
                            def.reject();
                            return;
                        }
                        def.resolve();
                    }, 1);
                });
            }
            else // steal is already loaded
            {
                def.resolve();
            }
            return def.promise();
        }
    }
    
})(jQuery);