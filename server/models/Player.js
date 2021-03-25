const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerSchema = new Schema({
    firstname: String,
    surname: String,
    email: String,
    jerseyNumber: Number,
    imageUrl: String,
    phone: String,
    birthday: Date,
    nameDay: String,
    address: {
        city: String,
        street: String,
        postCode: String,
        houseNumber: Number
    }
}, {
    collection: 'players'
});

playerSchema.virtual('trainings', {
    ref: 'Training',
    localField: '_id',
    foreignField: 'players'
});
playerSchema.set('toObject', {
    virtuals: true
});
playerSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Player', playerSchema)