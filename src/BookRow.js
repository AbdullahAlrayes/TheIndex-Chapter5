import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    return (
      <tr>
        <td>{book.title}</td>
        <td>
          {book.authors.map(author => (
            <NavLink to={`/authors/${author.id}`}>
              <div key={author.name}>{author.name}</div>
            </NavLink>
          ))}
        </td>
        <td>
          <NavLink to={`/books/${book.color}`}>
            <button className="btn" style={{ backgroundColor: book.color }} />
          </NavLink>
        </td>
      </tr>
    );
  }
}

export default BookRow;
