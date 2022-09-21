import Channel from "../models/channel.js";
import Joi from "joi";
import mongoose from "mongoose";
const store = async(req,res) =>
{
    let {name} = req.body;

    // req.body.category = []


    const storeSchema = Joi.object({
        name:Joi.string().required()
    });   
    const {error} = storeSchema.validate({name});
    if(error) return res.json({error})
    try
    {
        
     
        let alreadyExist = await Channel.findOne({name:name});
        if(alreadyExist) return res.status(200).json({message:"Category Already Exists",data:alreadyExist})
        
        let result = await Channel.create(req.body);
        // let drinks = await User.findByIdAndUpdate(mongoose.Types.ObjectId(userid) ,{ $push: { drinks: req.body } },{new:true});
        if(result)
        {
            return res.json({
                messgae: "Successfully Added",
                category:result
            })
        }
        
    }
    catch(err)
    {
        res.json({error: err.message})
    }
}

const view = async(req,res) =>
{
    try
    {
        let channels = await Channel.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField : "category",
                    foreignField:"_id",
                    as:"Categories"

                }
            },
            { $project : {
    
                __v : 0,
                "Categories.__v" : 0
            }}
        ])
        res.json({channels})
    }
    catch(err)
    {
        res.json({error:err.message})
    }
    
}

const update = async(req,res) =>
{
    try
    {
        let {_id} = req.params;
        const checkChannel = Channel.findOne({_id}).lean();
        if(!checkChannel) return res.json({message:"Channel Not Available"})
        const channel = await Channel.findByIdAndUpdate({ _id }, { $set: req.body },{new:true}).lean();
        res.json({
            message:"Successfully Updated",
            channel
        })
    }
    catch(error)
    {
        console.log(error)
    }
}


const removeSubscription  = async(req,res) =>
{
    let {id,subscriptionId} = req.query;

    try
    {
        
        let channel  = await Channel.updateOne({_id:id}, {$pull: {'subscription' : mongoose.Types.ObjectId(subscriptionId) }}).lean();
        res.json({
            message : "Successfully Removed",
            channel
        })

    }
    catch(error)
    {
        res.json({
            channel : "",
            error:error.message
        })
    }
}

const removeCategory  = async(req,res) =>
{
    let {id,categoryId} = req.query;

    try
    {
        
        let channel  = await Channel.updateOne({_id:id}, {$pull: {'category' : mongoose.Types.ObjectId(categoryId) }}).lean();
        return res.json({
            message : "Successfully Removed",
            channel
        })

    }
    catch(error)
    {
        res.json({
            channel : "",
            error:error.message
        })
    }
}

const remove  = async(req,res) =>
{
    console.log(req.query);
    return;
}




export  default{
    store,
    view,
    update,
    removeSubscription,
    removeCategory
}