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
    active:{
        type:Boolean
    }
    
});
export default mongoose.model('channels', channels);
