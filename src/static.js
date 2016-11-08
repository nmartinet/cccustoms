import React from 'react';
import {render} from 'react-dom';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './routes';

import './style/style.scss'

if (typeof window !== 'undefined') {
  const el = document.getElementById('outlet');
  render(
    routes,
    el
  )
};

const rootPath = function(p){
  if (p === '/') return '';
  let [head, ...tail] = p.split("/");
  return tail.map(() => "../"  ).join("")
}

export default (locals, callback) => {
  const location = locals.path;

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = renderToString(<RouterContext {...renderProps} />);
    callback(null, locals.template({outlet: html, root: rootPath(locals.path) }));
  });
};