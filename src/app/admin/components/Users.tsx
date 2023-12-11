'use client'
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineUserAdd } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { DELETE_USER_ADMIN } from '@/api/admin/mutations/DeleteUserAdmin';
import { type User } from '@/types/types';
import Link from 'next/link';


export const Users = ({ users }: { users: User[] }) => {
    const [deleteUserAdmin] = useMutation(DELETE_USER_ADMIN);

    const handleDelete = (email: string) => {
        deleteUserAdmin({
            variables: { email: email },
        });
    };

    return (
        <>
            <table className="mx-auto w-1/2 text-center mb-10">
                <thead>
                    <tr>
                        <th className="text-center">
                            <Link href={'/admin/usuarios/newadmin'}>
                                <button className="bg-transparent border border-gray-500 p-2 rounded">
                                    <AiOutlineUserAdd size="25px" />
                                </button>
                            </Link>
                        </th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="text-center">{index}</td>
                            <td className="text-center">{user.nombre}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">
                                <button onClick={() => handleDelete(user.email)} className="bg-transparent border-none">
                                    <AiOutlineDelete size="25px" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
