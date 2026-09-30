import { api } from "./api";
import { encryptFields } from "./crypto";

const unwrap = (response) => response.data?.data;

/**
 * Layer akses API untuk domain Pasien & Kunjungan.
 * Menangani endpoint + enkripsi field sensitif sebelum dikirim.
 * Semua fungsi melempar error bila request gagal.
 */
export const patientService = {
  fetchAll: () => api.get("/patients").then(unwrap),

  fetchByRecordNumber: (recordNumber) =>
    api.get(`/patients/${encodeURIComponent(recordNumber)}`).then(unwrap),

  createPatient: (form) => {
    const payload = encryptFields({ ...form }, ["nik", "email"]);
    return api.post("/patients", payload).then(unwrap);
  },

  fetchVisits: (recordNumber) =>
    api
      .get("/visits", {
        params: { medical_record_number: recordNumber },
      })
      .then(unwrap),

  createVisit: (payload) => api.post("/visits", payload).then(unwrap),
};
