'use client'
import ListOfProducts from "@/components/ListProducts";
import { GET_PRODUCTOS } from '@/api/querys/getBook';
import { useQuery } from "@apollo/client";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Home() {


  const { data, loading } = useQuery(GET_PRODUCTOS)

  return (
    loading
      ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
      : data && <ListOfProducts productos={data.getBook.book} />
  )
}
