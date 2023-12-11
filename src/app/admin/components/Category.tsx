'use client'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { DELETE_CATEGORY } from '@/api/admin/mutations/DeleteCategory';
import { type Categorys } from '@/types/types';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

export function Category({ category }: { category: Categorys }) {
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleDeleteCategory = (nombre: string) => {
        deleteCategory({
            variables: { nombre: nombre },
        })
            .then(() => Swal.fire({
                timer: 2500,
                title: 'Categoria eliminada correctamente',
                icon: 'success'
            }))
            .catch(() => Swal.fire({
                timer: 2500,
                title: 'No se pudo eliminar la categoria, intente mas tarde',
                icon: 'error'
            }));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmAction = () => {
        handleDeleteCategory(category.nombre)
        setIsModalOpen(false);
    };



    return (
        <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-md">
            <Image height={300} width={300} className="mx-auto mb-2 rounded" src={category.url_imagen} alt={category.nombre} />
            <h5 className="text-center">{category.nombre}
                <div className="flex justify-center mt-2">
                    <button className="text-blue-500 mr-4" >
                        <Link href={`/admin/categorys/${category.id_genero}`}>
                            <BsPencil />
                        </Link>
                    </button>
                    <button className="text-red-500" onClick={handleOpenModal}>
                        <AiOutlineDelete size="20px" />
                    </button>
                    {isModalOpen && (
                        <Modal isOpen={isModalOpen}
                            question={`Desea eliminar a ${category.nombre} como genero?`}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmAction} />
                    )}
                </div>
            </h5>
        </div>
    );
}
