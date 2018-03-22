const express = require("express");
const router = express.Router();
const Blogs = require("../models/Blog");
const User = require("../models/User");

router.get("/", (req, res) => {
  Blogs.find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.get("/featured", (req, res) => {
  Blogs.where({ blogs: "featured" })
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.get("/:id", (req, res) => {
  Blogs.findById(req.params.id)
    .then(blogs => {
      if (!blogs) res.status(404).send(null);
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.post('/', (req, res) => {

    let dbUser = null;

    //find the user in the database
    User
        .findById(req.body.authorId)
        .then(users => {
            dbUser = users;

            //create a new blog for the user
            let newBlog = new Blogs(req.body);

            //set the blogs author to the users id
            newBlog.author = users._id;

            //save the blog and return it
            return newBlog.save();
        })
        .then(blogs => {
            //with that blog that we saved, push it into the users blogs
            console.log(blogs);
            dbUser.blogs.push(blogs)

            //save the user
            dbUser.save()
                .then(() => res.status(201).send(blogs))
        })
    });

router.put("/:id", (req, res) => {
  Blogs.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blogs => {
      res.status(204).json(blogs);
    })
    .catch(e => res.status(500).send("Not working"));
});

router.delete("/:id", (req, res) => {
  console.log(2);
  let id = req.params.id;
  Blogs.findByIdAndRemove(id)
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(console.error);
});

module.exports = router;
