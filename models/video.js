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
    channel:[{
        type:mongoose.Types.ObjectId,
        ref:"channels",
        default:[]
    }],
    category:[{
        type:mongoose.Types.ObjectId,
        ref:"categories"
    }],
    subscription:[{
        type:mongoose.Types.ObjectId,
        ref:"subscriptions",
        default:[]
    }],
    tag:[{
        type:mongoose.Types.ObjectId,
        ref:"categories",
        default:[]
    }],

    thumbnail:{
        type:String,
        default:""
    },
    active:{
        type:Boolean,
        default:true
    },
    privatePath:{
        type:String,
        default:true
    }
},{ timestamps: true});

export default mongoose.model('videos', videoSchema);
