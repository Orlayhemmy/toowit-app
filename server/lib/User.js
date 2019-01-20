import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
