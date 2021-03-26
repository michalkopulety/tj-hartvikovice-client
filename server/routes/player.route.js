let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let playerSchema = require('../models/Player');
const Request = require('../utils/Request');
let model = new Request(playerSchema);

// CREATE player
router.route('/').post((req, res, next) => {
    playerSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ players
router.route('/').get(async (req, res) => {
    try {
        let data = await model.applyQuery(playerSchema.find({}), req.query);
        res.json(data);
    } catch (err) {
        return next(err);
    }
})

// Get Single player
router.route('/:id').get((req, res) => {
    playerSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update player
router.route('/:id').put((req, res, next) => {
    playerSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})

// Delete player
router.route('/:id').delete((req, res, next) => {
    playerSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;