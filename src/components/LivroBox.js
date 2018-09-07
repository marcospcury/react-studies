import React, { Component } from 'react';
import InputCustomizado from './InputCustomizado';
import InputSelect from "./InputSelect";
import fetch from 'node-fetch';
import PubSub from 'pubsub-js';

class FormularioLivros extends Component {
  constructor(props) {
    super(props);
    this.state = { autores: [], titulo: '', preco: '', autorId: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setTitulo = this.setTitulo.bind(this);
    this.setPreco = this.setPreco.bind(this);
    this.setAutorId = this.setAutorId.bind(this);
  }

  componentDidMount() {
    fetch('https://cdc-react.herokuapp.com/api/autores')
      .then(res => res.json())
      .then(body => {
        this.setState({ autores: body.slice(0, 10) })
      })
  }

  setTitulo(evento) {
    this.setState({ titulo: evento.target.value });
  }

  setPreco(evento) {
    this.setState({ preco: evento.target.value });
  }

  setAutorId(evento) {
    this.setState({ autorId: evento.target.value });
  }

  enviaForm(evento) {
    evento.preventDefault();
    fetch('https://cdc-react.herokuapp.com/api/livros', {
      method: 'POST',
      body: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(body => {
        PubSub.publish('nova-lista-livros', body.slice(0, 10));
      })
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
          <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título" />
          <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço" />
          <InputSelect id="autorId" autores={this.state.autores} name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="Autor" />
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaLivros extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map((livro) => {
                return (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.preco}</td>
                    <td>{livro.autor.nome}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default class LivroBox extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
    PubSub.subscribe('nova-lista-autores', (topico, listaLivros) => {
      this.setState({ lista: listaLivros });
    });
  }

  componentDidMount() {
    fetch('https://cdc-react.herokuapp.com/api/livros')
      .then(res => res.json())
      .then(body => {
        this.setState({ lista: body.slice(0, 10) })
      })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivros />
          <TabelaLivros lista={this.state.lista} />
        </div>
      </div>
    )
  }
}
