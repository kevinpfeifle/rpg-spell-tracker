import {Link, useLocation} from 'react-router-dom';

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