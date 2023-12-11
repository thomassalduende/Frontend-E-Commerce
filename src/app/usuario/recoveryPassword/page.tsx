'use client'
import { useMutation } from '@apollo/client';
import React, { useRef } from 'react';
import { UPDATE_PASSWORD } from '@/api/mutations/updatePassword';
import { AiOutlineClose } from 'react-icons/ai';
import { useUser } from '@/context/user/user';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function RecoveyPassword() {
  const [updatePassword, { data }] = useMutation(UPDATE_PASSWORD);
  const form = useRef<HTMLFormElement>(null);
  const { token } = useUser()
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.current) {

      const formData = new FormData(form.current);
      const buyer = {
        password: formData.get('password')
      };
      updatePassword({
        variables: { tokenUser: token, password: buyer.password }
      })
        .then(() => {
          Swal.fire({
            timer: 2000,
            icon: 'success',
            title: 'Contraseña modificada con exito'
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  }

  const handleRefresh = () => {
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <div className="Information bg-gray-200 p-4 rounded-lg shadow-md">
      {data && data.updateUser && handleRefresh()}
      <button
        className="float-right text-white"
      >
        <AiOutlineClose size="22px" />
      </button>
      <h5 className="text-lg font-semibold mb-4">Cambiar contraseña</h5>
      <div className="Information-form">
        <form ref={form}>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese contraseña"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <button
            className="ml-7 mx-auto bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mr-4"
            type="button"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
          <button
            className="mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Cambiar
          </button>
        </form>
      </div>
    </div>
  );
}
