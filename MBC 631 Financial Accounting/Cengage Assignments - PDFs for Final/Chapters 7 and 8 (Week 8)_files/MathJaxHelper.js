if (typeof(MathJax) == 'undefined'){

(function(){
    // Override the code that creates new style elements with javascript; if there would be more styles than IE's limit, then merge all existing styles into a single stylesheet.
    function isIE() {
        if (typeof isIE.value == "undefined") {
            var e = document.createElement("div");
            e.innerHTML = "<!--[if IE]><![endif]-->";
            isIE.value = (e.innerHTML == '');
        }
        return isIE.value;
    }
    if (isIE()) {
        if (document.createElementIEUnsafe == undefined) {
            document.createElementIEUnsafe = document.createElement;
            function createElementIESafe(type) {
                if (type.toLowerCase() == "style" && document.styleSheets.length > 29) {
                    // This is needed to avoid going over IE's stylesheet limit, which causes a javascript error
                    var links = document.getElementsByTagName('link');
                    var linkArray = [];
                    for (var i=0; i<links.length; i++) {
                        linkArray.push(links[i]);
                    }
                    var hrefMap = {};
                    for (var i=0; i<linkArray.length; i++) {
                        var link = linkArray[i];
                        if (!link || link.rel!='stylesheet') continue;
                        if (hrefMap[link.href])
                            link.parentNode.removeChild(link);
                        hrefMap[link.href] = 1;
                    }

                    var styles = document.getElementsByTagName('style');
                    var styleArray = [];
                    var css = "";
                    for (var i=0; i<styles.length; i++) {
                        styleArray.push(styles[i]);
                    }

                    for (var i=0; i<styleArray.length && document.styleSheets.length > 1; i++) {
                        var style = styleArray[i];
                        css += style.innerHTML;
                        style.parentNode.removeChild(style);
                    }
                    document.styleSheets[0].cssText = css + document.styleSheets[0].cssText;
                }
                return document.createElementIEUnsafe(type);
            }
            document.createElement = createElementIESafe;
        }
    }

        function attachScript() {
            if (jQuery.browser.msie && jQuery.browser.version < 10) {
                try {
                    document.namespaces.add("loadtest")
                } catch (e) {
                    setTimeout(attachScript, 100);
                    return;
                }
            }

            var script = document.createElement("script");
            script.type = "text/javascript";
            var configPath = window.resourcePath + '/media/js/problemTypes/MathJaxConfig.js';
            script.src = window.resourcePath + "/media/jsframeworks/MathJax/MathJax.js?delayStartupUntil=configured&config=" + configPath;

            document.getElementsByTagName("head")[0].appendChild(script);
        }

        attachScript()
    })();

    jQuery(window).load(function () {
        typesetMathML();
    });

    jQuery(window).bind("stepLoaded", function () {
        typesetMathML();
    });
}

