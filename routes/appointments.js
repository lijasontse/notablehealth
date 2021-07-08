const express = require('express');
const router = express.Router();
const Appointment = require('./../models/appointment');

router.get('/new', (req, res) => {
  res.render('appointments/new', { appointment: new Appointment() })
});

router.get('/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
  if (appointment === null) res.redirect('/')
  res.render('appointment/show', { appointment: appointment })
});


router.post('/', async (req, res) => {
  let appointment = new Appointment({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    kind: req.body.kind
  })
  try {
    appointment = await appointment.save()
    res.redirect(`/appointments/${appointment.id}`)
  } catch (e) {
    res.render('appointments/new', { appointment: appointment })
  }
})

module.exports = router;