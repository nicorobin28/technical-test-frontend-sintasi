<template>
  <q-layout view="lHh Lpr lFf" class="page-bg">
    <q-header bordered class="bg-white text-dark">
      <q-toolbar class="q-px-lg" style="height: 72px">
        <div class="brand text-primary text-h5">SINTASI</div>
        <q-space />
        <q-btn flat no-caps class="q-ml-sm" @click="logout">
          <q-avatar size="34px" color="primary" text-color="white">
            {{ auth.initial }}
          </q-avatar>
          <span class="q-ml-sm">{{ auth.displayName }}</span>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

async function logout() {
  try {
    await auth.logout();
  } catch {}
  router.push("/login");
}
</script>
