// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;
 
// Creates a new Mongoose Schema with two properties
const BlogsSchema = new Schema({
    "title": {"type": String, "required": false},
    "article": {"type": String, "required": false},
    "published": {"type": Date, "required": false},
    "featured": {"type": Boolean, "required": false},
    "author": {
        "type": Schema.Types.ObjectId,
        "ref": "User"
    }
})

module.exports = mongoose.model('Blog', BlogsSchema);