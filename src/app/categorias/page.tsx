'use client'
import { GET_CATEGORY } from '@/api/querys/getCategorias'
import { Category } from "@/components/Categorys";
import { type Categorys } from "@/types/types";
import { useQuery } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Categorias() {

    const { data, loading } = useQuery(GET_CATEGORY)
    return (
        <section className="w-full mb-[230px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            {loading
                ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
                : data && data.getGeneros.genero.map((categorie: Categorys) => (
                    <Category key={categorie.nombre} category={categorie} />
                ))
            }
        </section>
    );
}

