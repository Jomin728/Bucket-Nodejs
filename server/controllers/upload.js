exports.userFileUpload =  (req,res,next) => {
    console.log(req.files,req.body)
    res.send({message:'fileupload endpoint reached'})
    res.status(200).end()
}