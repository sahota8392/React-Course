import React, { Component } from 'react';
//removed after Header and Footer as Navbar is in HEADER     import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { CAMPSITES } from '../shared/campsites';                     //importing a module
import Home from './HomeComponent';                                  //importing Home Componenet from HomeComponent.js
import Contact from './ContactComponent';                           //importing Contact page
import About from './AboutComponent';                               //imorting About page
import { Switch, Route, Redirect } from 'react-router-dom';         //so when a link is clicked, we can use these to reroute users
import { COMMENTS } from '../shared/comments';                      //'../' is same as using cd.. in terminal
import { PARTNERS } from '../shared/partners';                      //update the class constructor to add these
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,                                   //adding the importing array here
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {

        const HomePage = () => {                //defined in maincomponent so only accessible here - locally scoped
        return (
            <Home 
                campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}    //Filtering for objects where featured propery evaluates as true
                promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}  //filter returns an array so we need to pass an object, using [0] to access first object in array
                partner={this.state.partners.filter(partner => partner.featured)[0]}
            />
        );
    }

    const CampsiteWithId = ({match}) => {
        return (
            <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} //the +match is converting a string to a number so we can match number to number
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        }

    return(
        <div>
            <Header />
            <Switch>        {/* Switch is later versions is now Routes */}
                <Route path='/home' component = {HomePage} />
                <Route path='/directory/:campsiteId' component={CampsiteWithId} />  {/*The colons : tell the router that what follows the forward slash is parameter, this is more specific so it goes first */}
                <Route path='/directory' render = {() => <Directory campsites = {this.state.campsites} />} />  {/* Switch will match you with the first route it can so you place the more specific routes first or we can change this to route exact path */}
                <Route exact path='/contactus' component={Contact} />
                <Route exact path='/aboutus' render ={() => <About partners = {this.state.partners} />}  />    {/*  Routing link to the About page */}
                <Redirect to='/home' />                                {/* Redirect must the last one */}
            </Switch>
            <Footer />
        </div>
    );
}
}

export default Main;

/*             REMOVED AFTER HEADER AND FOOTER - AND updated to the REACT ROUTER
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />

                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
*/

