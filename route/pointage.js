const express = require('express');
const Pointage = require('../model/Pointage');
const User = require('../model/User');
const router = express.Router();
const {
  AddPointageValidation,
  updatePointageValidation,
} = require('../validation/pointage');
/****
 * @desc: "Create  pointage"
 * @method : post
 * @path : localhost:5000/api/pointage/add
 * @data : body
 */
router.post('/add', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = AddPointageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Create pointage
  const user = await User.findOne({ username: req.body.username });
  const pointage = new Pointage({
    username: user.username,
    name:user.name,
    lastName:user.lastName,
    email:user.email,
    address:user.address,
    role:user.role
  });
  try {
    const savePoint = await pointage.save();
    res.status(200).send({
      msg: 'i find the pointage ',
      pointage: savePoint,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get all pointage"
 * @method : get
 * @path : localhost:5000/api/pointage/findAll
 * @data : no
 */
router.get('/findAll', async (req, res) => {
  try {
    const pointages = await Pointage.find();
    res.status(200).send({ msg: 'there are all the pointage', pointages });
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get one pointage"
 * @method : get
 * @path : localhost:5000/api/pointage/:_id
 */

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const pointage = await Pointage.findOne({ _id });
    if (!pointage) {
      return res
        .status(400)
        .send({ msg: 'this user not pointed', pointage: pointage });
    }
    res.status(200).send({ msg: 'the user pointed', pointage });
  } catch (error) {
    res.status(400).send({ msg: 'can note found the pointage', error });
  }
});

/**
 * @desc : update pointage
 * @method : put
 * @path : http://localhost:5000/api/pointage/update
 * @data : Body
 */
router.put('/update', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = updatePointageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { _id } = req.body;
  const newPointage = req.body;
  try {
    const pointage = await Pointage.findOne({ _id });
    if (pointage) {
      await Pointage.updateOne({ _id }, { $set: { ...newPointage } });
      res.status(200).send({ msg: 'Pointage updated', newPointage });
    } else {
      res.status(400).send({ msg: 'can not update the Pointage', error });
    }
  } catch (error) {
    res.status(400).send({ msg: 'error Pointage', error });
  }
});

/**
 * @desc : delete pointage
 * @method : delete
 * @path : http://localhost:5000/api/pointage/:id
 * @data : no
 */
router.delete('/:id', async (req, res) => {
  const PointageId = req.params.id;
  try {
    const result = await Pointage.findByIdAndRemove({ _id: PointageId });

    res.status(200).send({ msg: 'Pointage deleted', result });
  } catch (error) {
    res.status(400).send({ msg: 'can not delete the Pointage', error });
  }
});




module.exports = router;
