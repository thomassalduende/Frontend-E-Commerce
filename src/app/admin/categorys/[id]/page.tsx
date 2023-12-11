'use client'
import { useQuery } from '@apollo/client';
import { GET_GENERO_ID } from '@/api/admin/querys/getGeneroId';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FormEditCategory } from '../../components/FormEditCategory';

export default function Category({ params: { id } }: { params: { id: string } }) {

    const { data, loading } = useQuery(GET_GENERO_ID, {
        variables: { getGeneroIdId: id }
    })

    return (
        loading
            ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
            : data && <FormEditCategory category={data.getGeneroId.genero} />
    );
}
