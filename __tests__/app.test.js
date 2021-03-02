require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const weather = require('../lib/weather.js');
const location = require('../lib/location.js');
const { formattedWeather, formattedLocation, formattedReview } = require('../lib/utils');
const review = require('../lib/review');
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

    test('returns lat and lon of location', () => {

      const expectation = {
        formatted_query: 'Portland, Multnomah County, Oregon, USA',
        latitude: '45.5202471',
        longitude: '-122.6741949'
      };


      const data = formattedLocation(location);

      expect(data).toEqual(expectation);
    });

    test('returns weather for next 7 days', async() => {

      const expectation = [{ 'forecast': 'Scattered clouds', 'time': 'Tue May 05 2020' }, { 'forecast': 'Light snow', 'time': 'Wed May 06 2020' }, { 'forecast': 'Few clouds', 'time': 'Thu May 07 2020' }, { 'forecast': 'Few clouds', 'time': 'Fri May 08 2020' }, { 'forecast': 'Broken clouds', 'time': 'Sat May 09 2020' }, { 'forecast': 'Overcast clouds', 'time': 'Sun May 10 2020' }, { 'forecast': 'Overcast clouds', 'time': 'Mon May 11 2020' }];
      
      //const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=44.9429&lon=123.0351&key=${ process.env.weatherbit}`)

      const data = formattedWeather(weather);

      expect(data).toEqual(expectation);
    });

    test('return review', () => {
      const expectation = 
        [
          {
            'name': 'Pike Place Chowder',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
            'price': '$$   ',
            'rating': '4.5',
            'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
          },
          {
            'name': 'Umi Sake House',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
            'price': '$$   ',
            'rating': '4.0',
            'url': 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
          },
        ];

      const data = formattedReview(review);

      expect(data).toEqual(expectation);
    });
  });
});
