const express = require("express");
const postsModel = require("../models/posts");
const controller = express.Router();

controller.get("/", async (req, res) => {
  // because posts by default are not sorted in chronological order
  // we should sort it first
  // the first post should be the most recent one
  const postsSortedByRecentDate = await postsModel
    .find()
    .sort({ publishedDate: "desc" })
    .limit(6)
    .exec();

  // sort the posts by descending order, most recent to latest
  // get the most recent post which is located at the first index
  const mostRecentPost = postsSortedByRecentDate[0];
  // get the next 5 most recent posts
  const nextRecentPosts = postsSortedByRecentDate.slice(1);

  // Get query parameters success and action
  // If have, we display alert banners
  // If not, no alert banners should be displayed
  const success = req.query.success;
  const action = req.query.action;

  res.render("homepage.ejs", {
    mostRecentPost,
    nextRecentPosts,
    success,
    action,
  });
});

module.exports = controller;