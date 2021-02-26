const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const { formattedLocation, formattedWeather, formattedReview } = require('./utils.js');

app.get('/location', async(req, res) => {
  try {
    const where = req.query.search;

    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.geokey}&q=${where}&format=json`);

    const formattedLink = formattedLocation(locationData.body);
    
    res.json(formattedLink);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

   const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.weatherbit}`)

    const formattedLink = formattedWeather(weatherData.body);
    
    res.json(formattedLink);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/review', async(req, res) => {
  try {
    const location = req.query.location;
  

   const reviewData = await (await request
    .get(`https://api.yelp.com/v3/businesses/search?location=${location}`)
    .set('Authorization', `Bearer ${process.env.yelp}`))

    console.log(reviewData.body);
    
    const formattedLink = formattedReview(reviewData.body);
    
    res.json(formattedLink);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});



app.use(require('./middleware/error'));

module.exports = app;
