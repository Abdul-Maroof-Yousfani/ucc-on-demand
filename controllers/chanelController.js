import Channel from "../models/channel.js";
import Joi from "joi";
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
                _id : 0 ,
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
    let {_id} = req.params;
    try
    {
        // const channel = await Channel.findByIdAndUpdate({ _id},{$set:{name:req.body.name , $pull:{   } } },{new:true}).lean();
        return res.json({});

    }
    catch(err)
    {
        res.json({err:err.message});
    }
}



export  default{
    store,
    view,
    update
}