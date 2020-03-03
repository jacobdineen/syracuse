function CnowCovalentRenderer(options)
{
    this.showCheckMyWork = options ? options.showCheckMyWork : false;

    this.currentTopFloatBoxLayerIndex = 5000;
    this.initRejoinderProperties();
    this.initFeedbackWidgetProperties();
};

CnowCovalentRenderer.prototype = new RejoinderRenderer();

CnowCovalentRenderer.prototype.render = function(item)
{
    var thisRef = this;
    if ( !jQuery.fn.hoverIntent ){
        setTimeout(function(){
            thisRef.render(item);
        }, 100);
        return;
    }
    var rejoinders = item.getRejoinders();
    var infos = item.getItemAddOns(CovalentItem.TYPE_ADDITIONAL_INFO);
    var hints = item.getItemAddOns(CovalentItem.TYPE_HINT);
    var checkMyWorks = item.getItemAddOns(CovalentItem.TYPE_CHECK_MY_WORK_BUTTON);
   /**
     * ILRN-57737: For manually gradable items  the rejoinders, infos, CMW's, hints length is 0.
     * Therefore,the "renderFeedbackWidget" is not called which ultimately calls initItemNav2,
     * responsible  for resizing item nav bar. So we have called it initially once irrespective of the 
     * activity type. This is a bug in both CNOW core/Mindapp and must be taken care of while merging.
     */
    if(typeof(initItemNav2) == 'function')
    {
        initItemNav2();
    }
    for (var i = 0; i < rejoinders.length; i++)
    {
        //Note: The overall rejoinder is rendered in the feedback widget
        if (rejoinders[i].options['overall'])
        {
            this.renderFeedbackWidget(item, rejoinders[i]);
        }
        else
        {
            this.renderSingleRejoinder( rejoinders[i] );
        }
    }
    
    for (var i = 0; i < infos.length; i++)
    {
        this.renderSingleAdditionalInfo( infos[i] );
    }

    for (var i = 0; i < hints.length; i++)
    {
        this.renderSingleHint( hints[i] );
    }

    this.renderCheckMyWork(checkMyWorks);
    
    jQuery.each(infos, function(index, element) {
        thisRef.stylizeButtonList(element.getPlaceholderElements());
    });  
    
    jQuery.each(hints, function(index, element) {
        thisRef.stylizeButtonList(element.getPlaceholderElements());
    });  
    
    jQuery.each(checkMyWorks, function(index, element) {
        thisRef.stylizeButtonList(jQuery("#"+element.placeholderContainerId));
    });
    
    //making this adapter able to dynamically handle updates to the item.
    item.bind('rejoinderAdded', function(event, rejoinder) {
        if (rejoinder.options['overall']) {
            thisRef.renderFeedbackWidget(item, rejoinder);
        } 
        else {
            thisRef.renderSingleRejoinder( rejoinder );
        }
    });
    
    item.bind('hintAdded', jQuery.proxy(function(event, hint) {
        this.renderSingleHint( hint );
        this.stylizeButtonList(hint.getPlaceholderElements());
    }, this));
    
    var renderer = this;
    
    jQuery('.mindtapReaderLink').each(function(index, readerLink) {
        renderer.setupMindtapReaderLink(jQuery(readerLink));
    });

    //remove extra captions caused when multiple ebook links are rendered
    this.removeDuplicateEbookCaptions();
};

CnowCovalentRenderer.prototype.stylizeButtonList = function(placeholders) {
    jQuery.each(placeholders, function(i, currentPlaceholder) {
        currentPlaceholder = jQuery(currentPlaceholder);
        // Reset action links to base styling. 
        var visibleLinks = jQuery("li.hasLink", currentPlaceholder.parent());
        visibleLinks.removeClass("lastLink");
        // Set styling class for last visible link.
        var lastVisibleLink = visibleLinks.last();
        lastVisibleLink.addClass("lastLink");
    });
}

CnowCovalentRenderer.prototype.renderCheckMyWork = function(checkmyWorks)
{   
    var thisRef = this;
    if( this.showCheckMyWork ) {
        jQuery.each(checkmyWorks, function(i, currentWork) {
            thisRef.renderCheckMyWorkButton( currentWork );
        });
    }
}

