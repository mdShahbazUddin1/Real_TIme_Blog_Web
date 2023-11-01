const mongoose = required("mongoose");

const commentSchema = mongoose.Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    blog_author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    isReply: {
      type: Boolean,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  },
  {
    timestamps: {
      createdAt: "commentedAt",
    },
  }
);

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = {
    CommentModel
}
