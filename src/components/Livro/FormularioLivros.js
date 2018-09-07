import React from 'react';
import InputCustomizado from '../Shared/InputCustomizado';
import InputSelect from "../Shared/InputSelect";

export default class FormularioLivros extends React.Component {
  constructor(props) {
    super(props);
    this.state = { autores: [], titulo: '', preco: '', autorId: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(input, event) {
    let tempState = [];
    tempState[input] = event.targe.value;
    this.setState(tempState);
  }

  handleSubmit(evento) {
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
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} method="POST">
          <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.handleChange.bind(this, 'titulo')} label="Título" />
          <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.handleChange(this, 'preco')} label="Preço" />
          <InputSelect id="autorId" lista={this.props.lista} name="autorId" value={this.state.autorId} onChange={this.handleChange(this, 'autorId')} label="Autor" />
          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}