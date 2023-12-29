'use client'
import { useLazyQuery, useQuery } from '@apollo/client';
import { LOGIN } from '@/api/querys/getUser';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { ButtonGoogle } from '@/components/ButtonGoogle';
import Link from 'next/link';
import { useUser } from '@/context/user/user';


export default function UserFormLogin() {
    const { activateAuth } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [loginUser, { data, error: queryError, loading }] = useLazyQuery(LOGIN, {
        onError: (error) => {
            setError('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
            console.error('Error:', error);
        },
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, ingresa tu correo electrónico y contraseña.');
            return;
        }
        loginUser({ variables: { email: email, password: password } });

        if (queryError) {
            setError('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
            console.error('Error en la consulta:', queryError);
            return;
        }

        if (data && data.LoginUser.accessToken === '') {
            setError('Error, Usuario no existente / no registrado');
        } else if (data && data.LoginUser.user.es_admin === true) {
            try {
                activateAuth(data?.LoginUser.accessToken)
                window.sessionStorage.setItem('token', data.LoginUser.accessToken);
                router.push('/admin')
            } catch (storageError) {
                setError('Error al guardar el token en el almacenamiento.');
                console.error('Error en el almacenamiento:', storageError);
            }
        } else {
            try {
                activateAuth(data.LoginUser.accessToken)
                window.sessionStorage.setItem('token', data.LoginUser.accessToken);
                router.push('/')
            } catch (storageError) {
                setError('Error al guardar el token en el almacenamiento.');
                console.error('Error en el almacenamiento:', storageError);
            }
        }
    };

    return (
        <form className="max-w-md mx-auto m-4 p-6 bg-white shadow-md rounded-md mt-[70px]" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="text-center text-red-500 text-sm mb-4">{error}</p>}

            <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
                Iniciar sesión
            </button>

            <Link href="/recoveryPassword" className="block text-center mt-4 text-sm text-gray-700 hover:underline">
                Olvidé mi contraseña
            </Link>
            <Link href="/registrarse" className="block text-center mt-4 text-sm text-gray-700 hover:underline mb-4">
                No tienes cuenta? Registrate!
            </Link>
            <ButtonGoogle />
        </form>
    );
}