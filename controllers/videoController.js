import Joi from "joi";
import mongoose from "mongoose";
import helper from "../helper/helper.js";
import Video from "../models/video.js";

const store = async(req,res) =>
{
    let {title,thumbnail,description,channel,category,privatePath,tag,subscription} = req.body;

    // req.body.category = []


    const storeSchema = Joi.object({
        title:Joi.string().required(),
        thumbnail: Joi.string().required(),
        description:Joi.string().required(),
        channel:Joi.array().required(),
        category:Joi.array(),
        privatePath:Joi.string().required(),
        tag: Joi.array().required(),
        subscription: Joi.array().required()
    });   

    const {error} = storeSchema.validate(req.body);
    if(error) return res.json({error})
    try
    {
        let alreadyExist = await Video.findOne({title});
        if(alreadyExist) return res.status(200).json({message:"Title Already Exists",video:alreadyExist})
        
        let result = await Video.create(req.body);
        // let drinks = await User.findByIdAndUpdate(mongoose.Types.ObjectId(userid) ,{ $push: { drinks: req.body } },{new:true});
        if(result)
        {
            return res.json({
                messgae: "Successfully Added",
                video:result
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
        const data = await Video.find({});
        res.json({videos:data})
    }
    catch(error)
    {
        console.log(error);
        res.json({error})
    }
    
}
const viewById = async(req,res) =>
{
    let {_id} = req.params;

    try
    {
        let video = await Video.findById({_id}).lean();
        res.json({video});
        helper.addtoRecommendation({...video,user:"631913bc879cd6767acfbe85"})

    }
    catch(error)
    {
        res.json({error})
    }
}
const addViews = async(req,res) =>
{
    let {_id} = req.params;

    try
    {
        let video = await Video.findByIdAndUpdate({_id},{$push:{ "views" : mongoose.Types.ObjectId('631913bc879cd6767acfbe85') }},{new:true});
        res.json({video});

    }
    catch(error)
    {
        res.json({error})
    }
   

}


const addFavourite = async(req,res) =>
{
    let {_id} = req.params;

    try
    {
        let video = await Video.findByIdAndUpdate({_id},{$push:{ "favourites" : mongoose.Types.ObjectId('631913bc879cd6767acfbe85') }},{new:true});
        res.json({video});

    }
    catch(error)
    {
        res.json({error})
    }
   

}


export default {
    store,
    viewById,
    view,
    addViews,
    addFavourite
};