import mongoose from 'mongoose';

const subscriptions = new mongoose.Schema({
    name: {
        type: String
    },
    price : {
        type:Number
    },
    channels:[{
        type: mongoose.Types.ObjectId,
        ref:"channels"
    }],
    active:{
        type:Boolean,
        default:true
    }
});
export default mongoose.model('subscriptions', subscriptions);
