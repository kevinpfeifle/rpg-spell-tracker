import {Link} from 'react-router-dom';

/**
 * Component which creates a temporary "about" page. Will update this later once we actually have a working webapp.
 * @returns the created component.
 */
const About = () => {
    return (
        <div>
            <h1>About</h1>
            <p>This project exists as an opportunity to both develop my skills in react, as well as to create a tool to better manage my RPG character's spellbook.</p>
            <p>Eventually, I would like to keep expanding on it, addiing functionality and scaling it into a larger app.</p>
            <h4>Version 0.0.1</h4>
            <Link to="/">Go back</Link>
        </div>
    )
}

export default About;