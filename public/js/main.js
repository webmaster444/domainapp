$(function() {
    jQuery("#menu-toggle").click(function(e) {      
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  	});  
  	$(".star.glyphicon").click(function() {
	  $(this).toggleClass("glyphicon-star glyphicon-star-empty");
	});
	$(document).on('click', '.model_link', function(){ 
		if(checkChanges()){
			var link_string = $(this).html();
			var no          = link_string.indexOf('<span');		
			var model_name  = link_string.substr(0,no);
			
			var mindex       =$(this).attr('mindex');
			$('#mindex_hidden').val(mindex);
			$('#mn_hidden').val(model_name);
			$('.model-title').html(model_name);
	        jQuery.ajax({
	            url: '/showmodel/',
	            data: {name:model_name,mindex:mindex},
	            success: function(res){
	            	localStorage.setItem( "graph-diagram-markup", res );
	            	localStorage.setItem( "graph-diagram-markup-origin", res );
	            	$('#canvas').html('');
	            	$(window).trigger( 'load' ); 
	            	d3.select('#saveModel.btn').classed('hide',true);
	            	d3.select('#updateModelButton.btn').classed('hide',false);
	            	d3.select('#deleteModelButton.btn').classed('hide',false);
	            	d3.select('#duplicateModelButton.btn').classed('hide',false);
	            }        
	        })		
	    }
	});

	$('#create-btn').click(function(){
		if(checkChanges()){
			initCanvas();
	    	d3.select('#saveModel.btn').classed('hide',false);
	    	d3.select('#updateModelButton.btn').classed('hide',true);
	    	d3.select('#deleteModelButton.btn').classed('hide',true);	
	    	d3.select('#duplicateModelButton.btn').classed('hide',true);	
			$(window).trigger( 'load' ); 
		}
	})

	var initCanvas = function(){
		$('#mindex_hidden').val('');
		localStorage.setItem('graph-diagram-markup','');
		localStorage.setItem('graph-diagram-markup-origin','');
		$('#canvas').html('');	
		$('.model-title').html('Create New Model');
	}

	//Check whether unsaved changes remained or not
	var checkChanges = function(){		
		var newGD = localStorage.getItem('graph-diagram-markup');
		var oldGD = localStorage.getItem('graph-diagram-markup-origin');

		var re = true;
		if(oldGD!=''){
			if(newGD != oldGD){
				re = confirm("Your changes are not saved, do you want to continue?");
			}
		}
		return re;
	}
	window.onbeforeunload = function (event) {
		    var message = 'Important: Please click on \'Save\' button to leave this page.';	    
		    if (typeof event == 'undefined') {
		        event = window.event;
		    }
		    if (event) {
		        event.returnValue = message;
		    }
		    return message;
	};
});
