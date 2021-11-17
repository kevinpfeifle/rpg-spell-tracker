// React imports
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router";

// Component imports
import Home from './components/Home';
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
// import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Spellbook from './components/Spellbook/Spellbook';
// import SpellCompendium from './components/SpellCompendium/SpellCompendium';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className='rpgTool'>
                    {/* <Navbar /> */}
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/sample-spellbook' component={Spellbook} />
                        <Route path='/spell-compendium' component={UnderConstruction} />
                        <Route path='/about' component={About} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
