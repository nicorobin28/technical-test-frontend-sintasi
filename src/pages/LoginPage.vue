<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="login-page flex flex-center">
        <!-- Background decorative elements for modern touch -->
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>

        <q-card class="login-card shadow-15">
          <!-- Logo Section -->
          <div class="text-center q-mb-xl">
            <!-- Ganti src dengan path logo Anda, misal: ~assets/logo.png atau /logo.png -->
            <div class="brand-container flex flex-center q-mb-sm">
              <img
                v-if="!imageFallback"
                src="../assets/logo.png"
                alt="Medisin Logo"
                class="brand-logo"
                @error="imageFallback = true"
              />
              <!-- Fallback teks jika gambar logo belum tersedia -->
              <div v-else class="brand-text">
                Med<span class="text-green-custom">i</span>sin
              </div>
            </div>
          </div>

          <!-- Form Login -->
          <q-form class="q-gutter-md" @submit="login">
            <q-input
              v-model="form.username"
              outlined
              dense
              bg-color="grey-3"
              class="rounded-input"
              placeholder="Username"
              color="primary"
              :rules="loginRules.username"
            >
              <template #prepend>
                <q-icon name="person" color="grey-7" />
              </template>
            </q-input>

            <q-input
              v-model="form.password"
              outlined
              dense
              bg-color="grey-3"
              class="rounded-input"
              placeholder="Password"
              color="primary"
              :type="show ? 'text' : 'password'"
              :rules="loginRules.password"
            >
              <template #prepend>
                <q-icon name="lock" color="grey-7" />
              </template>
              <template #append>
                <q-icon
                  :name="show ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  color="grey-7"
                  @click="show = !show"
                />
              </template>
            </q-input>

            <div class="q-mt-lg">
              <q-btn
                unelevated
                color="primary"
                size="md"
                class="full-width login-btn text-weight-bold py-3"
                label="LOGIN"
                type="submit"
                :loading="loading"
              />
            </div>
          </q-form>

          <!-- Hint Section -->
          <div class="hint q-mt-md">Demo: admin / Admin123!</div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { loginRules } from "../utils/validators";
import { notifyApiError } from "../utils/notify";

const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const show = ref(false);
const imageFallback = ref(false);
const form = ref({ username: "", password: "" });

async function login() {
  loading.value = true;
  try {
    await auth.login(form.value);
    router.push("/patients");
  } catch (error) {
    notifyApiError(error, "Login gagal");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0055cc;
  background: linear-gradient(135deg, #0045ad 0%, #0066cc 100%);
  position: relative;
  overflow: hidden;
}

.bg-shape {
  position: absolute;
  filter: blur(80px);
  z-index: 1;
  opacity: 0.15;
  border-radius: 50%;
}
.shape-1 {
  width: 300px;
  height: 300px;
  background: #ffffff;
  top: -50px;
  left: -50px;
}
.shape-2 {
  width: 400px;
  height: 400px;
  background: #4cd137;
  bottom: -100px;
  right: -100px;
}

.login-card {
  width: min(420px, 90vw);
  background: #ffffff;
  padding: 45px 35px;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-3px);
}

.brand-text {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #1e293b;
  font-family: "Inter", sans-serif;
}

.text-green-custom {
  color: #10b981;
}

:deep(.rounded-input .q-field__control) {
  border-radius: 30px !important;
  padding-left: 8px;
  padding-right: 8px;
  box-shadow: none !important;
}

.login-btn {
  border-radius: 30px;
  background: #0066cc !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.login-btn:hover {
  background: #0052a3 !important;
  box-shadow: 0 6px 16px rgba(0, 102, 204, 0.4);
}

.hint {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
}
</style>
