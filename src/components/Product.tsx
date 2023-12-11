import { type Producto } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export function Product({ product }: { product: Producto }) {

    const discountedPrice = (product.precio - (product.precio * product.descuento / 100)).toFixed(2);

    return (
        <div className='w-[270px] h-[400px] bg-white rounded-lg shadow-md overflow-hidden m-5 hover:border border-black transform transition duration-250 hover:scale-105 hover:rotate-0.5'>
            <Link href={`/book/${product.isbn}`}>
                <div className='block'>
                    <img src={product.url_imagen} alt={product.nombre} className='w-full h-48 object-cover ' />
                    <div className='p-4'>
                        <p className='text-xl font-semibold mb-2'>{product.nombre}</p>
                        <p className='text-gray-600 mb-4'>by {product.autor[0].nombre}</p>
                        {product.descuento === 0 ? (
                            <p className='text-lg font-bold'>$ {product.precio}</p>
                        ) : (
                            <div>
                                <p className='text-gray-500 line-through mb-2'>$ {product.precio}</p>
                                <div className='flex items-center mb-2'>
                                    <span className='text-red-600 font-bold'>{product.descuento}% OFF</span>
                                    <p className='ml-2 text-lg font-bold'>
                                        $ {parseFloat(discountedPrice).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
