import mongoose from 'mongoose';

const roles = new mongoose.Schema({
    name: {
        type: String
    },
});
export default mongoose.model('roles', roles);
