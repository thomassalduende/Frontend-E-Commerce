'use client'
import { useQuery } from '@apollo/client';
import { GET_HOSTORIAL } from '@/api/querys/getHistorial';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Historial } from '@/components/Historial';
import { useUser } from '@/context/user/user';
import { Producto } from '@/types/types';

export default function ListHistorial() {
    const { token } = useUser();
    const { data, loading } = useQuery(GET_HOSTORIAL, {
        variables: { tokenUser: token },
    });

    return (
        <div className="container h-screen flex items-center justify-center">
            {loading ? (
                <AiOutlineLoading3Quarters className="text-3xl" />
            ) : data && data.getBooksComprados.book.length > 0 ? (
                <section className="h-80vh">
                    {data.getBooksComprados.book.map((product: Producto) => (
                        <Historial key={product.isbn} product={product} />
                    ))}
                </section>
            ) : (
                <h5 className="text-red-500 text-center mt-4">
                    ¡No has comprado libros!
                </h5>
            )}
        </div>
    );
}
