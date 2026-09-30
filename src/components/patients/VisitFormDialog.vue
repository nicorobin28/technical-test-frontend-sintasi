<template>
  <base-dialog
    v-model="visible"
    title="Buat Kunjungan"
    subtitle="Masukkan No. Rekam Medik untuk memuat data pasien sebelum membuat kunjungan."
    width="800px"
    title-class="text-positive"
  >
    <q-card-section class="row q-col-gutter-lg">
      <!-- Kolom kiri: pencarian pasien -->
      <div class="col-12 col-md-5">
        <q-form class="row q-col-gutter-sm items-start" @submit="findPatient">
          <div class="col">
            <q-input
              v-model="recordNumber"
              outlined
              dense
              label="No. Rekam Medik"
              placeholder="RM0001"
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="primary"
              unelevated
              icon="search"
              class="action-btn-small"
              type="submit"
              :loading="searching"
            />
          </div>
        </q-form>

        <transition name="fade">
          <div
            v-if="patient"
            class="q-mt-md bg-blue-grey-1 rounded-borders q-pa-md shadow-1"
          >
            <div class="text-caption text-primary text-weight-bold">
              DATA PASIEN
            </div>
            <div class="text-h6 q-mt-xs">{{ patient.name }}</div>
            <div class="text-grey-8">{{ patient.medical_record_number }}</div>
            <q-separator class="q-my-sm" />
            <div class="text-caption">NIK: {{ patient.nik }}</div>
            <div class="text-caption">Email: {{ patient.email }}</div>
            <div class="text-caption q-mt-sm">
              Total Kunjungan:
              <q-badge color="positive">{{ patient.visit_count }}</q-badge>
            </div>
          </div>
        </transition>
      </div>

      <!-- Kolom kanan: form kunjungan -->
      <div class="col-12 col-md-7">
        <q-form class="row q-col-gutter-sm" @submit="submit">
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.visit_date"
              outlined
              dense
              type="date"
              label="Tanggal Kunjungan"
              stack-label
              :disable="!patient"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="form.doctor"
              outlined
              dense
              label="Dokter"
              :disable="!patient"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="form.complaint"
              outlined
              dense
              type="textarea"
              label="Keluhan"
              rows="2"
              :disable="!patient"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="form.notes"
              outlined
              dense
              type="textarea"
              label="Catatan"
              rows="2"
              :disable="!patient"
            />
          </div>
          <div class="col-12 row justify-end q-mt-md">
            <q-btn
              color="positive"
              unelevated
              label="Simpan Kunjungan"
              class="action-btn text-weight-bold"
              type="submit"
              :loading="saving"
              :disable="!patient"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </base-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import BaseDialog from "../common/BaseDialog.vue";
import { patientService } from "../../services/patient.service";
import {
  notifyApiError,
  notifySuccess,
  notifyWarning,
} from "../../utils/notify";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "created"]);

const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = () => ({
  visit_date: today(),
  doctor: "",
  complaint: "",
  notes: "",
});

const recordNumber = ref("");
const patient = ref(null);
const searching = ref(false);
const saving = ref(false);
const form = reactive(emptyForm());

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(
  () => props.modelValue,
  (open) => {
    if (!open) return;
    recordNumber.value = "";
    patient.value = null;
    Object.assign(form, emptyForm());
  },
);

async function findPatient() {
  const rm = recordNumber.value?.trim().toUpperCase();
  if (!rm) return;

  searching.value = true;
  patient.value = null;
  try {
    patient.value = await patientService.fetchByRecordNumber(rm);
    recordNumber.value = rm;
  } catch {
    notifyWarning("Pasien tidak ditemukan");
  } finally {
    searching.value = false;
  }
}

async function submit() {
  if (!patient.value) return;

  saving.value = true;
  try {
    await patientService.createVisit({
      medical_record_number: patient.value.medical_record_number,
      ...form,
    });
    visible.value = false;
    notifySuccess("Kunjungan berhasil ditambahkan!", "event_available");
    emit("created");
  } catch (error) {
    notifyApiError(error, "Gagal membuat kunjungan");
  } finally {
    saving.value = false;
  }
}
</script>
