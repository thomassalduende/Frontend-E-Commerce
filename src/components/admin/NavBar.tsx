'use client'
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useUser } from "@/context/user/user";
import { useRouter } from "next/navigation";
import { SearchProductos } from "../SearchProductos";
import { SearchProductosResponsive } from "../SearchProductsResponsive";


export const NavBar = () => {

    const route = useRouter()
    const [isSearching, setIsSearching] = useState(false);
    const { removeAuth } = useUser();

    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const handleClose = () => setNav(false);

    const handleLogout = () => {
        removeAuth();
        route.push('/')
    }
    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };




    return (
        <div className='w-screen h-[80px] z-10 bg-zinc-200 sticky drop-shadow-lg'>
            <div className="px-4 flex justify-between items-center w-full h-full">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <h1 className="text-3xl font-bold mr-4 sm:text-4xl hover:scale-110 transform transition-transform">Book <i className="font-normal">Shop</i></h1>
                    </ Link>
                    <div className='md:hidden'>
                        <SearchProductosResponsive />
                    </div>
                    <ul className="hidden md:flex xl:ml-[350px] gap-7 ">
                        <li onClick={() => setIsSearching(!isSearching)} className="hover:bg-gray-300 rounded-xl ml-[-90px] hover:scale-110 transform transition-transform">
                            <FaSearch size='22px' />
                        </li>
                        <SearchProductos isSearching={isSearching} />
                        <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                            <Link href="/admin">Productos</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl  hover:scale-110 transform transition-transform">
                            <Link href="/admin/categorys">Categorias</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                            <Link href="/admin/ventas">Ventas</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl hover:scale-110 transform transition-transform">
                            <Link href="/admin/cupons">Cupones</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl  hover:scale-110 transform transition-transform">
                            <Link href="/admin/usuarios">Usuarios</Link>
                        </li>
                        <li className=" hover:bg-gray-300 rounded-xl  hover:scale-110 transform transition-transform">
                            <Link href="/" onClick={handleLogout}>Cerrar Sesion</Link>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden mr-4" onClick={handleClick}>
                    {!nav ? <IoMenu className="w-5" /> : <MdMenuOpen className="w-5" />}
                </div>
            </div>

            <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/admin">
                        Productos
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/admin/categorys">
                        Categorias
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/admin/ventas">
                        Ventas
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/admin/cupons">
                        Cupones
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleClose} href="/admin/usuario">
                        Informacion usuario
                    </Link>
                </li>
                <li className="border-b-2 border-zinc-300 w-full mt-2">
                    <Link onClick={handleLogout} href="/">
                        Carrar Sesion
                    </Link>
                </li>

            </ul>
        </div>
    );
};

