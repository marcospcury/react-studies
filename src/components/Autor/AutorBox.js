import React from 'react';
import fetch from 'node-fetch';
import PubSub from 'pubsub-js';
import FormularioAutores from './FormularioAutores';
import TabelaAutores from './TabelaAutores';

export default class AutorBox extends React.Component {
  constructor() {
    super();
    this.state = { lista: [] };
    PubSub.subscribe('nova-lista-autores', (topico, listaAutores) => {
      this.setState({ lista: listaAutores });
    });
  }

  componentDidMount() {
    fetch('https://cdc-react.herokuapp.com/api/autores')
      .then(res => res.json())
      .then(body => {
        this.setState({ lista: body.slice(0, 10) })
      })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutores />
          <TabelaAutores lista={this.state.lista} />
        </div>
      </div>
    )
  }
}
