import Otp from "../models/otp.js";
import User from '../models/users.js';
import recommend from "../models/recommend.js";
import mongoose from "mongoose";
import user from "../controllers/user.js";
import channel from "../models/channel.js";
import category from "../models/category.js";
import Role from '../models/roles.js';

const sendOtp = async(email) =>
{
    try
    {
        let code = Math.floor(Math.random() * 10000000);
        let checkCodeExist  = await Otp.findOne({email})
        if(checkCodeExist) checkCodeExist.delete();
       
        let otp = await Otp({code,email})
        otp.save();
        return otp;
    }
    catch(error)
    {
        return error.message;
    }
    
}
const addtoRecommendation = async(video) =>
{
    let {user,channel,category,_id} = await video;

   
    let result = await recommend.create({user,channel,category,video:_id, video:_id , subscription: mongoose.Types.ObjectId('631a472e41d07af68d35a8fc') })
    if(result)
    {
        return "saved";
    }
}
const checkRole = async(_id) =>
{
    let result = await Role.findById({_id}).lean();
    return result;
}

export default {
    sendOtp,
    checkRole,
    addtoRecommendation
};