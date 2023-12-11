'use client'
import { Ventas } from '@/app/admin/components/Ventas'
import { useQuery } from '@apollo/client'
import { GET_VENTAS } from '@/api/admin/querys/getVentas'

export default function PageVentas() {
    const { data, loading } = useQuery(GET_VENTAS)

    return (
        data && <Ventas ventas={data.getFactura.factura} loading={loading} />
    )
}