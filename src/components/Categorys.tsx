import { type Categorys } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';


export function Category({ category }: { category: Categorys }) {
    return (
        <Link href={`/category/${category.nombre}`} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg lg:mt-[90px]">
            <div className="relative">
                <img className="w-full h-40 object-cover" src={category.url_imagen} alt="" />
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white py-2">
                    <h5 className="text-center font-serif text-lg">{category.nombre}</h5>
                </div>
            </div>
        </Link>
    );
}


