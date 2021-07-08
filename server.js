const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
const physicanRouter = require('./routes/physicians');
const Physician = require('./models/physician');
const appointmentRouter = require('./routes/appointments');
const Appointment = require('./models/appointment');


mongoose.connect(db, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const physicians = await Physician.find().sort({
    lastName: 'asc'})
  res.render('physicians/index', { physicians: physicians });
});

app.get('/', async (req, res) => {
  const appointments = await Appointment.find().sort({
    lastName: 'asc'
  })
  res.render('appointments/index', { appointments: appointments });
});


app.use('/physicians', physicanRouter);
app.use('/appointments', appointmentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`))