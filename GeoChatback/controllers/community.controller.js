

const {Community} = require('../models/community.model')




const createCommunity = async(req,res)=>{


    const community = new Community({
 
     ...req.body
        
    });



 if (req.file) {

   community.image = req.file.filename;
}


await community.save();

res.send(community)




}




const getAllCommunities = async(req,res)=>{


   const communities = await Community.find()


   res.status(200).send(communities)


}


module.exports = { 
     createCommunity,getAllCommunities
}