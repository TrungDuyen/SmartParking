const express  = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const slot     = require('./models/slotModel');

const isAuthed = require('./middleware/isUserAuthed');

const slotRouter = express.Router();

slotRouter.get('/', isAuthed, (req, res) => {
    let query = {};

    slot.find(query, (err, slots) => {
      if(err) res.status(500).send(err);
      else res.json(slots);
    });
});

slotRouter.get('/:id', isAuthed, (req, res) => {
    const slotId = ObjectId(req.params.id);
    slot.findById(slotId, (err, slot) => {
      if(err) res.status(500).send(err);
      if(!slot) res.status(404).send('Slot not found.');
      res.status(200).json(slot);
    });
});

module.exports = slotRouter;
