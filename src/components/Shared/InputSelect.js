import React from "react";

export default class InputSelect extends React.Component {
  render() {
    const autores = this.props.lista.map(item => {
      return <option key={item.id} value={item.id}>{item.nome}</option>;
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