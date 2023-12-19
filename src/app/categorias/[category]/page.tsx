'use client'
import { useQuery } from "@apollo/client";
import { GET_BOOK_CATEGORY } from "@/api/querys/getBookCategory";
import { Product } from "@/components/Product";
import { type Producto } from "@/types/types";

export default function BookCategoryQuery({ params: { category } }: { params: { category: string } }) {

    const { data, loading } = useQuery(GET_BOOK_CATEGORY, {
        variables: { genero: category }
    })


    return (
        <>
            <section className='w-full bg-gray-100 p-6 rounded-lg'>
                <h2 className="text-2xl font-bold ml-4">Listado de Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data && data.getBook.book.map((item: Producto) => (
                        <Product key={item.isbn} product={item} />
                    ))}
                </div>
            </section>
        </>
    )
}
