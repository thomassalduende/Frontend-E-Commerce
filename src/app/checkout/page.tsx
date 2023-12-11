'use client'
import { BiRightArrowAlt } from 'react-icons/bi';
import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { useUser } from '@/context/user/user';
import { useCart } from '@/context/carrito/cart';
import { POST_CART } from '@/api/mutations/postCart'
import { POST_CUPON } from '@/api/mutations/postCupon'
import Link from 'next/link';
import { CartItem } from '@/components/CartItem';
import Swal from 'sweetalert2';


export default function Cart() {
    const [insertCart] = useMutation(POST_CART);
    const { token } = useUser();
    const form = useRef(null);
    const [insertCupon, { data }] = useMutation(POST_CUPON);
    const { cart } = useCart();

    // Calcula la cantidad total de libros en el carrito
    const handleCantidadLibros = () => {
        const reducer = (accumulator: number, currentValue: any) => accumulator + currentValue.quantity;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    // Inserta el cupón
    const handleSubmitCupon = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.current) {
            const formData = new FormData(form.current);
            const buyer = {
                cupon: formData.get('cupon'),
            };

            insertCupon({
                variables: { codigo: buyer.cupon, tokenUser: token },
            })
                .then(() => Swal.fire({
                    timer: 2500,
                    title: 'Cupon agregado correctamente',
                    icon: 'success'
                }))
                .catch(() => Swal.fire({
                    timer: 2500,
                    title: 'El cupon no existe, ingrese nuevamente',
                    icon: 'error'
                }))
        }
    };

    // Calcula el total a pagar
    const handleSumTotal = () => {
        const reducer = (accumulator: number, currentValue: any) =>
            accumulator + (currentValue.precio - (currentValue.precio * currentValue.descuento) / 100) * currentValue.quantity;
        const sum = cart.reduce(reducer, 0);
        const total = data && data.agregarCupon.cupon[0].cantidad_descuento !== 0 ? sum - (sum * data.agregarCupon.cupon[0].cantidad_descuento / 100) : sum;
        return total.toFixed(2);
    };

    // Maneja la inserción de los libros en el carrito de la base de datos
    const handleCart = async () => {
        try {
            const promises = cart.map((product) =>
                insertCart({
                    variables: { isbn: product.isbn, cantidad: product.quantity, tokenUser: token },
                })
            );
            await Promise.all(promises);
        } catch (error) {
            console.error('Error al agregar libros al carrito de la base de datos:', error);
        }
    };

    return (
        <aside className='p-4'>
            <ul className='divide-y divide-gray-200'>
                {cart.map((product) => (
                    <CartItem key={product.isbn} product={product} />
                ))}
            </ul>
            <hr className='my-2' />
            {cart.length > 0 ? (
                <div className='p-4 bg-white rounded shadow'>
                    <h4 className='text-lg font-semibold'>Cantidad de libros {handleCantidadLibros()}</h4>
                    <div className='flex justify-between items-center my-2'>
                        <h5 className='text-lg'>Total:</h5>
                        <h5 className='font-bold text-lg'>$ {handleSumTotal()}</h5>
                    </div>
                    <form ref={form} onSubmit={handleSubmitCupon} className='flex items-center'>
                        <BiRightArrowAlt className='text-gray-500 mr-2' size='12px' />
                        <input type="text" placeholder='Cupon de descuento' name='cupon' className='border border-gray-300 rounded px-2 py-1' />
                        <button className='ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>Agregar</button>
                    </form>
                    <Link href='/book/information' className='block mt-4'>
                        <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600' onClick={handleCart}>Continuar Pedido</button>
                    </Link>
                </div>
            ) : (
                <Link href={'/'}><h5 className='h-80 text-red-500 flex items-center justify-center mt-[80px]'>No hay libros en tu carrito! Ve a comprar.</h5> </Link>
            )}
        </aside>
    );
}