CnowCovalentRenderer.prototype.renderFeedbackWidget = function(item, rejoinder)
{
    var idOfItem = "";
    var index = rejoinder.options['index'];

    if (index && index != "" )
    {
        //TODO: May want to change how the ID is formed for the widget in the XSL
        idOfItem = index;
        if (idOfItem.indexOf("_") == -1)
        {
            idOfItem = idOfItem + "_";
        }
    }
    else
    {
        idOfItem = item.getId() + "_";
    }

    //First we need to setup the Click Events
    var overallWidgetContainer = jQuery('#feedBackWidgetOverallContainer'+idOfItem);

    //callback after toggle
    var resizePanes = function(){
        //check if nav-bar resizer function is defined, should be if takeAssigment.js is included

        overallWidgetContainer.trigger("resizePanes");

        if(typeof(initItemNav2) == 'function')
        {
            return initItemNav2();
        }
    }

    if (overallWidgetContainer.length)
    {
        //unbind any previous click events for re-render
        jQuery("#headerLink"+idOfItem).unbind('click');
        jQuery("#headerLink"+idOfItem).click( function()
        {
            jQuery.each(jQuery('.topText',this), function(index, element){(jQuery(element).css('display') == 'none') ? jQuery(element).show(): jQuery(element).hide();});
            jQuery('.feedbackArrow', this).toggleClass('collapsed');
            jQuery('.feedBackWidgetBody', overallWidgetContainer).slideToggle(300, resizePanes);
        });
    }

    var containers = jQuery('.feedBackWidgetContainer', overallWidgetContainer);
    //unbind any previous click events for re-render
    jQuery('.feedbackWidgetHeading', containers).unbind('click');
    jQuery('.feedbackWidgetHeading', containers).click( function(info)
    {
        jQuery('.feedBackWidgetContent', jQuery(this).parent() ).slideToggle(300, resizePanes);
        jQuery('.feedbackArrow', this).toggleClass('collapsed');
    });

    //Now fill in the widget's content
    if (overallWidgetContainer.length)
    {
        var widgetBodyContainer = jQuery('#feedbackOverallContainer'+idOfItem);
        var overallRejoinderDiv = jQuery('#feedbackOverallRejoinder'+idOfItem);
        var additionalFeedbackDiv = jQuery('#additionalFeedbackDiv'+idOfItem).find(".feedBackWidgetContent");
        var postFeedbackDiv = jQuery('#postFeedbackDiv'+idOfItem).find(".feedBackWidgetContent");
        var solutionDiv = jQuery('#solutionDiv'+idOfItem).find(".feedBackWidgetContent");
        var rejoinderIcon = jQuery('#rejoinderIcon' + idOfItem);
        var answerResult = rejoinder.options['type'];
        
        //remove previous class
        rejoinderIcon.removeClass(function (index, css) {
            return (css.match (/\bfeedbackWidgetRejoinder_\S+/g) || []).join(' ');
        });

        rejoinderIcon.addClass('feedbackWidgetRejoinder_' + this.feedbackProperties[rejoinder.options['type']].cssClass);

        var defaultText = this.getDefaultRejoinderText(rejoinder);

        if (defaultText && defaultText != "")
        {
            overallRejoinderDiv.html(defaultText);
            overallRejoinderDiv.show();
            overallWidgetContainer.show();
        }

        var addFeedbackText = this.getOverallRejoinderText(rejoinder);

        if (addFeedbackText && addFeedbackText != "")
        {
            additionalFeedbackDiv.html(addFeedbackText);
            additionalFeedbackDiv.css('display', 'inline-block');

            jQuery('#additionalFeedbackDiv'+idOfItem).css('display', 'block');
            overallWidgetContainer.show();
        }

        var postFeedback = item.findItemAddOnByTypeAndId(CovalentItem.TYPE_POST_SUBMISSION_FEEDBACK, idOfItem);

        if (postFeedback && postFeedback != "")
        {
            postFeedbackDiv.html(postFeedback.options.text);
            postFeedbackDiv.css('display', 'inline-block');

            jQuery('#postFeedbackDiv'+idOfItem).css('display', 'block');
            overallWidgetContainer.show();
        }

        var solutionText = rejoinder.options['correctAnswer'];

        if (solutionText && solutionText != "")
        {
            solutionDiv.css('display', 'inline-block');
            solutionDiv.css('width', '100%');

            jQuery('#solutionDiv'+idOfItem).css('display', 'block');
            solutionDiv.html(solutionText);
            overallWidgetContainer.show();
        }
        
        rejoinder.bind('removed', function(){
            overallRejoinderDiv.empty();
            additionalFeedbackDiv.empty();
            additionalFeedbackDiv.parent().hide();
            postFeedbackDiv.empty();
            postFeedbackDiv.parent().hide();
            solutionDiv.empty();
            solutionDiv.parent().hide();
        });
        if (typeof(MathJax) != 'undefined'){
            typesetMathML(overallWidgetContainer.attr("id"));
        }
        
        //setup mindtap readerlink
        var renderer = this;
        widgetBodyContainer.find('.mindtapReaderLink').each(function(index, readerLink) {            
            renderer.setupMindtapReaderLink(jQuery(readerLink)); 
        });   

        solutionDiv.find('.mindtapReaderLink').each(function(index, readerLink) {            
            renderer.setupMindtapReaderLink(jQuery(readerLink)); 
        });
    }
    resizePanes();
    
    var helper = new CnowCovalentRenderer.FeedbackWidgetHelper(overallWidgetContainer);
    rejoinder.setRejoinderHelper(helper);
}

CnowCovalentRenderer.FeedbackWidgetHelper = function(widget)
{
    this.widget = widget;
}

