'use client'
import React, { useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COMENTARIOS_USER } from '@/api/querys/GetComentariosUser'
import { POST_COMENTARIOS } from '@/api/mutations/postComentarios'
import { RxCross2 } from 'react-icons/rx';
import { DELETE_COMENTARIOS } from '@/api/mutations/deleteComentario'
import { useUser } from '@/context/user/user';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { type Comentario } from '@/types/types';

interface ComentariosProps {
    comentario: Comentario;
    isbn: string;
}

export const Comentarios: React.FC<ComentariosProps> = ({ comentario, isbn }) => {

    const router = useRouter();
    const { isAuth, token } = useUser();
    const { data } = useQuery(GET_COMENTARIOS_USER, {
        skip: !isAuth,
        variables: { isbn: isbn, tokenUser: token },
    });

    const [createComentario] = useMutation(POST_COMENTARIOS);
    const [deleteComentario] = useMutation(DELETE_COMENTARIOS);

    const form = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string>('');

    const handleRefresh = () => {
        setTimeout(() => {
            router.refresh()
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.current) {
            const formData = new FormData(form.current);
            const buyer = {
                comentario: formData.get('comentario'),
            };
            if (buyer.comentario !== '') {
                createComentario({
                    variables: { coment: buyer.comentario, isbn: isbn, tokenUser: token },
                });
                Swal.fire({
                    timer: 2000,
                    title: 'Comentario modificado con exito',
                    icon: 'success'
                })
                handleRefresh();
            } else {
                setError('Error, campo vacío');
            }
        }
    };

    const handleDelete = () => {
        deleteComentario({
            variables: { isbn: isbn, tokenUser: token },
        })
            .then(() => Swal.fire({
                timer: 2000,
                title: 'Comentario eliminado con exito',
                icon: 'success'
            }))
            .catch(() => Swal.fire({
                timer: 2000,
                title: 'Error al eliminar el comentario, intente mas tarde',
                icon: 'error'
            }))
    };

    const [edit, setEdit] = useState<boolean>(true);
    const handleEdit = () => {
        setEdit(false);
    };

    return (
        <div className='p-4 border rounded mb-4'>
            <h5 className='text-lg font-semibold mb-2'>{comentario.nombre_user}</h5>
            {data && data.ExistComentario.id_user === comentario.users.id ? (
                <>
                    <button onClick={handleDelete} className='bg-red-500 text-white py-1 px-2 rounded mr-2'>
                        <RxCross2 />
                    </button>
                    <button className='bg-blue-500 text-white py-1 px-2 rounded' onClick={handleEdit}>
                        Editar
                    </button>
                </>
            ) : null}

            {edit ? (
                <p>{comentario.opinion}</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className='border rounded p-2 w-full mb-2'
                            defaultValue={comentario.opinion}
                            name='comentario'
                        ></textarea>
                        {error && (
                            <p className='text-red-500'>{error}</p>
                        )}
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Enviar
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};


