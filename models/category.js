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
    getStarted:[{
        
        title:{
            type:String,
            default:""
        },
        path:{
            type:String,
            default:""
        }
    }],
    active:{
        type:Boolean,
        default:true
    }
    
});
export default mongoose.model('categories', category);
