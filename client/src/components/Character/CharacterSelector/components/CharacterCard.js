import React from 'react'

import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';

import { setFavoriteCharacter } from '../../../../actions/userActions';

import CharacterPortrait from '../../Character/components/CharacterOverview/components/CharacterPortrait';

import { RiStarLine, RiStarFill } from "react-icons/ri";

import { levelSuffixTransform } from '../../../../utils/stringTransforms';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterCard extends React.Component {
    constructor(props) {
        super(props);
    }

    setFavorite() {
        if (this.props.character.characterOverview.characterId === this.props.favoriteCharacterId) {
            // Unfavorite this character. IE set the favorite to null.
            this.props.dispatch(setFavoriteCharacter(this.props.userId, null));
        } else {
            // Set the favorite to this character.
            this.props.dispatch(setFavoriteCharacter(this.props.userId, this.props.character.characterOverview.characterId));
        }
    }

    render() {
        let characterDetails = this.props.character.characterOverview;
        return (
            <div className='container-card-grid-portrait-detail-parent'>
                <div className='container-card-grid-portrait-child'>
                    {/* Portrait */}
                    <CharacterPortrait characterId={characterDetails.characterId} viewOnly={true}></CharacterPortrait>
                </div>
                <div className='container-card-grid-detail-child'>
                    {/* Details */}
                    <div style={{display: 'inline-grid', gridTemplateAreas: 'name star', gridTemplateColumns: '1fr auto'}}>
                        <h1 className='card-title' style={{display: 'inline-block'}}>{characterDetails.characterName}</h1>
                        {
                            (characterDetails.characterId === this.props.favoriteCharacterId) ?
                            <RiStarFill style={{display: 'inline', width: '1.5em', height: '1.5em', color: 'white', float: 'right'}} onClick={this.setFavorite.bind(this)} /> :
                            <RiStarLine style={{display: 'inline', width: '1.5em', height: '1.5em', color: 'white', float: 'right'}} onClick={this.setFavorite.bind(this)} />
                        }
                    </div>
                    <h3 className='card-sub-title'>
                        {levelSuffixTransform(characterDetails.characterLevel)} Level, {characterDetails.characterRace} | {characterDetails.characterBackground}
                    </h3>
                    <div style={{display:'inline-flex', flexWrap: 'wrap'}}>
                        {
                            (characterDetails.characterClasses != null) && characterDetails.characterClasses.map((charClass, index) => (
                                <div key={index}>
                                    <h3 className='card-sub-heading' style={{color: 'gray', display: 'inline'}}>
                                    {characterDetails.classLevels[index]} {charClass} ({characterDetails.classSubclasses[index]})
                                </h3>
                                {(index != characterDetails.characterClasses.length - 1) && <h3 className='card-sub-heading'style={{color: 'gray', display: 'inline'}}>,&nbsp;</h3>}
                                </div>
                            ))
                        }
                    </div>
                    <hr style={{width: '100%', color: 'white'}}/>
                    <p className='card-text'>{characterDetails.characterOverview}</p>
                    <NavLink to={{pathname: '/character/view/' + characterDetails.characterId}} className='card-button' style={{width: '10em', marginTop: '1.5em', textDecoration: 'none'}}>
                        <h3 className='card-button-text'>View Character</h3>
                    </NavLink>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    userId: state.user.userInfo.userId,
    favoriteCharacterId: state.user.userPreferences.favoriteCharacterId,
});

export default connect(mapStateToProps)(CharacterCard);