const mongoose = require('mongoose')
const { compare } = require('bcryptjs')
const Schema = mongoose.Schema
const { hasingPassword, tokenGeneration } = require('../utils/schemaRelated')
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required:true
    },
    favourites:[
        {
            id: {
                type: String
            },
            author: {
                type: String
            },
            width:{
                type: Number
            },
            height:{
                type:Number
            },
            url:{
                type:String
            },
            download_url:{
                type:String
            }
        }
    ]
},
{timestamps: true})

userSchema.pre('save', hasingPassword)
userSchema.methods.generateToken = tokenGeneration
userSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const user = await User.findOne({email: email})
        if(!user) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, user.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return user
    }catch(err){
        err.name = 'authError'
        throw err
    }
}


const User = mongoose.model('users', userSchema)
module.exports = User