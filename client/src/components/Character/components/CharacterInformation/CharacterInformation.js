import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
// import { getUser } from '../apis/userAPI';
// import { checkAuth } from '../apis/authAPI';
import CharacterBackstory from './components/CharacterBackstory/CharacterBackstory';


/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPanel: 'overview'
        }
    }

    changePanel(panel) {
        this.setState({
            ...this.state,
            selectedPanel: panel
        });
    }

    render() {
        return (
            <div className="container-grid-vertical-menu-body-parent">
                <div className="container-nav container-grid-vertical-menu-child">
                    <button className={this.state.selectedPanel === 'overview' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('overview')}>Overview</button>
                    <button className={this.state.selectedPanel === 'appearance' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('appearance')}>Appearance</button>
                    <button className={this.state.selectedPanel === 'backstory' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('backstory')}>Backstory</button>
                    <button className={this.state.selectedPanel === 'beliefs' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('beliefs')}>Beliefs</button>
                    <button className={this.state.selectedPanel === 'culture' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('culture')}>Culture</button>
                    <button className={this.state.selectedPanel === 'life' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('life')}>Life</button>
                    <button className={this.state.selectedPanel === 'personality' ? 'button-nav--selected' : 'button-nav'} onClick={() => this.changePanel('personality')}>Personality</button>
                </div>
                <div className="container-grid-vertical-body-child">
                    {(this.state.selectedPanel === 'overview') && <></>}
                    {(this.state.selectedPanel === 'appearance') && <></>}
                    {(this.state.selectedPanel === 'backstory') && <CharacterBackstory />}
                    {(this.state.selectedPanel === 'beliefs') && <></>}
                    {(this.state.selectedPanel === 'culture') && <></>}
                    {(this.state.selectedPanel === 'life') && <></>}
                    {(this.state.selectedPanel === 'personality') && <></>}
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    // name: state.auth.userInfo.username
});

export default connect(mapStateToProps)(CharacterInformation);