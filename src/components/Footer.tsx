import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GoogleMaps } from './GoogleMaps';

export function Footer() {

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 lg:flex lg:justify-between lg:gap-8">
                <div className="lg:w-1/4 lg:flex-shrink-0 mb-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">Explorar</h3>
                        <ul className="footer-links">
                            <li><a href="/category/fiction">Ficción</a></li>
                            <li><a href="/category/non-fiction">No Ficción</a></li>
                            <li><a href="/category/sci-fi">Ciencia Ficción</a></li>
                            <li><a href="/category/fantasy">Fantasía</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Horarios de atención al cliente</h3>
                        <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
                        <p>Sábado: 10:00 am - 2:00 pm</p>
                        <p>Domingo: Cerrado</p>
                    </div>
                </div>
                <div className="lg:w-1/4 lg:flex-shrink-0 mb-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">Información</h3>
                        <ul className="footer-links">
                            <li><a href="/about">Acerca de nosotros</a></li>
                            <li><a href="/contact">Contacto</a></li>
                            <li><a href="/faq">Preguntas frecuentes</a></li>
                            <li><a href="/privacy-policy">Política de privacidad</a></li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-4">Obtén ofertas en tu email</h3>
                        <form className="flex">
                            <input type="email" placeholder="Tu correo electrónico" className="bg-gray-800 text-white w-full py-2 px-3 rounded-l-sm focus:outline-none" />
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-sm focus:outline-none">Suscribirse</button>
                        </form>
                    </div>
                </div>
                <div className="lg:w-[15%] lg:flex-shrink-0 mb-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">Síguenos</h3>
                        <ul className="social-links">
                            <li>
                                <a href="https://facebook.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="lg:w-full lg:col-span-3 mb-8 lg:flex lg:flex-grow">
                    <div className="lg:w-full">
                        <h3 className="text-lg font-bold mb-4">Encuéntranos</h3>
                        <GoogleMaps />
                    </div>
                </div>
            </div>
            <div className="text-center mb-6">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <a href="https://facebook.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-3xl text-white" />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-3xl text-white" />
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com/tu-libreria" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-3xl text-white" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-center py-4 bg-gray-800">
                <p>&copy; {new Date().getFullYear()} Tu Librería. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
