// React imports
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// DB imports
import {fetchSpell, fetchSpells} from './database/db';

// Component imports
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
import Footer from './components/Footer';
import Spellbook from './components/Spellbook/Spellbook';

function App() {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    const getSpells = async () => {
      const spellsFromServer = await fetchSpells();
      setSpells(spellsFromServer);
    };
    getSpells();
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
            <Spellbook spells={spells} />
          )} 
        /> 
        <Route path='/about' component={About} /> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
