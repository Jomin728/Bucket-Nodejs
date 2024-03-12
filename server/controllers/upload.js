
var AWS = require('aws-sdk')
const stream = require('stream');
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
exports.getUserFileData = async(req,res,next) => {
  let result = {}
  if(req.user)
  {
   result = await fileDataModel.find({username:req.user.username})
  console.log(result,req.user,req.session,req.cookies)
  }
  res.send(result)
  res.status(200).end()
}
exports.userFileUpload = async (req,res,next) => {
    console.log(req.files,req.body,req.session,req.cookies,req.user,req.session.passport)
    console.log(req.session,req.user)
    console.log(req.cookies)
    let filedata=req.files[0]
    const objectId = new ObjectId('61dc2d31bbe643fc32022a5f');
    let fileModel = {
        username:req.user.username,
        filename:filedata.originalname,
        mimetype:filedata.mimetype,
        fileSize:filedata.size
    }
    uploadParams.Body = fs.createReadStream(req.files[0].path)

    uploadParams.Key = filedata.originalname
    s3.upload(uploadParams, function (err, data) {
      let obj = {}
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
          console.log(data)
      
          obj['etag'] = data.ETag
          obj['versionId'] = data.VersionId
          obj['location'] = data.Location
          
        }
        console.log("jomin",{...fileModel,...obj})
        fileDataModel.insertMany({...fileModel,...obj}).then((response)=>{
            console.log(response)
            res.send({...response['0']['_doc']})
            res.status(200).end()        
           })
      });

}
const constantParams = {
  Bucket:'bucket-box-jomin'
}

getFileFromS3 = key =>{
  const downloadParams = {
      Key:key,
     ...constantParams
  };
  return s3.getObject(downloadParams).createReadStream();
};

exports.userFileDownload = async (req,res,next) =>
{
  console.log(req.query)
  let key = req.query.filename
 let options = {
  Bucket:'bucket-box-jomin',
  Key:key
 }
  res.attachment(key);
  
  // res.writeHead(200, {
  //   'Content-Type': 'image/png'
  // });
  let fileToSend = await getFileFromS3(key);
  
  fileToSend.pipe(res);
}