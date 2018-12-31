const express  = require('express');
const routers = express.Router();
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const room     = require('./models/roomModel');

routers.get('/rooms', function(req, res, next){
	room.find({}).then(function(rooms){
		res.send(rooms);
	})
});

module.exports = routers;