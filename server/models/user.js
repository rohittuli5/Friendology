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

    },
    gender:{
        type:String,
        required:true,
    },
    martial_status:{
        type:String,
    },
    have_kids:{
        type:Boolean,
    },
    cats_or_dogs:{
        type:String,
    },
    social_media_usage:{
        type:Number,
    },
    health_conscious:{
        type:Number,
    },
    optimist_realist_pessimist:{
        type:Number,
    },
    personality_type:{
        type:String,
        default:0,
    },
    hobbies:{
        type:[String],
        default:[""],
    },
    profession:{
        type:String,
        default:""
    },
    income_level:{
        type:Number,
        default:0,
    },
    political_viewpoint:{
        type:Number,
        default:0,
    },
    economical_viewpoint:{
        type:Number,
        default:0
    },
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number,
    },
    genre_of_music:{
        type:String,

    },
    genre_of_movies:{
        type:String,
    }


})

const User = mongoose.model('User', userSchema)
module.exports=User