import mongoose from 'mongoose';

const Recommended = new mongoose.Schema({
    code: {
        type: String
    },
    video:{
        type: mongoose.Types.ObjectId,
        ref:"videos"
    },
    channel:[{
        type: mongoose.Types.ObjectId,
        ref:"channels"
    }],
    user:
    {
        type: mongoose.Types.ObjectId,
        ref:"users"
    },
    category:[{
        type: mongoose.Types.ObjectId,
        ref:"categories"
    }],
    email:{
        type:String
    },
    subscription:{
        type : mongoose.Types.ObjectId,
        ref:"subscriptions"
    }
});
export default mongoose.model('recommended', Recommended);
