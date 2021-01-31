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
  const [pureSpells, setPureSpells] = useState([]); // An unchanging state reference to the original spell list. Needed as filter mutates the spells list.
  const [spells, setSpells] = useState([]);

  // GETs the spell list and sorts before setting it to state.
  useEffect(() => {
    const getSpells = async () => {
      const spellsFromServer = await fetchSpells();
      setSpells(spellSorting(spellsFromServer));
      setPureSpells(spellSorting(spellsFromServer));
    };
    getSpells();
  }, []);

  // Callback function to be executed by Spellbook Header component on rerender of state.
  const sortSpells = useCallback((spells, sortField, sortDirection) => {
    setSpells(spellSorting(spells, sortField, sortDirection));
  }, []);

  const filterSpells = (spells) => {
    setSpells(spells);
  };

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
            <Spellbook spells={spells} pureSpells={pureSpells} sorting={sortSpells} filter={filterSpells}/>
          )} 
        /> 
        <Route path='/about' component={About} /> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
