import React, { Component } from 'react';
//removed after Header and Footer as Navbar is in HEADER     import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';                                  //importing Home Componenet from HomeComponent.js
import Contact from './ContactComponent';                           //importing Contact page
import About from './AboutComponent';                               //imorting About page
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';         //so when a link is clicked, we can use these to reroute users
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// import { CAMPSITES } from '../shared/campsites';                     //importing a module
// import { COMMENTS } from '../shared/comments';                      //'../' is same as using cd.. in terminal
// import { PARTNERS } from '../shared/partners';                      //update the class constructor to add these
// import { PROMOTIONS } from '../shared/promotions';

//     constructor(props) {
//         super(props);
//         this.state = {                                           //removing entire constructor in place of Redux
//             campsites: CAMPSITES,                                   //adding the importing array here
//             comments: COMMENTS,
//             partners: PARTNERS,
//             promotions: PROMOTIONS
//         };
//     }

const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners, 
        promotions: state.promotions
    };
};

const mapDispatchToProps = {                            //setup as an object
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),      //property (values)       // => action creator passing in data
    fetchCampsites: () => (fetchCampsites()),        //fetchCampsites action creator available to mainComponent as props
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {

        componentDidMount() {           //built in react method
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }

    render() {
        const HomePage = () => {                //defined in maincomponent so only accessible here - locally scoped
            return (
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
                    // promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    // partner={this.props.partners.filter(partner => partner.featured)[0]}
                    // campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}    //Filtering for objects where featured propery evaluates as true
                    // promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}  //filter returns an array so we need to pass an object, using [0] to access first object in array
                    // partner={this.state.partners.filter(partner => partner.featured)[0]}         //UPDATED TO THE ABOVE REDUX
            );
        };

    const CampsiteWithId = ({match}) => {
        return (
            <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />      //passing the addComment function to it as a prop
                    // campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} //the +match is converting a string to a number so we can match number to number
                    // comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
        );
    };

    return(
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key = {this.props.location.key} classNames='page' time={300}>

            <Switch>        {/* Switch is later versions is now Routes */}
                <Route path='/home' component = {HomePage} />
                <Route path='/directory/:campsiteId' component={CampsiteWithId} />  {/*The colons : tell the router that what follows the forward slash is parameter, this is more specific so it goes first */}
                <Route path='/directory' render = {() => <Directory campsites = {this.props.campsites} />} />  {/* Switch will match you with the first route it can so you place the more specific routes first or we can change this to route exact path */}
                <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />                
                <Route exact path='/aboutus' render ={() => <About partners = {this.props.partners} />}  />    {/*  Routing link to the About page, changed to this.props from this.state for redux */}
                <Redirect to='/home' />                                {/* Redirect must the last one */}
            </Switch>

            </CSSTransition>
            </TransitionGroup>
            <Footer />
        </div>
    );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));      //allows main component to take its state from redux store (withRouter wraps it so React router works)  //adding mapDispatchToProps as the second argument in the connect agrument

/*             REMOVED AFTER HEADER AND FOOTER - AND updated to the REACT ROUTER
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />

                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
*/

