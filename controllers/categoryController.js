import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/users.js';
import Joi from 'joi';
import Category from '../models/category.js';
import helper from '../helper/helper.js';


const store = async(req,res) =>
{
    let {name} = req.body;
    const storeSchema = Joi.object({
        name:Joi.string().required()
    });   
    const {error} = storeSchema.validate({name});
    if(error) return res.json({error})
    try
    {
     
        let alreadyExist = await Category.findOne({name:name});
        if(alreadyExist) return res.status(200).json({message:"Category Already Exists",category:alreadyExist})
   
        let result = await Category(req.body);
        result.save();
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
        console.log(err);

        res.json({err})
    }
}
const view = async(req,res) =>
{
    let result = await Category.find({});
    return res.status(200).json({categories:result})
}
const tags = async(req,res) =>
{
    let result = await Category.find({featured: "true"});
    return res.status(200).json({tags:result})
}
const update = async(req,res) =>
{
    try
    {
        let {_id} = req.params;
        const checkCategory = Category.findOne({_id}).lean();
        if(!checkCategory) return res.json({message:"Category Not Available"})
        const category = await Category.findByIdAndUpdate({ _id }, { $set: req.body },{new:true}).lean();
        res.json({
            message:"Successfully Updated",
            category
        })
    }
    catch(error)
    {
        console.log(error)
    }
    
}
const removeGetStarted = async(req,res) =>
{
        let {id,removedId}  = req.query;
         
        
        try
        {
            const removeSchema = Joi.object({
                id: Joi.string().required(),
                removedId: Joi.string().required(),
                
            });

            const {error} = removeSchema.validate(req.query);
            if(error) return res.json({error:error.message})
            
            let category  = await Category.updateOne({_id:mongoose.Types.ObjectId(id)}, {$pull: {'getStarted' : { "_id": mongoose.Types.ObjectId(removedId) }}});
            res.json({
                message:"Deleted Successfully",
                category
            })
        }
        catch(error)
        {
            res.json({
                error: error.message
            })
        }

}



const archive = async(req,res) =>
{

    let {_id} = req.params;
    let {name,feature} = req.body

    try
    {   
        let checkCategory = await Category.findOne({_id}).lean();
        if(!checkCategory) return res.json({message:"Category not Available",category:""})
        let category = await Category.findByIdAndUpdate({_id},{$set:{active:"false"}},{new:true})
        return res.json({
            message:"Successfully Removed",
            category    
        })
    }
    catch(error)
    {
        console.log(error);
    }

}

const updateGetStartedVideo = async(req,res) =>
{
    let {id,removeId} = req.query;
    let {title,path} = req.body;
 
    try
    {
        const category = await Category.findOneAndUpdate({
            "getStarted._id"  : mongoose.Types.ObjectId(removeId)
        },{$set: { title,path  } },{new:true})
        res.json({
            message : "Successfully Updated",
            category
        })

    }
    catch(error)
    {
        res.json({error:error.message})
    }
    
}


export  default{
    store,
    view,
    update,
    archive,
    removeGetStarted,
    updateGetStartedVideo,
    tags
    
}