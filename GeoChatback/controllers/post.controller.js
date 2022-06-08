

const {Post} = require('../models/post.model')





const createPost = async(req,res)=>{


    const post = new Post({
 
     ...req.body
        
    });



 if (req.file) {

   post.image = req.file.filename;
}


await post.save();

res.json(post)




}




const getAllPosts = async(req,res)=>{



    const posts = await Post.find({communityId:req.params.id}).populate('creator');


    res.status(200).send(posts)

 

 }


 

module.exports = { 
     createPost,getAllPosts
}