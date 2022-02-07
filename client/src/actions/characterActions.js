// import { checkIfAuthorized, authorizeUser, registerUser } from '../apis/authAPI';

import { getCharacterOverview as characterOverview} from '../apis/characterAPI';

// Character action types for the Redux Store.
// Actions specific to fetching the character's overview
export const FETCH_CHARACTER_OVERVIEW = 'FETCH_CHARACTER_OVERVIEW';

export const FETCH_CHARACTER_OVERVIEW_SUCCESS = 'FETCH_CHARACTER_OVERVIEW_SUCCESS';

export const FETCH_CHARACTER_OVERVIEW_FAILURE = 'FETCH_CHARACTER_OVERVIEW_FAILURE';

// Action creators for the Redux Store.
export const fetchCharacterOverview = () => ({
    type: FETCH_CHARACTER_OVERVIEW
});

export const fetchCharacterOverviewSuccess = (characterOverview) => ({
    type: FETCH_CHARACTER_OVERVIEW_SUCCESS,
    payload: characterOverview
});

export const fetchCharacterOverviewFailure = (characterFail) => ({
    type: FETCH_CHARACTER_OVERVIEW_FAILURE,
    payload: characterFail.payload,
    error: characterFail.error
});

// Character actions for the Redux Store.
export function getCharacterOverview(userId, characterId) {
    return (dispatch) => {
        dispatch(fetchCharacterOverview());
        try {
            characterOverview(userId, characterId).then((characterResults) => {
                characterResults.forEach((character) => {
                    if (character.authorizedUser && character.characterExists) {
                        // Character exists, and the user is allowed to access the data related to it.
                        dispatch(fetchCharacterOverviewSuccess(character));
                    } else {
                        // Either the character doesn't exist, or the user is unauthorized.
                        dispatch(fetchCharacterOverviewFailure({payload: character, error: null}))
                    }
                });
            });
        } catch (err) {
            dispatch(fetchCharacterOverviewFailure({
                payload: err,
                error: true
            }));
        }
    };
}