import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base는 GitHub 저장소 이름과 똑같이 맞춰주세요.
// 예: 저장소 이름이 "sajangnim-hub" 면 아래처럼, 다른 이름이면 그 이름으로 바꿔주세요.
export default defineConfig({
  plugins: [react()],
  base: "/sajangnim-hub/",
});
