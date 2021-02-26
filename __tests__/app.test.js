require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const request = require('superagent');
const weather = require('../lib/weather.js');
const location = require('../lib/location.js');
const { formattedWeather, formattedLocation, formattedReview } = require('../lib/utils')
describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

   /* test('returns lat and lon of location', () => {

      const expectation = {
        "formatted_query": "Portland, Multnomah County, Oregon, USA",
        "latitude": "45.5202471",
        "longitude": "-122.6741949"
      };


      const data = formattedLocation(location);

      expect(data).toEqual(expectation);
    }); */

    /*test('returns weather for next 7 days', async() => {

      const expectation = [{"forecast": "Broken clouds", "time": "Fri Feb 26 2021"}, {"forecast": "Snow", "time": "Sat Feb 27 2021"}, {"forecast": "Broken clouds", "time": "Sun Feb 28 2021"}, {"forecast": "Scattered clouds", "time": "Mon Mar 01 2021"}, {"forecast": "Overcast clouds", "time": "Tue Mar 02 2021"}, {"forecast": "Overcast clouds", "time": "Wed Mar 03 2021"}, {"forecast": "Scattered clouds", "time": "Thu Mar 04 2021"}]
      
      //const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=44.9429&lon=123.0351&key=${process.env.weatherbit}`)

      const data = formattedWeather(weather);

      expect(data).toEqual(expectation);
    });*/
  });
});
