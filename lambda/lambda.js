const path = require('path')
const dirPath = path.join(__dirname, '/config.json')
var AWS = require('aws-sdk')
AWS.config.loadFromPath(dirPath);
s3 = new AWS.S3(  ///update with accesskey
	{
  		"s3"		: "2006-03-01"
	}
);


var bucketName = 'bucket-box-jomin'

var deleteParams = { Bucket: bucketName, Key: ""};

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let conn = null;
const uri = 'mongodb+srv://jomin3:pfcHUWgM2oqzQtuo@cluster0.bumc5io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const {Schema} = mongoose;

const fileDataSchema = new mongoose.Schema(
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
fileDataSchema.index({filename:'text'})


const fileSharedSchema = new mongoose.Schema(
    {
        email:String,
        referenceIds:[{type:Schema.Types.ObjectId,ref:"fileData"}]
    }
);



exports.handler = (event) => {

    const response = {
        status: '200',
        statusDescription: 'OK',
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*", 
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
            "Access-Control-Allow-Credentials": true,
            vary: [{
                key: 'Vary',
                value: '*',
            }],
            'last-modified': [{
                key: 'Last-Modified',
                value: '2017-01-13',
            }],
        },
        body: 'Example body generated by Lambda@Edge function.'
    };





    if(event.body!=undefined)
    {
    let body = JSON.parse(event.body);

    mongoose.set('bufferCommands', false);



    let promiseAsync = new Promise(async (resolve,reject)=>{
      

        await mongoose.connect(uri)  

        const fileDataModel = mongoose.model('fileData',fileDataSchema);
    
        const sharedFileDataModel = mongoose.model('sharedFileData',fileSharedSchema);
    
        const resultOne = await fileDataModel.deleteOne({_id:body.id})
    
        const resultTwo = await sharedFileDataModel.updateMany({},{$pull:{"referenceIds":new mongoose.Types.ObjectId(body.id)}})
    
        deleteParams.Key = body.filename
    
    
        s3.deleteObject(deleteParams, function(err, data) {
            if (err){
                console.log(err, err.stack);
                reject(err)
            }  
            else    
            {
                console.log(data);
                resolve(data)
            }            
          });
    

    })

    promiseAsync.then((data)=>{
        mongoose.connection.close();
        return response

    })
    }
    else{
         return response;
    }



    
};

