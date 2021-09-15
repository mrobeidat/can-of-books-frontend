import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookItem from './components/bookItem';
import UpdateForm from './components/UpdateForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favBooksArr: [],
      showModal: false,
      title: '',
      description: '',
      status: '',
      email: '',
      id: ''
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
      description: event.target.description.value,
      status: event.target.status.value,
      email: email
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


  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  showModalUpdate = (item) => {
    this.setState({
      showModal: true,
      title: item.title,
      description: item.description,
      status: item.status,
      email: item.email,
      id: item._id
    })
  }


  updateBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;

    const obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: email,
      id: this.state.id
    }
    axios
    .put(`http://localhost:3050/updateBook/${this.state.id}`, obj)
    .then(result =>{
      this.setState({
        favCatsArr:result.data,
        showModal : false
      })
    })
    .catch(err=>{
      console.log('error in updating the data');
    })
  
  }


  render() {
    return (
      <>
        <Form onSubmit={this.addBookHandler} style={{ marginLeft: "7px" }}>
          <fieldset>
            <legend>Add Book</legend>
            <Form.Control type="text" name="title" placeholder="title" />
            <br />
            <br />
            <Form.Control type="text" name="description" placeholder="description" />
            <br />
            <br />
            <Form.Control type="text" name="email" placeholder="email@rhyta.com" />
            <br />
            <br />
            <select name="status" id="status" placeholder="Select status">
              <option value="science">science</option>
              <option value="Romance">Romance</option>
              <option value="Action">Action</option>
            </select>
            <br />
            <br />
            <Button type='submit'>Add book</Button>
          </fieldset>
        </Form>

        {/* {this.state.favBooksArr.length} */}
        {this.state.favBooksArr.map(item => {
          return (
            <BookItem class="books"
              item={item}
              deleteBook={this.deleteBook}
              showModalUpdate={this.showModalUpdate}
            />
          )
        })
        }
        <UpdateForm
          show={this.state.showModal}
          handleClose={this.handleClose}
          title={this.state.title}
          description={this.state.description}
          status={this.state.status}
          email={this.state.email}
          updateBook={this.updateBook}
        />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