CnowCovalentRenderer.FeedbackWidgetHelper.prototype.hide = function()
{
    if(this.widget)
    {
        this.widget.hide();
    }
}

CnowCovalentRenderer.prototype.getOverallRejoinderText = function (rejoinder)
{
    if (rejoinder.options['overall'] == true)
    {
        if (rejoinder.getFullMode() == 1)
        {
            return rejoinder.options['text'];
        }
        else
            return "";
    }
    return "";
}

CnowCovalentRenderer.prototype.getDefaultRejoinderText = function(rejoinder)
{
    if (rejoinder.options['overall'] == true)
    {
        if (rejoinder.getFullMode() == 1 || rejoinder.options['text'] == "")
        {
            return this.feedbackProperties[rejoinder.options['type']].message;
        }
        else
        {
            return rejoinder.options['text'];
        }
    }
    return "";
}

CnowCovalentRenderer.prototype.initFeedbackWidgetProperties = function()
{
    this.feedbackProperties = {};
    this.feedbackProperties[CovalentRejoinder.Type.CORRECT] = {
        cssClass: 'Correct',
        message: "Correct"
    };
    this.feedbackProperties[CovalentRejoinder.Type.PARTIAL] = {
        cssClass: 'PartiallyCorrect',
        message: "Partially Correct"
    };
    this.feedbackProperties[CovalentRejoinder.Type.INCORRECT] = {
        cssClass: 'Incorrect',
        message: "Incorrect"
    };
    this.feedbackProperties[CovalentRejoinder.Type.ACCEPTED] = {
        cssClass: 'Accepted',
        message: "Answer Accepted"
    };
};

// -------------------------------------------------------------------------
// Rejoinder FloatBox Methods
// -------------------------------------------------------------------------
CnowCovalentRenderer.prototype.initRejoinderProperties = function()
{
    this.rejoinderProperties = {};
    this.rejoinderProperties[CovalentRejoinder.Type.CORRECT] = {
        cssClass: 'correct',
        title: "That's Correct"
    };
    this.rejoinderProperties[CovalentRejoinder.Type.PARTIAL] = {
        cssClass: 'partial',
        title: "That's Partially Correct"
    };
    this.rejoinderProperties[CovalentRejoinder.Type.INCORRECT] = {
        cssClass: 'incorrect',
        title: "That's Incorrect"
    };
    this.rejoinderProperties[CovalentRejoinder.Type.ACCEPTED] = {
        cssClass: 'accepted',
        title: "Answer accepted"
    };
};

CnowCovalentRenderer.prototype.renderSingleRejoinder = function(rejoinder)
{
    var button = this.renderRejoinderButton(rejoinder);
    rejoinder.bind('removed', function(){
        button.remove();
        if(rejoinder.getRejoinderHelper().floatBox){
            rejoinder.getRejoinderHelper().floatBox.remove();
            rejoinder.getRejoinderHelper().floatBox = null;
        }
    });

    var helper = new CnowCovalentRenderer.RejoinderHelper(null, button);
    rejoinder.setRejoinderHelper(helper);
};

CnowCovalentRenderer.prototype.renderRejoinderButton = function(rejoinder)
{
    var props = this.rejoinderProperties[rejoinder.getType()];
    var renderer = this;

    return this.renderButton(jQuery(rejoinder.getPlaceholderElem()), {
        cssClass: 'rejoinderButton ' + props.cssClass,
        hoverIntent: {
            over: function(){
                renderer.showRejoinderFloatBox(rejoinder, false);
            },
            out: function() {
                renderer.hideRejoinderFloatBox(rejoinder);
            },
            timeout: 200
        },
        click: function(e){
            renderer.showRejoinderFloatBox(rejoinder, true);
        }
    });
};

