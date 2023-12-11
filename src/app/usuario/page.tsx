'use client'
import { useUser } from '@/context/user/user';
import { useQuery } from '@apollo/client';
import { GET_INFORMATION } from '@/api/querys/getInformation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserInfo = () => {
    const { isAuth, removeAuth, token } = useUser();
    const route = useRouter()

    const { data } = useQuery(GET_INFORMATION, {
        variables: { tokenUser: token }
    })

    const handleLogout = () => {
        removeAuth();
        route.push('/')
    }

    return (
        <div className="bg-gray-200 p-4 rounded shadow ">
            {isAuth ? (
                <div className="text-center mt-5">
                    <h2 className="text-lg font-bold mb-2">Bienvenido/a, {data && data.LoginUser.user.nombre}</h2>
                    <p className="text-gray-600 mb-4">DNI: {data && data.LoginUser.user.direccion.dni}</p>
                    <p className="text-gray-600 mb-4">Nombre: {data && data.LoginUser.user.nombre}</p>
                    <p className="text-gray-600 mb-4">Direccion: {data && data.LoginUser.user.direccion.direccion}</p>
                    <p className="text-gray-600 mb-4">Ciudad: {data && data.LoginUser.user.direccion.ciudad.nombre}</p>
                    <p className="text-gray-600 mb-4">Provincia: {data && data.LoginUser.user.direccion.ciudad.provincia.nombre}</p>
                    <p className="text-gray-600 mb-4">Codigo postal: {data && data.LoginUser.user.direccion.ciudad.cod_postal}</p>
                    <p className="text-gray-600 mb-4">Telefono: {data && data.LoginUser.user.direccion.telefono}</p>
                    <p className="text-gray-600 mb-4">Info: {data && data.LoginUser.user.direccion.AgregarInfo}</p>
                    <Link href={'/usuario/recoveryPassword'}>
                        <button
                            className='text-white px-4 py-2 rounded bg-slate-800 hover:bg-slate-500 mr-3'>
                            Modificar Contraseña
                        </button>
                    </Link>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <p>No hay usuario conectado</p>
            )}
        </div>
    );
};

export default UserInfo;
