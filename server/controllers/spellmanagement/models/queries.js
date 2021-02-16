'use strict'

const fetchSpellById = `select * from spell.spell where spell_id = $1;`;

const fetchAllSpells = `select * from spell.spell;`;

const fetchSpellbookById = `select 
                                s.*,
                                ssx.spell_prepared,
                                ssx.casting_class,
                                ssx.circle_spell,
                                ssx.domain_spell,
                                ssx.oath_spell
                            from 
                                spell.spellbook_spell_xref ssx 
                            inner join 
                                spell.spell s on ssx.spell_id = s.spell_id 
                            where 
                                ssx.spellbook_id = $1 and
                                ssx.active_ind = 'Y' and
                                s.active_ind = 'Y';`;

module.exports = {
    fetchSpellById: fetchSpellById,
    fetchAllSpells: fetchAllSpells,
    fetchSpellbookById: fetchSpellbookById
}