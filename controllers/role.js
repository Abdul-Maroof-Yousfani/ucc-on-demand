import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import Role from '../models/roles.js';
import Joi from 'joi';


const store = async(req,res) =>
{
    try
    {
        let {name} = req.body;   
        const roleExists = await Role.findOne({name});
        if (roleExists) {
            return res.status(409).json({
                status: "error",
                message: "Role Already Exists",
                data: null,
            });
        }

        let role = await Role(req.body);
        role.save();
        res.send({
            message:"Successfully Created",
            user:role
        })
    }
    catch(err)
    {
       console.log(err.message)
    }
    
    
}

const all = async(req,res) =>
{
    try
    {
        let roles = R
    }
    catch(Err)
    {

    }
}
const view = async(req,res) =>
{
    try
    {
        let roles = await Role.find({}).lean();
        res.json({roles})
    }
    catch(error)
    {

    }
}

const update = async(req,res) =>
{
    let {_id}  = req.params;
  
    try
    {
        let checkRole = await Role.findById({_id}).lean();
        if(!checkRole) return res.json({message:"Role Does not Exist"})
        
        let role = await  Role.findByIdAndUpdate({ _id }, { $set: req.body },{new:true});

        return res.json({
            message : "successfully Upated",
            role
        })
    }
  
    catch(error)
    {
        console.log(error);
        res.json({error:error})
    }
}


export  default{
    store,
    view,
    update
}