/**
 * jquery.dropdown.js
 * Copyright 2010 Cengage Learning
 * 
 * Generates a dropdown menu attached to the context element, and the menu
 * his shown/hidden using a mouse click.
 * Menu items can be specified by the 'source' or 'sourceElement' option
 * (see Options).
 * Has special handling for SELECT and INPUT elements (see Special Behaviors).
 * 
 * Basic Usage:
 * 
 * The following example will attach a hidden dropdown menu to an element.
 * When the user clicks on that element, the dropdown menu will appear.  
 * The menu will have three options, "a", "b", and "c", and when the user 
 * makes a choice from the menu, the menu will be closed:
 * 
 *  $('#some_element').dropdown({
 *      source: ["a", "b", "c"]
 *  });
 *  
 * The following example is a little more interesting.  Here, when the user
 * makes a choice from the menu, an alert box will appear showing the user a
 * message that includes the choice that was selected:  
 * 
 *  $('#some_element').dropdown({
 *      source: ["a", "b", "c"],
 *      select: function(event, item) {
 *          alert("You chose "+ item.label);
 *      }
 *  });
 *
 * The following example is a navigation menu.  When the user makes a selection
 * from the menu, the browser will navigate to the associated URL:
 * 
 *  $('#some_element').dropdown({
 *      source: [
 *          {label: "Google",   url: "http://www.google.com"  },
 *          {label: "Facebook", url: "http://www.facebook.com"},
 *          {label: "NY Times", url: "http://www.nytimes.com" }
 *      ],
 *      select: function(event, item) {
 *          window.location = item.url;
 *      }
 *  });
 * 
 * 
 * Special Behaviors for SELECT and INPUT Form Elements:
 * 
 * If the context element is a SELECT or INPUT element, this plugin will hide 
 * that element and render a widget that behaves similarly to a select menu,
 * but which can be styled more easily using CSS (see Theming section below).
 * When the user chooses an item from the menu, the value of the hidden element
 * will be set appropriately.
 * 
 * In the following example, the value of the hidden INPUT element
 * will be set to the 'value' property of the menu choice that is selected,
 * but the user will see the 'label' property displayed: 
 * 
 *  $('input#foo').dropdown({
 *      source: [
 *          {label: "A", value: "a"}, 
 *          {label: "B", value: "b"}, 
 *          {label: "C", value: "c"} 
 *      ]
 *  });
 * 
 * See examples.html for more examples.
 * 
 * 
 * Options:
 * 
 * source 
 * An array of items that will appear in the dropdown menu.  Each element
 * of this array can be a string or an object having a 'label' property that 
 * specifies what will appear in the menu.  All other properties will be 
 * preserved in the item, and so will be accessible to the function that 
 * handles the 'select' event.
 * Note: Required unless 'sourceElement' option is specified, or the context 
 * element is a SELECT element. 
 * 
 * sourceElement: 
 * A DOM element, jQuery object, or jQuery selector that identifies the element
 * that contains the menu items.  Currently, this element must be an unordered
 * or ordered list (OL or UL element).
 * Note: Required unless 'source' option is specified, or the context 
 * element is a SELECT element. 
 * 
 * showArrow: 
 * Boolean indicating whether or not to show an arrow for the dropdown menu.
 * Default: false.
 * 
 * autowidth: 
 * Boolean indicating whether or not the element that the user clicks on 
 * should be made the same width as the menu. 
 * Default: true.
 * 
 * 
 * Events:
 * 
 * select: 
 * Occurs when the user makes a selection from the menu.  
 * The event handler function will receive two arguments: The event object that 
 * triggered the menu selection, and an object representing the 
 * item that was selected, having 'label' and 'value' properties, and any
 * other properties that were defined in the item (see the 'source' option).
 * 
 * open: 
 * Occurs when the user opens the menu.
 * The event handler will receive the event object that triggered the
 * opening of the menu.
 * 
 * close: 
 * Occurs when the user closes the menu.
 * The event handler will receive the event object that triggered the
 * closing of the menu.
 * 
 * 
 * Defining an event handler for these events is most easily done by specifying
 * an event handler using options of the same name.  For example:
 * 
 *  $('select#foo').dropdown({
 *      open: function(event) {
 *          alert("You opened the menu.");
 *      }, 
 *      close: function(event) {
 *          alert("You closed the menu.");
 *      },
 *      select: function(event, item) {
 *          alert("You chose: "+item.label);
 *      }
 *  });
 * 
 *  
 * Theming:
 * 
 * This plugin uses the following CSS classes to style the elements
 * that it creates or otherwise operates upon.  These styles can be
 * overridden in your own stylesheet:
 * 
 * .ui-dropdown-activate 
 * This class is applied to the element that the user clicks on to open
 * or close the dropdown menu.  When the context element is a SELECT
 * or INPUT element, a new element is created and added to the page
 * and this class is added to it.  
 * In all other cases, this class is added to the context element.
 * 
 * .ui-dropdown-menu
 * This class is applied to the menu that appears.  If the 'sourceElement'
 * option is used, this class is added to the list element that is specified
 * by that option.  In all other cases, a new list element is created and
 * this class is added to it.
 * 
 * .ui-dropdown-item
 * This class is applied to each menu item.  
 * 
 * .ui-dropdown-arrow
 * This class is applied to the arrow that will appear when the 'showArrow'
 * option is used.
 * 
 * Other jQuery UI theme classes are used as well in a fairly straightforward
 * way, so that if you have defined your own theme, it should apply to this
 * dropdown in an appropriate fashion.
 * 
 */
