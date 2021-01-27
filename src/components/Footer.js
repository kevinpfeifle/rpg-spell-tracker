import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    return (
        <footer>
            {location.pathname !== '/about' && (
                <Link to="/about">About</Link>
            )}
            <p>Copywrite &copy; 2021</p>
        </footer>
    )
}

export default Footer;