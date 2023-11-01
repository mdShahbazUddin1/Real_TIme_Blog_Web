const { BlogModel } = require("../models/Blog");
const uuid = require("uuid");
const { UserModel } = require("../models/Users");


const getAllBlog = async(req,res)=>{
  try {
    const blogs = await BlogModel.find().populate("author");
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found." });
    }
    res.status(200).send(blogs)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(400).send({ msg: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blogs." });
  }
};

const getAuthorBlog = async(req,res) => {
  try {
    const authorId = req.userId;

    const blog = await BlogModel.find({author:authorId}).populate("author")

    if(!blog || blog.length === 0) return res.status(403).send({msg:"No blog found for this author"});

    res.status(200).send(blog)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const createBlog = async (req, res) => {
  try {
    const authorId = req.userId;
    const { title, des, content, tags } = req.body;

    let imageDataURL = null;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const imageBase64 = imageBuffer.toString("base64");
      imageDataURL = `data:${req.file.mimetype};base64,${imageBase64}`;
    }

    const uniqueBlogId = uuid.v4(); // Generate a new unique blog_id

    const newBlog = await BlogModel.create({
      blog_id: uniqueBlogId,
      title,
      banner: imageDataURL,
      des,
      content,
      tags,
      author: authorId,
    });

    await newBlog.save();

    res.status(200).send({ msg: "Blog created" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};


const saveToDraft = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, banner, des, content, tags } = req.body;

    const uniqueBlogId = uuid.v4(); // Generate a new unique blog_id

    const newBlog = new BlogModel({
      blog_id: uniqueBlogId,
      title,
      banner,
      des,
      content,
      tags,
      author: userId,
      draft: true,
    });

    const newDraftBlog = await newBlog.save();
    res.status(200).send({ msg: "Draft created", newDraftBlog });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getDraftBlog = async (req,res) =>{
  try {
    const userId = req.user._id;

    const draftBlog = await BlogModel.find({author:userId, draft:true});

    if(!draftBlog) return res.status(201).send({msg:"No blog found"});
     res.status(200).json(draftBlog);
  } catch (error) {
    res.status(500).send({msg:error.message})
  }
}

const updateBlog = async(req,res) =>{
try {

  const {title,desc,content} = req.body
  const userId = req.user._id;
  const blogId = req.params.blogId

   const blog = await BlogModel.findById(blogId);

   // Check if the blog exists
   if (!blog) {
     return res.status(404).json({ msg: "Blog not found" });
   }

   // Check if the authenticated user is the author of the blog
   if (blog.author.toString() !== userId) {
     return res
       .status(403)
       .json({ msg: "You are not authorized to update this blog" });
   }
   let imageDataURL = null;
   if (req.file) {
     const imageBuffer = req.file.buffer;
     const imageBase64 = imageBuffer.toString("base64");
     imageDataURL = `data:${req.file.mimetype};base64,${imageBase64}`;
   }

     blog.title = title;
     blog.banner = imageDataURL;
     blog.desc =  desc;
     blog.content = content;

     await blog.save()
   res.status(200).send({msg:"blog update"})
} catch (error) {
  res.status(500).send({msg:error.message})
}

}

const deleteBlog = async(req,res) => {
  try {
    const {id} = req.params;
    const userId = req.user._id;


    const blog = await BlogModel.findOneAndDelete({
      _id:id,
      author:userId
    });

    if(!blog) return res.status(404).json({
      msg: "Blog not found or you are not authorized to delete this blog",
    });
    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllBlog,
  getBlogById,
  getAuthorBlog,
  createBlog,
  saveToDraft,
  getDraftBlog,
  updateBlog,
  deleteBlog
};
