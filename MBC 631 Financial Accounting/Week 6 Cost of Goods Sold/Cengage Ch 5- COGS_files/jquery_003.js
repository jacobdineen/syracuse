jQuery.fn.additional_resource = function() {
	
    var labelsByClassName = {
            'aee' : 'Animated Example Exercise',
			'demo' : 'Show Me How',
            'ebook' : 'eBook',
            'electure' : 'eLecture',
            'spreadsheet' : 'Spreadsheet',
            'video': 'Video',
			'ipod': 'iPod Resources',
            'exhibit': 'Future Value',
            'exhibitp': 'Present Value',
            'exhibits': 'P & F Values',
			'pss' : 'Problem-Solving Strategy'
        };
        
  this.each( function(){

    var thing = jQuery(this);
    var children = thing.children();
    if( thing.html().replace(/\s/g, '') == '' )  
	  		   {  
	  		      thing.remove();  
	  		      return;  
	  		   }  
	  		     
	
    if( children.length > 0 )
    {
      thing.addClass('additional_resource_dropdown');
      var childrenHolder = jQuery("<div />");
      thing.append(childrenHolder);
      childrenHolder.append(thing.children('a'));

      childrenHolder.addClass("additional_resource_list");
      childrenHolder.hide();
      thing.mouseover(
          function(){
            childrenHolder.show();
          }
      );
      thing.mouseout(
          function(){
            childrenHolder.hide();
          }
      );
      
      jQuery.each(labelsByClassName, function (key, value) {
          if (thing.hasClass(key)) {
              thing.prepend('<span class="caption">'+value+'</span>');
              return false;
          }
      });
      
	}
  });

  return this;
}

jQuery(document).ready(function(){
	jQuery.each([
        'aee-over.jpg',
		'demo-over.jpg',
        'ebook-over.jpg',
        'electure-over.jpg',
        'pss-over.jpg',
        'spreadsheet-over.jpg',
        'video-over.jpg'
	], function(idx, val) {
	    var f = new Image();
	    f.src= CovalentItemManager.getInstance().createResourcePath('/ilrn/books/pnal09h/additional_resources/img/'+val);
	});
});