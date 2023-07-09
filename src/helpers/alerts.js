import Swal from "sweetalert2";

export const simpleSuccessAlert = (title, message) => (
  Swal.fire(title, message, 'success')
);

export const simpleErrorAlert = (title, message) => (
  Swal.fire(title, message, 'error')
);

export const deleteAlert = () => new Promise((resolve) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      resolve();
    }
  });
});