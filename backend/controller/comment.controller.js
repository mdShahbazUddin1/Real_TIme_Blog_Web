const { CommentModel } = require("../models/Comment");
const { BlogModel } = require("../models/Blog");
const { NotificationModel } = require("../models/Notification");

const writeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, isReply, parent } = req.body;

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    const commented_by = req.userId;
    const newComment = new CommentModel({
      blog_id: blog._id,
      blog_author: blog.author,
      comment,
      commented_by,
      isReply,
      parent,
    });
    // Save the comment to the database
    const savedComment = await newComment.save();

    // // If it's a reply, update the parent comment's children array
    // if (isReply && parent) {
    //   await CommentModel.findByIdAndUpdate(parent, {
    //     $push: { children: savedComment._id },
    //   });
    // }
      const newNotification = new NotificationModel({
        type: "comment",
        blog: blog._id,
        notification_for: blog.author,
        user: commented_by,
        comment: savedComment._id,
        seen: false,
      });
      await newNotification.save();

      res.status(201).json({ success: true, comment: savedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
    writeComment
}
