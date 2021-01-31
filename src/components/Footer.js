import {Link, useLocation} from 'react-router-dom';

/**
 * Component which creates a temporary generic footer. Contains links to the different routes we have.
 * @returns the created component.
 */
const Footer = () => {
    const location = useLocation();
    const invalidLinks = ['/sample-spellbook', '/about'];
    return (
        <footer>
             {!invalidLinks.includes(location.pathname) && (
                <Link to="/sample-spellbook">Sample Spellbook</Link>
            )}
            <br />
            {!invalidLinks.includes(location.pathname) && (
                <Link to="/about">About</Link>
            )}
            <p>Copywrite &copy; 2021</p>
        </footer>
    )
}

export default Footer;