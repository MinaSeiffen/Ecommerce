const port = 3000
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const multer = require('multer');
const productRoute = require('./Routes/products')
const userRoute = require('./Routes/users')


app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://minaemad:minaemad00@cluster0.guihcg5.mongodb.net/e-commerce");

// API 
app.get('/' , (req , res)=>{
    res.send("Hey it`s me Mina Emad")
})


// Multer Setup for storing imaegs
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req , file , cb)=>{
        return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})


// creating upload endpoint
app.use('/images' , express.static('./upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: 0, message: 'Internal server error' });
    }
});


app.use('/products' , productRoute)
app.use('/user' , userRoute)





app.listen(port,(err)=>{
    if(!err){
        console.log("Connection to port successfully");
    }
    else{
        console.log(err);
    }
});