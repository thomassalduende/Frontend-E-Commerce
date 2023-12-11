'use client'
import React, { useRef } from 'react';
import { POST_CATEGORY } from '@/api/admin/mutations/PostCategory';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


export default function NewCategory() {
    const [createCategory] = useMutation(POST_CATEGORY)

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

                createCategory({
                    variables: {
                        nombre: buyer.name as string,
                        urlImagen: buyer.imagen as string,
                    },
                });
                router.push('/admin/categorys');

                Swal.fire({
                    icon: 'success',
                    timer: 2500,
                    title: 'Categoría creada correctamente'
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
            <h5 className='text-xl font-bold mb-4'>Agregar Genero</h5>
            <div className='w-full md:w-96 p-4 bg-white shadow-md rounded-md'>
                <form ref={form} onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <label className='text-sm font-semibold'>Name</label>
                    <input placeholder='Ingrese nombre del genero' type='text' name='name' className='border p-2 rounded-md' />
                    <label className='text-sm font-semibold'>Imagen</label>
                    <input placeholder='Ingrese url imagen...' type='text' name='imagen' className='border p-2 rounded-md' />
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