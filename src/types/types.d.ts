export interface Producto {
    quantity: number;
    nombre: string;
    isbn: string;
    url_imagen: string;
    precio: number;
    stock: number;
    descuento: number;
    descripcion: string;
    editorial: {
        nombre: string;
    }
    genero: {
        nombre: string;
    }[]
    autor: {
        nombre: string;
    }[]
}

export interface Categorys {
    id_genero: number;
    nombre: string;
    url_imagen: string;
}

export interface GeneroLibro {
    isbn: string;
    id_genero: number;
}

export interface CartItem {
    isbn: string;
    quantity: number;
}

export interface Ventas {
    fecha: string
    monto: number
    factura_detalle: {
        cantidad: number
        precio: number
        book: {
            nombre: string
        }
    }
}

export interface Cupones {
    codigo: string
    cantidad_descuento: string
}

export interface User {
    nombre: string;
    email: string;
}

export interface Favorito {
    books: {
        quantity: number;
        nombre: string;
        isbn: string;
        url_imagen: string;
        precio: number;
        stock: number;
        descuento: number;
        descripcion: string;
        editorial: {
            nombre: string;
        }
        genero: {
            nombre: string;
        }[]
        autor: {
            nombre: string;
        }[]
    }
}

export interface Comentario {
    opinion: string
    nombre_user: string
    users: {
        id: string
    }
}

import * as React from "react";

interface StarRatingComponentProps {
    /** name of the radio input */
    name: string;

    /** the value of the star rating to display. i.e. the number of filled stars */
    value: number;

    /** number of icons in rating, default `5` */
    starCount?: number | undefined;

    onStarClick?: ((nextValue: number, prevValue: number, name: string) => void) | undefined;

    onStarHover?: ((nextValue: number, prevValue: number, name: string) => void) | undefined;

    onStarHoverOut?: ((nextValue: number, prevValue: number, name: string) => void) | undefined;

    /** render method for the full-star icon */
    renderStarIcon?:
    | ((
        nextValue: number,
        prevValue: number,
        name: string,
    ) => React.ReactNode | string)
    | undefined;

    /** render method for the half-star icon */
    renderStarIconHalf?:
    | ((
        nextValue: number,
        prevValue: number,
        name: string,
    ) => React.ReactNode | string)
    | undefined;

    /** color of selected icons */
    starColor?: string | undefined;

    /** color of non-selected icons */
    emptyStarColor?: string | undefined;

    /** is component available for editing, default `true` */
    editing?: boolean | undefined;
}

declare class StarRatingComponent extends React.Component<
    StarRatingComponentProps
> { }

export = StarRatingComponent;

