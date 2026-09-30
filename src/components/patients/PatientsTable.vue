<template>
  <q-table
    flat
    bordered
    separator="cell"
    :rows="rows"
    :columns="PATIENT_COLUMNS"
    row-key="medical_record_number"
    :loading="loading"
    class="custom-table"
    :rows-per-page-options="[10, 20, 50]"
  >
    <template #header="props">
      <q-tr :props="props" class="bg-grey-3">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-weight-bold text-black"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template #body="props">
      <q-tr :props="props">
        <q-td key="no" :props="props" class="text-center">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td key="medical_record_number" :props="props" class="text-center">
          {{ props.row.medical_record_number }}
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="nik" :props="props" class="text-center">
          {{ props.row.nik || "-" }}
        </q-td>
        <q-td key="address" :props="props">
          {{ props.row.address || "-" }}
        </q-td>
        <q-td key="visit_count" :props="props" class="text-center">
          {{ props.row.visit_count || 0 }}
        </q-td>
        <q-td key="actions" :props="props" class="text-center">
          <q-btn
            flat
            round
            color="primary"
            icon="visibility"
            size="sm"
            @click="emit('view', props.row)"
          >
            <q-tooltip>Lihat Detail & Riwayat</q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { PATIENT_COLUMNS } from "../../constants/patient";

defineProps({
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["view"]);
</script>

<style scoped>
.custom-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}
:deep(.custom-table .q-table__top) {
  display: none;
}
:deep(.custom-table th) {
  font-size: 11px;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #ccc !important;
  border-right: 1px solid #ddd;
}
:deep(.custom-table td) {
  font-size: 13px;
  border-right: 1px solid #eee;
}
:deep(.custom-table th:last-child),
:deep(.custom-table td:last-child) {
  border-right: none;
}
</style>
