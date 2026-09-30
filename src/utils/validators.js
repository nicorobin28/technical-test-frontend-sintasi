/**
 * Rule validasi Quasar (`:rules`) yang bisa dipakai ulang.
 * Setiap fungsi mengembalikan `true` bila valid, atau pesan error.
 */

export const required = (label) => (value) => !!value || `${label} wajib diisi`;

export const nik16 = (value) => /^\d{16}$/.test(value) || "NIK harus 16 digit";

export const email = (value) => /.+@.+\..+/.test(value) || "Email tidak valid";

/** Rule khusus form pendaftaran pasien. */
export const patientRules = {
  nik: [required("NIK"), nik16],
  name: [required("Nama")],
  email: [email],
};

/** Rule khusus form login. */
export const loginRules = {
  username: [required("Username")],
  password: [required("Password")],
};
