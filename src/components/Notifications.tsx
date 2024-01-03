import { useUser } from "@/context/user/user";
import Image from "next/image";

interface NotificationsProps {
    isNotification: boolean;

}
export function Notifications({ isNotification }: NotificationsProps) {

    const { isAuth } = useUser();
    return (
        <div className="absolute">
            <div

                className={`w-[27%] h-[140px] fixed top-[90px] left-[780px] rounded z-30 m-auto overflow-hidden ${isNotification ? 'bg-zinc-200' : ''}`}
            >
                <div className={`w-full max-w-screen-xl h-full relative flex flex-col m-auto transition-transform ${isNotification ? "translate-y-0" : "pointer-events-none -translate-y-12"}`}>
                    {isNotification && (
                        <> {isAuth ? (
                            <>
                                <h3 className="font-semibold px-4 mt-2">Notificaciones</h3>
                                <hr className='my-2 border-gray-300' />
                                <div className="flex items-center mt-3">
                                    <Image
                                        width={60}
                                        height={60}
                                        src="https://w7.pngwing.com/pngs/36/932/png-transparent-harry-potter-and-the-chamber-of-secrets-pottermore-book-green-harry-potter-and-the-chamber-of-secrets-label-fm-book.png"
                                        alt="Libro"
                                        className="w-[60px] h-[60px] rounded-full mr-2"
                                    />
                                    <div>
                                        <p className="font-semibold">Libro Entregado</p>
                                        <p>Harry Potter y la Piedra Filosofal</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="font-semibold px-4 mt-4">Algo salió mal...</h3>
                                <p className="px-4 mt-2">Por favor, inicia sesión para ver tus notificaciones.</p>
                            </>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
