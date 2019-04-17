'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  googleAnalytics: {
      eventCategory: String, 
      eventAction: String, 
      eventLabel: String, 
      eventValue: Number
  },
  sms: {
      phoneNumber: String  
  },
  notifaction: {
      title: String,
      message: String,
      value: Number
  }
});

module.exports = mongoose.model('Action', actionSchema);