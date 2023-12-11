import React from 'react';
import { AddStartsBook } from './AddStartBook';
import { Producto } from '@/types/types';
import Link from 'next/link';

export function Historial({ product }: { product: Producto }) {
    return (
        <div className='tarjeta border border-gray-300 rounded p-4 mb-4 flex'>
            <Link href={`/book/${product.isbn}`} className='flex-none mr-4'>
                <img src={product.url_imagen} alt="imagen" className='w-24 h-auto' />
            </Link>
            <div className='flex flex-col'>
                <Link href={`/book/${product.isbn}`} className='text-lg font-semibold hover:underline'>
                    {product.nombre}
                </Link>
                <p className='text-gray-600'>{product.autor[0].nombre}</p>
                <div className='mt-1'>
                    <AddStartsBook isbn={product.isbn} />
                </div>
            </div>
        </div>
    );
}