CnowCovalentRenderer.prototype.renderRejoinderFloatBox = function(rejoinder)
{
    var props = this.rejoinderProperties[rejoinder.getType()];
    var text = rejoinder.getText();
    var correct = rejoinder.getCorrectAnswer();
    var showFeedback = rejoinder.getFullMode() && text;

    //Create placeholder to append feedback and/or correct answer to.
    if (showFeedback || correct)
    {
        var contents = jQuery('<div class="rejoinderContent"/>');
    }

    //Create a floatBox with placeholder for feedback and/or correct answer contents if appropriate.
    //This needs to happen before append contents of feedback and/or correct answer
    //to make sure floatBox is attached to document.
    var floatBox = this.renderFloatBox(props.title, contents)
        .addClass('rejoinderContainer')
        .addClass(props.cssClass)
        .prepend(jQuery('<div class="tailTop"/>'))
        .append(jQuery('<div class="tailBottom"/>'));

    //Now append contents of feedback and/or correct answer to floatBox
    if (showFeedback)
    {
        var feedbackElement = jQuery('<div class="rejoinderFeedback"/>').appendTo(contents).html(text);
        var renderer = this;
        
        feedbackElement.find('.mindtapReaderLink').each(function(index, readerLink) {            
            renderer.setupMindtapReaderLink(jQuery(readerLink)); 
        });        
    }

    if (correct)
    {
        jQuery('<div class="rejoinderCorrectAnswer"/>').appendTo(contents).html(correct);
    }

    //The float box will be resizable after it is opened and sticky, but initially don't let it
    //be larger than 400 by 400
    if (showFeedback || correct)
    {
        var rejoinderContents = floatBox.find('.floatBoxContents');
        var maxInitialHeight = 400;
        var maxInitialWidth = 400;
        var titleBarHeight = Number(floatBox.find('.floatBoxTitleBar').css('height').replace(/px$/,''));

        //Adjust the size of the floatBoxContents div instead of the floatBox.  The floatBox
        //needs to grow and shrink based on hiding/showing the bottom/top tail when not sticky.
        if (floatBox.width() > maxInitialWidth)
        {
            //This div is set 2px smaller than the width of the floatBox to accommodate the 1px border (left and right).
            rejoinderContents.width(maxInitialWidth-2);
        }
        if (floatBox.height() > maxInitialHeight)
        {
            //this div is set 3px smaller than the height of the floatBox (minus the title bar) to accommodate the 1px border
            //around the floatBox (top and bottom), the 1px top border on the floatBoxContents div.
            rejoinderContents.height(maxInitialHeight-titleBarHeight-3);
        }
    }

    return floatBox;
};

CnowCovalentRenderer.prototype.setupMindtapReaderLink = function(readerLink)
{        
    /**
     * ILRN-59315: Mindapp-Unbind any other possible attached 'click'
     * event handlers before attaching this click handler.
     * This handler was getting attached multiple times in case 
     * of feedback-widget, solution-div etc. so unbinded the previous one before 
     * attaching new one.
     */
    var clickHandler = function(event) {
        MindTapReader.openMindTapByJSON(ebookObj);
    };
    var ebookObj = jQuery.parseJSON(readerLink.attr('ebook'));
    if (ebookObj.hasEntitlement || ebookObj.strategy == "FULLBOOK") {
        readerLink
            .show()
            .unbind('click')
            .click(clickHandler);
    }   
}
CnowCovalentRenderer.prototype.showRejoinderFloatBox = function(rejoinder, isSticky)
{
    var helper = rejoinder.getRejoinderHelper();
    var floatBox = helper.floatBox;
    if (! floatBox) {
        helper.floatBox = floatBox = this.renderRejoinderFloatBox(rejoinder);

        if (typeof(MathJax) != 'undefined') {
            typesetMathML();
        }
    }

    this.hideRejoinderFloatBoxs();
    var contents = floatBox.find('.floatBoxContents');
    if (isSticky && contents.length)
    {
        var type = rejoinder.options.type;
        type = (type <= 4 && type >= 1)? type: 0;
        var minW =  [220, 175, 150, 165, 215][type];
        floatBox.resizable({ alsoResize: floatBox.find('.floatBoxContents'), minHeight: 50, minWidth: minW });
    }
    //make sure resizable is initialized
    else
    {
        jQuery(floatBox).data("ui-resizable") && floatBox.resizable("destroy");
    }
    
    this.showFloatBox(floatBox, isSticky);

    // Position rejoinder only if it is not pinned
    if (! floatBox.hasClass("pinned"))
    {
        this.positionRejoinderFloatBox(floatBox, helper.button);
        // Resize the iframe shim again in case we hid tails
        this.resizeIFrameShim(floatBox);
    }

    // In IE 7, the float box vertical scroll bar displays even when the height of the rejoinder
    // is within the float box's limit. So, suppress the scroll bar in this case.
    if (jQuery.browser.msie && parseInt(jQuery.browser.version.substr(0,1)) < 8)
    {
        var floatBoxDiv = jQuery('.floatBoxContents', floatBox);
        var rejoinderDiv = jQuery('.rejoinderContent', floatBox);
        if (rejoinderDiv.height() <= floatBoxDiv.height())
        {
            floatBoxDiv.css('overflow-y', 'hidden');
        }
    }
};

CnowCovalentRenderer.prototype.positionRejoinderFloatBox = function(floatBox, button)
{
    // Find and hide both tails
    var topTail = floatBox.children('.tailTop').hide();
    var botTail = floatBox.children('.tailBottom').hide();

    var botTailHeight = Number(botTail.css('height').replace(/px$/,''));
    var boxHeight = floatBox.children('.floatBoxInnerContainer').height();

    // Offset the rejoinder by a little bit to ensure that the tip of the
    // tail is outside the button
    var adjustmentHeight = 3;

    // Calculate the full height of the floatBox with tail and adjustment
    var fullRejoinderHeight = boxHeight + botTailHeight + adjustmentHeight;

    // Check if the rejoinder will fit above the rejoinder button (in the
    // space between the top of the window and the rejoinder button)
    var isAbove = (button.offset().top > fullRejoinderHeight);

    // Show the appropriate tail only if floatBox is not sticky
    if (! floatBox.hasClass('sticky')) {
        floatBox[0].style.height = "";
        (isAbove ? botTail : topTail).show();
    }

    // Set the position of the floatBox
    this.positionFloatBox(floatBox, button, isAbove, adjustmentHeight)

};

