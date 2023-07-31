import Comment from "../models/comment.js"

export const newComment=async(req,res)=>{
    try{
        const comment = await new Comment(req.body);
        await comment.save();
        return res.status(200).json({msg: 'Comment Saved Successfully'})
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

export const getComments=async(req,res)=>{
    try{
        const comments = await Comment.find({ postId: req.params.id });

      return res.status(200).json(comments);
    }catch(err)
    {
      return res.status(500).json({err: err.message});
    }
}
export const deleteComment=async(req,res)=>{
    try{
        const deletedComment= await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ msg: 'Comment not found' });
          }
          
          console.log("Deleted : ", deletedComment);
        return res.status(200).json({msg: "Comment deleted successfully"});
    }catch(err){
        return res.status(500).json({err: err.message});
    }

}