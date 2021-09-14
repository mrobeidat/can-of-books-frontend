import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
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
  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        {this.state.favBooksArr.length}
          {this.state.favBooksArr.map(item => {
            return (
              <BookItem
                item={item}
              />
            )
          })
          }
        </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
