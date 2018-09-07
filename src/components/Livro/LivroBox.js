import React from 'react';
import fetch from 'node-fetch';
import PubSub from 'pubsub-js';
import FormularioLivros from './FormularioLivros';
import TabelaLivros from './TabelaLivros';

export default class LivroBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { livros: [], autores: [] };
    PubSub.subscribe('nova-lista-autores', (topico, listaLivros) => {
      this.setState({ lista: listaLivros });
    });
  }

  componentDidMount() {
    fetch('https://cdc-react.herokuapp.com/api/livros')
      .then(res => res.json())
      .then(body => {
        this.setState({ livros: body.slice(0, 10) })
      })

    fetch('https://cdc-react.herokuapp.com/api/autores')
      .then(res => res.json())
      .then(body => {
        this.setState({ autores: body.slice(0, 10) })
      })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivros lista={this.state.autores} />
          <TabelaLivros lista={this.state.livros} />
        </div>
      </div>
    )
  }
}
