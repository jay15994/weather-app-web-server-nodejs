const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jay Vaghasiya',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Jay Vaghasiya',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jay Vaghasiya',
    helpText: 'This is some helpful text.',
    faqs: [
      'name',
      'name1',
      'name2',
    ],
    myobj: {
      '5d842f0706f2a639183226bc': [
          {
              order_no: '1 5d842f0706f2a639183226bc',
              order_date: 'Sep 20, 2019',
              products: [Object],
              supplier: [Object],
              quantity: 1
          },
          {
              order_no: '2 5d842f0706f2a639183226bc',
              order_date: 'Sep 20, 2019',
              products: [Object],
              supplier: [Object],
              quantity: 1
          }
      ],
      '5d842e6406f2a639183226b9': [
          {
              order_no: '5d842e6406f2a639183226b9',
              order_date: 'Sep 20, 2019',
              products: [Object],
              supplier: [Object],
              quantity: 1
          }
      ]
  }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jay Vaghasiya',
    errorMessage: 'Help article not found.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address!' });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jay Vaghasiya',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
