const mongoose = required("mongoose");

const commentSchema = mongoose.Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blog",
    },
    blog_author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blog",
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
      ref: "user",
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

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = {
    CommentModel
}
