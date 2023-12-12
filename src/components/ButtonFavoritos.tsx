'use client'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useMutation, useQuery } from '@apollo/client';
import { useUser } from '@/context/user/user';
import { POST_FAVORITOS } from '@/api/mutations/postFavoritos'
import { DELETE_FAVORITOS } from '@/api/mutations/deleteFavoritos'
import { GET_EXIST_FAVORITO } from '@/api/querys/getExistFavoritos'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


export const ButtonFavoritos = ({ isbn }: { isbn: string }) => {

    const router = useRouter()
    const { token, isAuth } = useUser();

    const [agregarFavoritos] = useMutation(POST_FAVORITOS);
    const [deleteFavoritos] = useMutation(DELETE_FAVORITOS);
    const { data } = useQuery(GET_EXIST_FAVORITO, {
        skip: !isAuth,
        variables: { tokenUser: token, isbn: isbn },
    });

    const Icons = data && data.ExistFavorito.success ? AiFillHeart : AiOutlineHeart;

    const handleRefresh = () => {
        router.refresh();
    };

    const handleFavoritos = () => {
        if (isAuth !== null) {
            if (data && data.ExistFavorito.success === false) {
                agregarFavoritos({ variables: { tokenUser: token, isbn: isbn } })
                    .then(() => {
                        handleRefresh();
                        Swal.fire({
                            timer: 2000,
                            title: 'Libro agregado a favoritos',
                            icon: 'success'
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            } else if (data && data.ExistFavorito.success === true) {
                deleteFavoritos({ variables: { tokenUser: token, isbn: isbn } })
                    .then(() => {
                        handleRefresh();
                        Swal.fire({
                            timer: 2000,
                            title: 'Libro eliminado a favoritos',
                            icon: 'success'
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            Swal.fire({
                timer: 2000,
                title: 'Debe iniciar sesion para agregar a favoritos un libro',
                icon: 'error'
            })
        }
    };

    return (
        <>
            <button onClick={handleFavoritos}>
                <Icons size='32px' />
            </button>
        </>
    );
};
