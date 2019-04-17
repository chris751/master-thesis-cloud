'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Condition = require('./condition').schema;

// const SensorTypes = Object.freeze({
//     pir: 'pir',
//     ultrasonic: 'ultrasonic',
//     temperature: 'temperature',
//     photoresistor: 'photoresistor',
//     timer: 'timer'
//   });

const sensorSchema = new Schema({
    type: { type: String, enum: ['pir', 'ultrasonic', 'temperature', 'photoresistor', 'timer' ] },
    condition:  {type: Condition }
});

module.exports = mongoose.model('Sensor', sensorSchema);