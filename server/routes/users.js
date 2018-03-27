const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
    //console.log(User)
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) res.status(404).send();
            res.status(200).json(user);
            
        })
        .catch(err => res.status(500).send("bad"));
});

router.post("/", (req, res) => {
    
    var newUser = new User(req.body);
    newUser.save()
    .then(user => { res.status(201).json(user)
    
    .catch(err => res.status(500).send("bad"));
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


// router.delete('/:id', (req, res) => {
//     var id = req.params.id;
//     User
//         .findByIdAndRemove(id)
//         .then(users => {
//             res.status(200).json(users);
//         });
// });

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
