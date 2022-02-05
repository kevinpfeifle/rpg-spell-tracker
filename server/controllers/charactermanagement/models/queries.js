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

const fetchCharacterOwnership = `select 
        character_id,
        user_id    
    from 
        character.character 
    where 
        character_id = $1;`;

const fetchCharacterPortrait = `select
        encode(portrait_bytes, 'base64') as portrait_bytes,
        portrait_encode_tag
    from
        character.character_portrait
    where
        character_id = $1 and
        active_ind = true;`;

const upsertCharacterPortrait = `insert into 
    character.character_portrait 
        (character_id, 
         portrait_bytes, 
         portrait_encode_tag,
         user_id, 
         created_by, 
         created_date, 
         active_ind)
    values
        ($1, decode($2,'base64'), $3, $4, $5, $6, true)
    on conflict
        (character_id)
    do
    update 
    set 
        portrait_bytes = decode($2,'base64'),
        portrait_encode_tag = $3,
        updated_by = $5,
        updated_date = $6;`;

module.exports = {
    fetchCharacterOverview: fetchCharacterOverview,
    fetchCharacterOwnership: fetchCharacterOwnership,
    fetchCharacterPortrait: fetchCharacterPortrait,
    upsertCharacterPortrait: upsertCharacterPortrait
}