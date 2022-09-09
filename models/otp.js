import mongoose from 'mongoose';

const otp = new mongoose.Schema({
    code: {
        type: String
    },
    email:{
        type:String
    }
});
export default mongoose.model('otp', otp);
