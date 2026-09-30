import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { setUnauthorizedHandler } from "../services/api";

const routes = [
  { path: "/login", component: () => import("../pages/LoginPage.vue") },
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/patients" },
      {
        path: "patients",
        component: () => import("../pages/PatientsPage.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (!auth.ready) await auth.fetchUser();

  if (to.meta.requiresAuth && !auth.isAuthenticated) return { path: "/login" };
  if (to.path === "/login" && auth.isAuthenticated)
    return { path: "/patients" };
});

// Sesi hangus (401) -> bersihkan state & pindah ke halaman login
setUnauthorizedHandler(() => {
  useAuthStore().clearSession();
  if (router.currentRoute.value.path !== "/login") router.push("/login");
});

export default router;
