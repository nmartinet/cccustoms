import React from 'react';
import { render } from 'react-dom';
import routes from './routes';

import './style/style.scss';

if (typeof window !== 'undefined') {
  const el = document.getElementById('outlet');
  render(
    routes,
    el
  )
};

