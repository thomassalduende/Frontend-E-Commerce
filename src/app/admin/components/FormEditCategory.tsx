'use client'
import React, { useRef } from 'react';
import { UPDATE_CATEGORY } from '@/api/admin/mutations/UpdateCategory';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Categorys } from '@/types/types';

export function FormEditCategory({ category }: { category: Categorys }) {

    const [updateCategory] = useMutation(UPDATE_CATEGORY)

    const form = useRef<HTMLFormElement>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (form.current) { // Verifica si la referencia es válida
                const formData = new FormData(form.current);
                const buyer = {
                    name: formData.get('name'),
                    imagen: formData.get('imagen'),
                };
                updateCategory({
                    variables: {
                        nombreOrig: category.nombre,
                        nombre: buyer.name as string,
                        urlImagen: buyer.imagen as string,
                    },
                });
                router.refresh();
                Swal.fire({
                    icon: 'success',
                    timer: 2500,
                    title: 'Categoría editada correctamente'
                });
            }
        } catch (error) {
            console.error('Error al editar la categoría:', error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error al editar la categoría'
            });
        }
    };

    const onCancel = () => {
        router.back();
    }

    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <h5 className='text-xl font-bold mb-4'>Edita tu Genero</h5>
            <div className='w-full md:w-96 p-4 bg-white shadow-md rounded-md'>
                <form ref={form} onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <label className='text-sm font-semibold'>Name</label>
                    <input defaultValue={category?.nombre} type='text' name='name' className='border p-2 rounded-md' />
                    <label className='text-sm font-semibold'>Imagen</label>
                    <input defaultValue={category?.url_imagen} type='text' name='imagen' className='border p-2 rounded-md' />
                    <button className='mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md' type='submit'>
                        Guardar
                    </button>
                    <button className='mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md' type='button' onClick={onCancel} >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}
