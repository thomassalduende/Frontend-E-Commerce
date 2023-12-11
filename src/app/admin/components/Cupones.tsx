'use client'
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineUserAdd } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { DELETE_CUPON } from '@/api/admin/mutations/DeleteCupon';
import { type Cupones } from '@/types/types';
// import { Agregarcupon } from '';

export function Cupones({ cupones }: { cupones: Cupones[] }) {

    const [deleteCupon] = useMutation(DELETE_CUPON);
    const [isopen, setIsOpen] = useState(false);

    const handleDelete = (codigo: string) => {
        deleteCupon({
            variables: { codigo: codigo },
        });
    };

    return (
        <>
            <table className="mx-auto w-1/2 text-center mb-10">
                <thead>
                    <tr>
                        <th className="text-center">
                            <button onClick={() => setIsOpen(!isopen)} className="bg-transparent border border-gray-500 p-2 rounded">
                                <AiOutlineUserAdd size="25px" />
                            </button>
                        </th>
                        <th className="text-center">Codigo</th>
                        <th className="text-center">Descuento</th>
                        <th className="text-center">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {cupones.map((cupon, index) => (
                        <tr key={index}>
                            <td className="text-center">{index}</td>
                            <td className="text-center">{cupon.codigo}</td>
                            <td className="text-center">{cupon.cantidad_descuento}</td>
                            <td className="text-center">
                                <button onClick={() => handleDelete(cupon.codigo)} className="bg-transparent border-none">
                                    <AiOutlineDelete size="25px" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
