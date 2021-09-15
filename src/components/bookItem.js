import React, { Component } from 'react';
// import Carousel from 'react-bootstrap/Carousel';

class BookItem extends Component {
    render() {
        return (
            <div>
                <p> {this.props.item.title}</p>
                <p> {this.props.item.description}</p>
                <p> {this.props.item.title}</p>
                <p> {this.props.item.status}</p>
                <p> {this.props.item.email} </p>
                <button onClick={() => this.props.deleteBook(this.props.item._id)}>Delete</button>
                <button onClick={() => this.props.showModalUpdate(this.props.item)}>Update</button>
            </div>

        )
    }
}

export default BookItem;
