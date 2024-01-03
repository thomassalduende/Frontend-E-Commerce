'use client'
import { FaTrash } from 'react-icons/fa';
import { DELETE_CART } from '@/api/mutations/deleteCart'
import { Producto } from '@/types/types';
import { useUser } from '@/context/user/user';
import { useCart } from '@/context/carrito/cart';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Image from 'next/image';

export function CartItem({ product }: { product: Producto }) {

    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const { token } = useUser()
    const [deleteCart] = useMutation(DELETE_CART);

    const handleDeleteCart = async () => {
        try {
            const promises = cart.map((product) =>
                deleteCart({
                    variables: { isbn: product.isbn, tokenUser: token },
                })
                    .then(() => Swal.fire({
                        timer: 2500,
                        title: 'Producto eliminado correctamente',
                        icon: 'success'
                    }))
                    .catch(() => Swal.fire({
                        timer: 2500,
                        title: 'No se ha podido eliminar el producto, intente mas tarde!',
                        icon: 'error'
                    }))
            );
            await Promise.all(promises);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
                <Image width={80} height={80} src={product.url_imagen} alt="" className="w-20 h-20 object-cover rounded" />
                <div>
                    <h3 className="font-semibold">{product.nombre}</h3>
                    <p className="text-gray-600">{product.autor[0].nombre}</p>
                    {product.descuento === 0 ? (
                        <strong className="block">$ {product.precio}</strong>
                    ) : (
                        <>
                            <p className="text-sm">
                                <span className="line-through">$ {product.precio}</span>
                                <br />
                                <span className="inline-block text-red-500">{product.descuento}% OFF</span>
                            </p>
                            <p className="font-semibold">
                                $ {(product.precio - (product.precio * product.descuento) / 100).toFixed(2)}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2" onClick={() => addToCart(product)}>+</button>
                <p>{product.quantity}</p>
                <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2" onClick={() => clearCart(product)}>-</button>
                <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2" onClick={() => { removeFromCart(product); handleDeleteCart(); }}>
                    <FaTrash size='20px' />
                </button>
            </div>
        </div>
    );
}