import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api, getCsrfCookie } from "../services/api";
import { encryptFields } from "../services/crypto";
import { usePatientsStore } from "./patients";

/**
 * State autentikasi global (session berbasis cookie + CSRF token).
 * Menggantikan `services/auth.js` yang sebelumnya memakai reactive manual.
 */
export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const ready = ref(false);

  const isAuthenticated = computed(() => user.value !== null);
  const displayName = computed(
    () => user.value?.name || user.value?.username || "User",
  );
  const initial = computed(() => displayName.value.charAt(0).toUpperCase());

  async function login({ username, password }) {
    await getCsrfCookie();

    const payload = encryptFields({ username, password }, [
      "username",
      "password",
    ]);
    const { data } = await api.post("/login", payload);

    user.value = data.user ?? null;

    return data;
  }

  async function fetchUser() {
    try {
      const { data } = await api.get("/me");
      user.value = data.user ?? null;
    } catch {
      user.value = null;
    } finally {
      ready.value = true;
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
    } finally {
      clearSession();
    }
  }

  /**
   * Hapus sesi di sisi client (dipakai interceptor 401 & logout).
   * Sekaligus membuang cache data yang hanya berlaku untuk sesi tersebut.
   */
  function clearSession() {
    user.value = null;
    usePatientsStore().reset();
  }

  return {
    user,
    ready,
    isAuthenticated,
    displayName,
    initial,
    login,
    fetchUser,
    logout,
    clearSession,
  };
});
