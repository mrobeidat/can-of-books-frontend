import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateForm extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateBook}>
                            <fieldset>
                                <legend>Add Book</legend>
                                <Form.Control type="text" name="title" placeholder="title" defaultValue={this.props.title}/>
                                <br />
                                <br />
                                <Form.Control type="text" name="description" placeholder="description" defaultValue={this.props.description} />
                                <br />
                                <br />
                                <Form.Control type="text" name="email" placeholder="email@rhyta.com" defaultValue={this.props.email} />
                                <br />
                                <br />
                                <select name="status" id="status" placeholder="Select status" defaultValue={this.props.status}>
                                    <option value="science">science</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Action">Action</option>
                                </select>
                                <br />
                                <br />
                                <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                            </fieldset>
                        </Form>
                    </Modal.Body>
                 
                </Modal>
            </>
        )
    }
}

export default UpdateForm;