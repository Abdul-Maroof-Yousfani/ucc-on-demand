import mongoose from 'mongoose';

const category = new mongoose.Schema({
    name: {
        type: String
    },
    active:{
        type:Boolean
    }
    
});
export default mongoose.model('categories', category);
