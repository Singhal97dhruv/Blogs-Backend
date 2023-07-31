import express from "express"
import {signupUser} from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";
import { getImage, uploadImage } from "../controller/imageController.js";
import upload from "../utils/upload.js"
import { createPost,getAllPosts,getPost,updatePost,deletePost } from "../controller/postController.js";
import { newComment,getComments,deleteComment } from "../controller/commentController.js";
import { authenticateToken } from "../controller/jwtController.js";

const router =express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'),uploadImage)
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete/:id',authenticateToken,deletePost);
router.post('/comment/new', authenticateToken,newComment);
router.get('/comments/:id',authenticateToken,getComments);
router.delete('/comment/delete/:id', authenticateToken,deleteComment);
// router.post("/file/upload", upload.single("file"), (req, res) => {
//     // Handle file upload and other logic here
//     console.log("Received file data:", req.file); // Log the file information
  
//     // ... rest of the code ...
//   });

export default router;