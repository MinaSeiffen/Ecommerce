const {userModel} = require('../Models/users')
const jwt = require('jsonwebtoken')

const postUsers =async (req , res)=>{
    let dublicated = await userModel.findOne({email:req.body.email})
    if (dublicated) {
        return res.status(400).json({success:false,MSG:`${dublicated.username} is already registered`});
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const newUser = new userModel({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData:cart,
    })
    await newUser.save()
    const data = {
        user:{
            id: newUser.id
        }
    }

    const token = jwt.sign(data , 'secret_ecom')
    res.json({success:true , token})  
}

const login = async (req , res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if (user) {
        const passcompare = req.body.password === user.password
        if (passcompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data , 'secret_ecom')
            res.json({success:true , token})
        }
        else{
            res.json({success:false , MSG:'password is wrong'})
        }
    }else{
        res.json({success:false , MSG:"user not found"})
    }
}



module.exports = {postUsers , login};