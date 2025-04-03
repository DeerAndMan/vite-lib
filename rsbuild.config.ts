import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: {
    // 不配置 template 时，默认使用 ./static/index.html
    // template: './static/index.html',
    favicon: './public/fugui_oip.svg',
    title: 'rs pack app',
    meta: {
      description: '测试 学习 rs pack',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  output: {
    cssModules: {
      namedExport: false,
    },
  },
});
