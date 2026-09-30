<template>
  <q-page class="patient-page flex flex-center q-pa-md">
    <q-card class="main-card shadow-15 column">
      <div class="text-center q-mb-xl q-mt-md">
        <img src="../assets/logo.png" alt="Medisin Logo" class="brand-logo" />
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <q-btn
          unelevated
          color="primary"
          label="TAMBAH PASIEN"
          class="action-btn text-weight-bold"
          @click="showPatientDialog = true"
        />
        <q-btn
          unelevated
          color="positive"
          label="BUAT KUNJUNGAN"
          class="action-btn bg-green-custom text-weight-bold"
          @click="showVisitDialog = true"
        />
      </div>

      <patients-table
        :rows="store.patients"
        :loading="store.loading"
        @view="openDetail"
      />
    </q-card>

    <patient-form-dialog v-model="showPatientDialog" @created="loadPatients" />

    <visit-form-dialog v-model="showVisitDialog" @created="loadPatients" />

    <patient-detail-dialog
      v-model="showDetailDialog"
      :record-number="selectedRecordNumber"
    />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import PatientsTable from "../components/patients/PatientsTable.vue";
import PatientFormDialog from "../components/patients/PatientFormDialog.vue";
import VisitFormDialog from "../components/patients/VisitFormDialog.vue";
import PatientDetailDialog from "../components/patients/PatientDetailDialog.vue";
import { usePatientsStore } from "../stores/patients";
import { notifyApiError } from "../utils/notify";

const store = usePatientsStore();

const showPatientDialog = ref(false);
const showVisitDialog = ref(false);
const showDetailDialog = ref(false);
const selectedRecordNumber = ref("");

function loadPatients() {
  store.fetchPatients().catch((error) => {
    notifyApiError(error, "Gagal mengambil data tabel");
  });
}

function openDetail(row) {
  selectedRecordNumber.value = row.medical_record_number;
  showDetailDialog.value = true;
}

onMounted(loadPatients);
</script>

<style scoped>
.patient-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0045ad 0%, #0066cc 100%);
}
.main-card {
  width: 100%;
  max-width: 1100px;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  min-height: 80vh;
}
</style>
