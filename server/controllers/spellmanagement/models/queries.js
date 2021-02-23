'use strict'

const fetchSpellById = `select * from spell.spell where spell_id = $1;`;

const fetchAllSpells = `select * from spell.spell;`;

const insertSpell = `insert into spell.spell (
                        spell_name, spell_level, spell_school, casting_time, concentration, spell_range, 
                        spell_components, material_components, duration, classes, ritual, spell_attack, 
                        spell_save, damage_type, spell_effects, conditions, description, description_higher_levels, 
                        source_category, source_book, source_page, spell_tags, created_date, created_by, active_ind
                    ) values (
                        $1, $2, $3, $4, $5, $6, nullif(array[$7]::bpchar[], '{null}'), $8, $9, nullif(array[$10], '{null}'), 
                        $11, $12, $13, $14, nullif(array[$15], '{null}'), nullif(array[$16], '{null}'), $17, $18, 
                        nullif(array[$19], '{null}'), nullif(array[$20], '{null}'), nullif(array[$21], '{null}'), 
                        nullif(array[$22], '{null}'), $23, $24, true
                    );`;

const fetchSpellbookById = `select 
                                s.*,
                                ssx.spell_prepared,
                                ssx.casting_class,
                                ssx.circle_spell,
                                ssx.domain_spell,
                                ssx.oath_spell,
                                ssx.racial_spell,
                                ssx.specialist_spell
                            from 
                                spell.spellbook_spell_xref ssx 
                            inner join 
                                spell.spell s on ssx.spell_id = s.spell_id 
                            where 
                                ssx.spellbook_id = $1 and
                                ssx.active_ind = 'Y' and
                                s.active_ind = 'Y';`;

const updateSpellbookSpell = `update 
                                spell.spellbook_spell_xref
                            set 
                                spell_prepared = $1,
                                updated_by = $2,
                                updated_date = $3
                            where
                                spellbook_id = $4 and 
                                spell_id = $5;`;

module.exports = {
    fetchSpellById: fetchSpellById,
    fetchAllSpells: fetchAllSpells,
    insertSpell: insertSpell,
    fetchSpellbookById: fetchSpellbookById,
    updateSpellbookSpell: updateSpellbookSpell
}