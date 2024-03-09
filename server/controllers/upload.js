
var AWS = require('aws-sdk')
const User = require('../models/user');
const path = require('path')
const fs = require('fs')
const ObjectId = require('mongodb').ObjectId;
const dirPath = path.join(__dirname, '/config.json')
var bucketName = 'bucket-box-jomin'
const fileDataModel = require('../models/upload')
AWS.config.loadFromPath(dirPath);
AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    else {
    //   console.log("Access key:", AWS.config.credentials.accessKeyId);
    //   console.log("AWS Region:" , AWS.config.region)
    }
  });
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
var uploadParams = { Bucket: bucketName, Key: "", Body: "" };
exports.getUser = (req,res,next) => {
    console.log(req.files,req.body,req.session,req.cookies,req.user,req.session.passport)
    res.status(200).end()

}
exports.userFileUpload = async (req,res,next) => {
    // console.log(req.files,req.body,req.session,req.cookies,req.user,req.session.passport)
    console.log(req.cookies)
    // let filedata=req.files[0]
    // const objectId = new ObjectId('61dc2d31bbe643fc32022a5f');
    // let fileModel = {
    //     username:'',
    //     filename:filedata.originalname,
    //     mimetype:filedata.mimetype,
    //     fileSize:filedata.size
    // }
    // uploadParams.Body = fs.createReadStream(req.files[0].path)

    // uploadParams.Key = "test-jomin"
    // s3.upload(uploadParams, function (err, data) {
    //     if (err) {
    //       console.log("Error", err);
    //     }
    //     if (data) {
    //       console.log("Upload Success", data.Location);
    //       console.log(data)
    //       fileModel.etag = data.Etag        
    //       fileModel.versionId = data.versionId
    //       fileModel.location = data.Location
    //     }
    //     fileDataModel.insertMany(fileModel).then((response)=>{
    //         console.log(response)
    //        })
    //   });

    res.send({message:'fileupload endpoint reached'})
    res.status(200).end()
}