'use client'
import { useQuery } from '@apollo/client';
import { GET_FAVORITOS_USER } from '@/api/querys/getFavoritosUser';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useUser } from '@/context/user/user';
import { Favoritos } from '@/components/Favoritos';
import { Favorito } from '@/types/types';

export default function FavoritosPage() {
    const { token } = useUser();
    const { data, loading } = useQuery(GET_FAVORITOS_USER, {
        variables: { tokenUser: token },
    });

    return (
        <>
            {data && data.getFavoritos.favoritos.length > 0 ? (
                loading ? (
                    <AiOutlineLoading3Quarters className="mx-auto mt-12" size="32px" />
                ) : (
                    <section className="h-[80vh] grid grid-cols-3 gap-4">
                        {data &&
                            data.getFavoritos.favoritos.map((product: Favorito) => (
                                <Favoritos key={product.books.isbn} product={product.books} />
                            ))}
                    </section>
                )
            ) : (
                <h5 className="h-[85vh] text-red-500 grid place-content-center mt-1">
                    ¡No tienes libros favoritos!
                </h5>
            )}
        </>
    );
};


