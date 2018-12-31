const express  = require('express');
const routers = express.Router();
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const room     = require('./models/roomModel');
const slot 	   = require('./models/slotModel');

routers.get('/rooms', function(req, res, next){
	room.find({}).then(function(rooms){
		res.send(rooms);
	})
});


routers.post('/submit', function(req, res){
	slot.create(req.body).then(function(Slot){
		res.send(Slot)
	});
});

module.exports = routers;