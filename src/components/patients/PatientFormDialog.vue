<template>
  <base-dialog
    v-model="visible"
    title="Pendaftaran Pasien"
    subtitle="Lengkapi data pasien. NIK dan email akan dienkripsi sebelum dikirim ke API."
    width="700px"
    title-class="text-primary"
  >
    <q-card-section>
      <q-form ref="formRef" class="row q-col-gutter-md" @submit="submit">
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.nik"
            outlined
            dense
            label="NIK"
            maxlength="16"
            inputmode="numeric"
            :rules="patientRules.nik"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.name"
            outlined
            dense
            label="Nama Lengkap"
            :rules="patientRules.name"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.email"
            outlined
            dense
            label="Email"
            type="email"
            :rules="patientRules.email"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input v-model="form.phone" outlined dense label="Nomor Telepon" />
        </div>
        <div class="col-12 col-md-6">
          <q-select
            v-model="form.gender"
            outlined
            dense
            label="Jenis Kelamin"
            :options="GENDER_OPTIONS"
            emit-value
            map-options
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.birth_date"
            outlined
            dense
            type="date"
            label="Tanggal Lahir"
            stack-label
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="form.address"
            outlined
            dense
            type="textarea"
            label="Alamat"
            rows="3"
          />
        </div>
        <div class="col-12 row justify-end q-gutter-sm q-mt-sm">
          <q-btn v-close-popup flat label="Batal" color="grey-7" />
          <q-btn
            unelevated
            label="Simpan Pasien"
            color="primary"
            class="action-btn text-weight-bold"
            type="submit"
            :loading="saving"
          />
        </div>
      </q-form>
    </q-card-section>
  </base-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import BaseDialog from "../common/BaseDialog.vue";
import { patientService } from "../../services/patient.service";
import { GENDER_OPTIONS } from "../../constants/patient";
import { patientRules } from "../../utils/validators";
import { notifyApiError, notifySuccess } from "../../utils/notify";

/**
 * Dialog pendaftaran pasien baru.
 *
 * @property {boolean} modelValue - visibilitas dialog (v-model)
 * @event created - pasien berhasil disimpan (parent wajib refresh data)
 */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "created"]);

const emptyForm = () => ({
  nik: "",
  name: "",
  email: "",
  phone: "",
  gender: "",
  birth_date: "",
  address: "",
});

const formRef = ref(null);
const saving = ref(false);
const form = reactive(emptyForm());

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Reset form setiap kali dialog dibuka
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return;
    Object.assign(form, emptyForm());
    formRef.value?.resetValidation();
  },
);

async function submit() {
  saving.value = true;
  try {
    await patientService.createPatient(form);
    visible.value = false;
    notifySuccess("Pasien berhasil didaftarkan!", "person_add_alt_1");
    emit("created");
  } catch (error) {
    notifyApiError(error, "Pendaftaran gagal");
  } finally {
    saving.value = false;
  }
}
</script>
