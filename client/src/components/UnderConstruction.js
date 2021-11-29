import React from 'react'

// import { Link } from 'react-router-dom'

// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';

import { checkAuth } from '../apis/authAPI';

import Cookies from 'js-cookie'

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <h1>RPG Spell Tracker</h1>
                        <p>Under construction.</p>
                        <img src='/poorly-drawn-under-construction.png' alt="under construction" width="250" height="250"/>
                    </header>
                </div>
            )
    }
};

export default UnderConstruction;