import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
import { getUser } from '../apis/userAPI';
// import { checkAuth } from '../apis/authAPI';

import Navbar from './Navbar/Navbar';
// import Cookies from 'js-cookie'

import coverImage from '../vendor/home.jpg';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
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
            <div>
                <Navbar></Navbar>
                <img className='RPGToolIcon' src={coverImage} alt='RPGToolICon' style={{width:'100%',height:'50em'}}/>
                <p>{this.props.name}</p>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    name: state.user.userInfo.username
});

export default connect(mapStateToProps)(UnderConstruction);