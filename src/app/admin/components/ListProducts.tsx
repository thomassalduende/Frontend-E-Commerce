'use client'
import { Productos } from '@/app/admin/components/Productos'
import { GET_PRODUCTOS } from '@/api/querys/getBook';
import { useQuery } from "@apollo/client";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function ListProducts() {

    const { data, loading } = useQuery(GET_PRODUCTOS)
    return (
        <> {
            loading
                ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
                : data && <Productos products={data.getBook.book} loading={loading} />
        }
        </>
    )
}
