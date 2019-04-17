'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conditionSchema = new Schema({
    value: { type: Number },
    operator:  {type: String }
});

module.exports = mongoose.model('Condition', conditionSchema);