CnowCovalentRenderer.prototype.hideRejoinderFloatBoxs = function()
{
    jQuery('.rejoinderDiv:not(.sticky, .pinned)').hide();
};

CnowCovalentRenderer.prototype.hideRejoinderFloatBox = function(rejoinder)
{
    this.hideBox(rejoinder.getRejoinderHelper().floatBox);
};

CnowCovalentRenderer.RejoinderHelper = function(floatBox, button)
{
    this.floatBox = floatBox;
    this.button = button;
}

CnowCovalentRenderer.RejoinderHelper.prototype.hide = function()
{
    //Hide floatBox when already rendered
    if(this.floatBox)
    {
        this.floatBox.hide();
    }
    this.button.hide();
};

// -------------------------------------------------------------------------
//Additional Info FloatBox Methods
//-------------------------------------------------------------------------

CnowCovalentRenderer.prototype.renderSingleAdditionalInfo = function(info)
{
    var buttons = this.renderAdditionalInfoButtons(info);
    var helper = new CnowCovalentRenderer.AdditionalInfoHelper(null, buttons);
    info.setHelper(helper);
    
    info.bind('removed', jQuery.proxy(function(){
        this.hideAdditionalInfoFloatBox(info);
    }, this));
}

CnowCovalentRenderer.prototype.renderAdditionalInfoButtons = function(info)
{
    var renderer = this;
    var buttons = [];
    var properties = {
        cssClass: 'additionalInfoButton',
        text: 'Show Additional Info',
        //Keep hoverintent to prevent js errors
        hoverIntent: {
            over: function(){},
            out: function(){},
            timeout: 0
        },
        click: function(e){
            var button = jQuery(this);
            if (button.hasClass('hideInfo')) {
                renderer.hideAdditionalInfoFloatBox(info, button);
            } else {
                renderer.showAdditionalInfoFloatBox(info, button);
                jQuery.each(info.getHelper().buttons, function(i,button) {
                    button.trigger('floatBoxShowEvent');
                    button.addClass("hideInfo");
                });
            }
            return false;
        }
    };

    jQuery.each(info.getPlaceholderElements(), function(i, element){
        jQuery(element).addClass("hasLink");
        var newButton = renderer.renderLink(jQuery(element), properties);
        newButton.bind('floatBoxShowEvent', function(event) {
           jQuery(event.target).text('Hide Additional Info'); 
        });
        newButton.bind('floatBoxCloseEvent', function(event) {
            jQuery(event.target).text('Show Additional Info'); 
         });
        buttons.push(newButton);
    })
    return buttons;
}

CnowCovalentRenderer.prototype.showAdditionalInfoFloatBox = function(info, clickedButton)
{
    var helper = info.getHelper();
    var floatBox = helper.floatBox;
    if (!floatBox) {
        floatBox = this.renderAdditionalInfoFloatBox(info, clickedButton);
        helper.floatBox = floatBox;
        if (typeof(MathJax) != 'undefined') {
            typesetMathML();
        }
    }
    
    this.showFloatBox(floatBox, true);

    //Reposition if not pinned
    if (! floatBox.hasClass('pinned')) {
        // The parent of the clicked button is the placeholder element
        this.positionFloatBox(floatBox, clickedButton, clickedButton.parent().hasClass('bottom'), 1);
    }
}

CnowCovalentRenderer.prototype.renderAdditionalInfoFloatBox = function(info, button)
{
    var renderer = this;
    var floatBox = this.renderFloatBox('Additional Info', info.getText()).addClass('additionalInfoContainer');
    floatBox.find('.closeButton').click(function(e) {
        button.removeClass("hideInfo");
        button.trigger('floatBoxCloseEvent');
        jQuery.each(info.getHelper().buttons, function(i,button) {
            button.removeClass("hideInfo");
            button.trigger('floatBoxCloseEvent');
        });
    });
    
    floatBox.find('.mindtapReaderLink').each(function(index, readerLink) {            
        renderer.setupMindtapReaderLink(jQuery(readerLink)); 
    });

    return floatBox;
}

CnowCovalentRenderer.prototype.hideAdditionalInfoFloatBox = function(info)
{
    var floatBox = info.getHelper().floatBox;
    if (floatBox) {
        floatBox.css('display', 'none');
        jQuery.each(info.getHelper().buttons, function(i, button) {
            button.removeClass("hideInfo");
            button.trigger('floatBoxCloseEvent');
        });
    }
}

CnowCovalentRenderer.AdditionalInfoHelper = function(floatBox, buttons)
{
    this.floatBox = floatBox;
    this.buttons = buttons;
}

