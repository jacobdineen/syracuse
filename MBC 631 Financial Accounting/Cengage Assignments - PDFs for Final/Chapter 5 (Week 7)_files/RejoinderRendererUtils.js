function RejoinderRenderer(){

}

RejoinderRenderer.prototype.hideBox = function(box){
    if(box)
    {
        if(!box.hasClass('sticky') && !box.hasClass('pinned'))
        {
            box.hide();
        }
    }
};

RejoinderRenderer.prototype.getNextTop = function(){
    var highest_zindex = 5000;
    jQuery('.floatBoxContainer,.multiAnswersContainer').each(function(){
        var current_zindex = parseInt(jQuery(this).css('zIndex'), 10);
        if (current_zindex > highest_zindex)
            highest_zindex = current_zindex;
    });
    return ++highest_zindex;
};