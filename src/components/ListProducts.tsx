import { Product } from './Product';
import { type Producto } from '@/types/types';


const ListOfProducts = ({ productos }: { productos: Producto[] }) => {


    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {productos && productos.map((item) => (
                <Product key={item.isbn} product={item} />
            ))}
        </section>
    );
}

export default ListOfProducts;
