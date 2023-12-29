'use client'
import { useMutation } from '@apollo/client';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonGoogle } from '@/components/ButtonGoogle';
import { REGISTER } from '@/api/mutations/postRegister';
import { useUser } from '@/context/user/user';
import Link from 'next/link';

export default function UserFormLogin() {
    const { activateAuth } = useUser();
    const router = useRouter();

    const [errorr, setError] = useState<string>('');

    const [createUser, { data, loading, error }] = useMutation(REGISTER)

    const registrarse = (formData: FormData) => {
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const password = formData.get('password');

        if (email && password && nombre == null) {
            setError('Debe ingresar todos los campos')
            return;
        }
        try {
            createUser({
                variables: { nombre: nombre, email: email, password: password },
            });

            if (data && data.registrarse.accessToken) {
                activateAuth(data && data.registrarse.accessToken);
                router.push('/');
            }
            if (error) {
                setError(error?.graphQLErrors[0].message)
            }
        } catch (error) {
            setError('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
        }
    }

    return (
        <form action={registrarse} className="max-w-md mx-auto m-4 p-6 bg-white shadow-md rounded-md mt-[70px]">
            <h2 className="text-2xl font-bold mb-4">
                Bienvenidos a Book <i className="font-semibold">Shop</i>
            </h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                </label>
                <input
                    type="name"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

                />
            </div>
            {errorr && <p className="text-center text-red-500 text-sm mb-4">{errorr}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
                disabled={loading}
            >
                Registrarse
            </button>
            <Link href="/iniciar-sesion" className="block text-center mt-4 text-sm text-gray-700 hover:underline mb-4">
                Ya tienes cuenta? Inicia Sesion!
            </Link>
            <ButtonGoogle />
        </form>
    );
}