//-------------------------------------------------------------------------
//Hint FloatBox Methods
//-------------------------------------------------------------------------
CnowCovalentRenderer.prototype.renderSingleHint = function(hint)
{
    var buttons = this.renderHintButtons(hint);
    var helper = new CnowCovalentRenderer.HintHelper(null, buttons);
    hint.setHelper(helper);
    
    hint.bind('removed', jQuery.proxy(function(){
        this.hideHintFloatBox(hint);
    }, this));    
}

CnowCovalentRenderer.prototype.renderHintButtons = function(hint)
{
    var renderer = this;
    var buttons = [];
    var properties = {
        cssClass: 'hintButton',
        //Keep hoverintent to prevent js errors
        hoverIntent: {
            over: function(){},
            out: function(){},
            timeout: 0
         },
         click: function() {
             var button = jQuery(this);
             if (button.hasClass('hideInfo')) {
                 renderer.hideHintFloatBox(hint, jQuery(this));
                 jQuery.each(hint.getHelper().buttons, function(i, button) {
                     button.removeClass("hideInfo");
                     button.trigger('floatBoxCloseEvent');
                 });
             } else {
                 renderer.showHint(hint, jQuery(this));
                 jQuery.each(hint.getHelper().buttons, function(i,button) {
                     button.addClass("hideInfo");
                     button.trigger('floatBoxShowEvent');
                 });
             }
             return false;
         },
         text: 'Hint(s)'
    };

    jQuery.each(hint.getPlaceholderElements(), function(i, element){
        jQuery(element).addClass("hasLink");
        var newButton = renderer.renderLink(jQuery(element), properties);
        if (hint.options.icon) {
            newButton.append(" <img src='"+hint.options.icon+"' style='vertical-align:middle'/>");
        }
        newButton.bind('floatBoxShowEvent', function(event) {
//           jQuery(event.target).text('Hint(s)');
        });
        newButton.bind('floatBoxCloseEvent', function(event) {
//            jQuery(event.target).text('Hint(s)');
         });
        buttons.push(newButton);
    });
    return buttons;
}

CnowCovalentRenderer.prototype.showHint = function(hint, clickedButton)
{
    var helper = hint.getHelper();
    var floatBox = helper.floatBox;
    if (!floatBox) {
        floatBox = this.renderHintFloatBox(hint, clickedButton);
        helper.floatBox = floatBox;
        if (typeof(MathJax) != 'undefined') {
            typesetMathML();
        }
    }
    helper.positionElement = clickedButton;

    if (floatBox.hasClass('pinned')) {
        this.showFloatBox(floatBox, true);
    } else {
        floatBox.css({top:0,left:0});
        this.showFloatBox(floatBox, true);
        //Reposition if not pinned
        this.positionFloatBox(floatBox, clickedButton, clickedButton.parent().hasClass('bottom'), 1);
    }
};

CnowCovalentRenderer.prototype.renderHintFloatBox = function(hint, clickedButton)
{
    var renderer = this;
    var hintContainer = jQuery('<div class="hintContents" />');
    var hints = hint.getText();
    var numHints = hints.length;
    var hintsByPageNumber = [];

    jQuery.each(hints, function(i, hintText){
        hintsByPageNumber[i + 1] = jQuery('<div class="hintContentHolder disable" />')
            .append(hintText)
            .appendTo(hintContainer);
    });

    hintContainer.find('.mindtapReaderLink').each(function(index, readerLink) {            
        renderer.setupMindtapReaderLink(jQuery(readerLink)); 
    });

    var title = jQuery('<div class="hintTitle" />');

    var titleText = jQuery('<div class="hintTitleText"/>')
        .append('Hint ')
        .appendTo(title);

    if(numHints > 1){
        var pageNumber = jQuery('<span></span>');

        titleText.append(pageNumber)
            .append(' of ' + numHints);

        var prevButton = jQuery('<div class="prevNav" />')
            .appendTo(title);
        var nextButton = jQuery('<div class="nextNav" />')
            .appendTo(title);

        // Function to change the page when click on navigation arrow
        var changePage = function(offset) {
            var currentPage = hintContainer.data('currentPageNum');
            var newPage = currentPage + offset;

            // If we are already first page or last page, don't do anything
            if (! hintsByPageNumber[newPage])
            {
                return;
            }

            // Make current page invisible and show new page
            hintsByPageNumber[currentPage].addClass('disable');
            hintsByPageNumber[newPage].removeClass('disable');

            prevButton.toggleClass('disabled', (newPage == 1));
            nextButton.toggleClass('disabled', (newPage == numHints));

            // Update current page number in Text
            pageNumber.html(newPage);

            // Update currentPageNum with new page number
            hintContainer.data('currentPageNum', newPage);

            if(floatBox){
                renderer.showFloatBox(floatBox, true);
                if (!floatBox.hasClass('pinned'))
                {
                    var positionElement = hint.getHelper().positionElement;
                    renderer.positionFloatBox(floatBox, positionElement, positionElement.parent().hasClass('bottom'), 1);
                }
             }
        };

        prevButton.click(function(e){
            changePage(-1);
        });
        nextButton.click(function(e){
            changePage(1);
        });

        // Set initial page number
        hintContainer.data('currentPageNum', 1);
        changePage(0);
    }
    else {
        //When only one hint, remove the class to display the hint
        hintsByPageNumber[1].removeClass('disable');
    }

    var floatBox = this.renderFloatBox(title, hintContainer).addClass('hintContainer');
    floatBox.find('.closeButton').click(function(event) {
        renderer.hideHintFloatBox(hint, jQuery(event.target));
        jQuery.each(hint.getHelper().buttons, function(i,button) {
            button.removeClass("hideInfo");
            button.trigger('floatBoxCloseEvent');
        });
    });
    return floatBox;
}

