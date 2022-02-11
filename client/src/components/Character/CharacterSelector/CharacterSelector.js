import React from 'react'

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom'

import { getCharacterOverview } from '../../../actions/characterActions';

import CharacterCard from './components/CharacterCard';

import Navbar from '../../Navbar/Navbar';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTool: null
        };
    }

    componentDidMount() {
        // Fetch overview information about all the user's characters.
        this.props.dispatch(getCharacterOverview(this.props.userId));
    }

    render() {
        if (this.props.characters == null || Object.keys(this.props.characters).length === 0 || this.props.loading) {
            return null;
        } else {
            let characterOrder = Object.keys(this.props.characters).sort((a, b) => {
                if (this.props.characters[a].characterOverview != null && this.props.characters[b].characterOverview == null) return -1;
                else if (this.props.characters[a].characterOverview == null && this.props.characters[b].characterOverview != null) return 1;
                else if (this.props.characters[a].characterOverview == null && this.props.characters[b].characterOverview == null) return 0;
                else {
                    if (this.props.characters[a].characterOverview.characterName.toLowerCase() > this.props.characters[b].characterOverview.characterName.toLowerCase()) return 1;
                    else if (this.props.characters[a].characterOverview.characterName.toLowerCase() < this.props.characters[b].characterOverview.characterName.toLowerCase()) return -1;
                    else return 0;
                }
            });
            return (
                <div>
                    <Navbar></Navbar>
                    <div className='container-grid-horizontal-menu-body-parent'>
                        <div className='container-grid-horizontal-menu-child'>
                            <h3 className='card-sub-title'>Character Actions</h3>
                            <hr></hr>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <NavLink exact to={{pathname: '/character/new'}} className='card-button-alternate' style={{ textDecoration: 'none'}}>
                                    <h3 className='card-button-text'>New Character</h3>
                                </NavLink>
                                <div className='card-button-alternate' style={{ textDecoration: 'none'}}>
                                    <h3 className='card-button-text'>Export Character</h3>
                                </div>
                                <div className='card-button-alternate' style={{ textDecoration: 'none'}}>
                                    <h3 className='card-button-text'>Transfer Character</h3>
                                </div>
                                <div className='card-button-alternate' style={{ textDecoration: 'none'}}>
                                    <h3 className='card-button-text'>Delete Character</h3>
                                </div>
                            </div>
                        </div>
                        <div className='container-grid-horizontal-body-child'>
                            <div className='container'>
                                <h3 className='card-sub-title'>Your Characters</h3>
                            </div>
                            <div className='container-centered-content-horizontal'>
                                {
                                    (this.props.favoriteCharacterId != null && characterOrder.includes(this.props.favoriteCharacterId.toString()) &&
                                    this.props.characters[this.props.favoriteCharacterId].authorizedUser && this.props.characters[this.props.favoriteCharacterId].characterExists) && 
                                    <CharacterCard key={this.props.favoriteCharacterId} userId={this.props.userId} character={this.props.characters[this.props.favoriteCharacterId.toString()]}></CharacterCard>
                                }
                                {
                                    characterOrder.map((characterId) => (
                                        (characterId != this.props.favoriteCharacterId && typeof this.props.characters[characterId] === 'object' && 
                                        this.props.characters[characterId].authorizedUser && this.props.characters[characterId].characterExists) && 
                                        <CharacterCard key={characterId} userId={this.props.userId} character={this.props.characters[characterId]}></CharacterCard>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state, ownProps) => ({
    favoriteCharacterId: state.user.userPreferences.favoriteCharacterId,
    userId: state.user.userInfo.userId,
    characters: state.character.characters,
    loading: state.character.loading
});

export default connect(mapStateToProps)(CharacterSelector);