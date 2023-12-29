import Image from "next/image";
import Link from "next/link";
import { type Producto } from "@/types/types";

export function Product({ product }: { product: Producto }) {

    const discountedPrice = (product.precio - (product.precio * product.descuento / 100)).toFixed(2);

    return (
        <div className='w-[290px] h-[460px] bg-white rounded-lg shadow-md overflow-hidden m-5 hover:border border-black transform transition duration-250 hover:scale-105 hover:rotate-0.5'>
            <Link href={`/book/${product.isbn}`}>
                <div className='block'>
                    <div className='h-[270px] relative overflow-hidden'>
                        <Image
                            className="mx-auto mt-1 rounded"
                            src={product.url_imagen}
                            alt={product.nombre}
                            width={170}
                            height={170}
                            objectFit="cover"
                        />
                    </div>
                    <div className='p-4 ml-2'>
                        <p className='text-xl font-semibold mb-2 line-clamp-2'>{product.nombre}</p>
                        <p className='text-gray-600 mb-4'>by {product.autor[0].nombre}</p>
                        {product.descuento === 0 ? (
                            <p className='text-lg font-bold'>$ {product.precio}</p>
                        ) : (
                            <div>
                                <p className='text-gray-500 line-through mb-2'>$ {product.precio},00</p>
                                <div className='flex items-center mb-2'>
                                    <p className='text-lg font-bold'>
                                        $ {parseFloat(discountedPrice).toFixed(2)}
                                    </p>
                                    <span className='ml-2 text-green-500'>{product.descuento}% OFF</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
