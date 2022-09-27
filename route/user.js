const router = require('express').Router();

const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  RegisterValidation,
  loginValidation,
  UpdateValidation,
  UpdatePasswordValidation,
} = require('../validation/user');
const IsAuth = require('./verifyToken');
const res = require('express/lib/response');

//current
/****
 * @desc: "current user"
 * @method : post
 * @path : localhost:5000/api/user/register
 */

router.get('/current', IsAuth, (req, res) => {
  res.send(req.user);
});

//Register
/****
 * @desc: "save user"
 * @method : post
 * @path : localhost:5000/api/user/register
 */
router.post('/register', async (req, res) => {
  //Validation of the data for register
  const { error } = RegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // //Checking if the user is already exist in the data base
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send('emailis already exists try with other one');
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(400).send('username already exists try with other one');
  //HASH The passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    role: req.body.role,
    username: req.body.username,
    password: hashedPassword,
    createdAt:req.body.createdAt
  });
  console.log("🚀 ~ file: user.js ~ line 60 ~ router.post ~ user", user)
  try {
    const savedUser = await user.save();
    console.log("🚀 ~ file: user.js ~ line 62 ~ router.post ~ savedUser", savedUser)
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get all user"
 * @method : get
 * @path : localhost:5000/api/user/findAll
 */
router.get('/findAll', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get  client"
 * @method : get
 * @path : localhost:5000/api/user/findClient
 */
router.get('/findClient', async (req, res) => {
  try {
    const users = await User.find({ role: 'client' });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get  agentChercheur"
 * @method : get
 * @path : localhost:5000/api/user/findAgent
 */
router.get('/findAgent', async (req, res) => {
  try {
    const users = await User.find({ role: 'agent' });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get  agentSuperviseur"
 * @method : get
 * @path : localhost:5000/api/user/findManager
 */
router.get('/findManager', async (req, res) => {
  try {
    const users = await User.find({ role: 'manager' });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get one  user"
 * @method : get
 * @path : localhost:5000/api/user/:_id
 */

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).send({ msg: 'user not find' });
    }
    res.status(200).send({ msg: 'i find user', user });
  } catch (error) {
    res.status(400).send({ msg: 'can note find user', error });
  }
});

/**
 * @desc : delete user
 * @method : delete
 * @path : http://localhost:5000/api/user/:id
 * @data : no
 */
router.delete('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await User.findByIdAndRemove({ _id });
    if (result.deletedCount === 0) {
      // return res.status(400);
      return res.status(400).send({ msg: 'user alredy deleted', error });
    } else {
      // res.status(200);
      res.status(200).send({ msg: 'user deleted' });
    }
  } catch (error) {
    res.status(400).send({ msg: 'can not delete the  user', error });
  }
});



/**
 * @desc : update user
 * @method : put
 * @path : http://localhost:5000/api/user/update
 * @data : no
 */
router.put('/update', async (req, res) => {
  const { error } = UpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newUser = req.body;
    const { _id } = req.body;

    //verif username
    const userToFind = await User.findById(newUser._id);
    console.log('user find ', userToFind);

    if (!userToFind) {
      return res.status(400).send({ msg: 'not find user' });
    }

    const result = await User.updateOne({ _id }, { $set: { ...newUser } });

    if (!result.acknowledged) {
      return res.status(400).send({ msg: 'user schema not confirmed' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).send({ msg: 'user alredy updated' });
    }

    res.status(200).send({ msg: 'user update succ' });
  } catch (error) {
    res.status(400).send({ msg: 'can not update user', error });
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  //Validation of the data for login
  // console.log('in login ', req.body);
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found ');
  // Checking the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Create and assign a token
  // const userToSend = {
  //   username: user.username,
  //   id: user._id,
  //   name: user.name,
  //   lastName: user.lastName,
  //   email: user.email,
  //   address: user.address,
  //   role: user.role,
  // };
  const token = jwt.sign(
    { _id: user._id },

    process.env.TOKEN_SECRET
  );
  // res.header('auth-token', token).send(token);
  res.status(200).send({ msg: 'user login succ', token: token });
  // res.send('yes')
});





/**
 * @desc : update user username and password
 * @method : put
 * @path : http://localhost:5000/api/user/one/:_id
 * @data : body
 */
 router.put('/one/:_id', async (req, res) => {
  const { error } = UpdatePasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { _id } = req.params;
    const newUser = req.body;

    if (!newUser.Npassword || !newUser.password) {
      console.log('all filed require');
      return res.status(400).send({ msg: 'all fields are required ' });
    }
    //verif username
    const userToFind = await User.findById({ _id });
    console.log('user find ', userToFind);

    if (!userToFind) {
      return res.status(400).send({ msg: 'not find user' });
    }

    const isMatch = await bcrypt.compare(newUser.password, userToFind.password);

    if (!isMatch) {
      window.alert('mot de passe nom conforme');
      return res.status(400).send({ msg: 'password incorrect' });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(newUser.Npassword, salt);
    newUser.password = hashPassword;

    const result = await User.updateOne({ _id }, { $set: { ...newUser } });

    if (!result.acknowledged) {
      return res.status(400).send({ msg: 'user schema not confirmed' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).send({ msg: 'user alredy updated' });
    }

    res.status(200).send({ msg: 'user update succ' });
  } catch (error) {
    res.status(400).send({ msg: 'can not update user', error });
  }
});

module.exports = router;
