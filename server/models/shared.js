const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSharedSchema = new Schema(
    {
        email:String,
        referenceIds:[{type:Schema.Types.ObjectId,ref:"fileData"}]
    }
);

const sharedFileDataModel = mongoose.model('sharedFileData',fileSharedSchema);
module.exports = sharedFileDataModel;