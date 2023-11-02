const { BlogModel } = require("../models/Blog");
const uuid = require("uuid");
const { UserModel } = require("../models/Users");


const getAllBlog = async(req,res)=>{
  try {
    const blogs = await BlogModel.find({ draft: false }).populate("author");

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No published blogs found." });
    }

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send(error);
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

    const blog = await BlogModel.find({
      author: authorId,
      draft: false,
    }).populate("author");


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
    const userId = req.userId;
    const {title, des, content, tags } = req.body;

    let imageDataURL = null;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const imageBase64 = imageBuffer.toString("base64");
      imageDataURL = `data:${req.file.mimetype};base64,${imageBase64}`;
    }

    const uniqueBlogId = uuid.v4(); // Generate a new unique blog_id

    const newBlog = await BlogModel.create({
      blog_id: uniqueBlogId,
      title: title, // Make sure 'title' is provided in the request
      banner: imageDataURL,
      des: des, // Make sure 'des' is provided in the request
      content: content, // Make sure 'content' is provided in the request
      tags: tags, // Make sure 'tags' is provided in the request
      author: userId, // Make sure 'userId' is provided in the request
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
    const userId = req.userId;

    const draftBlog = await BlogModel.find({author:userId, draft:true});

    if(!draftBlog) return res.status(201).send({msg:"No blog found"});
     res.status(200).json(draftBlog);
  } catch (error) {
    res.status(500).send({msg:error.message})
  }
}
const getDraftBlogById = async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId; // Make sure "blogId" matches the parameter name in your route

    // Find the draft blog by its ID
    const draftBlog = await BlogModel.findOne({
      _id: blogId,
      author: userId,
      draft: true,
    }).populate("author");

    if (!draftBlog) {
      return res.status(404).json({ message: "Draft blog not found." });
    }

    res.status(200).send(draftBlog);
  } catch (error) {
    res.status(500).send(error);
  }
};

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

// Update a draft by blogId with authorization check
const updateDraft = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, des, content, tags, image } = req.body; 
    const authorId = req.userId; 

    const existingDraft = await BlogModel.findOne({ _id: id,author:authorId , draft: true });

    if (!existingDraft) {
      return res.status(404).send({ msg: "Draft not found" });
    }


    // Use ternary operators to update the draft's fields
    existingDraft.title = title ? title : existingDraft.title;
    existingDraft.des = des ? des : existingDraft.des;
    existingDraft.content = content ? content : existingDraft.content;
    existingDraft.tags = tags ? tags : existingDraft.tags;
    existingDraft.draft = false

    await existingDraft.save();

    res.status(200).send({ msg: "Draft updated" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};


module.exports = {
  getAllBlog,
  getBlogById,
  getAuthorBlog,
  createBlog,
  saveToDraft,
  getDraftBlog,
  getDraftBlogById,
  updateBlog,
  deleteBlog,
  updateDraft
};
