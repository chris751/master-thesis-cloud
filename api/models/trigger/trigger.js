'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Sensor = require('./sensor').schema;

const triggerSchema = new Schema({
  sensors:        [{ type: Sensor, required: true }]
});

module.exports = mongoose.model('Trigger', triggerSchema);