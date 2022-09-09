import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    views:[{
        type: mongoose.Types.ObjectId,
        ref:"users"
    }],
    favourites:[{
        type: mongoose.Types.ObjectId,
        ref:"users"
    }],
    channel:{
        type: mongoose.Types.ObjectId,
        ref:"channels"
    },
    thumbnail:{
        type:String,
        default:""
    },
    active:{
        type:Boolean,
        default:true
    }
},{ timestamps: true});

export default mongoose.model('videos', videoSchema);
