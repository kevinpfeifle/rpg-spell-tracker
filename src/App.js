// React imports
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// DB imports
import {fetchSpell, fetchSpells} from './database/db';

// Component imports
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
import Footer from './components/Footer';
import Spellbook from './components/Spellbook/Spellbook';

// Util imports
import {spellSorting} from './utils/spellTransforms';

function App() {
  const [spells, setSpells] = useState([]);

  // GETs the spell list and sorts before setting it to state.
  useEffect(() => {
    const getSpells = async () => {
      const spellsFromServer = await fetchSpells();
      setSpells(spellSorting(spellsFromServer));
    };
    getSpells();
  }, []);

  // Callback function to be executed by Spellbook Header component on rerender of state.
  const sortSpells = useCallback((spells, sortField, sortDirection) => {
    let test = spellSorting(spells, sortField, sortDirection) 
    setSpells(test);
  }, []);

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
          render={() => (
            <Spellbook spells={spells} sorting={sortSpells}/>
          )} 
        /> 
        <Route path='/about' component={About} /> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
