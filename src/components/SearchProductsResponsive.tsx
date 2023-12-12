'use client'
import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export const SearchProductosResponsive = () => {

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
        <div className="relative mr-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch />
            </div>
            <input
                type="text"
                id="email-adress-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                placeholder="Libro, autor..."
                onChange={(event) => handleSearch(event.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}