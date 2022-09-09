import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/users.js';


const rateUser = async(req,res) =>
{
    let {user} = req.body;
    let {userId} = req.params;  

    if(userId === user) return res.json({error: "You can not rate your self"});


    try
    {
        // check if user exists
        let userExist = await User.findOne({_id:userId}) && await User.findOne({_id:user})
        if(!userExist) return res.status(200).json({error:"User Doesnot Exist"});

        let ratingExist  = await User.findOne({_id:mongoose.Types.ObjectId(userId), "ratings.user": mongoose.Types.ObjectId(user) }).count();

        if(ratingExist) return res.status(433).json({"message":"Rating Already Given",data:ratingExist})
        let result = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { $push: { ratings: req.body } });
        // check if already in followed list

        // let checkifFollowing  = await User.findOne({_id:mongoose.Types.ObjectId(followerId),"following": mongoose.Types.ObjectId(userId) }).count();
        // if(checkifFollowing) return res.status(433).json({"message":"Already Followed!",data:checkifFollowing})

        // let following = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(followerId)}, { $push: { following: userId } });
        return res.status('200').json({message:"Successfully Added",user:result});

    }
    catch(err)
    {
       console.log(err);
       console.log(err.message)
    }
    
    
}


export  default{
    rateUser,
    
}