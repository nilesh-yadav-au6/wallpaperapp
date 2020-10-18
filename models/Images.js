const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagesSchema = new Schema({
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
},
{timestamps: true})

const Images = mongoose.model('images', imagesSchema)
module.exports = Images