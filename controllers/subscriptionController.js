import Joi from "joi";
import subscriptions from "../models/subscriptions.js";

const store = async(req,res) =>
{
    let {name,price} = req.body;

    // req.body.category = []


    const storeSchema = Joi.object({
        name:Joi.string().required(),
        price: Joi.number().required(),

    });   
    const {error} = storeSchema.validate({name,price});
    if(error) return res.json({error})
    try
    {
        let alreadyExist = await subscriptions.findOne({name:name});
        if(alreadyExist) return res.status(200).json({message:"Subscription Already Exists",subscription:alreadyExist})
        
        let result = await subscriptions.create(req.body);
        // let drinks = await User.findByIdAndUpdate(mongoose.Types.ObjectId(userid) ,{ $push: { drinks: req.body } },{new:true});
        if(result)
        {
            return res.json({
                messgae: "Successfully Added",
                subscription:result
            })
        }
        
    }
    catch(err)
    {
        res.json({error: err.message})
    }
    console.log(req.body);
    return;
}

const view = async(req,res) =>
{
    try
    {
        const data = await subscriptions.find({});
        res.json({subscriptions:data})
    }
    catch(error)
    {
        console.log(error);
        res.json({error})
    }
    
}

export default {
    store,
    view
};