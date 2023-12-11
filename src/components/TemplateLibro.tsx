import { useCart } from "@/context/carrito/cart"
import { useCartCount } from "@/context/carrito/countCart"
import { useUser } from "@/context/user/user"
import { type CartItem, type Producto } from "@/types/types"
import { ChangeEvent } from "react"
import Swal from "sweetalert2"
import { ButtonFavoritos } from "./ButtonFavoritos"
import { StartsBook } from "./StartsBook"

export function TemprateLibro({ product }: { product: Producto[] }) {
    const { isAuth } = useUser();
    const { cart, addToCart } = useCart()

    const isProductInCart = cart.some((item: CartItem) => item.isbn === product[0].isbn) // si el product esta en cart
    const noAddToCart = () => {
        isProductInCart &&
            Swal.fire({
                title: 'El producto ya se encuentra en el carrito!',
                timer: 2500,
                icon: 'error'
            })

    }
    const { setCount } = useCartCount()

    const handleNotify = () => {
        Swal.fire({
            title: 'Producto agregado al carrito!',
            timer: 2500,
            icon: 'success'
        })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setCount(parseInt(newValue));
    };

    const handleClick = () => {
        isAuth ?
            isProductInCart
                ? noAddToCart()
                : <>
                    {addToCart(product[0])}
                    {handleNotify()}
                </>
            : Swal.fire({
                title: 'Debe iniciar sesion para ingresar productos al carrito',
                timer: 2500,
                icon: 'error'
            })
    }

    return (
        <div>
            <div className='grid md:grid-cols-2 gap-8 p-6 md:mx-auto md:w-3/4 bg-white shadow-lg rounded-lg'>
                <img className='mt-[65px] w-full h-auto md:w-64 md:h-auto object-cover rounded' src={product[0].url_imagen} alt="" />
                <div className='md:px-6'>

                    <h3 className='mt-[65px] text-3xl font-semibold mb-4'>{product[0].nombre}</h3>
                    <ButtonFavoritos isbn={product[0].isbn} />
                    <StartsBook isbn={product[0].isbn} />
                    <p className='text-lg mb-2'>{product[0].autor[0].nombre}</p>

                    {product[0].descuento === 0 ? (
                        <strong className='text-2xl text-gray-800'>$ {product[0].precio}</strong>
                    ) : (
                        <>
                            <p className='text-red-500 text-lg'>
                                <span className='line-through'>$ {product[0].precio}</span>
                                <br />
                                <span>{product[0].descuento}% OFF</span>
                            </p>
                            <strong className='text-2xl text-gray-800'>$ {product[0].precio - (product[0].precio * product[0].descuento / 100)}</strong>
                        </>
                    )}

                    <hr className='my-6 border-gray-300' />
                    <strong className='text-lg'>Descripción</strong>
                    <p className='text-gray-700 mb-4'>{product[0].descripcion}</p>
                    <p className='text-gray-700'>ISBN: {product[0].isbn}</p>
                    <p className='text-gray-700'>Editorial: {product[0].editorial.nombre}</p>
                    {product[0].genero.length > 0 ? (
                        <p className='text-gray-700'>Categoría: {product[0].genero[0].nombre}</p>
                    ) : (
                        <p className='text-gray-700'>Categoría: Sin género</p>
                    )}
                    <p className='text-gray-700'>Stock disponible: {product[0].stock}</p>

                    <button
                        className='mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'
                        onClick={handleClick}
                    >
                        Agregar al carrito
                    </button>

                    <input
                        className='input-cantidad ml-4 text-center py-1 px-2 border rounded border-gray-400'
                        defaultValue="1"
                        onChange={handleInputChange}
                        type="number"
                        min='1'
                        max={product[0].stock}
                    />
                </div>
            </div>

            <hr className='my-8 border-t border-gray-300' />
            <div className='grid place-items-center'>
                {/* Aquí irían los componentes relacionados con comentarios */}
            </div>
        </div>
    )
}