CnowCovalentRenderer.prototype.hideHintFloatBox = function(hint)
{
    var helper = hint.getHelper();
    var floatBox = helper.floatBox;
    if (floatBox) {
        floatBox.css('display', 'none');
        jQuery.each(hint.getHelper().buttons, function(i,button) {
            button.removeClass("hideInfo");
            button.trigger('floatBoxCloseEvent');
        });
    }
}

CnowCovalentRenderer.prototype.showHintButtons = function(hint)
{
    jQuery(hint.getPlaceholderElements()).show();       
}

CnowCovalentRenderer.prototype.hideHintButtons = function(hint)
{
    jQuery(hint.getPlaceholderElements()).hide();           
}

CnowCovalentRenderer.HintHelper = function(floatBox, buttons)
{
    this.floatBox = floatBox;
    this.buttons = buttons;
    this.positionElement = null;
}

//-------------------------------------------------------------------------
//Generic FloatBox Methods
//-------------------------------------------------------------------------
CnowCovalentRenderer.prototype.renderButton = function(placeholderElem, properties)
{
    return jQuery('<span />')
        .addClass(properties.cssClass)
        .hoverIntent(properties.hoverIntent)
        .click(properties.click)
        .appendTo(placeholderElem);
}

CnowCovalentRenderer.prototype.renderLink = function(placeholderElem, properties)
{
    return jQuery('<a href="#" />')
        .addClass(properties.cssClass)
        .hoverIntent(properties.hoverIntent)
        .click(properties.click)
        .text(properties.text)
        .appendTo(placeholderElem);
}

CnowCovalentRenderer.prototype.renderFloatBox = function(title, contents, onCloseCallback)
{
    var renderer = this;

    var floatBox = jQuery('<div class="floatBoxContainer"/>')
        .mousedown(function(ev){
            floatBox.css('zIndex', renderer.getNextTop());
        })
        .css({
            display : 'none',
            position : 'absolute',
            top: 0,
            left: 0,
            zIndex: renderer.getNextTop()
        });

    // Use an iframe shim if the page contains embedded media
    // It is critical that we add the iframe shim before the body of the rejoinder
    // NOTE: IFrame shim doesn't work with Safari 3 or 4
    // TODO: Come up with a different solution for Safari
    if (jQuery("applet, object, embed") && ! jQuery.browser.safari)
    {
        this.addIFrameShim(floatBox);
    }

    var pinButton = jQuery('<div class="pinButton"/>')
        .click(function() {
            floatBox.toggleClass("pinned");
            floatBox.draggable(floatBox.hasClass("pinned") ? "disable" : "enable");
        });

    var closeButton = jQuery('<div class="closeButton"/>')
        .click(function() {
            floatBox.removeClass("sticky");
            floatBox.hide();
        });

    var titleBar = jQuery('<div class="floatBoxTitleBar"/>')
        .append(jQuery('<div class="floatBoxTitle"/>').append(title))
        .append(pinButton)
        .append(closeButton);

    var inner = jQuery('<div class="floatBoxInnerContainer"/>').append(titleBar);

    if (contents)
    {
        inner.append(jQuery('<div class="floatBoxContents"/>').append(contents));
    }

    floatBox.append(inner);
    floatBox.draggable({handle: titleBar});
    floatBox.appendTo(document.body);

    return floatBox;
};

