import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: function() {
            return this.provider_id==null?true:false
        }
    },
    profile_picture: {
        type: String
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    }
});

export default mongoose.model('users', usersSchema);
