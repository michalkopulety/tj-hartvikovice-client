const express = require('express');
const router = express.Router();
const checkJwt = require("../authentication/auth.middleware");
const permissionsCheck = require("../authentication/permissions.middleware");
const roles = require("../authentication/rolesConstants");

// Student Model
let playerSchema = require('../models/Player');
const Request = require('../utils/Request');
let model = new Request(playerSchema);

router.use(checkJwt);
// CREATE player
router.route('/').post(
    permissionsCheck(roles.PLAYERS.CREATE),
    (req, res, next) => {
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
router.route('/').get(
    permissionsCheck([roles.PLAYERS.READ, roles.TRAININGS.READ]),
    async (req, res) => {
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