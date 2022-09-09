import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SimpleSchema from 'simpl-schema';
import User from '../models/users.js';
import Joi from 'joi';
import Otp from '../models/otp.js';
import helper from '../helper/helper.js';


const register = async(req,res) =>
{
    try
    {   
        const userExist = await User.findOne({ $or: [{ email: req.body.email }, { fullName: req.body.fullName }] });
        if (userExist) {
            return res.status(409).json({
                status: "error",
                message: "A user with this username or email already exists.",
                data: null,
            });
        }
  
        let user = await User(req.body);
        user.save();
        res.send({
            message:"Successfully Created",
            user:user
        })
    }
    catch(err)
    {
       console.log(err.message)
    }
    
    
}

const socialLogin = async(req,res) =>
{
    console.log(req.body);
    return 
}

const login = async(req,res) =>
{
    try
    {
        const loginSchema = Joi.object({

            email:Joi.string().valid().required(),
            password:Joi.string().required(),
            
        });
        const {error} = loginSchema.validate(req.body);
        if(!error)
        {
            const user = await User.findOne({email:req.body.email});
            if(user)
            {
                res.json({message:"Successfully Logged In", user: user})
            }
        }
        else
        {
            res.json({error:error.message})
        }
        
    }
    catch(error)
    {
        res.json({error:error.message})
    }
    
}

const requestCode = async(req,res) =>
{
    try
    {
        const {email} = req.body;
        const codeValidation = Joi.object({

            email:Joi.string().valid().required()
            
        });
 
        const {error} = codeValidation.validate(req.body);
        if(!error)
        {
            const checkEmail = await User.findOne({email});
            if(!checkEmail)
            {
                res.send({
                    error:"Email Does'nt exists"
                })
            }
            else
            {
                // send email to the user
                let result = await helper.sendOtp(email);
                res.send({
                    message : "Please check your email, we have sent you a security code"
                })
            }
        }
        else
        {
            res.json({error})
        }
    }
    catch(error)
    {
        res.json({error})
    }
    
    return 
}


const verifyOtp = async(req,res) =>
{
    try
    {
        const {email,code} = req.body;
        const codeValidation = Joi.object({
            code:Joi.string().valid().required(),
            email:Joi.string().valid().required()
        }); 
        const {error} = codeValidation.validate(code);
        if(error)
        {
            const verifyOtp  = await Otp.findOne({email,code});
            if(verifyOtp)
            {
                verifyOtp.delete();
                res.json({
                    status:true,
                    message:"success, now you can verify your password"
                })  
            }
            else
            {
                res.json({
                    status:true,
                    message:"Security code does not match"
                })  
            }
           
        }
    }
    catch(error)
    {
        res.json({error:error})
    }
    
}

const changePassword = async(req,res) =>
{
    try
    {
        let {email,password,password_confirmation} = req.body
        const passwordValidation = Joi.object({
            email:Joi.string().required(),
            password: Joi.string().min(3).max(15).required(),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required()           

        });
        const {error} = passwordValidation.validate(req.body);
        if(error)
        {
            res.json({error})
        }
        else
        {
            const hashpassword = await bcrypt.hash(password, 10);
            let checkUser = await User.findOne({email});
            if(checkUser)
            {
                let user = await  User.updateOne({ email: email }, { $set: { password: hashpassword} });
                if(user)
                {
                    return res.json({
                        status: 200,
                        message: "Your password has been changed successfully",
                    });
                }
            }
            else
            {
                return res.json({
                    status: 200,
                    message: "User Doesnot exist",
                });
            }
        }
    }
    catch(err)
    {
        res.json({err})
    }

    const { email, password, otpCode } = req.body;
    const user = await User.findOne({ otpCode }).lean();
    if (!user) {
        return res.json({
            status: 400,
            error: "Invalid OTP Code"
        });
    }
    if (user.email !== email) {
        return res.json({
            status: 400,
            error: "Invalid Email"
        });
    }
    if (password == "") {
        return res.json({
            status: 404,
            error: "Password is required"
        });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    try {
        await User.updateOne({ email: email }, { $set: { password: hashpassword, otpCode: '' } });
        return res.json({
            status: 200,
            message: "Your password has been changed successfully",
        });
    } catch (error) {
        return res.json({
            status: 400,
            error: error.message
        });
    }
}


export  default{
    register,
    login,
    requestCode,
    verifyOtp,
    changePassword,
    socialLogin
}