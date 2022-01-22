// React imports
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router";

// Component imports
import Home from './components/Home';
import Introduction from './components/Introduction';
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';

// import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Character from './components/Character/Character';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import Register from './components/Authentication/Register';
import Spellbook from './components/Spellbook/Spellbook';
// import SpellCompendium from './components/SpellCompendium/SpellCompendium';

import { connect } from 'react-redux';

import { authorizeUser } from './apis/authAPI';
import { authorizeSession } from './actions/authActions';

class App extends React.Component {

    async componentDidMount() {
        // This should run once when the website first loads (aka first render or a refresh).
        // Determine if the user is still authenticated via their user session cookie.
        await this.props.dispatch(authorizeSession());
    }

    render() {
        return (
            <BrowserRouter>
                <div className='rpgTool'>
                    {/* <Navbar /> */}
                    <Switch>
                        <Route exact path='/' render={() => <Introduction />} />
                        <Route path='/sample-spellbook' render={() => <Spellbook />} />
                        <Route path='/spell-compendium' render={() => <UnderConstruction />} />
                        <Route path='/about' render={() => <About />} />
                        <Route path='/login' render={() => <Login />} />
                        <Route path='/register' render={() => <Register />} />
                        <Route path='/logout' render={() => <Logout />} />
                        <Route path='/character' render={() => (this.props.userAuthenticated) ? <Character /> : <Login />} />
                        {/* <Route path='/' render={() => <UnderConstruction />} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    userAuthenticated: state.auth.userInfo.authenticated
});

export default connect(mapStateToProps)(App);
// export default App;
