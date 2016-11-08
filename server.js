import path from 'path';  
import express from 'express';  
import webpack from 'webpack';  
import webpackMiddleware from 'webpack-dev-middleware';  
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

import bodyParser from 'body-parser';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './src/routes'

const app = express();  
const compiler = webpack(config);

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webpackMiddleware(
  compiler,
  {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false
    }
  }));  

app.use(webpackHotMiddleware(compiler));


app.get('*', function response(req, res) {  


  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = renderToString(<RouterContext {...renderProps} />);
      res.render('template', {outlet: html});
    } else {
      res.status(404).send('not found')
    }
  })

});

app.listen(3000);  
