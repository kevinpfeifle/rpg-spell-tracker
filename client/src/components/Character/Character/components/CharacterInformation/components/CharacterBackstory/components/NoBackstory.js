import React from 'react'

import { connect } from 'react-redux';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class NoBackstory extends React.Component {
    constructor(props) {
        super(props);
        // Will need to update this to come from the DB!
        this.state = {
            hasBackstory: true
        }
    }

    render() {
        return (
            <div className="container">
                <h1>No Backstory</h1>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    // name: state.auth.userInfo.username
});

export default connect(mapStateToProps)(NoBackstory);