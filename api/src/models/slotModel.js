const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const slotSchema = new Schema({
 
  carNumber: String,
  slotName: String,
  startT: String,
  endT: String,
});

slotSchema.index({room: 1, startTime: 1});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;