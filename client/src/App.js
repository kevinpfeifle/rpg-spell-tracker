// React imports
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactLogo from './vendor/d20.png';

// API imports
import {getPureSpells} from './apis/spellAPI';

// Component imports
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
import Footer from './components/Footer';
import Spellbook from './components/Spellbook/Spellbook';

// Util imports
import {spellSorting} from './utils/spellTransforms';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pureSpells: [],
      spells: []
    }
  }

  componentDidMount() {
    this.getSpells().then((spells) => {
      this.setState({
        ...this.state,
        pureSpells: spells,
        spells: spells
      });
    });
  }

  // GETs the spell list and sorts before setting it to state.
   getSpells = () => {
     return new Promise(async (resolve, reject) => {
       await getPureSpells().then((spellsFromServer) => {
         resolve(spellSorting(spellsFromServer));
        });
      });
  };

  // Callback function to be executed by Spellbook Header component on rerender of state.
  sortSpells = (sortField, sortDirection) => {
    this.setState({
      ...this.state,
      spells: spellSorting(this.state.spells, sortField, sortDirection)
    });
  };

  filterSpells = (spells) => {
    this.setState({
      ...this.state,
      spells: spells
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact render={(props) => (
            <>          
              <UnderConstruction />
            </>
          )} />
          <Route 
            path='/sample-spellbook' 
            render={() => {
              // To ensure the spellbook as spell props on render, show a spinning loading image until all least one spell is ready for display.
              return (this.state.pureSpells.length > 0) ?
                (<Spellbook spells={this.state.spells} pureSpells={this.state.pureSpells} sorting={this.sortSpells} filter={this.filterSpells}/>)
                : (<img className='Loading' src={ReactLogo} alt='Loading...' style={{width:'250px', height:'250px'}}/>)
            }} 
          /> 
          <Route path='/about' component={About} /> 
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
