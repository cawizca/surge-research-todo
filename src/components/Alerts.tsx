import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const AlertBox = (type: any, message: any) => {
  return MySwal.fire({
    position: 'center',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const ConfirmBox = (type: any, message: any) => {
  return MySwal.fire({
    position: 'center',
    icon: type,
    title: message,
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });
};
