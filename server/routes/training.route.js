let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

const {
    query
} = require('express');
// Student Model
let trainingSchema = require('../models/Training');
const Request = require('../utils/Request');
let model = new Request(trainingSchema);
// CREATE Student
router.route('/create-training').post((req, res, next) => {

    trainingSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Students
router.route('/').get(async (req, res) => {
    // let find = parseQuery(req.query);
    // request.operation(trainingSchema);
    // model.operation(this, "find").applyQuery(req.query)
    try {
        let data = await model.applyQuery(trainingSchema.find({}), req.query);
        res.json(data);
    } catch (err) {
        return next(err);
    }

})

// Get Single Student
router.route('/edit-training/:id').get((req, res) => {
    trainingSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Student
router.route('/update-training/:id').put((req, res, next) => {
    trainingSchema.findByIdAndUpdate(req.params.id, {
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

// Delete Student
router.route('/delete-training/:id').delete((req, res, next) => {
    trainingSchema.findByIdAndRemove(req.params.id, (error, data) => {
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