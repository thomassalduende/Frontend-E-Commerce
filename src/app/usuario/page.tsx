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

    const user = {
        nombre: data && data.LoginUser.user.nombre,
        dni: data.LoginUser.user.direccion.dni,
        direccion: data && data.LoginUser.user.direccion.direccion,
        ciudad: data && data.LoginUser.user.direccion.ciudad.nombre,
        provincia: data && data.LoginUser.user.direccion.ciudad.provincia.nombre,
        codigo_postal: data && data.LoginUser.user.direccion.ciudad.cod_postal,
        telefono: data && data.LoginUser.user.direccion.telefono,
        informacion: data && data.LoginUser.user.direccion.AgregarInfo
    }

    return (
        <div className="bg-gray-200 p-4 rounded shadow ">
            {isAuth ? (
                <div className="text-center mt-5">
                    <h2 className="text-lg font-bold mb-2">Bienvenido/a, {user.nombre}</h2>
                    <p className="text-gray-600 mb-4">DNI: {user.dni}</p>
                    <p className="text-gray-600 mb-4">Nombre: {user.nombre}</p>
                    <p className="text-gray-600 mb-4">Direccion: {user.direccion}</p>
                    <p className="text-gray-600 mb-4">Ciudad: {user.ciudad}</p>
                    <p className="text-gray-600 mb-4">Provincia: {user.provincia}</p>
                    <p className="text-gray-600 mb-4">Codigo postal: {user.codigo_postal}</p>
                    <p className="text-gray-600 mb-4">Telefono: {user.telefono}</p>
                    <p className="text-gray-600 mb-4">Info: {user.informacion}</p>
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
