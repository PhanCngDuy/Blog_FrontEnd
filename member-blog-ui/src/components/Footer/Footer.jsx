import { FaFacebook } from 'react-icons/fa';
import { FaInstagram, FaTwitch } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="bg-white mt-20">
            <div className="container mx-auto flex justify-between items-center text-gray-500 text-sm">
                <div>
                    <span className="font-semibold text-black">Memmber blog</span> 2024 copyright all rights reserved
                </div>
                <div className="flex items-center justify-between bg-orange px-6 py-2">
                    <ul className="flex gap-4 items-center">
                        <p>devhuunhan@gmail.com</p>
                        <a href="/" className="">
                            <FaFacebook />
                        </a>
                        <a href="/" className="">
                            <FaInstagram />
                        </a>
                        <a href="/" className="">
                            <FaTwitch />
                        </a>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
