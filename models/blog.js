
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dbSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{ timestamps: true});

const Blog = mongoose.model('Blog', dbSchema);
module.exports = Blog;