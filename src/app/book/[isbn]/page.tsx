'use client'
import { GET_PRODUCT_ISBN } from '@/api/querys/getBook';
import { useQuery } from '@apollo/client';
import { TemprateLibro } from '@/components/TemplateLibro';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function BookISBN({ params: { isbn } }: { params: { isbn: string } }) {

    const { data, loading } = useQuery(GET_PRODUCT_ISBN, {
        variables: { isbn }
    })

    return (
        loading
            ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
            : data && <TemprateLibro product={data.getBook.book} />
    );
}
