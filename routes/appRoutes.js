const Blog = require("../models/blog");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/blogs", (req, res) => {
    res.render("Blogs", { title: "Create New Blog" });
  });
  
  router.post("/blogs", (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.render('404', {title: 'Blog Not Found'});
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;


