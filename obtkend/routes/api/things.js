var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


var fileModel = require('./jsonmodel');
var data = null;

var cosoVector = {
  '_id':'',
  'empresa':'',
  'ulr':'',
  'nombre':'',
  'year':null,
  'rating':null,
  'fechaIng': null
};

router.get('/', function( req, res, next) {
  if(!data){
    fileModel.read(function(err, filedata){
      if(err){
        console.log(err);
        data = [];
        return res.status(500).json({'error':'Error al Obtener Data'});
      }
      data = JSON.parse(filedata);
      return res.status(200).json(data);
    });
  } else {
    return res.status(200).json(data);
  }
});

router.post('/new', function(req, res, next){
  var _thingsData = Object.assign({} , cosoVector, req.body);
  var dateT = new Date();
  var dateD = new Date();
  dateD.setDate(dateT.getDate()+ 3);
  _thingsData.fcIng = dateT;
  _thingsData.due = dateD;
  _thingsData._id = uuidv4();
  if(!data){
    data = [];
  }
  data.push(_thingsData);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Obtener Data' });
    }
    return res.status(200).json(_thingsData);
  });
});



fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;
