import React from 'react';
import InputCustomizado from '../Shared/InputCustomizado';

export default class FormularioAutores extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nome: '', email: '', senha: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(input, event) {
    let tempState = [];
    tempState[input] = event.targe.value;
    this.setState(tempState);
  }

  handleSubmit(evento) {
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
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} method="POST">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.handleChange.bind(this, 'nome')} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.handleChange.bind(this, 'senha')} label="Senha" />
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}