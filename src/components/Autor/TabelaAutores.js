import React from 'react';

export default class TabelaAutores extends React.Component {
  render() {
    let autores = this.props.lista.map(autor => <tr key={autor.id}><td>{autor.nome}</td><td>{autor.email}</td></tr>);

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
            {autores}
          </tbody>
        </table>
      </div>
    );
  }
}