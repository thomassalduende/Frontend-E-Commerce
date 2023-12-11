'use client'
import React, { useState } from 'react';
import { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BOOK } from '@/api/admin/mutations/UpdateBook';
import { GET_BOOK_ISBN } from '@/api/admin/querys/getBookIsbn';
import { useRouter } from 'next/navigation';

export default function Book({ params: { isbn } }: { params: { isbn: string } }) {

    const router = useRouter()
    const [updateBook] = useMutation(UPDATE_BOOK);
    const { data } = useQuery(GET_BOOK_ISBN, {
        variables: { isbn },
    });

    const [error, setError] = useState('');
    const form = useRef<HTMLFormElement>(null);


    const onCancel = () => {
        router.back();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.current) {
            const formData = new FormData(form.current);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h5 className='text-xl font-bold mb-4 text-center'>MODIFICAR PRODUCTOS</h5>
                <form ref={form} onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold' htmlFor='name'>Nombre</label>
                        <input
                            defaultValue={data && data.getBook.book[0].nombre}
                            type='text'
                            name='name'
                            className='border border-gray-300 rounded-md px-3 py-2 w-full'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold' htmlFor='isbn'>ISBN</label>
                        <input
                            defaultValue={data && data.getBook.book[0].isbn}
                            type='text'
                            name='isbn'
                            className='border border-gray-300 rounded-md px-3 py-2 w-full'
                        />
                    </div>
                    {/* Resto de los campos del formulario */}
                    {error && (
                        <p className='text-red-500 font-semibold text-center'>{error}</p>
                    )}
                    <div className='flex justify-center mt-6'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2'>
                            Guardar
                        </button>
                        <button
                            className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded'
                            type='button'
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
