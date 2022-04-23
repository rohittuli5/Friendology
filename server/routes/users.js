const router = require('express').Router();
let User = require('../models/user');

router.route('/userData').post((req, res) => {
  email=req.body.email;
  User.findOne({email:email }, function(err, foundUsers){
    if (err){
      res.status(400).json("Bad Credentials")
    } else {
      if (foundUsers) {
        res.status(200).json(foundUsers)
      }
    }
  });

});

router.route('/signup').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;
  User.findOne({email:email}, user=>{
    
    if(!user){
      const newUser = new User({email, password,age, gender});
      newUser.save()
      .then(() => res.status(201).json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      res.status(400).json("User already registered")
    }
  })
  
});

router.route('/login').post((req, res) =>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password);
  User.findOne({email:email, password:password }, function(err, foundUsers){
    if (err){
      res.status(400).json("Bad Credentials")
    } else {
      if (foundUsers) {
        res.status(200).json(foundUsers)
      }
    }
  });

})

module.exports = router;