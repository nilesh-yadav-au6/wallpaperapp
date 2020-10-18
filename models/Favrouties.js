const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoutiteSchema = new Schema({
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
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    imageId:{
        type:Schema.Types.ObjectId,
        ref:"images"
    }
},
{timestamps: true})

const Favrouites = mongoose.model('favrouites', favoutiteSchema)
module.exports = Favrouites