import React from 'react';
import ReactDOM from 'react-dom';
import { makeMainRoutes } from './router/routes'

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('app'));
