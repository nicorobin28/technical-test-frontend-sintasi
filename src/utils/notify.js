import { Notify } from "quasar";

/**
 * Helper notifikasi (Quasar Notify) agar gaya pesan konsisten di seluruh app.
 */

/** Pesan error dari response API, dengan fallback bila tidak ada pesan backend. */
export function notifyApiError(error, fallback = "Terjadi kesalahan") {
  Notify.create({
    type: "negative",
    message: error?.response?.data?.message || error?.message || fallback,
  });
}

export function notifyWarning(message) {
  Notify.create({ type: "warning", message });
}

/** Notifikasi sukses gaya splash (posisi atas, glossy). */
export function notifySuccess(message, icon) {
  Notify.create({
    color: "positive",
    message,
    icon,
    position: "top",
    timeout: 3000,
    classes: "glossy text-weight-bold shadow-10",
    actions: [{ icon: "close", color: "white" }],
  });
}
