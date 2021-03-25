const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trainingSchema = new Schema({
    date: Date,
    place: String,
    weather: String,
    from: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }]
}, {
    collection: 'trainings'
});

trainingSchema.set('toObject', {
    virtuals: true
});
trainingSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Training', trainingSchema)