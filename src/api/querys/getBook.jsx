
import { gql } from '@apollo/client';

export const GET_PRODUCTOS = gql`
  query GetBook {
    getBook {
      book {
        nombre
        isbn
        url_imagen 
        precio
        stock
        descuento
        descripcion
        editorial {
          nombre
        }
        genero {
          nombre
        }
        autor {
          nombre
        }
              
      }
    }
  }`


export const GET_PRODUCT_ISBN = gql`
  query GetBook($isbn: String){
    getBook(isbn: $isbn) {
      book {
        nombre
        isbn
        url_imagen 
        precio
        stock
        descuento
        descripcion
        editorial {
          nombre
        }
        genero {
          nombre
        }
        autor {
          nombre
        }
              
      }
    }
  }`