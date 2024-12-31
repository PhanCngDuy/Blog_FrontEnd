import { Link } from 'react-router-dom';

function NavBar() {
    const navItems = [
        { path: '/', link: 'Home' },
        { path: '/services', link: 'Services' },
        { path: '/about', link: 'About' },
        { path: '/blogs', link: 'Blogs' },
        { path: '/contact', link: 'Contact' },
    ];
    return (
        <nav className="px-4">
            <ul className="md:flex gap-12 text-lg hidden">
                {navItems.map((item) => (
                    <li key={item.path} className="text-white">
                        <Link to={item.path}>{item.link}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;
