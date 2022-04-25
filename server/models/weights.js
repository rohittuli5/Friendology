const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const weightSchema =new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type:Number,
        default:1,

    },
    gender:{
        type:Number,
        default:1,

    },
    marital_status:{
        type:Number,
        default:1,

    },
    have_kids:{
        type:Number,
        default:1,

    },
    cats_or_dogs:{
        type:Number,
        default:1,

    },
    social_media_usage:{
        type:Number,
        default:1,

    },
    health_conscious:{
        type:Number,
        default:1,

    },
    optimist_realist_pessimist:{
        type:Number,
        default:1,

    },
    personality_type:{
        type:Number,
        default:1,

    },
    hobbies:{
        type:Number,
        default:1,

    },
    profession:{
        type:Number,
        default:1,

    },
    income_level:{
        type:Number,
        default:1,

    },
    political_viewpoint:{
        type:Number,
        default:1,
    },
    economical_viewpoint:{
        type:Number,
        default:1,
    },
    latitude:{
        type:Number,
        default:1,

    },
    longitude:{
        type:Number,
        default:1,

    },
    genre_of_music:{
        type:Number,
        default:1,

    },
    genre_of_movies:{
        type:Number,
        default:1,
    },



})

const Weights = mongoose.model('Weights', weightSchema)
module.exports=Weights