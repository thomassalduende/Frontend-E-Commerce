import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useMutation, useQuery } from '@apollo/client';
import { useUser } from '@/context/user/user';
import { POST_FAVORITOS } from '@/api/mutations/postFavoritos';
import { DELETE_FAVORITOS } from '@/api/mutations/deleteFavoritos';
import { GET_EXIST_FAVORITO } from '@/api/querys/getExistFavoritos';
import { Alerta } from './actions/alerts';

export const ButtonFavoritos = ({ isbn }: { isbn: string }) => {
    const { token, isAuth } = useUser();
    const [esFavorito, setEsFavorito] = useState<boolean>(false);

    const [agregarFavoritos] = useMutation(POST_FAVORITOS);
    const [deleteFavoritos] = useMutation(DELETE_FAVORITOS);
    const { data } = useQuery(GET_EXIST_FAVORITO, {
        skip: !isAuth,
        variables: { tokenUser: token, isbn: isbn },
        fetchPolicy: 'cache-and-network'
    });

    if (data && data.ExistFavorito.success === true) {
        setEsFavorito(true);
    }

    const Icons = esFavorito ? AiFillHeart : AiOutlineHeart;

    const handleFavoritos = () => {
        if (isAuth !== null) {
            if (!esFavorito) {
                agregarFavoritos({ variables: { tokenUser: token, isbn: isbn } })
                    .then(() => {
                        setEsFavorito(true);
                        Alerta('Libro agregado a favoritos', 'success')
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                deleteFavoritos({ variables: { tokenUser: token, isbn: isbn } })
                    .then(() => {
                        setEsFavorito(false);
                        Alerta('Libro eliminado de favoritos', 'success')
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            Alerta('Debe iniciar sesión para agregar a favoritos un libro', 'error')
        }
    };

    return (
        <button onClick={handleFavoritos}>
            <Icons size='32px' />
        </button>
    );
};
