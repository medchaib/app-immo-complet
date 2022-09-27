const express = require('express');
const router = express.Router();
const Visite = require('../model/Visite');
const {
  upDateVisiteValidation,
  AddVisiteValidation,
} = require('../validation/visite');
//Register

/****
 * @desc: "save user"
 * @method : post
 * @path : localhost:5000/api/visite/add
 */
router.post('/add', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = AddVisiteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Create a new visite
  const visite = new Visite({
    Desc: req.body.Desc,
    Date_Visite: req.body.Date_Visite,
    id_client: req.body.id_client,
    id_agent: req.body.id_agent,
    id_bien: req.body.id_bien,
    photo: req.body.photo,
    Visited: false,
    confirm: false,
  });
  try {
    const savedVisite = await visite.save();
    res.status(200).send({ savedVisite });
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get all visite"
 * @method : get
 * @path : localhost:5000/api/visite/findAll
 */
router.get('/findAll', async (req, res) => {
  try {
    const visites = await Visite.find();
    res.status(200).send(visites);
  } catch (err) {
    res.status(400).send(err);
  }
});
/****
 * @desc: "get all visite by id agent "
 * @method : get
 * @path : localhost:5000/api/visite/findAll
 */
router.get('/findByIdAgent/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const visites = await Visite.find({ id_agent: { _id } });
    res.status(200).send(visites);
  } catch (err) {
    res.status(400).send(err);
  }
});
/**** dosen't work
 * @desc: "get one visite"
 * @method : get
 * @path : localhost:5000/api/visite/:_id
 * @data : no
 */

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const visite = await Visite.findOne({ _id });
    if (!visite) {
      return res.status(400).send({ msg: 'visite  is not found' });
    }
    res.status(200).send({ msg: 'i find the bien', bien });
  } catch (error) {
    res.status(400).send({ msg: 'can note found the visite', error });
  }
});

/** dosen't work
 * @desc : update visite
 * @method : put
 * @path : http://localhost:5000/api/visite/update
 * @data : Body
 */
router.put('/update', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = upDateVisiteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { _id } = req.body;
  const newVisite = req.body;
  try {
    const visite = await Visite.findOne({ _id });
    if (visite) {
      await Visite.updateOne({ _id }, { $set: { ...newVisite } });
      res.status(200).send({ msg: 'visite updated' });
    } else {
      res.status(400).send({ msg: 'can not update the visite', error });
    }
  } catch (error) {
    res.status(400).send({ msg: 'error visite', error });
  }
});

/**
 * @desc : delete visite
 * @method : delete
 * @path : http://localhost:5000/api/visite/:id
 * @data : no
 */
router.delete('/:id', async (req, res) => {
  const visiteId = req.params.id;
  try {
    const result = await Visite.findByIdAndRemove({ _id: visiteId });
    if (result.deletedCount === 0) {
      return res.status(400).send({ msg: 'user alredy deleted', error });
    }
    res.status(200).send({ msg: 'visite  deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'can not delete the  visite', error });
  }
});

module.exports = router;
