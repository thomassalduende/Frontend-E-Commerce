'use client'
import ListOfProducts from "@/components/ListProducts";
import { useQuery } from "@apollo/client";
import { Suspense } from "react";
import { LoadingCardsList } from "@/components/suspense/ListBooks";
import { useSearchParams } from "next/navigation";
import { withProductSearch } from '@/api/querys/withProductSearch'

export default function Home() {

  const searchParams = useSearchParams();

  let search = searchParams.get('query')

  if (search === null) {
    search = ''
  }

  const { data } = useQuery(withProductSearch, {
    variables: { nombre: search, isbn: search, genero: search, autor: search }
  })

  return (
    <Suspense key={data?.length} fallback={<LoadingCardsList />}>
      <ListOfProducts productos={data?.busquedaLibros.book} />
    </Suspense>
  )
}
