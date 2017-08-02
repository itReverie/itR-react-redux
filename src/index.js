import 'babel-polyfill'; // There are set of features that Babel cannot transpile so we are adding all
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'; // browserHistory give us nice urls
import routes from './routes';
import './styles/styles.css'; // Webpack can import CSS files just as it does javascripts so we do all those references in one file rather than having styles in the html and js in this file
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);
