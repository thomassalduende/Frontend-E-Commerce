'use client'
import { Ventas } from '@/types/types';
import React, { useState, useMemo } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function Ventas({ ventas, loading }: { ventas: Ventas[], loading: boolean }) {

    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<boolean>(false);

    const handleSort = () => {
        setSort(!sort);
    };

    const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
    };


    const results = search ? ventas.filter((venta) => venta.fecha.includes(search)) : ventas;

    const sortedProducts = useMemo(() => {
        return sort ? [...results].sort((a, b) => a.fecha.localeCompare(b.fecha)) : results;
    }, [sort, results]);

    return (
        <>
            {loading ? (
                <AiOutlineLoading3Quarters className="m-auto mt-12 mb-20" size="32px" />
            ) : (
                <>
                    {sortedProducts.length < 1 ? (
                        <p className="text-red-500 text-center mt-10">No cuentas con ventas todavía</p>
                    ) : (
                        <>
                            <input
                                className="m-auto mt-5 w-1/4 text-center h-10 rounded-lg"
                                value={search}
                                onChange={hanldeChange}
                                type="text"
                                placeholder="INGRESE FECHA (dd/mm/aa)"
                            />
                            <table className="m-auto mt-5 w-1/2">
                                <thead>
                                    <tr>
                                        <th className="flex items-center">
                                            <input
                                                className="mr-2 cursor-pointer"
                                                type="checkbox"
                                                onChange={handleSort}
                                                checked={sort}
                                            />
                                            Fecha
                                        </th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.fecha}</td>
                                            {/* Accedemos al primer elemento de factura_detalle */}
                                            <td>{product.factura_detalle.book.nombre}</td>
                                            <td>{product.factura_detalle.cantidad}</td>
                                            <td>{product.monto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}
        </>
    );
}
