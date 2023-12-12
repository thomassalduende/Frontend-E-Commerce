'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMENTARIOS } from '@/api/querys/getComentarios'
import { Comentarios } from '../components/Comentarios'
import { type Comentario } from '@/types/types'

export function ComentariosList({ isbn }: { isbn: string }) {

    const { data } = useQuery(GET_COMENTARIOS, {
        variables: { isbn: isbn }
    })

    return (
        data && data.getBook.book[0].opiniones.map((comentario: Comentario, index: number) => (
            <Comentarios key={index} comentario={comentario} isbn={isbn} />
        ))
    )
}