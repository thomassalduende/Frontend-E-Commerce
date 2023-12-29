import { type Categorys } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';


export function Category({ category }: { category: Categorys }) {
    return (
        <Link href={`/categorias/${category.nombre}`} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg lg:mt-[90px] hover:border border-black transform transition duration-250 hover:scale-105 hover:rotate-0.5">
            <div className="relative">
                {/* <img className="w-full h-40 object-cover" src={category.url_imagen} alt="" /> */}
                <Image src={category.url_imagen} alt='' width={300} height={300} className='w-full h-40 object-cover' />
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white py-2">
                    <h5 className="text-center font-serif text-lg">{category.nombre}</h5>
                </div>
            </div>
        </Link>
    );
}


