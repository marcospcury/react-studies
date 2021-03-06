import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from "./components/Autor/AutorBox";
import LivroBox from "./components/Livro/LivroBox";
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
          <Route path="/livro" component={LivroBox} />
        </Switch>
      </App>
    </BrowserRouter>
  ),
  document.getElementById('root'));
registerServiceWorker();
