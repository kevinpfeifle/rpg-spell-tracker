'use strict'

const fetchCharacterOverview = `select 
        character_id,
        user_id,
        character_name,
        character_level,
        character_race,
        character_background,
        character_alignment,
        character_classes,
        class_levels,
        class_subclasses,
        default_tool
    from 
        character.character 
    where 
        character_id = $1 and 
        active_ind = true;`;

module.exports = {
    fetchCharacterOverview: fetchCharacterOverview
}