<template>
  <base-dialog
    v-model="visible"
    width="900px"
    title-class="text-primary"
    header-class="q-pb-md border-bottom q-pr-xl"
    card-class="q-pa-md"
  >
    <template #title>
      <q-icon name="assignment_ind" size="md" class="q-mr-sm" />
      Detail Pasien
    </template>

    <q-card-section v-if="store.detailLoading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="40px" />
    </q-card-section>

    <q-card-section v-else-if="patient" class="row q-col-gutter-xl q-pt-md">
      <!-- Sisi kiri: biodata -->
      <div class="col-12 col-md-5">
        <div class="text-subtitle1 text-weight-bold q-mb-md text-grey-8">
          INFORMASI BIODATA
        </div>
        <div class="bg-grey-1 q-pa-md rounded-borders shadow-1">
          <div class="q-mb-sm">
            <div class="text-caption text-grey-6">No. Rekam Medik</div>
            <div class="text-weight-bold text-primary">
              {{ patient.medical_record_number }}
            </div>
          </div>
          <div class="q-mb-sm">
            <div class="text-caption text-grey-6">Nama Lengkap</div>
            <div class="text-body2 text-weight-medium">
              {{ patient.name }}
            </div>
          </div>
          <div class="q-mb-sm">
            <div class="text-caption text-grey-6">NIK</div>
            <div class="text-body2">{{ patient.nik || "-" }}</div>
          </div>
          <div class="q-mb-sm row">
            <div class="col">
              <div class="text-caption text-grey-6">Jenis Kelamin</div>
              <div class="text-body2">{{ genderLabel(patient.gender) }}</div>
            </div>
            <div class="col">
              <div class="text-caption text-grey-6">Tgl Lahir</div>
              <div class="text-body2">{{ patient.birth_date || "-" }}</div>
            </div>
          </div>
          <div class="q-mb-sm">
            <div class="text-caption text-grey-6">Kontak</div>
            <div class="text-body2">
              <q-icon name="email" class="q-mr-xs" />
              {{ patient.email || "-" }}<br />
              <q-icon name="phone" class="q-mr-xs" />
              {{ patient.phone || "-" }}
            </div>
          </div>
          <div>
            <div class="text-caption text-grey-6">Alamat</div>
            <div class="text-body2">{{ patient.address || "-" }}</div>
          </div>
        </div>
      </div>

      <!-- Sisi kanan: timeline kunjungan -->
      <div class="col-12 col-md-7">
        <div
          class="text-subtitle1 text-weight-bold q-mb-md text-grey-8 row items-center justify-between"
        >
          <span>RIWAYAT KUNJUNGAN</span>
          <q-badge color="positive" rounded class="q-px-sm py-1">
            Total: {{ patient.visit_count || 0 }} Kunjungan
          </q-badge>
        </div>

        <q-scroll-area style="height: 350px" class="q-pr-md">
          <div
            v-if="!patient.visits || patient.visits.length === 0"
            class="text-center text-grey-6 q-mt-xl"
          >
            <q-icon
              name="event_busy"
              size="40px"
              color="grey-4"
              class="q-mb-sm"
            /><br />
            Belum ada riwayat kunjungan.
          </div>

          <q-timeline v-else color="positive" layout="dense" class="q-ml-sm">
            <q-timeline-entry
              v-for="(visit, index) in patient.visits"
              :key="index"
              icon="medical_services"
            >
              <template #title>
                <div class="text-subtitle2 text-weight-bold">
                  Dr. {{ visit.doctor || "-" }}
                </div>
              </template>
              <template #subtitle>
                <div class="text-caption text-primary text-weight-bold">
                  {{ visit.visit_date }}
                </div>
              </template>
              <div class="q-mt-sm bg-grey-1 q-pa-sm rounded-borders">
                <div class="text-body2">
                  <b>Keluhan:</b> <br />{{ visit.complaint || "-" }}
                </div>
                <q-separator class="q-my-xs" />
                <div class="text-body2">
                  <b>Catatan Medis:</b> <br />{{ visit.notes || "-" }}
                </div>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-scroll-area>
      </div>
    </q-card-section>
  </base-dialog>
</template>

<script setup>
import { computed, watch } from "vue";
import BaseDialog from "../common/BaseDialog.vue";
import { usePatientsStore } from "../../stores/patients";
import { genderLabel } from "../../constants/patient";
import { notifyApiError } from "../../utils/notify";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  recordNumber: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue"]);

const store = usePatientsStore();
const patient = computed(() => store.detail);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(
  () => props.modelValue,
  async (open) => {
    if (!open || !props.recordNumber) return;

    try {
      await store.fetchDetail(props.recordNumber);
    } catch (error) {
      notifyApiError(error, "Gagal memuat detail pasien");
      visible.value = false;
    }
  },
);
</script>
