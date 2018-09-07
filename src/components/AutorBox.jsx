import React, { Component } from 'react';
import InputCustomizado from './InputCustomizado';
import fetch from 'node-fetch';
import PubSub from 'pubsub-js';

class FormularioAutores extends Component {
  constructor() {
    super();
    this.state = { nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }

  enviaForm(evento) {
    evento.preventDefault();
    fetch('https://cdc-react.herokuapp.com/api/autores', {
      method: 'POST',
      body: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(body => {
        PubSub.publish('nova-lista-autores', body.slice(0, 10));
      })
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaAutores extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map((autor) => {
                return (
                  <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
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

export default class AutorBox extends Component {
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
