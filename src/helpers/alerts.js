import Swal from "sweetalert2";

export const simpleSuccessAlert = (title, message) => (
  Swal.fire(title, message, 'success')
);

export const simpleErrorAlert = (title, message) => (
  Swal.fire(title, message, 'error')
);