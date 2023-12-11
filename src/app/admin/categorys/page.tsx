'use client'
import { useState } from 'react';
import { useQuery } from "@apollo/client"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Category } from '@/app/admin/components/Category';
import { GET_CATEGORY } from '@/api/querys/getCategorias';
import { type Categorys, } from '@/types/types';
import Link from 'next/link';

export default function CategoryPage() {
    const { data, loading } = useQuery(GET_CATEGORY)

    return (
        <>
            <Link href={'/admin/categorys/newcategory'}>
                <button className="ml-[45%] mt-4 md:mt-10  md:w-40 h-10 bg-purple-600 rounded-md border border-purple-700 text-white ">
                    Agregar categoría
                </button>
            </Link>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 ml-0 md:ml-10 mt-4 md:mt-0">
                {loading
                    ? <AiOutlineLoading3Quarters className="m-auto mt-10" size='32px' />
                    : data && data.getGeneros.genero.map((categoria: Categorys) => (
                        <div key={categoria.nombre} className="w-full md:min-w-240px">
                            <Category category={categoria} />
                        </div>
                    ))
                }
            </section>
        </>
    )
}
