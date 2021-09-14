import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookItem from './components/bookItem';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favBooksArr: []
    }
  }


  componentDidMount = () => {
    // alert('hi');
    const { user } = this.props.auth0;
    let email = user.email;
    console.log(email)
    axios
      .get(`http://localhost:3050/getBook?email=${email}`)
      .then(result => {
        this.setState({
          favBooksArr: result.data
        })
      })
      .catch(err => {
        console.log('error');
      })
  }


  addBookHandler = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    let email = user.email;
    const obj = {

      title: event.target.title.value,
      email: email,
      status: event.target.status.value
    }

    axios
      .post(`http://localhost:3050/addBook`, obj)
      .then(result => {
        this.setState({
          favBooksArr: result.data
        })
      })
      .catch(err => {
        console.log('error');
      })
  }

  deleteBook = (id) => {
    const { user } = this.props.auth0;
    let email = user.email;
    axios

      .delete(`http://localhost:3050/deleteBooks/${id}?email=${email}`)
      .then(result => {
        this.setState({
          favBooksArr: result.data
        })
      })
      .catch(err => {
        console.log('error');

      })
  }

  render() {
    return (
      <>
        <form onSubmit={this.addBookHandler}>
          <fieldset>
            <legend>Add Book</legend>
            <input type="text" name="title" />
            <input type="text" name="email" />

            <select name="status" id="status">
              <option value="science">Romance</option>
              <option value="novels">Action</option>
              <option value="history">history</option>
            </select>

            <button type="submit">Add a book</button>

          </fieldset>
        </form>

        {this.state.favBooksArr.length}
        {this.state.favBooksArr.map(item => {
          return (
            <BookItem class="books"
              item={item}
              deleteBook={this.deleteBook}

            />
          )
        })
        }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
