const express = require("express")
const multer = require("multer")
const uploadFile = require('./services/storage.service')
const postModel = require("./models/post.model")


const app = express()

const upload = multer({storage: multer.memoryStorage()})

app.post('/create-post' ,upload.single ("image"), async (req,res)=>{

    console.log(req.body)
    console.log(req.file)

    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image:result.url,
        caption: req.body.caption
    })
    return res.status(201).json({
        message : "Post created sucessfulyy",
     post
    })
})

app.get("/posts", async (req,res) => {

    const posts = await postModel.find();

    return res.status(200).json({
        message: "posts fetched sucess"
        ,
        posts
    })
})

module.exports = app;