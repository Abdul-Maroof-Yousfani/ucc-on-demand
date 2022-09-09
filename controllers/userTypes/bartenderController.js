import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import User from '../../models/users.js';
import Joi from 'joi';
import mongoose from 'mongoose';


const store = async(req,res) =>
{
  
    let {name} = req.body;
    let {userid} = req.params;
    const storeSchema = Joi.object({
        name:Joi.string().required()
    });   
    const {error} = storeSchema.validate(req.body);
    if(error) return res.json({error})
    try
    {
     
        let drinks = await User.findByIdAndUpdate(mongoose.Types.ObjectId(userid) ,{ $push: { drinks: req.body } },{new:true});
        return res.json({
            user:drinks
        })
    }
    catch(err)
    {
        console.log(err);

        res.json({err})
    }
}
const getDrinks = async(req,res) =>
{

    let drinks = await User.findOne({_id:mongoose.Types.ObjectId(req.params.userid)});
    if(!drinks) return res.status('433').json({message:"user not found", data:null}) 
    return res.status(200).json({user:drinks})
}
const updateDrink = async(req,res) =>
{   
    let userId = req.params.userid;
    let drinks = await User.findByIdAndUpdate({_id:userId} ,{drinks:{$elemMatch:{_id: mongoose.Types.ObjectId('631232743eac2c1025e912e9')}}} , {drinks:{$set:{special:true}}});
    console.log(drinks);
    return;
    if(!drinks) return res.status('433').json({message:"user not found", data:null}) 
    return res.status(200).json({user:drinks})
}
const deleteDrink = async(req,res) =>
{
    let drinks = await User.updateOne({_id:req.params.userid}, {$pull: {'drinks' : { "_id": mongoose.Types.ObjectId(req.body._id) }}});
    if(!drinks) return res.status('433').json({message:"user not found", data:null}) 
    return res.status(200).json({user:drinks})
}
export  default{
    store,
    getDrinks,
    updateDrink,
    deleteDrink
}