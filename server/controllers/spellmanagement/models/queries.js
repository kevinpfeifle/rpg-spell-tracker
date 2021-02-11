'use strict'

const fetchSpellById = `select * from spell.spells where spell_id = $1;`;

const fetchAllSpells = `select * from spell.spells;`;

module.exports = {
    fetchSpellById: fetchSpellById,
    fetchAllSpells: fetchAllSpells
}