(function( $ ) {
    $.dropdown = $.dropdown || {};

    $.widget( "ui.dropdown", {

        /**
         * Default options, referred to by jQuery's widget framework.
         */
        options: {
            autowidth: true,
            maxwidth: 200,
            showArrow: false,
            source: null,
            sourceElement: null
        },

        _initFormElement: function(valueElt, items) {
            valueElt.hide();
            var labelElt = $('<input/>').insertAfter(valueElt);

            valueElt.change(function(){
                var value = valueElt.val();
                if (typeof value != "undefined") {
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].value == value) {
                                labelElt.val(items[i].label);
                                var title = labelElt.attr("title");
                                if (typeof title == "string") {
                                    labelElt.attr("title", value);
                                    labelElt.nextAll(".ui-dropdown-arrow-wrapper").attr("title", value);
                                }
                                break;
                            }
                        }
                    } else {
                        labelElt.val(value);
                        title = labelElt.attr("title");
                        if (typeof title == "string") {
                            labelElt.attr("title", value);
                            labelElt.nextAll(".ui-dropdown-arrow-wrapper").attr("title", value);
                        }
                    }
                }
            }).trigger("change");

            if (valueElt.attr('disabled')) {
                labelElt.attr('disabled',true);
            }
            return labelElt;
        },

         _toggleDropdown: function() {
            if (this.menuElt.css('display') != 'none') {
                this.close();
            } else {
                this.open();
            }
        },

        _hideDropDown: function() {
            this.menuElt.hide();
        },

        /**
         * Initializer, called automatically by jQuery's widget framework.
         */
        _create: function() {
            var thisRef = this;
            var activateElt, menuElt, items, valueElt, labelElt, arrowElt;

            if (this.element.is('input')) {
                // Special handling for INPUT element:
                valueElt = this.element;
                activateElt = labelElt = this._initFormElement(valueElt);
            } else if (this.element.is('select')) {
                // Special handling for SELECT element:
                if (this.element.attr('multiple')) {
                    throw new Error("Dropdown widget does not support select menus that allow multiple selections.");
                }
                valueElt = this.element;
                items = valueElt.children('option').map(function(idx, elt) {
                    elt = $(elt);
                    return {value: elt.attr('value'), label: elt.text()};
                }).toArray();
                activateElt = labelElt = this._initFormElement(valueElt, items);
            } else {
                // Default handling for all other elements
                activateElt = this.element;
            }

            if (! items) {
                if (this.options.sourceElement) {
                    menuElt = $(this.options.sourceElement);
                    if (menuElt.length == 0) {
                        throw new Error("Element specified by 'sourceElement' option must be a DOM element, jQuery object, or jQuery selector.");
                    }
                    if (menuElt.length > 1) {
                        throw new Error("Element specified by 'sourceElement' option must be a single element.");
                    }
                    if (! menuElt.is('ul') && ! menuElt.is('ol')) {
                        throw new Error("Element specified by 'sourceElement' option must be a list (UL or OL) element.");
                    }
                    items = menuElt.children('li').map(function(idx, elt) {
                        return $(elt).text();
                    }).toArray();
                } else if (this.options.source) {
                    items = this.options.source;
                } else {
                    throw new Error("You must specify either the 'source' or 'sourceElement' option if you are not creating a dropdown from a SELECT element.");
                }
            }

            // Add styling and event handlers to the activateElt
            activateElt
                .addClass('ui-dropdown-activate ui-widget ui-widget-content')
                .css("padding-right", "16px")
                .wrap($('<div/>').addClass('ui-dropdown-activate-parent'))
                .focus(function(event){
                    thisRef.open();
                })
                .blur(function(event){
                    thisRef.close();
                })
                .keydown(function(event) {
                        if (event.which == 38) {
                            var p = thisRef.selectedItem.prev();
                            if (p.length) {
                                thisRef.selectedItem = p;
                            }
                        } else if (event.which == 40) {
                            var n = thisRef.selectedItem.next();
                            if (n.length) {
                                thisRef.selectedItem = n;
                            }
                        } else if (event.which == 13) {
                            thisRef.selectedItem.mousedown();
                        } else if (event.which == 27) {
                            thisRef.close();
                        } else if (event.which == 9) {
                            return;
                        } else if (event.which >= 48 && event.which <= 57 || event.which >= 65 && event.which <= 90) {
                            var letter = String.fromCharCode(event.which);
                            var isSelected = false;
                            var newSelected = null;
                            menuElt.children("li").each(function(){
                                if ($(this).text().substr(0,1).toUpperCase() == letter){
                                    if (!newSelected) {
                                        newSelected = $(this);
                                    }
                                    if (isSelected) {
                                        isSelected = false;
                                        newSelected = $(this);
                                    }
                                    if (thisRef.selectedItem[0] == this) {
                                        isSelected = true;
                                    }
                                }
                            });
                            if (newSelected) {
                                thisRef.selectedItem = newSelected;
                            }
                        }
                        menuElt.children('li').removeClass('ui-state-hover');
                        thisRef.selectedItem.addClass('ui-state-hover');
                        event.preventDefault();
                })
            ;

            // Render the dropdown arrow if requested
            if (this.options.showArrow) {
                arrowElt = $('<div/>')
                    .addClass('ui-dropdown-arrow ui-icon ui-icon-triangle-1-s')
                    .insertAfter(activateElt);

                arrowElt.wrap($("<div/>").addClass("ui-dropdown-arrow-wrapper").click(function(event) {
                    if(valueElt && ! valueElt.attr('disabled')){
                        activateElt.focus();
                    }
                }));

                if ($.browser.msie) {
                    //wrap with fake div to fix IE input padding-right problem
                    var bgImage = activateElt.css("background-image");
                    var bgRepeat = activateElt.css("background-repeat");
                    var bgColor = activateElt.css("background-color");
                    var arrowBg = $("<div/>")
                            .addClass("ui-dropdown-arrow")
                            .css("background-image", bgImage)
                            .css("background-repeat", bgRepeat)
                            .css("background-color", bgColor)
                            .css("right", activateElt.css("border-right-width"));
                    arrowElt.removeClass("ui-dropdown-arrow").wrap(arrowBg);
                }
            }
            
            // Ensure the source data has the right format
            items = this._normalizeSourceData(items);
            
            // Render the menu if we havent yet
            if (! menuElt) {
                menuElt = $('<ul/>').insertAfter(activateElt);
                $.each(items, function(idx, item) {
                    $('<li/>',{html: item.label}).appendTo(menuElt);
                });
            }
            // Add necessary styling and event handlers to the menu
            menuElt
                .addClass('ui-dropdown-menu ui-widget ui-widget-content')
                .zIndex(2 + activateElt.zIndex())
                .children('li').each(function(idx, itemElt) {
                    $(itemElt).addClass('ui-dropdown-item').mouseover(function(event) {
                        menuElt.children('li').removeClass('ui-state-hover');
                        $(this).addClass('ui-state-hover');
                        thisRef.selectedItem = $(this);
                    }).mousedown(function(event){
                        var item = items[idx];
                        thisRef.close(event);
                        if (labelElt) labelElt.val(item.label);
                        if (valueElt) valueElt.val(item.value);
                        if (thisRef.element.is('input')) {
                            thisRef.element.change();
                        } else {
                            thisRef._trigger("select", event, item);
                        }
                    });
                });
            
            if (this.options.autowidth) {
                var width = menuElt.width();
                if (! labelElt) {
                    width = Math.max(width, this._resolveElementWidth(activateElt));
                }
                // Add the width of the dropdown arrow, if it is shown
                if (this.options.showArrow) {
                    width += arrowElt.width();
                }
                if (this.options.maxwidth && this.options.maxwidth < width) {
                    width = this.options.maxwidth;
                    activateElt.attr("title", activateElt.val());
                    activateElt.nextAll(".ui-dropdown-arrow-wrapper").attr("title", activateElt.val());
                }
                activateElt.width(width);
                menuElt.css('min-width', width);
            }

            this.menuElt = menuElt.hide();
            this.activateElt = activateElt;
            // Render an overlay so that we know when user clicks outside the menu
            this.overlay = $('<div/>')
                .addClass('ui-dropdown-overlay')
                .zIndex(1 + activateElt.zIndex())
                .insertAfter(activateElt)
                .click(function(event){
                    thisRef.close(event);
                })
                .hide();
            
            // Support for bgiframe plugin
            if ( $.fn.bgiframe ) {
                 this.menuElt.bgiframe();
                 this.overlay.bgiframe();
            }
        },
        
        /**
         * Determine the natural width of the given element as if it were an inline box.
         */
        _resolveElementWidth: function(elt) {
            var display = elt.css('display');
            elt.css('display','inline');
            var width = elt.width();
            elt.css('display',display);
            return width;
        },
        
        /**
         * Format each element of the given array to be an object with both 
         * 'label' and 'value' properties.
         */
        _normalizeSourceData: function(items) {
            return $.map(items, function(item, idx) {
                if (typeof item == "string") {
                    return {value: item, label: item};
                }
                if (typeof item != "object") {
                    throw new Error("Malformed or missing source item at index "+idx);
                }
                
                var hasValue = (typeof(item.value) != "undefined");
                var hasLabel = (typeof(item.label) != "undefined");
    
                if (! hasLabel && ! hasValue) {
                    throw new Error("Malformed source item (does not contain 'value' or 'label') at index "+idx);
                }
                if (! hasLabel) {
                    item.label = item.value;
                }
                if (! hasValue) {
                    item.value = item.label;
                }
                return item;
            });
        },
        
        /**
         * Open the menu.
         */
        open: function(event) {
            var thisRef = this;
            if (this.selectedItem) {
                this.selectedItem.removeClass('ui-state-hover');
            }
            this.selectedItem = this.menuElt.children("li").filter(function(){
                return $(this).text() == thisRef.element.val();
            }).first();
            if (!this.selectedItem.length) {
                this.selectedItem = this.menuElt.children("li").first();
            }
            this.selectedItem.addClass('ui-state-hover');
            this.overlay.show();
            this.menuElt.show();
            this._trigger("open", event);           
        },
        
        /**
         * Close the menu.
         */
        close: function(event) {
            this.overlay.hide();
            this.menuElt.hide();
            this._trigger("close", event);          
        },
        
        widget: function() {
        	return this.menuElt;
        }
    });
})( jQuery );