const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    headline: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: new Date() },
    featuredImage: String,
    content: { type: String, required: true },  
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;