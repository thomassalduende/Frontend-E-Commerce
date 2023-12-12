'use client'
import { Productos } from '@/app/admin/components/Productos'
import { useQuery } from "@apollo/client";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSearchParams } from "next/navigation";
import { withProductSearch } from '@/api/querys/withProductSearch'

export function ListProducts() {

    const searchParams = useSearchParams();

    let search = searchParams.get('query')

    if (search === null) {
        search = ''
    }

    const { data, loading } = useQuery(withProductSearch, {
        variables: { nombre: search, isbn: search, genero: search, autor: search }
    })

    return (
        <> {
            loading
                ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
                : data && <Productos products={data?.busquedaLibros.book} loading={loading} />
        }
        </>
    )
}
