(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
                if(opt.handle === "") {
                    $(this).removeClass('draggable');
                } else {
                    $(this).removeClass('active-handle').parent().removeClass('draggable');
                }
            });

    }
})(jQuery);

function MultipleCorrectsPopupHandler()
{
    this.multipleCorrects = [];
}

MultipleCorrectsPopupHandler.getInstance = function()
{
    if(typeof(MultipleCorrects_instance) != 'object')
    {
        MultipleCorrects_instance = new MultipleCorrectsPopupHandler();
    }
    
    return MultipleCorrects_instance;
}

MultipleCorrectsPopupHandler.prototype.addMultipleCorrectsPopup = function(options)
{
    this.multipleCorrects.push(new MultipleCorrectsPopup(options));
}

MultipleCorrectsPopupHandler.prototype.render = function()
{
    for(var i = 0; i < this.multipleCorrects.length; i++)
    {
        this.multipleCorrects[i].renderButton();
    }

    MultipleCorrectsPopupHandler.removePopups();
    MultipleCorrectsPopupHandler.recreate();
}

MultipleCorrectsPopupHandler.removePopups = function(){
    jQuery(".multiAnswersContainer").remove();
}

MultipleCorrectsPopupHandler.recreate = function()
{
    MultipleCorrects_instance = new MultipleCorrectsPopupHandler();
}

function MultipleCorrectsPopup(options)
{
    var defaultOptions = {
        width: 200,
        height: 200,
        title: 'Correct Responses'
    };
    
    this.options = jQuery.extend(defaultOptions, options);
    
    this.multiAnswerButton = null;
    this.multiAnswerPopup = null;
};

MultipleCorrectsPopup.prototype = new RejoinderRenderer();

MultipleCorrectsPopup.prototype.renderButton = function()
{
    var multiAnswerContainer = jQuery('#' + this.options.id.replace(/\./g, "\\."));
    multiAnswerContainer.css({position: 'relative'});
    
    var thisRef = this;
    var resPath = window.resourcePath || (location.protocol + "//" + location.host);
    var imgSrc = resPath + '/media/img/common/icon_multiAnswerFull.gif';
    var multiCorrectImg = jQuery('<img />')
        .attr({
            src : imgSrc
        })
        .css({
            position: 'absolute',
            right: 0,
            top: 0
        })
        .click(function(event){
            thisRef.show(true, event);
        })
        .hoverIntent({
            over: function(event){
                thisRef.show(false, event);
            },
            out: function(event){
                thisRef.hideBox(thisRef.multiAnswerPopup);
            },
            timeout: 200
        });
    if (this.options.fieldType == 'cloze') {
        multiCorrectImg.css({position: 'static', margin: '3px'});
    }
    if (this.options.itemType == 'FITB') {
        multiCorrectImg.css({position: 'relative', right: '13.5px', top: '-2px'});
    }
    if (jQuery("img[src$='" + imgSrc + "']", multiAnswerContainer).size() == 0) {
        multiAnswerContainer.append(multiCorrectImg);
        multiAnswerContainer.css({paddingRight: '12px'});
    }
}

MultipleCorrectsPopup.prototype.show = function(sticky, event)
{
    if(!this.multiAnswerPopup)
    {
        this.multiAnswerPopup = this.render();
    }
    
    this.multiAnswerPopup.toggleClass('sticky', sticky);
    this.multiAnswerPopup.show();
    typesetMathML();

    if (! this.multiAnswerPopup.hasClass('pinned'))
    {
        this.multiAnswerPopup.children('.tailTop').hide();
        var location;
        var offset = 3;
        if(!event.pageX)
        {
            location = {top: event.clientY + 3, left: event.clientX};
        }
        else
        {
            location = {top: event.pageY + 3, left: event.pageX};
        }
                 
        this.multiAnswerPopup.css(location);
        if(!sticky)
        {
            this.multiAnswerPopup.children('.tailTop').show();
        }
    }
        
};

MultipleCorrectsPopup.prototype.render = function()
{
    var renderer = this;
    var popup = jQuery('<div class="multiAnswersContainer"/>')
        .mousedown(function(ev){
            popup.css('zIndex', renderer.getNextTop());
        })
        .css({
            display : 'none',
            position : 'absolute',
            top: 0,
            left: 0, 
            width: this.options.width,
            height: this.options.height,           
            zIndex: renderer.getNextTop()
        })
        .prepend(jQuery('<div class="tailTop"/>'));

    var pinButton = jQuery('<div class="pinButton"/>')
        .click(function() {
            popup.toggleClass('pinned');
            popup.draggable(popup.hasClass('pinned') ? 'disable' : 'enable');
        });

    var closeButton = jQuery('<div class="closeButton"/>')
        .click(function() {
            popup.removeClass('sticky');
            popup.children('.tailTop').hide();
            popup.hide();
        });

    var titleBar = jQuery('<div class="multiAnswersTitleBar"/>')
        .append(jQuery('<div class="multiAnswersTitle"/>').append(this.options.title))
        .append(pinButton)
        .append(closeButton);
    
    var inner = jQuery('<div class="multiAnswersInnerContainer"/>').append(titleBar);
    
    if (this.options.contents)
    {
        var $contents = jQuery(this.options.contents);
        $contents.find('li').contents().each(function() {
            // if nodeType - text than wrap it into mathml to maintain the consistency in displaying font style of corrects 
            if (this.nodeType === 3) {
                jQuery(this).before("<math><mtext>" + this.nodeValue + "</mtext></math>").remove();
            }
        });
        inner.append(jQuery('<div class="multiAnswersContents"/>').addClass(document.documentMode == 8? "": "overflowAuto").append($contents));
    }
    
    popup.append(inner);
    
    jQuery(titleBar).parent().drags();
    
    popup.appendTo(document.body);
    
    return popup;
};
