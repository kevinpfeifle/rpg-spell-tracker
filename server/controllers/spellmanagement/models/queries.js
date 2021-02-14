'use strict'

const fetchSpellById = `select * from spell.spell where spell_id = $1;`;

const fetchAllSpells = `select * from spell.spell;`;

module.exports = {
    fetchSpellById: fetchSpellById,
    fetchAllSpells: fetchAllSpells
}