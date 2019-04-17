const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trigger = require('./trigger/trigger').schema;
const Action = require('./action/action').schema;

const deviceSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trigger: { type: Trigger },
    action: { type: Action }
});

module.exports = mongoose.model('Device', deviceSchema);  