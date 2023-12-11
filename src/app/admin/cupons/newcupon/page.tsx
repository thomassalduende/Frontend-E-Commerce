'use client'
import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { POST_CUPON } from '@/api/admin/mutations/PostCupon';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface CuponData {
    codigo: string;
    descuento: string;
}


export default function Agregarcupon() {

    const router = useRouter()
    const [createCupon, { data }] = useMutation(POST_CUPON);
    const form = useRef<HTMLFormElement>(null);

    const onCancel = () => {
        router.back()
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(form.current!);
        const buyer: CuponData = {
            codigo: formData.get('codigo') as string || '',
            descuento: formData.get('descuento') as string || '',
        };


        createCupon({
            variables: { codigo: buyer.codigo, descuento: parseFloat(buyer.descuento) },
        })
            .then(() => Swal.fire({
                icon: 'success',
                timer: 2500,
                title: 'Cupon creado correctamente'
            }))
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Hubo un error al crear el cupon de descuento'
            }))
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h5 className="text-lg font-bold mb-2">Agregar Cupon</h5>
            <div className="bg-gray-100 rounded p-4 w-80">
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Codigo</label>
                        <input
                            className="border border-gray-300 rounded-md p-1 w-full"
                            type="text"
                            name="codigo"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descuento</label>
                        <input
                            className="border border-gray-300 rounded-md p-1 w-full"
                            type="text"
                            name="descuento"
                        />
                    </div>
                    {data && data.InsertCupon.message !== 'ERROR, YA EXISTE EL CUPON' ? (
                        <p>{data.InsertCupon.message}</p>
                    ) : null}
                    <div className="flex justify-between">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                            Guardar
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
