'use client'
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useCart } from "@/context/carrito/cart";
import { useUser } from "@/context/user/user";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SearchProductos } from "./SearchProductos";
import { SearchProductosResponsive } from "./SearchProductsResponsive";
import { Notifications } from "./Notifications";


export const NavBar = () => {

    const { isAuth, removeAuth } = useUser();
    const { cart } = useCart()

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
    const [nav, setNav] = useState(false);

    const pathname = usePathname()

    const handleClick = () => setNav(!nav);
    const handleClose = () => setNav(false);


    const handleLogout = () => {
        removeAuth();
    }


    const handleMouseEnterIcon = () => {
        setIsNotificationsVisible(true);
    };

    const handleMouseLeaveIcon = () => {
        setIsNotificationsVisible(false);
    };



    return (
        <div className={`w-screen h-[80px] z-10 bg-zinc-200 sticky drop-shadow-lg ${pathname.startsWith('/admin/') ? 'hidden' : ''}`}>
            <div className="px-4 flex justify-between items-center w-full h-full">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <h1 className="text-3xl font-bold mr-4 sm:text-4xl hover:scale-110 transform transition-transform max-[640px]:hidden">Book <i className="font-normal">Shop</i></h1>
                        <h1 className="text-3xl font-bold mr-4 sm:text-4xl hover:scale-110 transform transition-transform min-[640px]:hidden">B<i className="font-normal">Shop</i></h1>
                    </ Link>
                    <div className='md:hidden'>
                        <SearchProductosResponsive />
                    </div>
                    <ul className="hidden md:flex md:ml-[450px] gap-7 ">
                        <li className=" hover:bg-gray-300 rounded-xl ml-[-90px] hover:scale-110 transform transition-transform">
                            <Link href="/">Libros</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                            <Link href="/categorias">Categorias</Link>
                        </li>
                        {
                            isAuth && (
                                <>
                                    <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                                        <Link href="/favoritos">Favoritos</Link>
                                    </li>

                                    <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                                        <Link href="/historial">Historial</Link>
                                    </li>
                                </>
                            )
                        }
                        <li onClick={() => setIsSearching(!isSearching)} className="hover:bg-gray-300 rounded-xl mt-1 hover:scale-110 transform transition-transform">
                            <FaSearch size='22px' />
                        </li>
                        <SearchProductos isSearching={isSearching} />
                        <li
                            onMouseEnter={handleMouseEnterIcon}
                            onMouseLeave={handleMouseLeaveIcon}
                            className="hover:bg-gray-300 rounded-xl mt-1 hover:scale-110 transform transition-transform"
                        >
                            <IoMdNotifications size="22px" />
                        </li>
                        <Notifications
                            isNotification={isNotificationsVisible}
                        />
                        <li className=" hover:bg-gray-300 rounded-xl mt-1 hover:scale-110 transform transition-transform">
                            <Link href={isAuth ? '/usuario' : '/iniciar-sesion'}>
                                <IoPerson size='22px' />
                            </Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl mt-1 hover:scale-110 transform transition-transform">
                            <Link href={isAuth ? '/checkout' : '/iniciar-sesion'}>
                                <FaCartShopping size='22px' />
                                {cart.length > 0 && <b className="flex flex-1 text-white mt-[-25px] justify-center">{cart.length}</b>}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden mr-4" onClick={handleClick}>
                    {!nav ? <IoMenu className="w-5" /> : <MdMenuOpen className="w-5" />}
                </div>
            </div>

            <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/">
                        Libros
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/categorias">
                        Categorias
                    </Link>
                </li>
                {isAuth ?
                    (
                        <>
                            <li className="border-b-2 border-zinc-300 w-full mt-2">
                                <Link onClick={handleClose} href="/favoritos">
                                    Favoritos
                                </Link>
                            </li>
                            <li className="border-b-2 border-zinc-300 w-full mt-2">
                                <Link onClick={handleClose} href="/historial">
                                    Historial
                                </Link>
                            </li>
                            <li className="border-b-2 border-zinc-300 w-full mt-2">
                                <Link onClick={handleClose} href="/checkout">
                                    Carrito
                                </Link>
                            </li>
                            <li className="border-b-2 border-zinc-300 w-full mt-2">
                                <Link onClick={handleClose} href="/usuario">
                                    Informacion usuario
                                </Link>
                            </li>
                            <li className="border-b-2 border-zinc-300 w-full mt-2">
                                <Link onClick={handleLogout} href="/">
                                    Carrar Sesion
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="border-b-2 border-zinc-300 w-full mt-2">
                            <Link onClick={handleClose} href="/iniciar-sesion">
                                Iniciar Sesion
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

