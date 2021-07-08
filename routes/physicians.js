const express = require('express');
const router = express.Router();
const Physician = require('./../models/physician');
const Appointment = require('./../models/appointment');


router.get('/new', (req, res) => {
  res.render('physicians/new', { physician: new Physician() })
});

router.get('/:id', async (req, res) => {
  const physician = await Physician.findById(req.params.id)
  if (physician === null) res.redirect('/')
  res.render('physicians/show', { physician: physician })
});


router.post('/', async (req, res) => {
  let physician = new Physician({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
  try {
    physician = await physician.save()
    res.redirect(`/physicians/${physician.id}`)
  } catch(e) {
    res.render('physicians/new', { physician: physician })
  }
})



module.exports = router;


