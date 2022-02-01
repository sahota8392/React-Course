import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';      //FormFeedback will show error messages to user
import { Link } from 'react-router-dom';

// function Contact(props) {                    Changing to class based component since we are importing componenets now from React

class Contact extends Component {
    constructor(props) {                            //adding constructor and super since we will be passing props
        super(props);

        this.state = {                              //put empty strings because on form this will be entered by the user
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,                           //set to false as default for if person wants to be contacted
            contactType: 'By Phone',
            feedback: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);     //binding the this.setState to the handleInputChange 
        this.handleSubmit = this.handleSubmit.bind(this);           
    }

    validate(firstName, lastName, phoneNum, email) {
        const errors = {            //error object; properties will hold error messages if any. Empty strings means no errors
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if (this.state.touched.firstName) {
            if (firstName.length < 2) {                                             //checking that name is 2 characters or more
                errors.firstName = 'First name must be at least 2 characters.';
        } else if (firstName.length > 15) {                                         //checking name is 15 characters or less
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        const reg = /^\d+$/;                                                    //this is the code that will only allow numbers
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {               //checking that these are numbers only
            errors.phoneNum = 'The phone number should contain only numbers.';  
        }

        if (this.state.touched.email && !email.includes('@')) {                 //checking that email does not contain @ symbol and if there is not one, the error will show
            errors.email = 'Email should contain a @';
        }

        return errors;                                                          //errors will show if there were any errors, otherwise will be empty string
    }

    handleBlur = (field) => () => {                                 //passing argument other than event so we need to wrap handleBlur in another function
        this.setState({                                             //to change the touched object
            touched: {...this.state.touched, [field]: true}         //only want to change property inside, so we use '...' spread syntax and update the property 'field'
        });
    }

    handleInputChange(event) {                                      //handles changes in form elements
        const target = event.target;                                //passing event object called event
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;       //if it's a checkbox, we get value if it's checked or not & if it's not a checkbox, we will get the value instead
    
        this.setState({                         //updated state of the names updated above
            [name]: value                       //takes name from handleInputChange and the value for the udpated state
        });
    }

    handleSubmit(event) {                                                       //handles form submission
        console.log('Current state is: ' + JSON.stringify(this.state));         //JSON.stringify converts JavaScript value to a JSON string value
        alert('Current state is: ' + JSON.stringify(this.state));               //same coding but we get top in console and this in a alert box popup
        event.preventDefault();                                                 //when you submit form, this will stop page from refreshing
    }

    render() {      //since we switched to class component we added Render and need to add the return in here

        //errors above is not available here:  variables declared inside functions/methods are locally scoped
        const errors = this.validate(this.state.firstName, 
            this.state.lastName, this.state.phoneNum, this.state.email);        
//the error method will validate the fields and return the erorrs object stored here now


        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />                  {/* horizontal break */}
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 NuCamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>

                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel: +12065551234">
                            <i className="fa fa-phone" /> 1-206-555-1234</a> <br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co">
                            <i className="fa fa-envelope" /> campsites@nucamp.co </a>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        invalid = {errors.firstName}                   //setting invalid attribute for each input we're validating
                                        onBlur = {this.handleBlur('firstName')}              //user enters input field and leaves it
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>                          {/* content of error message for that input */}    
                                            {errors.firstName}                  
                                        </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid = {errors.lastName}
                                        onBlur = {this.handleBlur('lastName')}              //user enters input field and leaves it
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>
                                            {errors.lastName}
                                        </FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid= {errors.phoneNum}
                                        onBlur= {this.handleBlur('phoneNum')}              //user enters input field and leaves it 
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>
                                            {errors.phoneNum}
                                        </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid = {errors.email}
                                        onBlur = {this.handleBlur('email')}              //user enters input field and leaves it
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;