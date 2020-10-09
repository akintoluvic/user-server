const mongoose = require('mongoose');

// descriptiostate (to userid

const SingleUserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SingleUser', SingleUserSchema)