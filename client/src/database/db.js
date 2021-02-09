// File to make mock REST calls to the json-server mock backend.

// Fetch a single spell from json-server db.json file based on ID.
const fetchSpell = async (id) => {
    const res = await fetch(`http://localhost:8000/spells/${id}`);
    const data = await res.json();
    return data;
};

// Fetch spells from json-server db.json file
const fetchSpells = async () => {
    const res = await fetch('http://localhost:8000/spells');
    const data = await res.json();
    return data;
};

export {
    fetchSpell,
    fetchSpells
}