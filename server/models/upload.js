const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileDataSchema = new Schema(
    {
        username:String,
        filename:String,
        mimetype:String,
        fileSize:Number,
        etag:String,
        versionId:String,
        location:String
    }
);

const fileDataModel = mongoose.model('fileData',fileDataSchema);
module.exports = fileDataModel;