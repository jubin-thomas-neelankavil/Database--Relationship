const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const Customer = mongoose.model('Customer', customerSchema);

const identifierSchema = new mongoose.Schema({
  customerCode: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

const Identifier = mongoose.model('Identifier', identifierSchema);

module.exports = { Customer, Identifier };
