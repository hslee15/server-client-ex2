const express = require("express");
const Post = require("../models/postModel");
const router = express.Router();


router.post('/',async (req,res)=>{
    try {
        const {title, content, author, isPublished, tags}=req.body

        if(!title || !content ){
            return res.status(400).json({message:"제목과 내용은 필수 입니다."})
        }

        const newPost = new Post({
            title,
            content,
            author: author ?? "익명",
            isPublished:isPublished ?? false,
            tags:[]
        })

        const savePost = await newPost.save()
        res.status(200).json({message:"책 추가하기 성공", post:savePost})
    } catch (error) {
        console.error("에러 내용:",error)
        res.status(500).json({message:"서버 오류",error})
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: "책 조회 성공", posts });
    } catch (error) {
        res.status(500).json({ message: "서버오류", error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: "책 조회 성공", posts });
    } catch (error) {
        res.status(500).json({ message: "서버오류", error });
    }
});

module.exports = router;