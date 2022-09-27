const express = require('express');
const Rendez_vous = require('../model/Rendez_vous');
const router = express.Router();
const {
  updaterendezvousValidation,
  AddrendezvousValidation,
} = require('../validation/rendez_vous');

/****
 * @desc: "Create  Rendez_vous"
 * @method : post
 * @path : localhost:5000/api/rdv/add
 */
router.post('/add', async (req, res) => {
  console.log("🚀 ~ file: rendezvous.js ~ line 15 ~ router.post ~ req", req.body)
  //Validation of the data for Addrendezvousbien
  const { error } = AddrendezvousValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Create a new date
  const rendez_vous = new Rendez_vous({
    id_client: req.body.id_client,
    dateRDV: req.body.dateRDV,
    id_Bien: req.body.id_Bien,
    affected : req.body.affected

  });
  console.log("🚀 ~ file: rendezvous.js ~ line 26 ~ router.post ~ rendez_vous", rendez_vous)
  try {
    const savedRendezvous = await rendez_vous.save();
    res.status(200).send({
      Rendez_vous: savedRendezvous,
      msg: 'votre rendez_vous est bien confirmee',
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// /****
//  * @desc: "get all pointage"
//  * @method : get
//  * @path : localhost:5000/api/rdv/findAll
//  * @data : no
//  */
router.get('/findAll', async (req, res) => {
  try {
    const rendez_vous = await Rendez_vous.find();
    res.status(200).send(rendez_vous);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get one "
 * @method : get
 * @path : localhost:5000/api/rdv/:_id
 * @data : no
 */

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const rdv = await Rendez_vous.findOne({ _id });
    if (!rdv) {
      return res.status(400).send({ msg: 'this user not pointed' });
    }
    res.status(200).send({ msg: 'the user pointed', rdv });
  } catch (error) {
    res.status(400).send({ msg: 'can note found the pointage', error });
  }
});

/** dosn't work
 * @desc : update rvd
 * @method : put
 * @path : http://localhost:5000/api/rdv/update
 * @data : Body
 */
router.put('/update', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = updaterendezvousValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { _id } = req.body;
  const newRdv = req.body;
  try {
    const rdv = await Rendez_vous.findOne({ _id });
    if (rdv) {
      await Rendez_vous.updateOne({ _id }, { $set: { ...newRdv } });
      res.status(200).send({ msg: 'Rendez-vous updated' });
    } else {
      res.status(400).send({ msg: 'can not update the Rendez vous', error });
    }
  } catch (error) {
    res.status(400).send({ msg: 'error rendez vous', error });
  }
});

/****
 * @desc: "get all rendezvous"
 * @method : get
 * @path : localhost:5000/api/rdv/findAll
 */
router.get('/findAll', async (req, res) => {
  //console.log(hello);
  try {
    const allRendez_vous = await Rendez_vous.find();
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @desc : delete Rendez vous
 * @method : delete
 * @path : http://localhost:5000/api/rdv/:id
 * @data : no
 */
router.delete('/:_id', async (req, res) => {
  const Rendezvous_id = req.params._id;
  try {
    const result = await Rendez_vous.findByIdAndRemove({ _id: Rendezvous_id });

    res.status(200).send({ msg: 'Rendezvous deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'can not delete the Rendezvous', error });
  }
});

module.exports = router;