CnowCovalentRenderer.prototype.showFloatBox = function(floatBox, isSticky)
{
    floatBox.toggleClass("sticky", isSticky);
    floatBox.css('zIndex', this.getNextTop());
    floatBox.show();

    // HACK: Fix for MSIE: Make the floatBox's title bar at least as wide as the floatBox
    if (jQuery.browser.msie)
    {
        var titleBar = jQuery('.floatBoxTitleBar',floatBox);
        var contentsBox = jQuery('.floatBoxContents', floatBox);
        //Make sure the contents underneath titlebar is as wide as the title bar, so the divider will go all the way across in IE7
        //adjust width for padding - 5px per side = 10px -2 for border = 8px
        var titleBarWidth = titleBar.width() - 8;
        if(contentsBox && titleBarWidth > contentsBox.width() && !floatBox.alreadyDidContentsHack)
        {
            contentsBox.width(titleBar.width());
            floatBox.alreadyDidContentsHack = true;
        }
        // Subtract 2 pixels for border thickness
        var floatBoxWidth = jQuery('.floatBoxInnerContainer',floatBox).width() - 2;
        if (floatBoxWidth > titleBar.width() && !floatBox.alreadyDidTitleBarHack)
        {
            titleBar.width(floatBoxWidth);
            floatBox.alreadyDidTitleBarHack = true;
        }

    }

    this.resizeIFrameShim(floatBox);
};

/**
 * Position the floatBox either above or below the given positionElement,
 * with additional offset of the given adjustment.
 */
CnowCovalentRenderer.prototype.positionFloatBox = function(floatBox, positionElement, isAbove, adjustment)
{
    // Vertically position float box relative to the position element.
    var position = positionElement.offset();

    if (isAbove)
    {
        var height = floatBox.height() < position.top ? floatBox.height() : position.top;
        position.top -= adjustment + height;
    }
    else
    {
        position.top += adjustment + positionElement.height();
    }

    // Horizontally position float box relative to positionElement and within the client area
    // accounting for possible vertical scrollbar.
    var clientWidth =
            (jQuery.browser.msie)?
            Math.max(
                    document.documentElement["clientWidth"],
                    document.documentElement["scrollWidth"],
                    document.body["scrollWidth"]
            ):
            jQuery(document).width();
    if (position.left + floatBox.width() > clientWidth)
        position.left = clientWidth - floatBox.width();
    position.left = Math.max(0, position.left);

    floatBox.css(position);
}

// IFrame inserted before draggable element to provide a mask to cover applets on page.
CnowCovalentRenderer.prototype.addIFrameShim = function(floatBox)
{
    // MSIE requires that the frameborder attribute be specified when the element
    // is created; otherwise it is ignored
    var iframe = jQuery('<iframe frameborder="0" class="floatBoxIframeShim bgiframe"/>')
        .attr({
            src: '',
            scrolling: 'no',
            border: '0',
            tabindex: '-1'
        })
        .css({
            display: 'block',
            position: 'absolute',
            zIndex: -1
        });

    floatBox.prepend(iframe);
};

CnowCovalentRenderer.prototype.resizeIFrameShim = function(floatBox)
{
    floatBox.children('iframe.floatBoxIframeShim:visible')
        .height(floatBox.height())
        .width(floatBox.width())
        .css({top: 0, left: 0});
};


CnowCovalentRenderer.prototype.renderCheckMyWorkButton = function(checkMyWorkButton)
{
    var placeholder =  jQuery('#' + checkMyWorkButton.placeholderElementId);
    placeholder.parent().addClass("hasLink");
    
    var checkMyWorkHtml = this.createCheckMyWorkHtml(checkMyWorkButton.placeholderParams);
    //If we are not rendering any content for check my work, hide the list tag.
    if(checkMyWorkHtml != '') {
    	placeholder.html( checkMyWorkHtml );
    }
    else {
    	placeholder.parent('li').hide();
    }
    
}

CnowCovalentRenderer.prototype.createCheckMyWorkHtml = function(params)
{
    if( params.presentationMode != 'homework' )
        return '';

    if( !params.showCheckMyWork )
        return '';

    if( params.gradebookMode == '1' )
        return '<span class="inactive">Check My Work</span>';

    if( params.checkMyWorkUnlimited )
    {
        return '' +
            '<a href="#" onclick="doCheckMyWork(); return false;" class="check-my-work-link">' +
                'Check My Work' +
            '</a>' +
            '<span class="inactive check-my-work-inactive-link" style="display: none">Check My Work</span>';
    }

    if( params.checkMyWorkPossible == 0 )
        return '';

    if( (params.checkMyWorkPossible - params.checkMyWorkUsed) <= 0 )
    {
        return '<span class="inactive">Check My Work </span>(No more tries available)';
    }

    return '' +
        '<a href="#" onclick="doCheckMyWork(); return false;" class="check-my-work-link">' +
            'Check My Work' +
        '</a>' +
        '<span class="inactive check-my-work-inactive-link" style="display: none">' +
            'Check My Work' +
        '</span>' +
        ' (' + (params.checkMyWorkPossible - params.checkMyWorkUsed) + ' remaining)';
}

CnowCovalentRenderer.prototype.removeDuplicateEbookCaptions = function() {
    function removeDuplicates(element, selector) {
        jQuery(element).find(selector)
            .filter(function(index) {
                return index !== 0;
            }).remove();
    }
    
    jQuery('.additional_resource.ebook, .additional_resource.aee').each(function() {
        removeDuplicates(this, '.caption');
        removeDuplicates(this, '.additional_resource_list');
    });
}