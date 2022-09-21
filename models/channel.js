import mongoose from 'mongoose';

const channels = new mongoose.Schema({
    name: {
        type: String
    },
    category:[{
        type: mongoose.Types.ObjectId,
        ref:"categories"
    }],
    video:[{
        type: mongoose.Types.ObjectId,
        ref:"videos"
    }],
    subscription:[{
        type: mongoose.Types.ObjectId,
        ref:"subscriptions"
    }],
    active:{
        type:Boolean
    }
    
});
export default mongoose.model('channels', channels);
