const express = require('express');
const router = express.Router();
const checkJwt = require("../authentication/auth.middleware");
const permissionsCheck = require("../authentication/permissions.middleware");
const roles = require("../authentication/rolesConstants");

const {
    query
} = require('express');
// Student Model
let trainingSchema = require('../models/Training');
const Request = require('../utils/Request');
let model = new Request(trainingSchema);

router.use(checkJwt);

// CREATE trainings
router.route('/').post(
    permissionsCheck(roles.TRAININGS.CREATE),
    (req, res, next) => {
        trainingSchema.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                res.json(data)
            }
        })
    });

// READ trainings
router.route('/').get(
    permissionsCheck(roles.TRAININGS.READ),
    async (req, res, next) => {
        try {
            let data = await model.applyQuery(trainingSchema.find({}), req.query);
            res.json(data);
        } catch (err) {
            return next(err);
        }
    });

// Get Single training
router.route('/:id').get((req, res) => {
    trainingSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update training
router.route('/:id').put((req, res, next) => {
    trainingSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// Delete trainings
router.route('/:id').delete((req, res, next) => {
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