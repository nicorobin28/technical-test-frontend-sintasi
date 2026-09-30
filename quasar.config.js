import { configure } from "quasar/wrappers";

export default configure(function () {
  return {
    boot: [],
    css: ["app.scss"],
    extras: ["material-icons"],
    build: {
      target: { browser: ["es2022", "firefox115", "chrome115", "safari15"] },
      vueRouterMode: "history",
    },
    devServer: { open: true, port: 9000 },
    framework: { config: {}, plugins: ["Notify", "Loading"] },
    animations: [],
  };
});
