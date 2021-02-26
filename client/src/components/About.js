/**
 * Component which creates a temporary "about" page. Will update this later once we actually have a working webapp.
 * @returns the created component.
 */
const About = () => {
    return (
        <div className='about'>
            <h1>About</h1>
            <h3>Background</h3>
            <p>This project exists as an opportunity to both develop my skills with React, as well as to create a tool to better manage my D&D 5e characters' spellbooks.</p>
            <p>Eventually, I would like to keep expanding on it, adding functionality and scaling it into a larger app.</p>
            <h3>Initial Goal for v1.0.0</h3>
            <p>Initial major features to be implemented for v1 release are the spellbook and spell compendium, with the ability to learn spells from the compendium and track/prepare them from within the spellbook. User authentication will also be implemented with the ability to create a unique character and spellbook with restricted access for that user.</p>
            <p>Authorized users will also have access to the spell creation UI to more easily and efficiently add new spells to the spell compendium for use by users in their spellbooks.</p>
            <h3>Post v1.0.0 Feature Roadmap</h3>
            <p>I have many ambitious features in mind for this tool that will enable the user to track and maintain all aspects of their TTRPG character. The spellbook is just the first of many tools I plan to implement. My overall goal is to create a tool which assumes as little as possible about the character, and aims to flexibly contain and display data.</p>
            <p>Eventually I would like to implement an ever-expanding list of features for character tracking:</p>
            <ul>
                <li>Inventory Management (Item names, descriptions, categories, value, weight, coin purse, etc.)</li>
                <li>Equipment Management (What items are equiped to the character? Weapons, armor, magic items, etc.)</li>
                <li>Character Info (Place to manage all the details about your character's backstory/alignment/appearance/personality/flaws/etc for future reference. Useful for roleplaying, character development, etc.)</li>
                <li>Character Sheet (Ability scores, character race/class, race/class features, health tracks, spell slot trackers, death save trackers, etc.)</li>
                <li>Relationships (What are your prominent relationships to people/orgs/factions, and how do they react towards you? Useful for tracking NPCs who love or hate you, who will help or attack you.)</li>
                <li>Quest Tracker (List out of current quests: Name of quest, type of quest, who assigned it, who to turn in to, rewards, locations, associated characters, impact, etc.)</li>
                <li>Character Journal (Fillable journal entries to write detailed notes about game sessions, with the ability to stamp/sort by the date.)</li>
                <li>Notebook (Flexible notebook with pages/categories to allow for quick notes that can be categorized for better reference.)</li>
                <li>Calendar? (Links with your quests to help you manage the current in-game date as well as when all your tasks are due by.)</li>
                <li>Dice roller which links to your character sheet, equipment, spells.</li>
                <li>Permissions and linking of other user's characters to your own.</li>
            </ul>
            <p>Non-character related features may also be nice to have:</p>
            <ul>
                <li>Tools for a DM to use to help manage their game, something like a digital DM screen?</li>
                <li>Permissions for a DM to access their player's character's, and link to their DM tools.</li>
                <li>Blog tool for developer diaries/updates, general TTRPG blog entries like new encounter ideas, spell ideas, character making guides, etc.</li>
            </ul>
            <h4>Version 0.4.1</h4>
        </div>
    )
}

export default About;