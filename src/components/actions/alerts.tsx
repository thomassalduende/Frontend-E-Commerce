import Swal, { SweetAlertIcon } from "sweetalert2";

export const Alerta = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
        timer: 2000,
        title: title,
        icon: icon
    });
};
