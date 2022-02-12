import React, {Component} from 'react';
// import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';  //FormFeedback will show error messages to user
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;  //receives string value (all form inputs received as strings), checks that value was received // checks val is not falsy and checks length of string is more than zero
const maxLength = len => val => !val || (val.length <= len); //wrap function inside function // takes max length the first arrow // second arrow takes the value, the input string // second returns true if max length is not exceeded or true if value lenght is = less than max
const minLength = len => val => val && (val.length >= len);  // returns true (val) and value = or greater than min or returns false if either is false
const isNumber = val => !isNaN(+val); //unary plus operator to turn to number for value and if value isn't number it will change to NaN
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);    //checks email is A-Z, characters valid in email 0-9._%+- , after @ is characters allowed A-Z 0-9 number of times, test will test whatever value is passed to see if it meets this requirements  

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
        // this.handleSubmit = this.handleSubmit.bind(this);           
    }

    // validate(firstName, lastName, phoneNum, email) {
    //     const errors = {            //error object; properties will hold error messages if any. Empty strings means no errors
    //         firstName: '',
    //         lastName: '',
    //         phoneNum: '',
    //         email: ''
    //     };

    //     if (this.state.touched.firstName) {
    //         if (firstName.length < 2) {                                             //checking that name is 2 characters or more
    //             errors.firstName = 'First name must be at least 2 characters.';
    //     } else if (firstName.length > 15) {                                         //checking name is 15 characters or less
    //             errors.firstName = 'First name must be 15 or less characters.';
    //         }
    //     }

    //     if (this.state.touched.lastName) {
    //         if (lastName.length < 2) {
    //             errors.lastName = 'Last name must be at least 2 characters.';
    //         } else if (lastName.length > 15) {
    //             errors.lastName = 'Last name must be 15 or less characters.';
    //         }
    //     }

    //     const reg = /^\d+$/;                                                    //this is the code that will only allow numbers
    //     if (this.state.touched.phoneNum && !reg.test(phoneNum)) {               //checking that these are numbers only
    //         errors.phoneNum = 'The phone number should contain only numbers.';  
    //     }

    //     if (this.state.touched.email && !email.includes('@')) {                 //checking that email does not contain @ symbol and if there is not one, the error will show
    //         errors.email = 'Email should contain a @';
    //     }

    //     return errors;                                                          //errors will show if there were any errors, otherwise will be empty string
    // }

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

    handleSubmit(values) {                                                       //handles form submission - changed events to values
        this.props.postFeedback(values);
        // console.log('Current state is: ' + JSON.stringify(this.values));         //JSON.stringify converts JavaScript value to a JSON string value - changed state to values
        // alert('Current state is: ' + JSON.stringify(this.values));               //same coding but we get top in console and this in a alert box popup
        // this.props.resetFeedbackForm();
    }
// event.preventDefault();                                                 //when you submit form, this will stop page from refreshing


    render() {      //since we switched to class component we added Render and need to add the return in here

        //errors above is not available here:  variables declared inside functions/methods are locally scoped
        // const errors = this.validate(this.state.firstName, 
        //     this.state.lastName, this.state.phoneNum, this.state.email);        
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
                    <Form model='feedbackForm' onSubmit={values => this.handleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    
                                    <Errors
                                        className='text-danger'
                                        model='.firstName'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    
                                    <Errors
                                        className='text-danger'
                                        model='.lastName'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                    />
                                    
                                    <Errors
                                        className='text-danger'
                                        model='.phoneNum'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 10 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            validEmail
                                        }}
                                    />
                                    
                                    <Errors
                                        className='text-danger'
                                        model='.email'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invlaid email address'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;