import React from 'react';               //Deafault React import and name import 
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import { Control, LocalForm, Errors } from 'react-redux-form';

/* class CampsiteInfo extends Component {                  //JSX - create child class CampsiteInfo from the parent class Component  */

    const required = val => val && val.length;
    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

    class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    formAlert (values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {

        return (
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" /> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={values => this.formAlert(values)}>

                            <Row className="form-group">
                                
                                <Label htmlFor="rating" md={12}>Rating</Label>
                            
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal >

            </div >
        );
    }
}


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {                                         //method to show the comments from the campsites.js
        if(comments) {                                                       //checking comments aren't undefined
            return (                                                        
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>                                       
                    {comments.map(comment => {         //.map iterates thru array and performs given callback function each time -- {Embeding JavaScript within JSX}
                            return(
                                <div key={comment.id}>                      {/* searching comments by the id for each */}
                                <p> 
                                    {comment.text}<br />                    {/* returns comments in two lines of the text and author below. ---- <br /> starts a new line   */}
                                    --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} 
                                </p>
                            </div>
                            );
                    })}
                <CommentForm />
                </div>                                                        //Return empty div if none of the above is applicable
            );
        }
        return <div />;
}

function CampsiteInfo(props) {
    if(props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>

                        <h2>
                            {props.campsite.name}
                        </h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />
}

/*   REMOVING IN WEEK 2 for FUNCTION COMPONENT
    render() {                                       
        if(this.props.campsite){                                //checking if an object with name "campsite" (passed thru props) is truthy (not null)
            return (
                <div className ="container">
                    <div className="row">                                       {/* Boostrap row class as attibute }
                        {this.renderCampsite(this.props.campsite)}              {/* Calling renderCampSite function for the campsite }
                        {this.renderComments(this.props.campsite.comments)}     {/* Calling the render function for the comments }
                    </div>
                </div>
            );
        }
        return (
            <div />                                     //will return empty div with no class if it's null
        )
    }
*/ 


export default CampsiteInfo;                            //export to the App.JS otherwise will be useless 