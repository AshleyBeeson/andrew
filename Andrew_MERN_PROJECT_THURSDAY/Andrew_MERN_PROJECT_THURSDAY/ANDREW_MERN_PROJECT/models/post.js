const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the forum posts schema
const postSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name field is required"]
    },
    title:{
        type: String,
        default: "[No Title]"
    },
    post:{
        type: String,
        required: true
    }
});

//Export mongoose model
const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