function mathJaxConfigCallBack() {

    var $ = jQuery;

    /**
     * Find jax element by id.
     *
     * @param mathJaxTree root jax element.
     * @param id.
     * @return jax element with id equals <code>id</code>
     */
    var findJaxElementById = function (mathJaxTree, id) {
        var mspaceElement = null;
        if (mathJaxTree && mathJaxTree.length) {
            for (var i = 0, l = mathJaxTree.length; i < l; i++) {
                if (mathJaxTree[i].id === id) {
                    return mathJaxTree[i];
                }
                else if (mathJaxTree[i].data) {
                    mspaceElement = findJaxElementById(mathJaxTree[i].data, id);
                    if (mspaceElement) return mspaceElement;
                }
            }
        }
        else if (mathJaxTree && mathJaxTree.root && mathJaxTree.root.data) {
            mspaceElement = findJaxElementById(mathJaxTree.root.data, id)
        }
        return mspaceElement;
    };

    var mas = [];

    function runReposition() {
        for (var i = 0, len = mas.length; i < len; i++) {
            // find target
            var target = $('#mspace' + mas[i]).closest(".fieldHolder");
            if (target.length) {
                // find input field to reposition
                var field = $('#wrapper' + mas[i]);
                target.css({'visibility' : 'hidden'});
                applyRepositioning(target, field);
            } else {
                mas.splice(i, 1);
                len--;
            }
        }
        if (mas.length) {
            runRepositionId = setTimeout(runReposition, 500);
        } else {
            runRepositionId = null;
        }
    }

    /**
     * Position input fields over MathML
     */
    function applyRepositioning(target, field) {

        var ellipse = target.find(($.browser.msie && $.browser.version < 9) ? 'oval' : 'ellipse');

        if (ellipse.closest('span').is(":visible")) {

            var offset = ellipse.offset();
            var oldOffset = field.data('offset') || {left:0, top:0};
            var topChanged = Math.abs(offset.top - oldOffset.top) > 5;
            var leftChanged = Math.abs(offset.left - oldOffset.left) > 5;


            if (topChanged || leftChanged) {
                field.data('offset', offset);
                var off = {};
                if (topChanged){
                    off.top = offset.top;
                }
                if (leftChanged){
                    off.left = offset.left;
                }
                field.offset(off);
                field.css('visibility', 'visible');
            }

        }

    }

    /**
     * Setting new size of mspace by field.
     * Invoked on every change size
     *
     * @param mmlFieldWrapper container of field inside mathml.
     * @return boolean true if size changed
     */
    function recalculateMathJaxSizeForField(mmlFieldWrapper) {
        var mmlFieldWrapperId = mmlFieldWrapper.attr('id');
        if (!mmlFieldWrapperId) {
            return null;
        }
        var patchId = mmlFieldWrapperId.substring('wrapper'.length);
        var size = mmlFieldWrapper.data('size') || mmlFieldWrapper.data('size', {width:0, height:0}).data('size');
        var newWidth = mmlFieldWrapper.width();
        var newHeight = mmlFieldWrapper.height();
        var sizeChanged = false;

        if (Math.abs(size.width - newWidth) <= 5 && Math.abs(size.height - newHeight) <= 5) {
            return sizeChanged; // size have not changed
        }

        size.width = newWidth;
        size.height = newHeight;

        var jax = mmlFieldWrapper.data('jax');

        if (!jax) {
            var mathJaxParentElement = $("#mspace" + patchId).closest('span[id^="MathJax-Element-"]');
            if (mathJaxParentElement.length) {
                var id = mathJaxParentElement.attr("id");
                id = id.replace('-Frame', '');
                jax = MathJax.Hub.getJaxFor(id);
                // cache jax
                mmlFieldWrapper.data('jax', jax);
            }
        }

        if (jax) {
            var mspace = mmlFieldWrapper.data('mspace');
            if (!mspace) {
                mspace = findJaxElementById(jax, 'mspace' + patchId);
                mmlFieldWrapper.data('mspace', mspace);    // cache mspace
            }
            if (mspace) {
                var width = mmlFieldWrapper.outerWidth();
                var height = mmlFieldWrapper.outerHeight();
                mspace.width = width + "px";
                mspace.height = height + "px";
                sizeChanged = true;
            }
        }
        return sizeChanged;
    }

    /**
     * Redraw MathJax
     * @param mmlFieldWrapper wrapper contains mathjax element as mmlFieldWrapper.data('jax')
     */
    function redrawMathJaxByField(mmlFieldWrapper) {
        var jax = mmlFieldWrapper.data('jax');
        if (jax) {
            if ($("#" + jax.inputID + '-Frame').is(":visible")) {
                jax.Rerender();
            }
        }
    }

    var runRepositionId;
    MathJax.Hub.Register.MessageHook("New Math", function (message) {
        var elem = message[1];
        var text = document.getElementById(elem).text;
        text.replace(/id=['"]mspace([^"']*)/g, function (s, uid) {
            if ($.inArray(uid, mas) == -1) {
                mas.push(uid);
            }
        });
        if (!runRepositionId){
            runReposition();
        }
    });

    function redraw(mmlFieldWrapper){
        var sizeChanged = recalculateMathJaxSizeForField(mmlFieldWrapper);
        if (sizeChanged) {
            redrawMathJaxByField(mmlFieldWrapper);
        }
    }

    function detectSizeChanged($fieldWrappers){
        $fieldWrappers.each(function () {
            var mmlFieldWrapper = $(this);
            redraw(mmlFieldWrapper)
        });
        detectSizeChangedId = setTimeout(function(){
            detectSizeChanged($fieldWrappers)
        }, 1000);
    }

    var detectSizeChangedId;
    MathJax.Hub.Register.MessageHook('End Process', function () {

        var $fieldWrappers = $("span.mathmltempcontainer").children('span[id^="wrapper"]');

        if (detectSizeChangedId){
            clearTimeout(detectSizeChangedId);
        }
        detectSizeChanged($fieldWrappers);

        $fieldWrappers.find('.control-dimension-element').unbind('redraw').bind('redraw', function () {
            var mmlFieldWrapper = $(this).closest('span[id^="wrapper"]');
            redraw(mmlFieldWrapper);
        });
    });
}

function typesetMathML(elmId) {
    if (typeof(MathJax) != 'undefined') {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, elmId]);
    }
}
