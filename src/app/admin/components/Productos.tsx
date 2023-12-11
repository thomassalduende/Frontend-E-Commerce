'use client'
import React, { useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '@/api/mutations/deleteBook';
import { Producto } from '@/types/types';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Modal } from '@/components/Modal';

export function Productos({ products, loading }: { products: Producto[], loading: boolean }) {

    const [deleteBook] = useMutation(DELETE_BOOK);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(false);

    const handleDeleteBook = (isbn: string) => {
        deleteBook({
            variables: { isbn: isbn }
        })
            .then(() => Swal.fire({
                timer: 2000,
                title: 'Libro eliminada correctamente',
                icon: 'success'
            }))
            .catch(() => Swal.fire({
                timer: 2000,
                title: 'No se pudo eliminar el libro, intente mas tarde',
                icon: 'error'
            }));
    };


    const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSort = () => {
        setSort(!sort);
    };

    const results = search ? products.filter((product) => product.isbn.includes(search)) : products;

    const sortedProducts = useMemo(() => {
        return sort ? [...results].sort((a, b) => a.nombre.localeCompare(b.nombre)) : results;
    }, [sort, results]);

    return (
        <section className='flex flex-col items-center'>
            {loading ? (
                <AiOutlineLoading3Quarters className='mx-auto mt-12' size='32px' />
            ) : (
                <>
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse max-[640px]:w-[80%] max-[640px]:ml-[6%] max-sm:mt-[5px]'>
                            <thead className='bg-gray-200 hidden sm:contents'>
                                <tr>
                                    <th className='border p-2'>Imagen</th>
                                    <th className='border p-2'>Nombre</th>
                                    <th className='border p-2'>Isbn</th>
                                    <th className='border p-2'>Autor</th>
                                    <th className='border p-2'>Stock</th>
                                    <th className='border p-2'>Descripcion</th>
                                    <th className='border p-2'>Genero</th>
                                    <th className='border p-2'>Precio</th>
                                    <th className='border p-2'>Descuento</th>
                                    <th className='border p-2'>Editorial</th>
                                    <th className='border p-2'>Option</th>
                                </tr>
                            </thead>
                            <tbody className='max-sm:'>
                                {products.map((product) => (
                                    <tr key={product.isbn} className='border-b max-[640px]:flex max-[640px]:flex-col max-[640px]:mb-[15px] max-sm:border-s-black'>
                                        <td className='border p-2'>
                                            <img className='h-12 w-12 object-cover rounded' src={product.url_imagen} alt='' />
                                        </td>
                                        <td className='border p-2 max-sm:font-bold'>{product.nombre}</td>
                                        <td className='border p-2'>{product.isbn}</td>
                                        <td className='border p-2'>{product.autor[0].nombre}</td>
                                        <td className='border p-2'>{product.stock}</td>
                                        <td className='border p-2'>{product.descripcion.slice(0, 150)}</td>
                                        {product.genero.length > 0 ? (
                                            <td className='border p-2'>{product.genero[0].nombre}</td>
                                        ) : (
                                            <td className='border p-2'>Sin genero</td>
                                        )}
                                        <td className='border p-2'>{product.precio}</td>
                                        <td className='border p-2'>{product.descuento}</td>
                                        <td className='border p-2'>{product.editorial.nombre}</td>
                                        <td className='border p-2'>
                                            <div className='flex flex-col gap-3 items-center justify-center'>
                                                <button>
                                                    <Link href={`/admin/book/${product.isbn}`}>
                                                        <BsPencil />
                                                    </Link>
                                                </button>
                                                <button className='' onClick={() => handleDeleteBook(product.isbn)}>
                                                    <AiOutlineDelete size='20px' />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
}