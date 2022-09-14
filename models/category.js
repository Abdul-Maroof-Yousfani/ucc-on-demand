import mongoose from 'mongoose';

const category = new mongoose.Schema({
    name: {
        type: String
    },
    featured:
    {
        type:Boolean,
        default:false
        
    },
    active:{
        type:Boolean
    }
    
});
export default mongoose.model('categories', category);
