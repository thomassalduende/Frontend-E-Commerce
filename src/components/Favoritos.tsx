import { type Producto } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export function Favoritos({ product }: { product: Producto }) {
    return (
        <div className='w-64 h-80 shadow-md overflow-hidden m-5 transition-all duration-250 bg-white transform hover:border hover:border-black hover:scale-100 hover:cursor-pointer hover:rotate-0'>
            <Link href={`/book/${product.isbn}`}>
                <Image height={200} width={200} src={product.url_imagen} alt={product.nombre} className='w-[60%] mx-auto mt-5 object-cover' />
                <div className='text-center mt-5'>
                    <p className='text-base font-bold'>{product.nombre}</p>
                </div>
            </Link>
        </div>
    )
}
