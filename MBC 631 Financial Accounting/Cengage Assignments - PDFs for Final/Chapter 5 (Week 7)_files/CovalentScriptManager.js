if( typeof(CovalentScriptManager) == 'undefined')
{
    /**
     * CovalentScriptLoader - a component for loading and executing javascript files from covalent items and related
     * utilities. When loading content after a page is loaded, it is generally required to execute the scripts
     * contained in the content. This can easily be done with jQuery, but jQuery will re-import scripts which have
     * already been imported. The methods available from the CovalentScriptManager use a global list of already-loaded
     * scripts, reducing load times.
     *
     * <h3>Loading Scripts at Page Load</h3>
     * To reduce load times when many duplicate script imports are present in a page (for instance when writing out
     * many items all with similar imports) use {@link CovalentScriptManager#writeContentWithScripts}.
     *
     * <h3>Loading Scripts after Page Load</h3>
     * Write the content to be loaded to a div, <em>after</em> appending it to the page (to avoid the firefox script
     * execution bug), then call {@link CovalentScriptManager#loadScriptChildrenOfElement} with the container element,
     * optionally passing in a callback to be executed after loading is complete.
     *
     * <h3>Pre-Loading Scripts</h3>
     * Inform the manager of scripts which have already been loaded by other means with
     * {@link CovalentScriptManager#markScriptUrlsAsLoaded} (or one of its siblings), so they aren't loaded again later.
     */

    (function($) {
        var isIE = (navigator.userAgent.indexOf("MSIE") != -1);

    	function InlineScriptLoader(scriptText) {
    		return {
    			load: function(callback) {
    				// Strip out leading and trailing XML comments from javascript string before executing them
                    scriptText = scriptText.replace(/^\s*<!--/, "").replace(/-->\s*$/g, "");
    				jQuery.globalEval(scriptText);
                    callback(null);
    			},

    			isAlreadyLoaded : function(loadedUrls) {
    				return false;
    			}
    		}
    	}

    	function ImportedScriptLoader(scriptUrl) {
    		return {
    			load: function(callback, synchronous){
    				jQuery.ajax({
                        url: scriptUrl,
                        dataType: 'script',
                        cache: true,
                        async : ! synchronous,
                        success: function() {
                            if (callback)
                                callback(scriptUrl);
                        }
                    });
    			},

    			isAlreadyLoaded : function(loadedUrls) {
    				return !! loadedUrls[scriptUrl];
    			}
    		}
    	}

    	function scriptLoaderFromElement(arg1, arg2) {
    		// jQuery.map passes the index first and the element second,
    		// but we want to be callable without an index as well
    		var elem = (typeof arg1 == "number") ? arg2 : arg1;

    		if (elem.src) {
    			return new ImportedScriptLoader(elem.src);
    		} else {
    			return new InlineScriptLoader(elem.innerHTML);
    		}
    	}

		function ScriptBatch(callback, scriptLoaders) {
			// Keep our own copy of the list
			scriptLoaders = $(scriptLoaders);

			// Null-protect the callback
			callback = callback || new Function();

			// Return our public interface
			return {
				invokeCallback : function() {
					try {
						callback();
					} catch (e) {
						try {
							console.error("Failed to invoke script batch callback:");
							console.error(e.stack);
						} catch(e) {}
					}
				},

				getScriptLoaders : function() {
					// Copy the list so ours dosen't get modified
					return $.makeArray(scriptLoaders);
				}
			}
		}

        function CovalentScriptManager()
        {
			var loadedScriptUrls = {};
			var batchQueue = [];

			var currentBatch;
			var scriptLoaderQueue;

			var currentlyLoading = false;

			function loadNext() {
				if (currentlyLoading)
					return;

				if (! currentBatch) {
					if (! batchQueue.length)
						return;

					currentBatch = batchQueue.shift();
					scriptLoaderQueue = currentBatch.getScriptLoaders();
				}

				var nextScriptLoader = scriptLoaderQueue.shift();

				if (nextScriptLoader.isAlreadyLoaded(loadedScriptUrls)) {
					scriptLoaded();
				} else {
					currentlyLoading = true;
					nextScriptLoader.load(function(loadedScriptUrl) {
						if (loadedScriptUrl)
							loadedScriptUrls[loadedScriptUrl] = true;

						currentlyLoading = false;
						scriptLoaded();
					});
				}
			}

			function scriptLoaded() {
				if (! scriptLoaderQueue.length) {
					var oldBatch = currentBatch;
					currentBatch = null;

					// We set currentBatch to null before invoking the callback in case the callback ends up calling
					// back into the script loader.
					oldBatch.invokeCallback();

					// If the callback invoked the loader again, currentBatch won't be null anymore, since loadNext()
					// will have already been called. We don't want to call loadNext() twice, so we check before calling it.
					if (currentBatch == null) {
						loadNext();
					}
				}
				else {
					loadNext();
				}
			}

            /*************************************************************************************************************
             * Public methods. These could be defined here or in the return block below. By defining them here, we get the
             * advantage of being able to call them from the private methods as well.
             */

            /**
             * Converts a relative script url into an absolute path, as would be found when reading the source
             * of a script import tag.
             *
             * @param relativeUrl
             * @returns
             */
            function resolveScriptUrl(relativeUrl) {
                var elem = document.createElement("script");
                elem.src = relativeUrl;
                return elem.src.toString();
            }

			/**
			 * Marks the given array of script URLs as having already been loaded. Call this with the URLs of script
			 * elements which were present on the page when it was loaded to prevent them from being loaded again.
			 */
			function markScriptUrlsAsLoaded(preloadedScriptUrls) {
				$(preloadedScriptUrls).each(function() {
					// Ignore empty and undefined elements
					if (this) {
						loadedScriptUrls[ resolveScriptUrl(this) ] = true;
					}
		        });
			}

            /**
             * Queue a set of script elements as a batch to be loaded by the script loader. This is the core method
             * of ScriptLoader. callback will be invoked once all of the given elements are loaded.
             */
            function loadScriptElements (callback, scriptElements) {
            	if (scriptElements.length) {
            		batchQueue.push(new ScriptBatch(callback, $(scriptElements).map(scriptLoaderFromElement)));
    				loadNext();
            	} else {
            		callback();
            	}
            }

            /**
             * Queue a set of script URLs to be loaded as a batch by the script loader. This method does <em>not</em>
             * support loading inline script blocks.
             */
            function importScriptsByUrl(callback, scriptUrls) {
        		batchQueue.push(new ScriptBatch(callback, $(scriptUrls).map(function(idx, url) {
        			return new ImportedScript(resolveScriptUrl(url));
        		})));

				loadNext();
            }

            /**
             * Check if a given script URL has been loaded by this script manager.
             */
            function isScriptUrlLoaded(scriptUrl) {
            	return !! loadedScriptUrls[resolveScriptUrl(scriptUrl)];
            }

            /**
             * Import a script synchronously.
             *
             * @param scriptUrl The script URL to load
             * @returns {Boolean} true if the script was loaded, false if the script had already been loaded.
             */
            function importScriptUrlSynchronously(scriptUrl) {
                if (! isScriptUrlLoaded(scriptUrl)) {
                    new ImportedScriptLoader(resolveScriptUrl(scriptUrl)).load(null, true);
                    markScriptUrlsAsLoaded([scriptUrl]);
                    return true;
                }

                return false;
            }

            /**
             * A content writer which writes out content to the page in chunks, to ensure scripts get executed in the correct
             * order, but uses jQuery to execute script imports so they happen while writing (a script import written
             * to the page with document.write executes after ALL inline scripts in IE).
             */
            function IeContentWriter() {
                return {
                    writeContent : function(content) {
                        document.write(content);
                    },
                    writeScript : function(scriptTagText, scriptTagSrc) {
                        importScriptUrlSynchronously(scriptTagSrc);
                    },
                    finish : function() {}
                }
            }

            /**
             * A content writer which builds up a buffer of content to write to the page, importing scripts by including
             * the script import in the HTML, works in browsers which screw up parsing content written out in chunks
             * (like firefox).
             */
            function SaneContentWriter() {
                var buffer = "";

                return {
                    writeContent : function(content) {
                        buffer += content;
                    },
                    writeScript : function(scriptTagText, scriptTagSrc) {
                        if (! isScriptUrlLoaded(scriptTagSrc)) {
                            buffer += scriptTagText;
                            markScriptUrlsAsLoaded([scriptTagSrc]);
                        }
                    },
                    finish : function() {
                        document.write(buffer);
                        buffer = "";
                    }
                }
            }

            /**
             * Creates a content writer for the current browser.
             *
             * @returns The content writer. See IeContentWriter and SaneContentWriter above.
             */
            function createContentWriter() {
                return isIE ? new IeContentWriter() : new SaneContentWriter();
            }

            /**
             * Writes HTML content to the page using document.write(). All script imports are removed from the content
             * and loaded with <tt>importScriptUrlSynchronously</tt> to reduce page load times by eliminating duplicate
             * imports.
             *
             * @param htmlContent The content to be written to the page
             */
            function writeContentWithScripts(htmlContent) {
                // The pattern we use to scan through the content looking for script imports
                var scriptSrcPattern = /<script[^>]*src=['"]([^'"]+)['"][^>]*>.*?<\/script>/g;

                // The end of the last script import, used to write the in between content
                var lastIndex = 0;

                // The groups we select from the RegEx engine
                var groups;

                // Get a way of writing out content which will work correctly in the current browser
                var writer = createContentWriter();

                // Iterate through all the script tags in the content
                while (groups = scriptSrcPattern.exec(htmlContent)) {
                    // Extract this script tag and its src from the RegEx pattern
                    var scriptTagText = groups[0];
                    var scriptTagSrc = groups[1];

                    // Include content between the previous script tag and this one
                    writer.writeContent(htmlContent.substring(lastIndex, scriptSrcPattern.lastIndex - scriptTagText.length));

                    // Load the file referenced by this script tag (this will ignore already loaded scripts)
                    writer.writeScript(scriptTagText, scriptTagSrc);

                    // Set the lastIndex pointer to the end of the this script tag
                    lastIndex = scriptSrcPattern.lastIndex;
                }

                // Include content after the last script import
                writer.writeContent(htmlContent.substring(lastIndex));

                // Complete the writing
                writer.finish();
            }

            /*
             * The Public Interface to CovalentScriptManager
             */
            return {
            	// Core functionality
            	markScriptUrlsAsLoaded : markScriptUrlsAsLoaded,
            	loadScriptElements : loadScriptElements,
            	importScriptsByUrl : importScriptsByUrl,
            	isScriptUrlLoaded : isScriptUrlLoaded,
            	importScriptUrlSynchronously : importScriptUrlSynchronously,
            	writeContentWithScripts : writeContentWithScripts,

            	// Utility methods

            	/**
            	 * Invokes loadScriptElements with all script children of <tt>containerElem</tt>
            	 */
            	loadScriptChildrenOfElement : function(callback, containerElem) {
            		loadScriptElements(callback, $(containerElem).find("script"));
            	},

            	loadContentIntoElement : function(callback, containerElem, content) {
            		//adding &#160; to fix IE8 bug that does not load the first script tag
            		var newContent = isIE ? content.replace("<script", "&#160; <script") : content;
            		containerElem.innerHTML = newContent;
            		this.loadScriptChildrenOfElement(callback, containerElem);
            	},

            	/**
            	 * Invokes markScriptUrlsAsLoaded with the sources of the scripts in the given <tt>containerElem</tt>.
            	 */
            	markScriptChildrenAsLoaded : function(containerElem) {
            		this.markScriptElementsAsLoaded($(containerElem).find("script[src]"));
            	},

            	/**
            	 * Invokes markScriptUrlsAsLoaded with the sources of the given scripts.
            	 */
            	markScriptElementsAsLoaded : function(scriptElements) {
            		markScriptUrlsAsLoaded($(scriptElements).map(function(idx, scriptElem) {
               		 	return scriptElem.src;
               	 	}));
            	}
            }
        }

        window.CovalentScriptManager = new CovalentScriptManager();
    })(jQuery);
}