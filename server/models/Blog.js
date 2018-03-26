// // Imports mongoose and extracts Schema into it's own variable
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// // var ObjectId = mongoose.Schema.Types.ObjectId;
 
// // Creates a new Mongoose Schema with two properties
// const BlogsSchema = new Schema({
//     "title": {"type": String, "required": false},
//     "article": {"type": String, "required": false},
//     "published": {"type": Date, "required": false},
//     "featured": {"type": Boolean, "required": false},
//     "author": {
//         "type": Schema.Types.ObjectId,
//         "ref": "User"
//     },
// })

// module.exports = mongoose.model('Blog', BlogsSchema);

// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    title: { type: String, required: true},
    article: {type: String,required : true},
    published: {type: Date, required: true},
    featured: {type: Boolean,required : true},
    authorId: {type: Object, required: false}, 
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { usePushEach: true});

module.exports = mongoose.model('Blog', UserSchema);