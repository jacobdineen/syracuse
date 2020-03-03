if( typeof(ScriptLoader) == 'undefined' )
{
    (function(){
    
        /**
         * A simple component for loading script imports after the page has been loaded. Takes a list of script elements
         * and loads them in order. Uses AJAX to load scripts that are imports.
         * 
         * @param scripts:array The script URLs to load
         * @param callback:function(loadedScripts) The callback to call when loading is complete
         */
        function ScriptLoader(scriptList, callback)
        {
            var loadedScripts = [];
            var currentScript = 0;
                
            /*
             * Private methods. These are in scope of the constructor and cannot be seen outside this scope,
             * but they have access to any parameters and variables in scope in the constructor.
             * 
             * Since you don't have to use "this" to reference fields or methods of the class, it makes using callbacks
             * much cleaner. In the "normal" class style, you need to define a _this variable to reference the class instance
             * in a callback function.
             */
            
            /**
             * Loads the next script in the list.
             */
            function loadNext() {
            
                var scriptElem = scriptList[currentScript ++];
            
                // Check for the end of the list
                if (!scriptElem)
                {
                    // Call the callback once
                    if (callback)
                    {
                        callback.apply(window, [loadedScripts]);
                        callback = null;
                    }
                    return;
                }
                
                loaded(scriptElem);
            }
            
            /* register a callback to our "loadNext" function so it can be called from evaluated script land (where no
             * back reference would be possible)
             */
            var callbackIndex = ScriptLoader.callbacks.length;
            ScriptLoader.callbacks.push(loadNext);
            
            /**
             * Handles a script be loaded successfully. In charage of executing the script and calling the callback if
             * all scripts are loaded.
             */
            function loaded(elem) {
                if(elem.src)
                {
                    jQuery.ajax({
                        url: elem.src,
                        dataType: 'script',
                        cache: false,
                        success: function()
                        {                        
                            loadedScripts.push(elem);
                            loadNext();
                        }
                    });            
                }
                else
                {
                    loadedScripts.push(elem);
        
                    var script = document.createElement('script');
                    script.setAttribute('type', 'text/javascript');
                    if(typeof(script.text) == 'undefined')
                    {
                        script.appendChild(document.createTextNode(elem.innerHTML));
                    }
                    else
                    {
                        script.text = elem.innerHTML;
                    }
                    
                    jQuery('head').append(script);
                    jQuery('head').remove(script); 
                
                    loadNext();
                }
            }
        
            /**
             * Handles a script erroring.
             */
            function errored(script, error) {
                setTimeout(function(){ throw "Unable to load script: " + script + ": " + error; }, 0);
            }
            
            /*
             * Public methods. These could be defined here or in the return block below. By defining them here, we get the
             * advantage of being able to call them from the private methods as well.
             */
            /**
             * Adds a script to the script list to be loaded
             */
            function addScript (script) {
                scriptList.push(script);
            }
            
            /**
             * Loads all scripts
             */
            function run() {
                if (currentScript != 0)
                    throw "Script loading has already started. Use a new ScriptLoader to load additional scripts.";
                
                loadNext();
            }
            
            /*
             * The object returned is what new ScriptLoader(...) evaluates to, so we return only the things we want visible
             * as "public" methods.
             */
            return {
                "addScript" : addScript,
                "run" : run
            }
        }
        ScriptLoader.callbacks = [];
        
        ScriptLoader.loadNeededScripts = function(callback, containerElement, loadedScripts)
        {
            var currentScripts = containerElement.getElementsByTagName("script");
            var neededScripts = [];
            
            if( !loadedScripts )
                loadedScripts = [];
                
            for (var i=0; i<currentScripts.length; i++)
            {
                var script = currentScripts[i];
                if (script.src)
                {
                    if (!loadedScripts[script.src]) {
                        neededScripts.push(script);
                    }
                } else {
                    neededScripts.push(script);
                }
            }
            
            new ScriptLoader(neededScripts, callback).run();
        }
        
        window.ScriptLoader = ScriptLoader;
        
    })();
}
