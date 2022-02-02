'use strict'

import * as actions from '../actions/characterActions'

// The only starting value is loading, as we will create a character and tie it to its id whenever we view a new character page.
const initState = {
    loading: false
};

const charcterReducer = (state = initState, action) => {
    let character, updatedState;
    switch (action.type) {
        case actions.FETCH_CHARACTER_OVERVIEW:
            return { ...state, loading: true };
        case actions.FETCH_CHARACTER_OVERVIEW_SUCCESS:
            character = {};
            character.authorizedUser = action.payload.authorizedUser;
            character.characterExists = action.payload.characterExists;
            character.characterOverview = {
                characterId: action.payload.character_id,
                characterName: action.payload.character_name,
                characterLevel: action.payload.character_level,
                characterRace: action.payload.character_race, 
                characterBackground: action.payload.character_background,
                characterAlignment: action.payload.character_alignment,
                characterClasses: action.payload.character_classes,
                classLevels: action.payload.class_levels,
                classSubclasses: action.payload.class_subclasses,
                defaultTool: action.payload.default_tool
            };
            // We have to set the state this way since "character" state could hold many parameterized character objects by id.
            updatedState = { ...state, loading: false };
            updatedState[action.payload.character_id] = character;
            return updatedState;
        case actions.FETCH_CHARACTER_OVERVIEW_FAILURE:
            // In this scenario we cannot display the character for some reason, so set the values necessary for rendering the page redirects.
            updatedState = { ...state, loading: false };
            console.log(action);
            if (action.payload.error == null) {
                character = {};
                character.authorizedUser = action.payload.authorizedUser;
                character.characterExists = action.payload.characterExists;
                updatedState[action.payload.characterId] = character;
            }
            return updatedState;
    }
    return state;
}

export default charcterReducer;