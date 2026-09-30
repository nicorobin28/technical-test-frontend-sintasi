import { createPinia } from "pinia";

/**
 * Quasar meng-import file ini secara otomatis (sourceFiles.store) lalu:
 *   1. memanggil factory ini, dan
 *   2. menjalankan app.use(pinia)
 * sebelum boot file dan sebelum router di-install,
 * sehingga store sudah aktif saat router guard dieksekusi.
 *
 * Factory (bukan instance langsung) agar aman untuk SSR:
 * setiap request mendapat instance Pinia sendiri.
 */
export default function createStore() {
  return createPinia();
}
