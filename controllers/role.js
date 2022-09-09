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



export  default{
    store
}