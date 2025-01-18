const mongoose = require('mongoose');

const tickSchema = new mongoose.Schema({
  tickCount: { type: Number, default: 0 }, // Contador atual de ticks
  activityLog: [
    {
      startTick: Number,
      endTick: Number,
      date: Date,
      users: [String], // IDs ou nomes dos usuários conectados
    },
  ],
}, {
  timestamps: true,
});

tickSchema.methods.addActivityLog = function (startTick, endTick, users) {
  this.activityLog.push({
    startTick,
    endTick,
    date: new Date(),
    users,
  });
  return this.save();
};

const Tick = mongoose.model('Tick', tickSchema);
module.exports = Tick;
