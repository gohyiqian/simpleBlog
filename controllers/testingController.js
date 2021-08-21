const express = require("express");
const postsModel = require("../models/posts");
const controller = express.Router();

// For testing purposes, do not expose this in production
controller.get("/seeds", async (req, res) => {
  await postsModel.insertMany([
    {
      headline: "Thursday is a fine day",
      author: "Zhiquan",
      publishedDate: new Date("2021-08-12T06:01:28.695Z"),
      featuredImage: "",
      content: "The weather is sunny. The temperature is cool.",  
    },
    {
      headline: "Friday is also a good day",
      author: "Zhiquan",
      publishedDate: new Date("2021-08-13T06:01:28.695Z"),
      featuredImage: "",
      content: "Rainy weather but good to sleep"
    },
    {
      headline: "Today is another good day",
      author: "Zhiquan",
      publishedDate: new Date(),
      featuredImage: "",
      content: "Seems fine"
    }
  ]);
  res.send("Seed data completed");
});

module.exports = controller;