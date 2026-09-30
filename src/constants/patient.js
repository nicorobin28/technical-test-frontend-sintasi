/** Konstanta domain Pasien (opsi select, label, kolom tabel). */

export const GENDER_OPTIONS = [
  { label: "Laki-laki", value: "male" },
  { label: "Perempuan", value: "female" },
];

export const GENDER_LABEL = {
  male: "Laki-laki",
  female: "Perempuan",
};

export function genderLabel(value) {
  return GENDER_LABEL[value] || "-";
}

export const PATIENT_COLUMNS = [
  {
    name: "no",
    label: "NO",
    field: "no",
    align: "center",
    style: "width: 50px",
  },
  {
    name: "medical_record_number",
    label: "NO REKAM MEDIK",
    field: "medical_record_number",
    align: "center",
  },
  { name: "name", label: "NAMA PASIEN", field: "name", align: "left" },
  { name: "nik", label: "NIK", field: "nik", align: "center" },
  { name: "address", label: "ALAMAT", field: "address", align: "left" },
  {
    name: "visit_count",
    label: "JML KUNJUNGAN",
    field: "visit_count",
    align: "center",
  },
  { name: "actions", label: "AKSI", field: "actions", align: "center" },
];
