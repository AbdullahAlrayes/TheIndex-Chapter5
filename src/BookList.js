import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filteredBooks: [],
      loading: true,
      color: null
    };
  }

  componentDidMount = () => {
    instance
      .get("/api/books/")
      .then(resp => resp.data)
      .then(books => {
        this.setState({
          books: books,
          filteredBooks: books,
          loading: false,
          color: this.props.match.params.color
        });
      })
      .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.color !== this.props.match.params.color) {
      this.setState({ color: this.props.match.params.color });
      this.filterByColor();
    }
  }

  filterByColor = () => {
    let listBooks = [];
    const color = this.props.match.params.color;
    if (color !== "all") {
      listBooks = this.state.books.filter(book => {
        return book.color.toLowerCase() === color.toLowerCase();
      });
    } else {
      listBooks = [...this.state.books];
    }
    this.setState({ filteredBooks: listBooks });
  };

  filterBookList = query => {
    const list = this.state.books.filter(book => {
      return book.title.toLowerCase().includes(query);
    });
    this.setState({ filteredBooks: list });
  };

  getContent = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return <BookTable books={this.state.filteredBooks} />;
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3>Books</h3>
        <div className="row">
          <SearchBar changeHandler={this.filterBookList} />
        </div>
        <div className="row">{this.getContent()}</div>
      </React.Fragment>
    );
  }
}

export default BookList;
