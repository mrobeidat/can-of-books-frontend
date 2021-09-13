import React, { Component } from 'react';

class BookItem extends Component {
    render() {
        return (
            <div>
                <p> {this.props.item.title}</p>
                <p> {this.props.item.description}</p>
                <p> {this.props.item.title}</p>
                <p> {this.props.item.status}</p>
                <p> {this.props.item.email} </p>
            </div>
        )
    }
}

export default BookItem;
