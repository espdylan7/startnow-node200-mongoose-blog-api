const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    User
        .findById(id)
        .then(users =>  (users ? (res.status(200).json(users)) : res.status(404).send()))
        .catch(err => res.status(500).send('An internal server error has occured'));
});

router.post('/', (req, res) => {
    let newUser = new User(req.body);
    newUser
        .save(req.params.id)
        .then(users => {
            res.status(201).json(users);
        })
});

router.put("/:id", (req, res) => {
    
    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        if (!user) res.status(404).send();
        res.status(204).json(user);
    })
    .catch(err => res.status(500).send("bad"));
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    User
      .findByIdAndRemove(userId, (err, deletedUser) => {
        if (deletedUser) {
          res.status(200).json(deletedUser);
        } else {
          console.log(err);
          res.status(404).send(`404 Error: User #${userId} not found`);
        }
      });
  });


module.exports = router;
