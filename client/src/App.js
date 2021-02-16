// React imports
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Component imports
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
import Footer from './components/Footer';
import Spellbook from './components/Spellbook/Spellbook';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
            component={Spellbook}
          /> 
          <Route path='/about' component={About} /> 
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
