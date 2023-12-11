'use client'
import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DATA_USER } from '@/api/mutations/postDataUser';
import { GET_INFORMATION } from '@/api/querys/getInformation';
import { POST_COMPRA } from '@/api/mutations/postCompra';
import { DELETE_CART } from '@/api/mutations/deleteCart';
import { useUser } from '@/context/user/user';
import { useCart } from '@/context/carrito/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Province {
    name: string;
    abbreviation: string;
}

export default function Information(): JSX.Element {
    const { token } = useUser()
    const form = useRef<HTMLFormElement>(null);
    const { cart } = useCart();
    const router = useRouter();
    // console.log(token)

    const [deleteCart] = useMutation(DELETE_CART);
    const [realizarCompra, { data: dataCompra }] = useMutation(POST_COMPRA);

    const [dataUser] = useMutation(DATA_USER);
    const { data } = useQuery(GET_INFORMATION, {
        variables: { tokenUser: token },
    });
    const [selectedProvince, setSelectedProvince] = useState<string>(' ');
    const [error, setError] = useState<string>('');

    const provinces: Province[] = [
        { name: 'Buenos Aires', abbreviation: 'BA' },
        { name: 'Catamarca', abbreviation: 'CT' },
        { name: 'Chaco', abbreviation: 'CH' },
        { name: 'Chubut', abbreviation: 'CHU' },
        { name: 'Córdoba', abbreviation: 'CO' },
        { name: 'Corrientes', abbreviation: 'CR' },
        { name: 'Entre Ríos', abbreviation: 'ER' },
        { name: 'Formosa', abbreviation: 'FO' },
        { name: 'Jujuy', abbreviation: 'JU' },
        { name: 'La Pampa', abbreviation: 'LP' },
        { name: 'La Rioja', abbreviation: 'LR' },
        { name: 'Mendoza', abbreviation: 'MZ' },
        { name: 'Misiones', abbreviation: 'MI' },
        { name: 'Neuquén', abbreviation: 'NQ' },
        { name: 'Río Negro', abbreviation: 'RN' },
        { name: 'Salta', abbreviation: 'SA' },
        { name: 'San Juan', abbreviation: 'SJ' },
        { name: 'San Luis', abbreviation: 'SL' },
        { name: 'Santa Cruz', abbreviation: 'SC' },
        { name: 'Santa Fe', abbreviation: 'SF' },
        { name: 'Santiago del Estero', abbreviation: 'SE' },
        { name: 'Tierra del Fuego', abbreviation: 'TF' },
        { name: 'Tucumán', abbreviation: 'TU' },
    ];

    const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedProvince(event.target.value);
    };

    const hanldeSumbitInfo = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (form.current) {
            const formData = new FormData(form.current);

            if (
                formData.get('name') !== '' &&
                formData.get('address') !== '' &&
                formData.get('dni') !== '' &&
                formData.get('cp') !== '' &&
                formData.get('phone') !== '' &&
                formData.get('info') !== '' &&
                formData.get('ciudad') !== '' &&
                selectedProvince !== 'Seleccione una provincia' &&
                selectedProvince !== ' '
            ) {
                const buyer = {
                    name: formData.get('name'),
                    address: formData.get('address'),
                    dni: formData.get('dni'),
                    cp: formData.get('cp'),
                    phone: formData.get('phone'),
                    info: formData.get('info'),
                    ciudad: formData.get('ciudad'),
                };

                dataUser({
                    variables: {
                        tokenUser: token,
                        nombre: buyer.name,
                        dni: buyer.dni,
                        direccion: buyer.address,
                        nombreCiudad: buyer.ciudad,
                        nombreProv: selectedProvince,
                        agregarInfo: buyer.info,
                        telefono: buyer.phone,
                        codPostal: buyer.cp,
                    },
                })
                    .then(null)
                    .catch((error) => console.log(error.message));
            } else {
                setError('Por favor, complete todos los campos.');
            }
        }
    };

    const handleDeleteCart = async (): Promise<void> => {
        try {
            const promises = cart.map((product) =>
                deleteCart({
                    variables: { isbn: product.isbn, tokenUser: token },
                })
            );
            await Promise.all(promises);
        } catch (error) {
            console.log('error');
        }
    };

    // console.log(dataCompra)
    const handleRefresh = (): void => {
        setTimeout(() => {
            if (dataCompra) {
                window.location.href = dataCompra.realizarCompra.init_p;
            }
        }, 1800);
    };

    const handleSubmitPago = (): void => {
        realizarCompra({
            variables: { tokenUser: token },
        })
            .then(handleRefresh)
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="flex justify-center items-center ">
            <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg'>
                <h5 className="text-lg font-bold">Complete con sus datos de envío:</h5>
                <div className="mt-4">
                    <form ref={form} onSubmit={hanldeSumbitInfo}>
                        <label className="font-bold block mb-1">Nombre</label>
                        <input
                            defaultValue={data && data.LoginUser.user.nombre}
                            type="text"
                            placeholder="Nombre completo"
                            name="name"
                            className="border rounded-md p-2 mb-2 w-full"
                        />

                        <label className="font-bold block mb-1">DNI</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.dni}
                            type="text"
                            placeholder="DNI"
                            name="dni"
                            className="border rounded-md p-2 mb-2 w-full"
                        />
                        <label className='font-bold block mb-1'>Direccion</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.direccion}
                            type="text"
                            placeholder="Direccion"
                            name="address"
                            className="border rounded-md p-2 mb-2 w-full"
                        />
                        <label className='font-bold block mb-1'>Ciudad</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.ciudad.nombre}
                            type="text"
                            placeholder="ciudad"
                            name="ciudad"
                            className="border rounded-md p-2 mb-2 w-full"
                        />

                        <label className='font-bold block mb-1'>Provincia</label>
                        <select
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            name="province"
                            id="province"
                            className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
                        >
                            <option>Seleccione una provincia</option>
                            {provinces.map((province) => (
                                <option key={province.abbreviation} value={province.name}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

                        <label className='font-bold block mb-1'>Codigo Postal</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.ciudad.cod_postal}
                            type="text"
                            placeholder="Codigo postal"
                            name="cp"
                            className="border rounded-md p-2 mb-2 w-full"
                        />
                        <label className='font-bold block mb-1'>Telefono</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.telefono}
                            type="text"
                            placeholder="Telefono"
                            name="phone"
                            className="border rounded-md p-2 mb-2 w-full"
                        />
                        <label className='font-bold block mb-1'>Info adicional</label>
                        <input
                            defaultValue={data && data.LoginUser.user.direccion.AgregarInfo}
                            type="text"
                            placeholder="Info"
                            name="info"
                            className="border rounded-md p-2 mb-2 w-full"
                        />

                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            onClick={handleSubmitPago}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Pagar
                        </button>
                    </form>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleDeleteCart}
                        className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        <Link href={'/checkout'}>
                            Regresar
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
