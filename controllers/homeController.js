import mongoose from "mongoose";
import Video from "../models/video.js";
import Recommended from "../models/recommend.js";
import category from "../models/category.js";

const index = async(req,res) =>
{
    try
    {
        let categories = [];
        const getStarted = await category.find({_id:mongoose.Types.ObjectId('6329bfec1b214e72cd21c714')}).lean();
        // const Recommended = await Video.find({}).lean();

        let  recommend = await Recommended.find({subscription:mongoose.Types.ObjectId('631a472e41d07af68d35a8fc'), user:mongoose.Types.ObjectId("631913bc879cd6767acfbe85")});
        if(recommend.length)
        {
            recommend.map((e) => {
                e.category.map((cat) =>{
                    (cat in categories)
                    {
                        categories.push(cat)
                    }
                    
                })
            });
        }
        

        let videos = await Video.find({
            "category": {$in: categories}
        });


        const Top = await Video.find({}).lean();

         res.json({home: { getStarted,recommend:videos, Top } });

    }
    catch(error)
    {
        console.log(error)
    }
    

}
export default {
    index
}