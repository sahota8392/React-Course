import './App.css';
/* Adding the navigation bar */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';           //importing the React router after installing it
import Main from './components/MainComponent';
import './App.css';




class App extends Component {
    render() {
        return (
          <BrowserRouter>  {/* highest level componenet which gives it access to the main component and its children*/}            
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        );
    }
}

{/* 
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar>
<Directory campsites={this.state.campsites} />  Removing during comoponent exercise*/}


export default App;

/* Navigation bar added above */

/* Replaced all this to the navigation code above
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/


