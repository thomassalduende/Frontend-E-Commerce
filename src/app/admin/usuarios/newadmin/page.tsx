'use client'
import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { POST_USER_ADMIN } from '@/api/admin/mutations/PostUserAdmin';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AgregarUser() {
    const [createUserAdmin, { data }] = useMutation(POST_USER_ADMIN);
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter()

    const onCancel = () => {
        router.back()
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(form.current!);
        const buyer = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        createUserAdmin({
            variables: { nombre: buyer.name, email: buyer.email, password: buyer.password },
        })
            .then(() => Swal.fire({
                icon: 'success',
                timer: 2500,
                title: 'Usuario creado correctamente'
            }))
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Hubo un error al crear el usuario, intente mas tarde'
            }))
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h5 className="text-lg font-bold mb-2">Agregar Usuario</h5>
            <div className="bg-gray-100 rounded p-4 w-80">
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            className="border border-gray-300 rounded-md p-1 w-full"
                            type="text"
                            name="name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            className="border border-gray-300 rounded-md p-1 w-full"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            className="border border-gray-300 rounded-md p-1 w-full"
                            type="password"
                            name="password"
                        />
                    </div>
                    {data && data.UserAdminRegister.message !== 'ERROR, ESTE CORREO YA ES ADMIN DE BOOKSHOP' ? (
                        <p>{data.UserAdminRegister.message}</p>
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
