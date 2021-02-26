// React imports
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Component imports
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
// import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Spellbook from './components/Spellbook/Spellbook';
// import SpellCompendium from './components/SpellCompendium/SpellCompendium';d

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='rpgTool'>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={UnderConstruction} />
                        <Route path='/sample-spellbook' component={Spellbook} />
                        <Route path='/spell-compendium' component={UnderConstruction} />
                        <Route path='/about' component={About} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
