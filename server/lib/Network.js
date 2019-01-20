import mongoose from 'mongoose';

const networkSchema = new mongoose.Schema({
  day: { type: String },
  network_name: { type: String, unique: false },
  followers_count: { type: Number },
  followers_increase: { type: Number },
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;
