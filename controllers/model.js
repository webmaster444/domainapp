var db = require('./modeldb');
var cuid = require('cuid');
/**
 * GET /savemodel
 */
exports.saveModel =  function(req,res){  
  var mn    = req.query.name;
  var gdata = req.query.graphdata;

  var response = {
    mname  : 200,
    index : 'Updated Successfully'
  }
  
  var index = cuid();
  db.models.put(index, {
    name: mn,
    mdata: gdata,
    index: index
  },function (err) {
    if (err) return console.log('Ooops!', err);
    response.mname  = mn;
    response.index = index;
    res.end(JSON.stringify(response));  
  });  
}

exports.updateModel =  function(req,res){  
  var mdata  = req.query.gdata;  
  var mindex = req.query.mindex;
  var name   = req.query.name;
  var response;
  db.models.put(mindex,{
    name:name,
    mdata:mdata,
    index:mindex
  },function(err){
    if (err) return console.log('Ooops!', err);
    res.end(err)
  });
}

exports.deleteModel =  function(req,res){    
  var mindex = req.query.mindex;
  var response;
  db.models.del(mindex,function(err){
    if (err) return console.log('Ooops!', err);
    res.end(err);
  });
}

exports.showModel =  function(req,res){  
  var mn     = req.query.name;  
  var mindex = req.query.mindex;
  var response;
  db.models.get(mindex,function (err,model) {    
    response = model.mdata;      
    res.end(response);
  });
}
exports.allModels = function(req,res){  
  db.models.createValueStream()
  .on('data', function (data) {
    console.log('key=', data)
  })
}