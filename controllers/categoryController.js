import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/users.js';
import Joi from 'joi';
import Category from '../models/category.js';

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
        if(alreadyExist) return res.status(200).json({message:"Category Already Exists",data:alreadyExist})

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


export  default{
    store,
    view
}