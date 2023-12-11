'use client'
import { useMutation, useQuery } from '@apollo/client';
import { POST_VALORACION } from '@/api/mutations/postValoracion';
import { GET_VALORACION_USER } from '@/api/querys/getValoracionUser';
import { useUser } from '@/context/user/user';
import ReactStars from 'react-rating-star-with-type'

export function AddStartsBook({ isbn }: { isbn: string }) {

  const { isAuth, token } = useUser();
  const [insertValoracion] = useMutation(POST_VALORACION)
  const { data, loading } = useQuery(GET_VALORACION_USER, {
    skip: !isAuth,
    variables: { isbn: isbn, tokenUser: token }
  })

  const handleChange = (rating: any) => {

    insertValoracion({
      variables: { tokenUser: token, isbn: isbn, cantEstrellas: rating }
    })
  }

  const estrellas = Number(data && data.existValoracion.cantidad_estrellas)


  return (
    loading
      ? null
      : <ReactStars
        count={5}
        size={27}
        onChange={handleChange}
        activeColor="#ffd700"
        value={estrellas}
      />

  )
}