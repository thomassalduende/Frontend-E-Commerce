'use client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useQuery } from '@apollo/client';
import { GET_CUPON } from '@/api/admin/querys/getCupon'; // Asegúrate de importar la ruta correcta
import { Cupones } from '../components/Cupones';
import Link from 'next/link';

export default function CuponesPage() {
    const { data, loading } = useQuery(GET_CUPON);

    return (
        <>
            <Link href={'/admin/cupons/newcupon'}>
                <button className="ml-[45%] mt-4 md:mt-10  md:w-40 h-10 bg-purple-600 rounded-md border border-purple-700 text-white ">
                    Agregar cupon
                </button>
            </Link>
            {loading ? (
                <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
            ) : (
                data && data.getCupones.cupon.length > 0 ? (
                    <Cupones cupones={data.getCupones.cupon} />
                ) : (
                    <div className="text-center mt-10 text-red-600">
                        <p>No hay cupones registrados.</p>
                    </div>
                )
            )}
        </>
    );
}
