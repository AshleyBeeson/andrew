//api.js
const express = require('express');
const router = express.Router();
const Bug = require('../models/bug');

//get a list of items from db:: READ
router.get('/bugs', function(req,res,next){
	Bug.find({}).then(function(bugs){
		res.send(bugs);
	});
/*	res.send({type: 'GET'});*/
});

router.get('/bugs/:bugid', function(req,res,next){
	let reqBugID = req.params.bugid.toString();
	//postid : reqPostID
	Bug.find({_id :{ $eq:reqBugID }}).then(function(bug){
		res.send(bug);
	});
});

//add a new item:: CREATE
router.post('/bugs', function(req,res,next){
	Bug.create(req.body).then(function(bug){
		res.send(bug);
	}).catch(next);
});

//update a item:: UPDATE
router.put('/bugs/:id', function(req,res,next){
	Bug.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Bug.findOne({_id: req.params.id}).then(function(bug){
			res.send(bug);
		});	
	});
	/*res.send({type: 'PUT'});*/
});

//delete a item:: DELETE
router.delete('/bugs/:id', function(req,res,next){
	Bug.findByIdAndRemove({_id: req.params.id}).then(function(bug){
		res.send(bug);
	});
	/*res.send({type: 'DELETE'});*/
});


module.exports = router;
