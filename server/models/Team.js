const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerSchema = new Schema({
    name: String,
    code: String,
}, {
    collection: 'teams'
});

module.exports = mongoose.model('Team', playerSchema)