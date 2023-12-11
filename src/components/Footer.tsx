
export function Footer() {

    return (
        <footer className="foot grid grid-cols-1 justify-items-center mt-12 pt-6 pb-6 md:grid-cols-3 md:justify-items-center text-white bg-black relative z-50">
            <div className="desarrollo text-center md:text-left md:pl-6">
                <h3 className="text-lg font-bold mb-2">Equipo de desarrollo</h3>
                <p>Bua Enzo -- Frontend</p>
                <p>Blanchet Nazareno -- Backend</p>
                <p>Salduende Thomas -- Backend</p>
            </div>
            <div className="enlaces-utiles text-center md:text-left md:pl-6">
                <h3 className="text-lg font-bold mb-2">Enlaces Útiles</h3>
                <p>Sobre nosotros</p>
                <p>Políticas de uso</p>
                <p className="contactate cursor-pointer">Contáctate con nosotros</p>
            </div>
            <div className="informacion text-center md:text-left md:pl-6">
                <h3 className="text-lg font-bold mb-2">Información de Contacto</h3>
                <p>Email: libros@example.com</p>
                <p>Dirección: Sarmiento 111</p>
                <p>Teléfono: 11-444444</p>
            </div>
        </footer>
    );
}
