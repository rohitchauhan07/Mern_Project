const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send(`Hello world from server router js`);
});

// Using promisies
// router.post('/register', (req,res) => {

//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({error:"Plz fill the field properly"});
//     }

//     User.findOne({email:email})
//         .then((userExist) => {
//             if(userExist){
//                 return res.status(422).json({error:"Email already exist" });
//             }

//             const user = new User({name, email, phone, work, password, cpassword});

//             user.save().then(() => {
//                 res.status(201).json({message:"User register successfully"});
//             }).catch((err) => res.status(500).json({error: "Failed to register"}));

//         }).catch(err => { console.log(err); });
// });

// using asyn and await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // use bcrypt here
      await user.save();

      res.status(201).json({ message: "User register successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Plz fill the field properly" });
    }

    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credientials" });
      } else {
        res.status(200).json({ message: "Login successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka page
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "plzz fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "user contact successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout ka page
router.get('/logout', (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User Log out");
});

module.exports = router;
