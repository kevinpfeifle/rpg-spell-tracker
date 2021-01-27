import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UnderConstruction from './components/UnderConstruction';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact render={(props) => (
          <UnderConstruction />
        )} />
        <Route path='/about' component={About} /> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
