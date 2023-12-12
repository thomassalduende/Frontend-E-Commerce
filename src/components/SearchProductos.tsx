import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export function SearchProductos({ isSearching }: { isSearching: boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };


    return (
        <div className="absolute">
            <div className={`w-[75%] h-10 fixed top-[80px] left-[100px] z-30 m-auto overflow-hidden ${isSearching ? "" : "pointer-events-none"}`}>
                <div className={`w-full max-w-screen-xl h-full relative flex justify-center  items-center m-auto transition-transform ${isSearching ? "translate-y-0" : "pointer-events-none -translate-y-12"}`}>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <FaSearch />
                    </div>
                    <input
                        onChange={(event) => handleSearch(event.target.value)}
                        className=" bg-zinc-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                        placeholder="Ingrese libro a buscar, autor, categoría..."
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
            </div>
        </div>
    );
}
