import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/users.js';


const follow = async(req,res) =>
{
    let {followerId} = req.body;
    let {userId} = req.params;  


    try
    {
        // check if user exists
        let userExist = await User.findOne({_id:userId}) && await User.findOne({_id:followerId})
        if(!userExist) return res.status(200).json({error:"User Doesnot Exist"});

        let checkFollowerExist  = await User.findOne({_id:mongoose.Types.ObjectId(userId), "followers": mongoose.Types.ObjectId(followerId) }).count();
        if(checkFollowerExist) return res.status(433).json({"message":"Already Followed!",data:checkFollowerExist})
        let result = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { $push: { followers: followerId } });
        // check if already in followed list

        let checkifFollowing  = await User.findOne({_id:mongoose.Types.ObjectId(followerId),"following": mongoose.Types.ObjectId(userId) }).count();
        if(checkifFollowing) return res.status(433).json({"message":"Already Followed!",data:checkifFollowing})

        let following = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(followerId)}, { $push: { following: userId } });
        return res.status('200').json({message:"Successfully Added",user:result});

    }
    catch(err)
    {
       console.log(err.message)
    }
    
    
}

const getFollowers = async(req,res) =>
{
    let {userId} = req.params;

    try
    {
        let followers = await User.findById({_id:mongoose.Types.ObjectId(userId)});
        if(!followers) return res.status(433).json({error:"User Doesn not Exists"});
        return res.json({followers});
    }
    catch(Err)
    {
        console.log(Err);
        res.json({Err});
    }
}

const deleteFollower = async(req,res) =>
{
    let {userId} = req.params;
    let {followerId} = req.body;



    try
    {
        // check if user exists
        let userExist = await User.findOne({_id:userId}) && await User.findOne({_id:followerId})
        if(!userExist) return res.status(200).json({error:"User Doesnot Exist"});
  
        let result = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(userId)},{$pull: {'followers' : mongoose.Types.ObjectId(followerId)}});
   
        let followed = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(followerId)}, {$pull: {'following' : mongoose.Types.ObjectId(userId)}});
        return res.status('200').json({message:"Successfully Removed",user:result});

    }
    catch(err)
    {
       console.log(err.message)
    }
}



export  default{
    follow,
    getFollowers,
    deleteFollower
}