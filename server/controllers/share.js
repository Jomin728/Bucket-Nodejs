const sharedDataModel = require('../models/shared')
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId
const fileDataModel = require('../models/upload');
const { resolve } = require('path');



exports.shareFile = async(req,res,next) => {
  console.log("---------------------------------------------------------------------")
  console.log(req.query)
  console.log(req.body)
  res.send({"message":"endpoint reached"})
  console.log(typeof req.body._id)
  let input = {
    email:req.query.email,
    referenceIds:[req.body._id]
  }
  console.log(input)

  let data = await sharedDataModel.find({email:req.query.email})
  if(data.length == 0)
  {
    await sharedDataModel.insertMany({...input})
  }
  else
  {
    await sharedDataModel.updateOne({email:req.query.email},{$addToSet:{"referenceIds":req.body._id}})
  }
  global.io.emit(req.query.email,'message from server')
  console.log(data)
  res.status(200).end()
}

exports.getSharedFiledetails = async (req,res,next) => {

    let sharedFiles = []
    console.log("--------------------------Shared File data-------------------------------------------")

    let data = await sharedDataModel.find({email:req.user.email})
        if(data.length != 0)
        {
        await Promise.all(data[0]['referenceIds'].map(async (element)=>{
            let file = await fileDataModel.findById(element)
            sharedFiles.push(file)
            console.log(file)
        }))
        console.log(sharedFiles)

       }
        res.send(sharedFiles)
        console.log(data)

    res.status(200).end()
}

exports.getImageData = async (req,res,next) => {
    let imageFiles = []
    console.log("--------------------------Image File data-------------------------------------------")

    let data = await fileDataModel.find({username:req.user.username,$or:[{mimetype:"image/png"},{mimetype:"image/jpg"},{mimetype:"image/jpeg"}]})
    console.log(data)
    res.send(data)
    res.status(200).end()


}