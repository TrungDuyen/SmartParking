const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const slotSchema = new Schema({
  username: String,
  carNumber: String,
  slotName: String,
  startT: { type: Date },
  endT: { type: Date },
});

slotSchema.index({room: 1, startTime: 1});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;