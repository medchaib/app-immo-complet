const express = require('express');
const Bien = require('../model/Bien');
const router = express.Router();

const {
  AddBienValidation,
  UpdateBienValidation,
} = require('../validation/bien');
const IsAuth = require('./verifyToken');

/****
 * @desc: "Create  bien"
 * @method : add
 * @path : localhost:5000/api/bien/add
 */
router.post('/add', async (req, res) => {
  //Validation of the data for registerbien
  const { error } = AddBienValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Create a new user
  const bien = new Bien({
    name: req.body.name,
    created_by: req.body.created_by,
    localisation: req.body.localisation,
    prix: req.body.prix,
    categorie: req.body.categorie,
    type: req.body.type,
    confirm: req.body.confirm,
    Proprietere: req.body.Proprietere,
    numchambre: req.body.numchambre,
    Surface: req.body.Surface,
    telPropritere: req.body.telPropritere,
    createdAt:req.body.createdAt
  });
  try {
    const savedBien = await bien.save();
    res.status(200).send({ msg: ' the bien is created ', bien: savedBien });
  } catch (error) {
    res.status(400).send(error);
  }
});
/****
 * @desc: "get all bien"
 * @method : get
 * @path : localhost:5000/api/bien/findAll
 */
router.get('/findAll', async (req, res) => {
  try {
    const biens = await Bien.find();
    res.status(200).send(biens);
  } catch (err) {
    res.status(400).send(err);
  }
});

/****
 * @desc: "get one  bien"
 * @method : get
 * @path : localhost:5000/api/bien/:_id
 * @data : no
 */

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const bien = await Bien.findOne({ _id });
    if (!bien) {
      return res.status(400).send({ msg: 'bien is not found' });
    }
    res.status(200).send({ msg: 'i find the bien', bien });
  } catch (error) {
    res.status(400).send({ msg: 'can note found the bien', error });
  }
});

/**
 * @desc : update bien
 * @method : put
 * @path : http://localhost:5000/api/bien/update
 * @data : Body
 */
router.put('/update', async (req, res) => {
  //Validation of the data for updatebien
  const { error } = UpdateBienValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { _id } = req.body;
  const newBien = req.body;
  try {
    const bien = await Bien.findOne({ _id });
    if (bien) {
      await Bien.updateOne({ _id }, { $set: { ...newBien } });
      res.status(200).send({ msg: 'bien updated', bien: newBien });
    } else {
      res.status(400).send({ msg: 'can not find the bien', error });
    }
  } catch (error) {
    res.status(400).send({ msg: 'error updated Bien', error });
  }
});

/**
 * @desc : delete bien
 * @method : delete
 * @path : http://localhost:5000/api/bien/:id
 * @data : no
 */
router.delete('/:id', async (req, res) => {
  const bienId = req.params.id;
  try {
    const result = await Bien.findByIdAndRemove({ _id: bienId });

    res.status(200).send({ msg: 'bien deleted', result });
  } catch (error) {
    res.status(400).send({ msg: 'can not delete the  bien', error });
  }
});

module.exports = router;
