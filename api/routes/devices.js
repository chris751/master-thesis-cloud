const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Device = require('../models/device');

router.get('/', (req, res, next) => {
    Device.find()
    .select('action trigger _id')
    .exec()
    .then(docs =>{
        console.log(docs)
        res.status(200).json(docs);
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
});

router.get('/:deviceId', (req, res, next) => {
    const id = req.params.deviceId;
    Device.findById(id)
    .exec()
    .then(doc => {
        const response = {
                _id: doc._id,

        };
        console.log(response);
        if(response){
            res.status(200).json(doc)
    } else {
        res.status(404).json({message: 'No valid entry found for that ID'})
    }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
    const device = new Device({
        _id: new mongoose.Types.ObjectId(),
        trigger: req.body.trigger,
        action: req.body.action
    });
    device 
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created device',
                createdDevice: {
                    _id: result._id, 
                    trigger: result.trigger,
                    action: result.action
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
});

router.put('/:deviceId', (req, res, next) => {
    const id = req.params.deviceId;
    const device = new Device({
        _id: id,
        trigger: req.body.trigger,
        action: req.body.action
    });
    device.set(device)
    console.log(device)
    Device.update({_id: id}, { $set: { device }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
});

router.delete('/:deviceId', (req, res, next) => {
    const id = req.params.deviceId;
    Device.deleteOne({_id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;