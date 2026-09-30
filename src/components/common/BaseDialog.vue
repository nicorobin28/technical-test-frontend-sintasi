<template>
  <q-dialog
    :model-value="modelValue"
    transition-show="scale"
    transition-hide="scale"
    backdrop-filter="blur(4px)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card
      class="dialog-card"
      :class="cardClass"
      :style="{ width, maxWidth: '95vw' }"
    >
      <!-- Header bawaan: judul + tombol tutup -->
      <q-card-section class="row items-center" :class="headerClass">
        <div class="text-h6 text-weight-bold" :class="titleClass">
          <slot name="title">{{ title }}</slot>
        </div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-card-section
        v-if="subtitle || $slots.subtitle"
        class="q-pt-sm text-grey-7"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </q-card-section>

      <!-- Konten utama (bebas slot: tiap dialog punya q-card-section sendiri) -->
      <slot />
    </q-card>
  </q-dialog>
</template>

<script setup>
/**
 * Shell dialog generik agar semua popup memiliki transisi, header,
 * dan tombol close yang konsisten.
 *
 * @slot title   - override judul (mis. judul + ikon)
 * @slot subtitle - override deskripsi di bawah judul
 * @slot default - isi dialog
 */
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  titleClass: { type: String, default: "text-primary" },
  headerClass: { type: String, default: "q-pb-none" },
  width: { type: String, default: "700px" },
  cardClass: { type: [String, Array, Object], default: "q-pa-sm" },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.dialog-card {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
.border-bottom {
  border-bottom: 1px solid #eeeeee;
}
</style>
