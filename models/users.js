import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },

    password: {
        type: String
    },
    role:
    {
        type: mongoose.Types.ObjectId,
        ref:"roles"
    },

    number: {
        type:Number,
    },

    active:
    {
        type:Boolean,
        default:true
    },
    jwtToken:{
        type:String,
        default:""
    }

},{ timestamps: true});

export default mongoose.model('users', usersSchema);
