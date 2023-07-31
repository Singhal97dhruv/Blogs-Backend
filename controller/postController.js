import Post from "../models/post.js"

export const createPost= async(req,res)=>{
    try{
        const post= await new Post(req.body);
        post.save();

        return res.status(200).json("Post saved successfully");
    }
    catch(err){
        return res.status(500).json(err)
    }
}

export const getAllPosts=async(req,res)=>{
    try{
       let posts= await Post.find().sort({createdDate:-1});
       return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json({msg:error.message})
    }
}


export const getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        return res.status(200).json(post);
    }catch(err){
        console.error(err)
        return res.status(500).json({msg: err.message})
    }   
}

export const updatePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: 'post not found'});
        }

        await Post.findByIdAndUpdate(req.params.id,{$set: req.body});
        return res.status(200).json({msg: "Post Updated Successfully"})

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}
export const deletePost=async(req,res)=>{
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        
        if (!deletedPost) {
          return res.status(404).json({ msg: 'Post not found' });
        }
        
        console.log("Deleted : ", deletedPost);
        return res.status(200).json({ msg: 'Post deleted successfully' });
      } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: err });
      }
}
