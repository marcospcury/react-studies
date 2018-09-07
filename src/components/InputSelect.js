import React, { Component } from "react";

export default class InputSelect extends Component {
  render() {
    let autores = this.props.autores.map(autor => {
      return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
    });

    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
          <option value="">Selecione</option>
          {autores}
        </select>
      </div>
    );
  }
}