import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
import { getUser } from '../apis/userAPI';
// import { checkAuth } from '../apis/authAPI';

import Navbar from './Navbar/Navbar';
// import Cookies from 'js-cookie'

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.name);
    }

    // componentDidMount() {
    //     // console.log('test');
    //     getUser().then((details) => {
    //         // console.log(details);
    //         if (!details) {
    //             // Would redirect, display no name;
    //             this.setState({
    //                 ...this.state,
    //                 name: "Guest"
    //             });
    //         } else {
    //             this.setState({
    //                 ...this.state,
    //                 name: details.username
    //             });
    //         }
    //     });
    // }

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <Navbar />
                        <h1>RPG Spell Tracker</h1>
                        <h2>Welcome, {this.props.name}</h2>
                        <p>Under construction.</p>
                        <img src='/poorly-drawn-under-construction.png' alt="under construction" width="250" height="250"/>
                    </header>
                </div>
            )
    }
};

const mapStateToProps = (state) => ({
    name: state.user.userInfo.username
});

export default connect(mapStateToProps)(UnderConstruction);