import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from "./components/AutorBox";
import Home from "./components/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/autor" component={AutorBox} />
          <Route path="/livro" />
        </Switch>
      </App>
    </BrowserRouter>
  ),
  document.getElementById('root'));
registerServiceWorker();
