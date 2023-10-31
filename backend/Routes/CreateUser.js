const express = require("express");
const router = express.Router(); //loading router
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt=require ("jsonwebtoken");
const bcrypt=require("bcryptjs");    
const jwtSecret ="MynameisEndtoEndYouTubeChannel$#"      //for auth token
router.post(
  "/createuser",
  [
    body("email", "Incorrect email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    //used to post details of user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        //uses User schema to post request
        name: req.body.name, // name:"SHwetabh Sneh",
        password: secPassword, // password:"123456",
        email: req.body.email, // email:"shwetabh@gmail.com",
        location: req.body.location, // location:"Kadru"
      });
      res.json({ success: true }); //result in form of response
    } catch (error) {
      console.log("error in CreateUser");
      res.json({ success: false }); //response if failed to enetr correct format
    }
  }
);

router.post("/loginuser",[
    body("email", "Incorrect email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
 
  try {
    let userData = await User.findOne({email});
    if(!userData){
        return res.status(400).json({ errors: "Try logging with correct details" });
    }

    const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
    if(!pwdCompare){
        return res.status(400).json({ errors: "Try logging with correct details" });
    }

    const data={                                     //for auth token
        user:{
            id:userData.id
        }
    }
    const authToken=jwt.sign(data,jwtSecret)
return res.json({success:true,authToken})
}
catch (error) {
    console.log("error ")
    res.json({ success: false });
}})
module.exports = router;
