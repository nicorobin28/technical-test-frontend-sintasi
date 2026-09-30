import { ref } from "vue";
import { defineStore } from "pinia";
import { patientService } from "../services/patient.service";

/**
 * State data pasien (list & detail) yang dibagikan antar component.
 *
 * Konvensi error handling:
 * - Semua action MELEMPAR error ke pemanggil (tidak menampilkan notifikasi).
 *   Layer UI (component) yang memutuskan cara menampilkannya.
 */
export const usePatientsStore = defineStore("patients", () => {
  const patients = ref([]);
  const loading = ref(false);

  const detail = ref(null);
  const detailLoading = ref(false);

  async function fetchPatients() {
    loading.value = true;
    try {
      patients.value = await patientService.fetchAll();
    } finally {
      loading.value = false;
    }
  }

  /**
   * Ambil detail pasien beserta riwayat kunjungannya.
   * Fallback: bila endpoint detail tidak menyertakan `visits`,
   * ambil dari endpoint /visits terpisah.
   */
  async function fetchDetail(recordNumber) {
    detailLoading.value = true;
    detail.value = null;
    try {
      const data = await patientService.fetchByRecordNumber(recordNumber);

      if (data && !data.visits) {
        data.visits = await patientService
          .fetchVisits(recordNumber)
          .catch(() => []);
      }

      detail.value = data;
      return data;
    } finally {
      detailLoading.value = false;
    }
  }

  /** Kosongkan cache (dipanggil saat sesi berakhir). */
  function reset() {
    patients.value = [];
    detail.value = null;
    loading.value = false;
    detailLoading.value = false;
  }

  return {
    patients,
    loading,
    detail,
    detailLoading,
    fetchPatients,
    fetchDetail,
    reset,
  };
});
