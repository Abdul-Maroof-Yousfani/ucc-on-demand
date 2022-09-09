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
        type: String,
        required: function() {
            return this.provider_id==null?true:false
        }
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
    }

},{ timestamps: true});

export default mongoose.model('users', usersSchema);
