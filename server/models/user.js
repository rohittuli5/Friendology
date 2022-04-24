    const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema =new Schema({
    email:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
        required:true,
        default:-1,

    },
    gender:{
        type:String,
        required:true,
        default:"default",
    },
    marital_status:{
        type:String,
        default:"default"
    },
    have_kids:{
        type:Number,
        default:-1,
    },
    cats_or_dogs:{
        type:String,
        default:"default",
    },
    social_media_usage:{
        type:Number,
        default:-1,
    },
    health_conscious:{
        type:Number,
        default:-1,
    },
    optimist_realist_pessimist:{
        type:Number,
        default:-1,
    },
    personality_type:{
        type:String,
        default:"default",
    },
    hobbies:{
        type:[String],
        default:[""],
    },
    profession:{
        type:String,
        default:"default",
    },
    income_level:{
        type:Number,
        default:-1,
    },
    political_viewpoint:{
        type:Number,
        default:-1,
    },
    economical_viewpoint:{
        type:Number,
        default:-1,
    },
    latitude:{
        type:Number,
        default:-1,
    },
    longitude:{
        type:Number,
        default:-1,
    },
    genre_of_music:{
        type:[String],
        default:[],

    },
    genre_of_movies:{
        type:[String],
        default:[],
    }


})

const User = mongoose.model('User', userSchema)
module.exports=User