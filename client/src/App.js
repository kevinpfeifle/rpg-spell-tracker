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
import { loginUserSuccess } from './actions/authActions';

class App extends React.Component {

    async componentDidMount() {
        // This should run once when the website first loads (aka first render or a refresh).
        // Determine if the user is still authenticated via their user cookie.
        await authorizeUser().then((isAuthed) => {
            if (isAuthed) {
                console.log('test');
                // Get the user details and set them into the Redux store.
                this.props.dispatch(loginUserSuccess());
            }
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className='rpgTool'>
                    {/* <Navbar /> */}
                    <Switch>
                        <Route exact path='/' component={Introduction} />
                        <Route path='/sample-spellbook' component={Spellbook} />
                        <Route path='/spell-compendium' component={UnderConstruction} />
                        <Route path='/about' component={About} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/character' component={Character} />
                        {/* <Route path='/' component={UnderConstruction} /> */}
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
