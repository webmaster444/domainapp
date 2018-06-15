var db = require('./modeldb');
/**
 * GET /
 */
exports.index = function(req, res) {
	var models_array = [];
	db.models.createValueStream()
		.on('data', function (data) {	
			var tmp_array    = new Object;
			tmp_array.name   = data.name;
			tmp_array.index  = data.index;
    		models_array.push(tmp_array);    		
  		}).once('end', function() {  		    	
	    	res.render('home', {
	    		title: 'Home',
	    		models:models_array
	  		});
  	});  	
};
