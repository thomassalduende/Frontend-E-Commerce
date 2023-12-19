import { Product } from './Product';
import { type Producto } from '@/types/types';


const ListOfProducts = ({ productos }: { productos: Producto[] }) => {


    return (
        <>
            <section className='w-full bg-gray-100 p-6 rounded-lg'>
                <h2 className="text-2xl font-bold ml-4">Listado de Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productos && productos.map((item) => (
                        <Product key={item.isbn} product={item} />
                    ))}
                </div>
                {
                    productos?.length === undefined && (
                        <h5 className="h-[85vh] w-full text-red-500 grid place-content-center mt-1">
                            ¡No hay ningún libro con ese nombre, continúa buscando!
                        </h5>
                    )
                }
            </section>
        </>

    );
}

export default ListOfProducts;
