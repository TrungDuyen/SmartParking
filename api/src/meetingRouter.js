const util     = require('util');
const express  = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const user     = require('./models/userModel');
const Slot     = require('./models/slotModel');
const Meeting  = require('./models/meetingModel');

const isAuthed = require('./middleware/isUserAuthed');

const meetingRouter = express.Router();

meetingRouter.get('/', isAuthed, (req, res) => {

    const isSlotMode = req.query.slotId !== 'undefined';
    let query;
    if(isSlotMode){
      query = {
        slot: ObjectId(req.query.slotId),
        startTime: { $gte: new Date() }
       };
    } else {
      query = {
        attendees: ObjectId(req.user._id),
        startTime: { $gte: new Date() }
      };
    }

    Meeting.find(query)
    .populate('slot')
    .populate('hostId attendees', 'email')
    .sort('startTime')
    .lean()
    .exec((err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('Meeting not found.');
      else {

        meetings.map(el => {
          el.isHost = req.user._id.toString() === el.hostId._id.toString();
          el.status = el.attendees.filter(user => user._id.toString() === req.user._id.toString()).length > 0;
          return el;
        });

        res.json(meetings);
      }
    });
});

meetingRouter.get('/slotinfo', isAuthed, (req, res) => {

  let query = { _id: ObjectId(req.query.slotId) };

  Slot.find(query).exec((err, slot) => {
    if(err) res.status(500).send(err);
    else res.json(slot);
  });
});

meetingRouter.post('/', isAuthed, (req, res) => {

  req.checkBody('title', 'Invalid title').matches('^[0-9a-zA-Z ]+$');

  req.getValidationResult().then((errors) => {
    if(!errors.isEmpty()){
      res.status(400).send('There have been validation errors:' + util.inspect(errors.array()));
      return;
    }
    let meeting = new Meeting();
        meeting.slot = req.body.slot;
        meeting.title = req.body.title;
        meeting.hostId = req.user._id;
        meeting.startTime =  new Date(req.body.startT);
        meeting.endTime = new Date(req.body.endT);
        meeting.attendees = [req.user._id];

    meeting.save(err => {
      if(err) res.status(500).send(err);
      else res.status(201).json({ message: 'Meeting created'});
    });
  });

});

meetingRouter.post('/status', (req, res) => {
  let query = {
    meetingId: ObjectId(req.body.meetingId)
  };

  Meeting.findById(query.meetingId, (err, meet) => {
    if(err) res.status(500).send(err);
    if(!meet) res.status(404).send('Meeting not found.');

    let att = meet.attendees;

    att.find(el => el.toString() === req.user._id.toString()) ?
      att.splice(att.indexOf(req.user._id), 1) :
      att.push(ObjectId(req.user._id));

    meet.save(err => {
        if(err) res.status(500).send(err);
        else res.status(201).send(meet);
      });

  });
});

module.exports = meetingRouter;
