import Otp from "../models/otp.js";
import User from '../models/users.js';

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

export default {
    sendOtp
};