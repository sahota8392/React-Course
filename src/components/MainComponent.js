import React, { Component } from 'react';
//removed after Header and Footer as Navbar is in HEADER     import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { CAMPSITES } from '../shared/campsites';
import Home from'./HomeComponent';                                  //importing Home Componenet from HomeComponent.js
import { Switch, Route, Redirect } from 'react-router-dom';         //so when a link is clicked, we can use these to reroute users


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    render() {
        const HomePage = () => {                //defined in maincomponent so only accessible here - locally scoped
        return (
            <Home />
        );
    };
    
    return(
        <div>
            <Header />
            <Switch>
                <Route path='/home' component = {HomePage} />
                <Route path='/directory' render = {() => <Directory campsites = {this.state.campsites} />} /> 
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>
    );
}
}

export default Main;

{/*             REMOVED AFTER HEADER AND FOOTER - AND updated to the REACT ROUTER
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />

                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
*/}

