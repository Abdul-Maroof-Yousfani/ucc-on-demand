import mongoose from "mongoose";
import Video from "../models/video.js";
import Recommended from "../models/recommend.js";

const index = async(req,res) =>
{

    try
    {
        const getStarted = await Video.findOne({}).lean();
        // const Recommended = await Video.find({}).lean();
        const recommend = await Recommended.aggregate([
            {$match:{subscription:mongoose.Types.ObjectId('631a472e41d07af68d35a8fc')}},
            {
                $lookup:
                {
                    from: "videos",
                    localField : "video",
                    foreignField:"_id",
                    as:"recommended videos"

                },
               
            },
            {$unwind:"$recommended videos"}
        ])

        const Top = await Video.find({}).lean();

        res.json({home: { getStarted,recommend, Top } });

    }
    catch(error)
    {
        console.log(error)
    }
    

}
export default {
    index
}