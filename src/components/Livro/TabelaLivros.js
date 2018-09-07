import React from 'react';

export default class TabelaLivros extends React.Component {
  render() {
    let livros = this.props.lista.map(livro => <tr key={livro.id}><td>{livro.titulo}</td><td>{livro.preco}</td><td>{livro.autor.nome}</td></tr>);

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
            {livros}
          </tbody>
        </table>
      </div>
    );
  }
}